import { CategoriesList } from '@/components/features/category/list/CategoriesList';
import { PAGES } from '@/config/pages-url.config';
import {
	FindAllCategoriesDocument,
	type FindAllCategoriesQuery,
} from '@/graphql/generated/output';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('categories');

	return {
		title: t('heading'),
		robots: {
			index: false,
			follow: false,
		},
	};
}

export async function FindAllCategories() {
	try {
		const query = FindAllCategoriesDocument.loc?.source.body;

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
				.findAllCategories as FindAllCategoriesQuery['findAllCategories'],
		};
	} catch (error) {
		console.error(error);
		throw new Error('findAllCategories: Failed to fetch data');
	}
}

export default async function CategoriesPage() {
	const t = await getTranslations('categories');
	const { categories } = await FindAllCategories();

	return (
		<CategoriesList
			heading={t('heading')}
			categories={categories}
		/>
	);
}
