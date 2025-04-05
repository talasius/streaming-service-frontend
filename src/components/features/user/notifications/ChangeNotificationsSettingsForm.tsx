'use client';

import { Form, FormField } from '@/components/ui/common';
import { ToggleCard, ToggleCardSkeleton } from '@/components/ui/elements';
import { useChangeNotificationsSettingsMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	changeNotificationsSettingsSchema,
	type TChangeNotificationsSettingsSchema,
} from '@/schemas/user/change-notifications-settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChangeNotificationsSettingsForm() {
	const t = useTranslations('dashboard.settings.notifications');
	const { user, isProfileLoading, refetch } = useCurrent();

	const form = useForm<TChangeNotificationsSettingsSchema>({
		resolver: zodResolver(changeNotificationsSettingsSchema),
		values: {
			siteNotifications: user?.notificationsSettings.siteNotifications ?? false,
			telegramNotifications: user?.notificationsSettings.telegramNotifications ?? false,
		},
	});

	const [update, { loading: isUpdateLoading }] = useChangeNotificationsSettingsMutation({
		onCompleted(data) {
			toast.success(t('successMessage'));
			refetch();
			if (data.changeNotificationsSettings.telegramAuthToken) {
				window.open(
					`https://t.me/k_teastream_bot?start=${data.changeNotificationsSettings.telegramAuthToken}`,
					'_blank'
				);
			}
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	function onChange(field: keyof TChangeNotificationsSettingsSchema, value: boolean) {
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

	return isProfileLoading ? (
		Array.from({ length: 2 }).map((_, i) => <ToggleCardSkeleton key={i} />)
	) : (
		<Form {...form}>
			<form className='space-y-6'>
				<FormField
					control={form.control}
					name='siteNotifications'
					render={({ field }) => (
						<ToggleCard
							heading={t('siteNotifications.heading')}
							description={t('siteNotifications.description')}
							isDisabled={isUpdateLoading}
							value={field.value}
							onChange={(value) => onChange('siteNotifications', value)}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='telegramNotifications'
					render={({ field }) => (
						<ToggleCard
							heading={t('telegramNotifications.heading')}
							description={t('telegramNotifications.description')}
							isDisabled={isUpdateLoading}
							value={field.value ?? false}
							onChange={(value) => onChange('telegramNotifications', value)}
						/>
					)}
				/>
			</form>
		</Form>
	);
}
