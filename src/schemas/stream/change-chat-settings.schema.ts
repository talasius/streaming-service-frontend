import { z } from 'zod';

export const changeChatSettingsSchema = z.object({
	isChatEnabled: z.boolean(),
	isChatFollowersOnly: z.boolean(),
	isChatPremiumFollowersOnly: z.boolean(),
});

export type TChangeChatSettingsSchema = z.infer<typeof changeChatSettingsSchema>;
