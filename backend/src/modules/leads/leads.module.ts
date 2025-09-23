import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { City } from '../cities/entities/city.entity';
import { BrokerOffice } from '../brokers/entities/broker-office.entity';
import { LeadsService } from './leads.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { LeadsController } from './leads.controller';
import { BrokersModule } from '../brokers/brokers.module';

@Module({
    imports: [TypeOrmModule.forFeature([Lead, City, BrokerOffice]), NotificationsModule, BrokersModule],
    controllers: [LeadsController],
    providers: [LeadsService],
})
export class LeadsModule { }
