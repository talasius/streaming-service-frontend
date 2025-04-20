import { CategoryOverview } from '@/components/features/category/overview/CategoryOverview';
import { PAGES } from '@/config/pages-url.config';
import {
	FindCategoryBySlugDocument,
	type FindCategoryBySlugQuery,
} from '@/graphql/generated/output';
import { getMediaSource } from '@/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { category } = await findCategoryBySlug(params);

	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images: [
				{
					url: getMediaSource(category.thumbnailUrl),
					alt: category.title,
				},
			],
		},
	};
}

async function findCategoryBySlug(params: { slug: string }) {
	try {
		const query = FindCategoryBySlugDocument.loc?.source.body;
		const variables = { slug: params.slug };

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
			category: data.data
				.findCategoryBySlug as FindCategoryBySlugQuery['findCategoryBySlug'],
		};
	} catch (error) {
		return notFound();
	}
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;

	const { category } = await findCategoryBySlug(params);

	return <CategoryOverview category={category} />;
}
