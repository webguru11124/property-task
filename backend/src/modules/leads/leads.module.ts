import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { City } from '../cities/entities/city.entity';
import { BrokerOffice } from '../brokers/entities/broker-office.entity';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Lead, City, BrokerOffice])],
    controllers: [LeadsController],
    providers: [LeadsService],
})
export class LeadsModule { }
