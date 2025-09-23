import { useQuery } from '@tanstack/react-query';

import { api } from '../../lib/api/client';

export interface CityDto {
    id: string;
    name: string;
    county: string;
    municipality_code?: string;
    latitude?: string;
    longitude?: string;
}

async function fetchCities(search: string): Promise<CityDto[]> {
    if (!search || search.length < 2) return [];
    const { data } = await api.get(`/api/v1/cities/autocomplete`, { params: { search } });
    return data?.data ?? [];
}

export function useCities(search: string) {
    return useQuery({
        queryKey: ['cities', search],
        queryFn: () => fetchCities(search),
        enabled: search.length >= 2,
        staleTime: 60_000,
    });
}


