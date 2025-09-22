import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerOffice } from './entities/broker-office.entity';
import { City } from '../cities/entities/city.entity';
import { BrokersService } from './brokers.service';
import { BrokersController } from './brokers.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BrokerOffice, City])],
    controllers: [BrokersController],
    providers: [BrokersService],
    exports: [BrokersService],
})
export class BrokersModule { }


