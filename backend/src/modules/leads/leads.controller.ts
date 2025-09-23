import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { AssignLeadDto } from './dto/assign-lead.dto';

@Controller('api/v1/leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    async create(@Body() body: CreateLeadDto) {
        return this.leadsService.create(body);
    }

    @Patch(':leadId/assign')
    async assign(@Param('leadId') leadId: string, @Body() body: AssignLeadDto) {
        return this.leadsService.assignLead(leadId, body.brokerId);
    }
}
