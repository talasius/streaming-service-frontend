import { languages } from '@/libs/i18n/config';
import { z } from 'zod';

export const changeLanguageSchema = z.object({
	language: z.enum(languages),
});

export type TChangeLanguageSchema = z.infer<typeof changeLanguageSchema>;
