import type { FindRecommendedChannelsQuery } from '@/graphql/generated/output';
import { cn } from '@/utils';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common';
import { LiveBadge } from './LiveBadge';

interface Props {
	label: string;
	asChild?: boolean;
	side?: 'top' | 'bottom' | 'left' | 'right';
	align?: 'start' | 'center' | 'end';
	type?: 'card' | 'label';
	channel?: FindRecommendedChannelsQuery['findRecommmendedChannels'][0];
	className?: string;
}

export function Hint({
	children,
	label,
	asChild,
	side,
	align,
	type = 'label',
	channel,
	className,
}: React.PropsWithChildren<Props>) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				{type === 'card' ? (
					<TooltipContent
						className={cn(
							'border border-border rounded-xl flex flex-col gap-y-1 w-fit shadow bg-white text-foreground dark:bg-card dark:shadow-black/20 dark:shadow-md',
							className
						)}
						side={side}
						sideOffset={5}
						align={align}>
						<div className='flex items-center gap-x-2'>
							<p className='text-primary text-sm tracking-wider'>
								{channel?.displayName}
							</p>
							<div className='size-[3px] shrink-0 rounded-full bg-primary' />
							<p className='text-primary text-sm tracking-wider'>
								{channel?.stream.category.title}
							</p>
						</div>
						<p className='text-pretty text-sm tracking-wide truncate font-normal max-w-3xs'>
							{channel?.stream.title}
						</p>
						<div className='flex items-center gap-x-2'>
							<LiveBadge size='sm' />
							<p className='text-gray-400/70 text-sm light:text-foreground'>Live</p>
						</div>
					</TooltipContent>
				) : (
					<TooltipContent
						className={cn(
							'border border-border rounded-xl flex flex-col gap-y-2 w-fit shadow bg-white text-foreground dark:bg-card dark:shadow-black/20 dark:shadow-md',
							className
						)}
						side={side}
						sideOffset={5}
						align={align}>
						<p className='font-semibold'>{label}</p>
					</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
}
