import { SponsorsTable } from '@/components/features/sponsorship/subscription/table/SponsorsTable';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.sponsors.header');

	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export default function SponsorsPage() {
	return <SponsorsTable />;
}