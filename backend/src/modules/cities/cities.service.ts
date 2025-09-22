import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) { }

    async searchCities(searchTerm: string): Promise<City[]> {
        if (!searchTerm || searchTerm.length < 2) return [];

        return this.cityRepository
            .createQueryBuilder('city')
            .where(
                '(city.name ILIKE :search OR city.county ILIKE :search OR city.municipality_code LIKE :codeSearch)',
                {
                    search: `%${searchTerm}%`,
                    codeSearch: `${searchTerm}%`,
                },
            )
            .orderBy('city.population', 'DESC')
            .addOrderBy('city.name', 'ASC')
            .limit(10)
            .getMany();
    }
}
