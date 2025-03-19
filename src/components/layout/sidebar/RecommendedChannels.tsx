'use client';

import { Separator } from '@/components/ui/common';
import { useFindRecommendedChannelsQuery } from '@/graphql/generated/output';
import { useSidebar } from '@/hooks/useSidebar';
import { Video } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChannelItem } from './ChannelItem';

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
					<Video className='mb-1' />
				</div>
			)}
			{isLoading ? (
				<div>Loading....</div>
			) : (
				channels.map((channel, i) => (
					<ChannelItem
						key={i}
						channel={channel}
					/>
				))
			)}
		</div>
	);
}
