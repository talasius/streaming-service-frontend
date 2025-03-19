import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('layout.sidebar.dashboardNav');

	return {
		title: t('settings'),
	};
}

export default function SettingsPage() {
	return <div>Settings</div>;
}
