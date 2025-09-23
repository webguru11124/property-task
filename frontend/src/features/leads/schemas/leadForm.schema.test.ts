import { describe, it, expect } from 'vitest';

import { leadFormSchema } from './leadForm.schema';

describe('leadFormSchema', () => {
    it('validates a correct payload', () => {
        const input = {
            fullName: 'Ola Nordmann',
            phone: '+4798765432',
            email: 'ola@example.com',
            city: { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Oslo' },
            comment: 'Looking for 3-bedroom apartment',
        };
        const result = leadFormSchema.safeParse(input);
        expect(result.success).toBe(true);
    });

    it('rejects invalid phone and email', () => {
        const input: {
            fullName: string;
            phone: string;
            email: string;
            city: { id: string; name: string };
            comment?: string;
        } = {
            fullName: 'Ola Nordmann',
            phone: '123',
            email: 'not-an-email',
            city: { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Oslo' },
        };
        const result = leadFormSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
});


