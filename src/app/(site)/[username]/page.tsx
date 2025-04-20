import { CategoryOverview } from '@/components/features/category/overview/CategoryOverview';
import { StreamOverview } from '@/components/features/stream/overview/StreamOverview';
import { PAGES } from '@/config/pages-url.config';
import {
	FindChannelByUsernameDocument,
	type FindChannelByUsernameQuery,
} from '@/graphql/generated/output';
import { getMediaSource } from '@/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
	params: Promise<{ username: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { channel } = await findChannelByUsername(params);

	return {
		title: channel.displayName,
		description: channel.bio ?? channel.displayName,
		openGraph: {
			images: [
				{
					url: getMediaSource(channel.avatar),
					alt: channel.displayName,
				},
			],
		},
	};
}

async function findChannelByUsername(params: { username: string }) {
	try {
		const query = FindChannelByUsernameDocument.loc?.source.body;
		const variables = { username: params.username };

		const response = await fetch(PAGES.SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query, variables }),
			next: {
				revalidate: 60,
			},
		});

		const data = await response.json();

		return {
			channel: data.data
				.findChannelByUsername as FindChannelByUsernameQuery['findChannelByUsername'],
		};
	} catch (error) {
		return notFound();
	}
}

export default async function ChannelPage(props: {
	params: Promise<{ username: string }>;
}) {
	const params = await props.params;

	const { channel } = await findChannelByUsername(params);

	return <StreamOverview channel={channel} />;
}
