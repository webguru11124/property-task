type BrokerUi = {
    id: string;
    name: string;
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    website?: string;
    distance?: number;
};

import type { BrokerMatchType } from '../features/brokers/types/broker.types';

type LeadUi = {
    id: string;
    brokerMatchType: BrokerMatchType;
    message: string;
    recommendedBrokers: BrokerUi[];
};

export function mapLeadResponseToUI(api: unknown): LeadUi | null {
    if (!api) return null;
    const source = api as Record<string, unknown>;
    const data = (source?.data as Record<string, unknown>) ?? source;
    const rawMatch = (data.brokerMatchType as string | undefined) ?? (data.type as string | undefined) ?? 'all';
    const match: BrokerMatchType = ['local', 'nearby', 'recommended', 'all'].includes(rawMatch)
        ? (rawMatch as BrokerMatchType)
        : 'all';

    return {
        id: String(data.id ?? ''),
        brokerMatchType: match,
        message: String((data.message as string) ?? ''),
        recommendedBrokers: ((data.recommendedBrokers as unknown[]) ?? (data.brokers as unknown[]) ?? []).map((b) => {
            const broker = b as Record<string, unknown>;
            const city = broker.city as Record<string, unknown> | undefined;
            const distanceVal = broker.distance as number | string | undefined;
            return {
                id: String(broker.id ?? ''),
                name: String(broker.name ?? ''),
                address: broker.address as string | undefined,
                city: (city?.name as string) ?? (broker.city as string | undefined) ?? '',
                phone: broker.phone as string | undefined,
                email: broker.email as string | undefined,
                website: broker.website as string | undefined,
                distance: distanceVal != null ? Number(distanceVal) : undefined,
            } satisfies BrokerUi;
        }),
    };
}

export * from './validation.utils';
export * from './format.utils';
export * from './cn.utils';
