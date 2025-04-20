import { CategoriesList } from '@/components/features/category/list/CategoriesList';
import { StreamsList } from '@/components/features/stream/list/StreamsList';
import { PAGES } from '@/config/pages-url.config';
import {
	FindRandomCategoriesDocument,
	type FindRandomCategoriesQuery,
	FindRandomStreamsDocument,
	type FindRandomStreamsQuery,
} from '@/graphql/generated/output';
import { getTranslations } from 'next-intl/server';

async function findRandomStreams() {
	try {
		const query = FindRandomStreamsDocument.loc?.source.body;

		const response = await fetch(PAGES.SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
			next: {
				revalidate: 60,
			},
		});

		const data = await response.json();

		return {
			streams: data.data.findRandomStreams as FindRandomStreamsQuery['findRandomStreams'],
		};
	} catch (error) {
		console.error(error);
		throw new Error('findRandomStreams: Failed to fetch data');
	}
}

export async function FindRandomCategories() {
	try {
		const query = FindRandomCategoriesDocument.loc?.source.body;

		const response = await fetch(PAGES.SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
			next: {
				revalidate: 60,
			},
		});

		const data = await response.json();

		return {
			categories: data.data
				.findRandomCategories as FindRandomCategoriesQuery['findRandomCategories'],
		};
	} catch (error) {
		console.error(error);
		throw new Error('findRandomCategories: Failed to fetch data');
	}
}

export default async function HomePage() {
	const t = await getTranslations('home');
	const { streams } = await findRandomStreams();
	const { categories } = await FindRandomCategories();

	return (
		<div className='space-y-10'>
			<StreamsList
				heading={t('streamsHeading')}
				titleLink={t('streamsHeadingLink')}
				titleLinkHref={PAGES.STREAMS}
				streams={streams}
			/>
			<CategoriesList
				heading={t('categoriesHeading')}
				titleLink={t('categoriesHeadingLink')}
				titleLinkHref={PAGES.CATEGORIES}
				categories={categories}
			/>
		</div>
	);
}
