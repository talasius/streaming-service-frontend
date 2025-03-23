'use client';

import { Button } from '@/components/ui/common';
import { Hint } from '@/components/ui/elements';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Route } from './types/route.interface';

interface Props {
	route: Route;
}

export function SidebarItem({ route }: Props) {
	const pathname = usePathname();
	const { isCollapsed } = useSidebar();

	const isActive = pathname === route.href;

	return isCollapsed ? (
		<Hint
			label={route.label}
			side='right'
			asChild>
			<Button
				className={cn('size-11 justify-center hover:text-primary transition-colors duration-200', isActive && 'bg-accent', !isCollapsed && 'h-11 w-full')}
				variant='ghost'
				asChild>
				<Link href={route.href}>
					<route.icon className='mr-0 size-5' />
				</Link>
			</Button>
		</Hint>
	) : (
		<Button
			className={cn('h-11 w-full justify-start group', isActive && 'bg-accent')}
			variant='ghost'
			asChild>
			<Link
				href={route.href}
				className='flex items-center gap-x-4'>
				<route.icon className='mr-0 size-5 group-hover:text-primary transition-colors duration-200' />
				{route.label}
			</Link>
		</Button>
	);
}
