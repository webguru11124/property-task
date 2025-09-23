export type BrokerMatchType = 'local' | 'nearby' | 'recommended' | 'all';

export interface Broker {
    id: string;
    name: string;
    address: string;
    city: string | { name: string };
    phone?: string;
    email?: string;
    website?: string;
    distance?: number;
    rating?: number;
}

export interface BrokerListProps {
    brokers: Broker[];
    loading?: boolean;
    matchType?: BrokerMatchType;
    message?: string;
    onAssignBroker?: (leadId: string, brokerId: string) => void;
    assigningBrokerId?: string;
    leadId?: string;
}


