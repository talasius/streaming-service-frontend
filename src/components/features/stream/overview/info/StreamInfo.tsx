import { ChannelAvatar, LiveBadge, VerifiedBadge } from '@/components/ui/elements';
import { PAGES } from '@/config/pages-url.config';
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';
import { useParticipants } from '@livekit/components-react';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { StreamActions } from './StreamActions';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamInfo({ channel }: Props) {
	const t = useTranslations('stream.info');

	const participants = useParticipants();
	const participantsCount = participants.length - 1;

	return (
		<div className='flex justify-between items-start'>
			<div className='inline-flex flex-row-reverse items-center gap-x-4'>
				<div className='order-1'>
					<div className='inline-flex flex-col gap-y-0.5'>
						<div className='inline-flex items-center justify-start gap-x-1.5'>
							<h2>{channel.displayName}</h2>
							{channel.isVerified && <VerifiedBadge size='sm' />}
						</div>
						<h1 className='text-xl font-semibold'>{channel.stream.title}</h1>
						{channel.stream.isLive && channel.stream.category && (
							<Link
								href={`${PAGES.CATEGORIES}/${channel.stream.category.slug}`}
								className='text-[14px] text-primary hover:underline font-light'>
								{channel.stream.category.title}
							</Link>
						)}
					</div>
				</div>
				<div className='order-2 inline-flex justify-center relative'>
					<ChannelAvatar
						channel={channel}
						size='lg'
					/>
					{channel.stream.isLive && (
						<LiveBadge
							size='lg'
							className='absolute -bottom-2 w-9 px-0 rounded-md'
						/>
					)}
				</div>
			</div>
			<div className='inline-flex flex-col gap-y-1 items-end'>
				<StreamActions channel={channel} />
				{channel.stream.isLive ? (
					<div className='inline-flex items-center gap-x-1 text-rose-400'>
						<User size={20} />
						{participantsCount}
					</div>
				) : (
					<p className='text-muted-foreground tracking-wide'>{t('offline')}</p>
				)}
			</div>
		</div>
	);
}
