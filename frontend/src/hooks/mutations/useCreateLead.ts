import { useMutation } from '@tanstack/react-query';

import { api } from '../../lib/api/client';

export interface CreateLeadInput {
    fullName: string;
    phone: string;
    email: string;
    cityId: string;
    comment?: string;
}

export function useCreateLead() {
    return useMutation({
        mutationFn: async (input: CreateLeadInput) => {
            const { data } = await api.post('/api/v1/leads', input);
            return data;
        },
    });
}


