import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { City } from '../cities/entities/city.entity';
import { BrokersService } from '../brokers/brokers.service';
import { NotificationService } from '../notifications/notification.service';
import { BrokerOffice } from '../brokers/entities/broker-office.entity';

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
        @InjectRepository(BrokerOffice)
        private readonly brokerRepository: Repository<BrokerOffice>,
        private readonly brokersService: BrokersService,
        private readonly notificationService: NotificationService,
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

    async assignLead(leadId: string, brokerId: string) {
        const lead = await this.leadRepository.findOne({ where: { id: leadId } });
        if (!lead) throw new Error('Lead not found');
        lead.assigned_broker_id = brokerId;
        const saved = await this.leadRepository.save(lead);
        // Fire mock notification
        const broker = await this.brokerRepository.findOne({ where: { id: brokerId } });
        if (broker?.email) {
            await this.notificationService.notifyBrokerByEmail(broker.email, {
                leadId: saved.id,
                message: `New lead assigned: ${saved.full_name} (${saved.email})`
            });
        }
        return { success: true, data: { leadId: saved.id, assignedBrokerId: brokerId, assignedAt: new Date().toISOString(), notificationSent: !!broker?.email } };
    }
}
