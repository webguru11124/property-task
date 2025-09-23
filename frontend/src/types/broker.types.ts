// Broker-related type definitions

export interface Broker {
  id: string;
  name: string;
  address: string;
  city: string | City;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  rating?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrokerOffice extends Broker {
  city_id: string;
  postal_code?: string;
  is_active: boolean;
}

export type BrokerMatchType = 'local' | 'nearby' | 'recommended';

export interface BrokerSearchParams {
  cityId?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  limit?: number;
}

export interface BrokerListResponse {
  brokers: Broker[];
  total: number;
  matchType: BrokerMatchType;
  message?: string;
}

// Import City type
import type { City } from './city.types';