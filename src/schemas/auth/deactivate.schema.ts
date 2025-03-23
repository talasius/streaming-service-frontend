import { z } from 'zod';

export const deactivateSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	pin: z.string().length(6).optional(),
});

export type TDeactivateSchema = z.infer<typeof deactivateSchema>;
