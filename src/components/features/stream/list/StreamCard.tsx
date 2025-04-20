import { ChannelAvatar, VerifiedBadge } from '@/components/ui/elements';
import { type FindRandomStreamsQuery } from '@/graphql/generated/output';
import Link from 'next/link';
import { StreamThumbnail } from './StreamThumbnail';
import { PAGES } from '@/config/pages-url.config';
import { Skeleton } from '@/components/ui/common';

interface Props {
	stream: FindRandomStreamsQuery['findRandomStreams'][0];
}

export function StreamCard({ stream }: Props) {
	return (
		<div className='size-full'>
			<article className='flex flex-col-reverse justify-end'>
				<Link
					href={`/${stream.user.username}`}
					className='order-2'>
					<StreamThumbnail
						thumbnailUrl={stream.thumbnailUrl}
						user={stream.user}
						isLive={stream.isLive}
					/>
				</Link>
				<div className='mt-4 order-1'>
					<div className='inline-flex justify-between flex-row-reverse flex-nowrap'>
						<div className='order-1 grid'>
							<h2
								title={stream.title}
								className='truncate cursor-pointer text-base font-semibold text-foreground hover:text-primary transition-colors'>
								{stream.title}
							</h2>
							<div className='inline-flex gap-x-1.5 items-center'>
								<h2 className='text-[14px] text-foreground font-light hover:text-primary transition-colors'>
									<Link href={`/${stream.user.username}`}>{stream.user.username}</Link>
								</h2>
								{stream.user.isVerified && <VerifiedBadge size='sm' />}
							</div>
							{stream.category && (
								<Link
									href={`${PAGES.CATEGORIES}/${stream.category.slug}`}
									className='text-[14px] text-foreground font-light hover:text-foreground/70 transition-colors'>
									{stream.category.title}
								</Link>
							)}
						</div>
						<div className='mr-4 order-2'>
							<Link href={`/${stream.user.username}`}>
								<ChannelAvatar
									channel={stream.user}
									isLive={stream.isLive}
								/>
							</Link>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}

export function StreamCardSkeleton() {
	return (
		<div className='size-full'>
			<Skeleton className='relative aspect-video rounded-xl' />
			<div className='flex gap-x-4 mt-4'>
				<div className='inline-flex justify-between flex-nowrap'>
					<div className='mr-4'>
						<Skeleton className='rounded-full size-9' />
					</div>
					<div className='grid gap-2'>
						<Skeleton className='h-4 w-xs rounded-md' />
						<Skeleton className='h-3 w-28 rounded-md' />
						<Skeleton className='h-3 w-32 rounded-md' />
					</div>
				</div>
			</div>
		</div>
	);
}
