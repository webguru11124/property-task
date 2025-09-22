import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrokerOffice } from './entities/broker-office.entity';
import { City } from '../cities/entities/city.entity';

@Injectable()
export class BrokersService {
    constructor(
        @InjectRepository(BrokerOffice)
        private readonly brokerRepository: Repository<BrokerOffice>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) { }

    async findNearestByHaversine(lat: number, lng: number, limit = 3) {
        const qb = this.brokerRepository
            .createQueryBuilder('b')
            .leftJoinAndSelect('b.city', 'city')
            .where('b.is_active = :active', { active: true })
            .addSelect(
                `6371 * acos(
           cos(radians(:lat)) * cos(radians(b.latitude)) *
           cos(radians(b.longitude) - radians(:lng)) +
           sin(radians(:lat)) * sin(radians(b.latitude))
         )`,
                'distance_km',
            )
            .setParameters({ lat, lng })
            .orderBy('distance_km', 'ASC')
            .limit(limit);

        const { raw, entities } = await qb.getRawAndEntities();
        return entities.map((broker, i) => ({ ...broker, distance: Number(raw[i].distance_km) }));
    }

    async findBrokersByCity(cityId: string): Promise<BrokerOffice[]> {
        return this.brokerRepository.find({
            where: { city_id: cityId, is_active: true },
            relations: ['city'],
        });
    }

    async getRecommendedBrokers(cityId: string) {
        const local = await this.findBrokersByCity(cityId);
        if (local.length > 0) {
            return { brokers: local, type: 'local', message: `Found ${local.length} broker offices in your city` };
        }
        const city = await this.cityRepository.findOne({ where: { id: cityId } });
        if (!city) throw new Error('City not found');
        const nearest = await this.findNearestByHaversine(Number(city.latitude), Number(city.longitude), 3);
        return { brokers: nearest, type: 'nearby', message: 'No offices in your city, showing nearest offices' };
    }
}


