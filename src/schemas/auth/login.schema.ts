import { z } from 'zod';

export const loginSchema = z.object({
	login: z
		.string()
		.min(1)
		.regex(/^[a-zA-Z0-9]+|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
	password: z.string().min(8),
	pin: z.string().optional(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
