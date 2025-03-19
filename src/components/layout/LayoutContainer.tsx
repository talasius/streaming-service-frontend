'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils';
import React from 'react';

export function LayoutContainer({ children }: React.PropsWithChildren<unknown>) {
	const isMobile = useMediaQuery('(max-width: 1024px)');

	const { isCollapsed, open, close } = useSidebar();

	React.useEffect(() => {
		if (isMobile) {
			if (!isCollapsed) close();
		} else {
			if (isCollapsed) open();
		}
	}, [isMobile]);

	return (
		<main
			className={cn('mt-[75px] flex-1 p-8', isCollapsed ? 'ml-16' : 'ml-16 lg:ml-64')}>
			{children}
		</main>
	);
}
