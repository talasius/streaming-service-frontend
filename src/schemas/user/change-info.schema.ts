import { z } from 'zod';

export const changeInfoSchema = z.object({
	username: z
		.string()
		.min(3)
		.regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
	displayName: z.string().min(3),
	bio: z.string().max(300),
});

export type TChangeInfoSchema = z.infer<typeof changeInfoSchema>;
