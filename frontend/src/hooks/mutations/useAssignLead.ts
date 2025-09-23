import { useMutation } from '@tanstack/react-query';

import { api } from '../../lib/api/client';

export function useAssignLead() {
    return useMutation({
        mutationFn: async ({ leadId, brokerId }: { leadId: string; brokerId: string }) => {
            const { data } = await api.patch(`/api/v1/leads/${leadId}/assign`, { brokerId });
            return data;
        },
    });
}


