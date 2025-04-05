'use client';

import { Form, FormField } from '@/components/ui/common';
import { Heading, ToggleCard, ToggleCardSkeleton } from '@/components/ui/elements';
import { useChangeChatSettingsMutation } from '@/graphql/generated/output';
import { useChatSettings } from '@/hooks/useChatSettings';
import {
	changeChatSettingsSchema,
	TChangeChatSettingsSchema,
} from '@/schemas/stream/change-chat-settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChatSettings() {
	const t = useTranslations('dashboard.chat');
	const { chatSettings, isChatSettingsLoading, refetch } = useChatSettings();

	const form = useForm<TChangeChatSettingsSchema>({
		resolver: zodResolver(changeChatSettingsSchema),
		values: {
			isChatEnabled: chatSettings?.isChatEnabled ?? true,
			isChatFollowersOnly: chatSettings?.isChatFollowersOnly ?? false,
			isChatPremiumFollowersOnly: chatSettings?.isChatPremiumFollowersOnly ?? false,
		},
	});

	const [update, { loading: isUpdateLoading }] = useChangeChatSettingsMutation({
		onCompleted() {
			refetch();
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	function onChange(field: keyof TChangeChatSettingsSchema, value: boolean) {
		form.setValue(field, value);

		update({
			variables: {
				data: {
					...form.getValues(),
					[field]: value,
				},
			},
		});
	}

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			{isChatSettingsLoading ? (
				Array.from({ length: 3 }).map((_, i) => <ToggleCardSkeleton key={i} />)
			) : (
				<Form {...form}>
					<form className='space-y-6 mt-5'>
						<FormField
							control={form.control}
							name='isChatEnabled'
							render={({ field }) => (
								<ToggleCard
									heading={t('isChatEnabled.heading')}
									description={t('isChatEnabled.description')}
									isDisabled={isUpdateLoading}
									value={field.value}
									onChange={(value) => onChange('isChatEnabled', value)}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='isChatFollowersOnly'
							render={({ field }) => (
								<ToggleCard
									heading={t('isChatFollowersOnly.heading')}
									description={t('isChatFollowersOnly.description')}
									isDisabled={isUpdateLoading || !chatSettings?.isChatEnabled}
									value={field.value}
									onChange={(value) => onChange('isChatFollowersOnly', value)}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='isChatPremiumFollowersOnly'
							render={({ field }) => (
								<ToggleCard
									heading={t('isChatPremiumFollowersOnly.heading')}
									description={t('isChatPremiumFollowersOnly.description')}
									isDisabled={isUpdateLoading || !chatSettings?.isChatEnabled}
									value={field.value}
									onChange={(value) => onChange('isChatPremiumFollowersOnly', value)}
								/>
							)}
						/>
					</form>
				</Form>
			)}
		</div>
	);
}
