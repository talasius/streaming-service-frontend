import { z } from 'zod';

export const changeThemeSchema = z.object({
	theme: z.enum(['light', 'dark']),
});

export type TChangeThemeSchema = z.infer<typeof changeThemeSchema>;
