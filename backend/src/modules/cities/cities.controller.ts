import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('api/v1/cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('autocomplete')
  async autocomplete(@Query('search') search: string) {
    if (!search || search.length < 2) {
      return {
        success: true,
        data: [],
        meta: { count: 0, searchTerm: search || '' },
      };
    }
    const data = await this.citiesService.searchCities(search);
    return {
      success: true,
      data,
      meta: { count: data.length, searchTerm: search },
    };
  }
}
