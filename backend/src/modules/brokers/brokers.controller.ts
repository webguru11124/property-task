import { Controller, Get, Query } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('api/v1/brokers')
export class BrokersController {
    constructor(private readonly brokersService: BrokersService) { }

    @Get('nearby')
    async nearby(@Query('lat') lat: string, @Query('lng') lng: string, @Query('limit') limit?: string) {
        const latitude = Number(lat);
        const longitude = Number(lng);
        const lim = Math.min(Number(limit) || 3, 20);
        const data = await this.brokersService.findNearestByHaversine(latitude, longitude, lim);
        return { success: true, data, meta: { searchLocation: { lat: latitude, lng: longitude }, totalFound: data.length } };
    }
}


