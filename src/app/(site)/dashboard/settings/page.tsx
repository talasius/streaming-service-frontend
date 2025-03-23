import { UserSettings } from '@/components/features/user/UserSettings';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.settings.header');

	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default function SettingsPage() {
	return <UserSettings />;
}
