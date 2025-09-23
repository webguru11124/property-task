import { z } from 'zod';

import { VALIDATION_PATTERNS } from '../../../constants/validation.constants';

export const leadFormSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .refine((name) => VALIDATION_PATTERNS.NAME.test(name), 'Please enter a valid name'),

    phone: z
        .string()
        .min(1, 'Please enter a valid Norwegian phone number')
        .transform((v) => v.replace(/\s|-/g, ''))
        .transform((v) => (v.startsWith('0047') ? `+47${v.slice(4)}` : v))
        .refine((v) => VALIDATION_PATTERNS.NORWEGIAN_PHONE.test(v), 'Invalid phone number'),

    email: z
        .string()
        .min(1, 'Email is required')
        .transform((v) => v.toLowerCase().trim())
        .refine((v) => VALIDATION_PATTERNS.EMAIL.test(v), 'Please enter a valid email address'),

    city: z.object({
        id: z.string(),
        name: z.string(),
    }),

    comment: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;


