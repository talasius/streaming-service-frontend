import { Card } from '@/components/ui/common';
import { PAGES } from '@/config/pages-url.config';
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';
import { getMediaSource } from '@/utils';
import { WifiOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function OfflineStream({ channel }: Props) {
	const t = useTranslations('stream.video');

	const backgroundStyle: React.CSSProperties = channel.stream.thumbnailUrl
		? {
				backgroundImage: `url(${getMediaSource(channel.stream.thumbnailUrl)})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
		  }
		: {};

	return (
		<Card
			className='flex h-full flex-col items-center justify-center'
			style={backgroundStyle}>
			{channel.stream.thumbnailUrl && (
				<div className='absolute inset-0 z-0 rounded-xl bg-black/60' />
			)}
			<WifiOff
				size={48}
				className='z-10 text-muted-foreground'
			/>
			<div className='z-10 text-center'>
				<p className='text-xl text-white mt-3'>
					{channel.displayName} {t('offline.text')}
				</p>
				<div className='inline-flex gap-1.5 text-base'>
					<p>{t('offline.linkText1')}</p>
					<Link href={PAGES.STREAMS} className='hover:text-primary transition-colors underline'>{t('offline.link')}</Link>
					<p>{t('offline.linkText2')}</p>
				</div>
			</div>
		</Card>
	);
}
