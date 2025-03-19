'use client';

import { PAGES } from '@/config/pages-url.config';
import {
	Banknote,
	DollarSign,
	KeyRound,
	Medal,
	MessageSquare,
	Settings,
	Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SidebarItem } from './SidebarItem';
import type { Route } from './types/route.interface';

export function DashboardNav() {
	const t = useTranslations('layout.sidebar.dashboardNav');
	const routes: Route[] = [
		{
			label: t('settings'),
			href: PAGES.SETTINGS,
			icon: Settings,
		},
		{
			label: t('keys'),
			href: PAGES.KEYS,
			icon: KeyRound,
		},
		{
			label: t('chatSettings'),
			href: PAGES.CHAT,
			icon: MessageSquare,
		},
		{
			label: t('followers'),
			href: PAGES.FOLLOWERS,
			icon: Users,
		},
		{
			label: t('sponsors'),
			href: PAGES.SPONSORS,
			icon: Medal,
		},
		{
			label: t('premium'),
			href: PAGES.PLANS,
			icon: DollarSign,
		},
		{
			label: t('transactions'),
			href: PAGES.TRANSACTIONS,
			icon: Banknote,
		},
	];

	return (
		<div className='space-y-2 px-2 pt-4 lg:pt-0'>
			{routes.map((route, i) => (
				<SidebarItem
					key={i}
					route={route}
				/>
			))}
		</div>
	);
}
