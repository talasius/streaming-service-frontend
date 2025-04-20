import { Heading } from '@/components/ui/elements';
import { type FindRandomStreamsQuery } from '@/graphql/generated/output';
import type { TypeHeadingLink } from '@/types/types';
import { StreamCard } from './StreamCard';
import { EmptyState } from '@/components/ui/elements/EmptyState';

interface ComponentProps {
	heading?: string;
	streams: FindRandomStreamsQuery['findRandomStreams'];
}

type Props = ComponentProps & TypeHeadingLink;

export function StreamsList({ heading, titleLink, titleLinkHref, streams }: Props) {
	return streams.length ? (
		<>
			{heading && (
				<Heading
					title={heading}
					titleLink={titleLink}
					titleLinkHref={titleLinkHref}
				/>
			)}
			<div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{streams
					
					.map((stream, i) => (
						<StreamCard
							stream={stream}
							key={i}
						/>
					))}
			</div>
		</>
	) : (
		<EmptyState />
	);
}
