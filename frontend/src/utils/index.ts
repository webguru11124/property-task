export function mapLeadResponseToUI(api: any) {
    if (!api) return null;
    const data = api.data ?? api;
    return {
        id: data.id,
        brokerMatchType: data.brokerMatchType ?? data.type ?? 'all',
        message: data.message ?? '',
        recommendedBrokers: (data.recommendedBrokers ?? data.brokers ?? []).map((b: any) => ({
            id: b.id,
            name: b.name,
            address: b.address,
            city: b.city?.name || b.city || '',
            phone: b.phone,
            email: b.email,
            website: b.website,
            distance: b.distance != null ? Number(b.distance) : undefined,
        })),
    };
}

// Central utils export
export * from './validation.utils';
export * from './format.utils';
export * from './cn.utils';
