'use client';

import { Separator } from '@/components/ui/common';
import { useFindRecommendedChannelsQuery } from '@/graphql/generated/output';
import { useSidebar } from '@/hooks/useSidebar';
import { Video } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChannelItemSkeleton, ChannelItem } from './ChannelItem';
import { Hint } from '@/components/ui/elements';

export function RecommendedChannels() {
	const t = useTranslations('layout.sidebar.recommended');
	const { isCollapsed } = useSidebar();

	const { data, loading: isLoading } = useFindRecommendedChannelsQuery();
	const channels = data?.findRecommmendedChannels ?? [];

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
						asChild>
						<Video className='mb-1' />
					</Hint>
				</div>
			)}
			{isLoading
				? Array.from({ length: 7 }).map((_, i) => <ChannelItemSkeleton key={i} />)
				: channels.map((channel, i) => (
						<ChannelItem
							key={i}
							channel={channel}
						/>
				  ))}
		</div>
	);
}
