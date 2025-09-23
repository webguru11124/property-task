// Lead-related type definitions

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  comment?: string;
  assignedBrokerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadDTO {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  comment?: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  city: {
    id: string;
    name: string;
  };
  comment?: string;
}

export interface AssignLeadDTO {
  leadId: string;
  brokerId: string;
  notificationPreference?: 'email' | 'sms' | 'both';
}

export interface LeadResponse {
  id: string;
  fullName: string;
  createdAt: string;
  recommendedBrokers: Broker[];
  brokerMatchType: 'local' | 'nearby' | 'all';
  message: string;
}

// Import Broker type from broker.types
import type { Broker } from './broker.types';