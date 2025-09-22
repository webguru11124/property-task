import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { City } from '../cities/entities/city.entity';
import { BrokersService } from '../brokers/brokers.service';

interface CreateLeadInput {
    fullName: string;
    phone: string;
    email: string;
    cityId: string;
    comment?: string;
}

@Injectable()
export class LeadsService {
    constructor(
        @InjectRepository(Lead)
        private readonly leadRepository: Repository<Lead>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
        private readonly brokersService: BrokersService,
    ) { }

    async create(input: CreateLeadInput) {
        const city = await this.cityRepository.findOne({ where: { id: input.cityId } });
        if (!city) {
            throw new Error('City not found');
        }

        const lead = this.leadRepository.create({
            full_name: input.fullName,
            phone: input.phone,
            email: input.email,
            city_id: input.cityId,
            comment: input.comment || null,
        });
        const saved = await this.leadRepository.save(lead);

        const match = await this.brokersService.getRecommendedBrokers(input.cityId);

        return {
            success: true,
            data: {
                id: saved.id,
                fullName: saved.full_name,
                createdAt: saved.created_at,
                recommendedBrokers: match.brokers,
                brokerMatchType: match.type,
                message: match.message,
            },
        };
    }
}
