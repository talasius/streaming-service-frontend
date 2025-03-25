import { z } from 'zod';

export const changeNotificationsSettingsSchema = z.object({
	siteNotifications: z.boolean(),
	telegramNotifications: z.boolean(),
});

export type TChangeNotificationsSettingsSchema = z.infer<
	typeof changeNotificationsSettingsSchema
>;
