'use client';

import { PAGES } from '@/config/pages-url.config';
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';
import { useStreamToken } from '@/hooks/useStreamToken';
import { LiveKitRoom } from '@livekit/components-react';
import { StreamVideo, StreamVideoSkeleton } from './player/StreamVideo';
import { StreamInfo } from './info/StreamInfo';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamOverview({ channel }: Props) {
	const { token, name, identity } = useStreamToken(channel.id);

	if (!token || !name || !identity) {
		return <StreamOverviewSkeleton />;
	}

	return (
		<LiveKitRoom
			token={token}
			serverUrl={PAGES.LIVEKIT_URL}
			className='mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-7'>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideo channel={channel} />
				<StreamInfo channel={channel} />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				Chat
			</div>
		</LiveKitRoom>
	);
}

export function StreamOverviewSkeleton() {
	return (
		<div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-7'>
			<div className='order-1 col-span-1 flex flex-col lg:col-span-5'>
				<StreamVideoSkeleton />
			</div>
			<div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
				Chat
			</div>
		</div>
	);
}
