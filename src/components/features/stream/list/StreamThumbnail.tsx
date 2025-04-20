'use client';

import { Card } from '@/components/ui/common';
import { ChannelAvatar, LiveBadge } from '@/components/ui/elements';
import { type FindProfileQuery } from '@/graphql/generated/output';
import { cn, getMediaSource } from '@/utils';
import { generateRandomColor } from '@/utils/color';
import Image from 'next/image';
import React from 'react';

interface Props {
	thumbnailUrl: string | null | undefined;
	user: Pick<FindProfileQuery['findProfile'], 'username' | 'avatar' | 'isVerified'>;
	isLive?: boolean;
}

export function StreamThumbnail({ thumbnailUrl, user, isLive = false }: Props) {
	const [randomColor, setRandomColor] = React.useState('');
	const [imageError, setImageError] = React.useState(false);

	React.useEffect(() => {
		setRandomColor(generateRandomColor());
	}, []);

	function handleImageError() {
		setImageError(true);
		console.warn('Cannot find requested stream image!');
	}

	return (
		<div className='relative aspect-video cursor-pointer rounded-xl group'>
			<div
				className='absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
				style={{ backgroundColor: randomColor }}
			/>
			{thumbnailUrl && !imageError ? (
				<Image
					src={getMediaSource(thumbnailUrl)}
					alt={user.username}
					fill
					onError={() => handleImageError()}
					className='rounded-xl object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'
				/>
			) : (
				<Card className='flex flex-col size-full items-center justify-center gap-y-4 rounded-xl transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
					{!imageError ? (
						<ChannelAvatar
							channel={user}
							isLive={isLive}
						/>
					) : (
						<div
							className={cn(
								'relative flex size-12 shrink-0 overflow-hidden rounded-full',
								isLive && 'ring-2 ring-rose-500'
							)}>
							<div className='bg-muted flex size-full items-center justify-center rounded-full text-xl'>
								{user.username.slice(0, 2).toUpperCase()}
							</div>
						</div>
					)}
				</Card>
			)}
			{isLive && (
				<div className='absolute right-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
					<LiveBadge size='lg' />
				</div>
			)}
		</div>
	);
}
