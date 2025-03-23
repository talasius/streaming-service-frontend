'use client';

import { Button, Skeleton } from '@/components/ui/common';
import { ChannelAvatar, Hint, LiveBadge, VerifiedBadge } from '@/components/ui/elements';
import type { FindRecommendedChannelsQuery } from '@/graphql/generated/output';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	channel: FindRecommendedChannelsQuery['findRecommmendedChannels'][0];
}

export function ChannelItem({ channel }: Props) {
	const pathname = usePathname();
	const { isCollapsed } = useSidebar();

	const isActive = pathname === `/${channel.username}`;

	return isCollapsed && channel.stream.isLive ? (
		<div>
			<Hint
				label={channel.username}
				side='right'
				type='card'
				channel={channel}
				asChild>
				<Link
					href={`/${channel.username}`}
					className='mt-3 flex size-full items-center justify-center'>
					<ChannelAvatar
						channel={channel}
						isLive={channel.stream.isLive}
						className={cn(!channel.stream.isLive && 'opacity-30')}
					/>
				</Link>
			</Hint>
		</div>
	) : isCollapsed ? (
		<Link
			href={`/${channel.username}`}
			className='mt-3 flex size-full items-center justify-center'>
			<ChannelAvatar
				channel={channel}
				isLive={channel.stream.isLive}
				className={cn(!channel.stream.isLive && 'opacity-30')}
			/>
		</Link>
	) : (
		<div>
			{channel.stream.isLive ? (
				<Hint
					label={channel.stream.title}
					side='right'
					asChild>
					<Button
						className={cn('mt-2 px-3 h-11 w-full justify-start', isActive && 'bg-accent')}
						variant='ghost'
						asChild>
						<Link
							href={`/${channel.username}`}
							className='relative flex w-full items-center'>
							<ChannelAvatar
								channel={channel}
								isLive={channel.stream.isLive}
								size='sm'
								className={cn(!channel.stream.isLive && 'opacity-30')}
							/>
							<div className='flex flex-col'>
								<div className='flex gap-x-1.5 items-center'>
									<h2
										className={cn(
											'truncate pl-1',
											!channel.stream.isLive && 'text-gray-500'
										)}>
										{channel.displayName}
									</h2>
									{channel.isVerified && <VerifiedBadge size='sm' />}
								</div>
								{channel.stream.isLive && (
									<p className='truncate pl-1 text-[12px] text-foreground font-light'>
										{channel.stream.category.title}
									</p>
								)}
							</div>
							{channel.stream.isLive && (
								<div className='absolute right-3'>
									<LiveBadge size='sm' />
								</div>
							)}
						</Link>
					</Button>
				</Hint>
			) : (
				<Button
					className={cn('mt-2 px-3 h-11 w-full justify-start', isActive && 'bg-accent')}
					variant='ghost'
					asChild>
					<Link
						href={`/${channel.username}`}
						className='relative flex w-full items-center'>
						<ChannelAvatar
							channel={channel}
							isLive={channel.stream.isLive}
							size='sm'
							className={cn(!channel.stream.isLive && 'opacity-30')}
						/>
						<div className='flex flex-col'>
							<div className='flex gap-x-1.5 items-center'>
								<h2
									className={cn(
										'truncate pl-1',
										!channel.stream.isLive && 'text-gray-500'
									)}>
									{channel.displayName}
								</h2>
								{channel.isVerified && <VerifiedBadge size='sm' />}
							</div>
							{channel.stream.isLive && (
								<p className='truncate pl-1 text-[12px] text-foreground font-light'>
									{channel.stream.category.title}
								</p>
							)}
						</div>
						{channel.stream.isLive && (
							<div className='absolute right-3'>
								<LiveBadge size='sm' />
							</div>
						)}
					</Link>
				</Button>
			)}
		</div>
	);
}

export function ChannelItemSkeleton() {
	return (
		<div className='flex items-center gap-x-2 mt-3'>
			<Skeleton className='size-9 shrink-0 rounded-full' />
			<div className='flex flex-col gap-y-1 grow'>
				<Skeleton className='size-3.5 w-full rounded-xl' />
				<Skeleton className='size-3.5 w-full rounded-xl' />
			</div>
		</div>
	);
}
