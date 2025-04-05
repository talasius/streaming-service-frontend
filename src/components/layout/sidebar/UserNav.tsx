import { PAGES } from '@/config/pages-url.config';
import { Folder, Home, Radio } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Route } from './types/route.interface';
import { SidebarItem } from './SidebarItem';
import { RecommendedChannels } from './RecommendedChannels';
import { LiveFollowingChannels } from './LiveFollowingChannels';

export function UserNav() {
	const t = useTranslations('layout.sidebar.userNav');
	const routes: Route[] = [
		{
			label: t('home'),
			href: PAGES.HOME,
			icon: Home,
		},
		{
			label: t('categories'),
			href: PAGES.CATEGORIES,
			icon: Folder,
		},
		{
			label: t('streams'),
			href: PAGES.STREAMS,
			icon: Radio,
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
      <LiveFollowingChannels />
			<RecommendedChannels />
		</div>
	);
}
