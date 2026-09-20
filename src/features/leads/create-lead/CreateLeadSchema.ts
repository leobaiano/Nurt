import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' }),

  email: z
    .string({ message: 'Email is required' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address format' }),

  phone: z
    .string({ message: 'Phone is required' })
    .trim(),

  source: z
    .array(z.string().trim(), { message: 'Source is required' })
    .min(1, { message: 'Source must be a non-empty array' }),

  custom: z.array(z.string().trim()).optional(),
});

export type CreateLeadDTO = z.infer<typeof createLeadSchema>;
