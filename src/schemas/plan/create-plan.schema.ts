import { z } from 'zod';

export const createPlanSchema = z.object({
	title: z.string().min(5).max(25),
	description: z.string().max(150).optional(),
	price: z.coerce.number().positive(),
});

export type TCreatePlanSchema = z.infer<typeof createPlanSchema>;
