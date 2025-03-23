'use client';

import { Separator } from '@/components/ui/common';
import { useFindMyFollowingQuery } from '@/graphql/generated/output';
import { useSidebar } from '@/hooks/useSidebar';
import { useTranslations } from 'next-intl';
import { ChannelItem, ChannelItemSkeleton } from './ChannelItem';
import { Heart } from 'lucide-react';
import { Hint } from '@/components/ui/elements';

export function LiveFollowingChannels() {
	const t = useTranslations('layout.sidebar.liveFollowing');
	const { isCollapsed } = useSidebar();

	const { data, loading: isLoading } = useFindMyFollowingQuery();
	const channels = data?.findMyFollowing ?? [];
	const liveChannels = channels.filter((channel) => channel.following.stream.isLive);

	if (liveChannels.length < 5) {
		liveChannels.push(
			...channels
				.filter((channel) => !channel.following.stream.isLive)
				.slice(0, 5 - liveChannels.length)
		);
	}

	if (!liveChannels.length) return null;

	if (isLoading) {
		return (
			<div>
				<Separator className='mb-3' />
				{!isCollapsed && (
					<h2 className='text-lg font-semibold text-foreground mb-2 px-2'>
						{t('heading')}
					</h2>
				)}
				{Array.from({ length: 7 }).map((_, i) => (
					<ChannelItemSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div>
			<Separator className='mb-3' />
			{!isCollapsed ? (
				<h2 className='text-lg font-semibold text-foreground mb-2 px-2'>
					{t('heading')}
				</h2>
			) : (
				<div className='flex items-center justify-center'>
          <Hint
            label={t('hintLabel')}
            side='right'
            asChild
          >
					<Heart className='mb-1' />
          </Hint>
				</div>
			)}
			{liveChannels.map((channel, i) => (
				<ChannelItem
					key={i}
					channel={channel.following}
				/>
			))}
		</div>
	);
}
