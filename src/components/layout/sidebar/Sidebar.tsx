'use client';

import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils';
import { SidebarHeader } from './SidebarHeader';
import { usePathname } from 'next/navigation';
import { PAGES } from '@/config/pages-url.config';
import { DashboardNav } from './DashboardNav';
import { UserNav } from './UserNav';

export function Sidebar() {
	const { isCollapsed } = useSidebar();

	const pathname = usePathname();
	const isDashboardPage = pathname.includes(PAGES.DASHBOARD);

	return (
		<aside
			className={cn(
				'fixed left-0 z-50 mt-[75px] flex h-full flex-col items-center pb-10 bg-card transition-all duration-150 ease-in-out overflow-y-scroll',
				isCollapsed ? 'w-16' : 'w-64'
			)}>
			<SidebarHeader />
			{isDashboardPage ? <DashboardNav /> : <UserNav />}
		</aside>
	);
}
