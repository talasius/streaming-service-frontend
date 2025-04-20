'use client';

import { Heading } from '@/components/ui/elements';
import {
	useFindAllStreamsQuery,
	type FindAllStreamsQuery,
} from '@/graphql/generated/output';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StreamCardSkeleton } from './StreamCard';
import { StreamsList } from './StreamsList';

interface Props {
	streams: FindAllStreamsQuery['findAllStreams'];
}

export function StreamsContent({ streams }: Props) {
	const t = useTranslations('streams');

	const searchParams = useSearchParams();
	const searchTerm = searchParams.get('searchTerm');

	const [streamsList, setStreamsList] = React.useState<
		FindAllStreamsQuery['findAllStreams']
	>(streams ?? []);

	const [hasMore, setHasMore] = React.useState(true);

	const { data, fetchMore } = useFindAllStreamsQuery({
		variables: {
			filters: {
				searchTerm,
				take: 12,
				skip: 0,
			},
		},
		fetchPolicy: 'network-only',
	});

	React.useEffect(() => {
		if (data?.findAllStreams) {
			setStreamsList(data.findAllStreams);
			setHasMore(data.findAllStreams.length === 12);
		}
	}, [data, searchTerm]);

	async function fetchMoreStreams() {
		if (!hasMore) return;

		setTimeout(async () => {
			const { data: newData } = await fetchMore({
				variables: {
					filters: {
						searchTerm,
						take: 12,
						skip: streamsList.length,
					},
				},
			});

			if (newData.findAllStreams.length) {
				setStreamsList((prev) => [...prev, ...newData.findAllStreams]);
			} else {
				setHasMore(false);
			}
		}, 400);
	}

	return (
		<>
			<Heading
				title={searchTerm ? `${t('searchHeading')} "${searchTerm}"` : t('heading')}
			/>
			<InfiniteScroll
				dataLength={streamsList.length}
				next={fetchMoreStreams}
				hasMore={hasMore}
				loader={
					<div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{Array.from({ length: 12 }).map((_, i) => (
							<StreamCardSkeleton key={i} />
						))}
					</div>
				}>
				<StreamsList streams={streamsList} />
			</InfiniteScroll>
		</>
	);
}
