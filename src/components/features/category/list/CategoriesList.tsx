import { Heading } from '@/components/ui/elements';
import { EmptyState } from '@/components/ui/elements/EmptyState';
import type { FindRandomCategoriesQuery } from '@/graphql/generated/output';
import type { TypeHeadingLink } from '@/types/types';
import { CategoryCard } from './CategoryCard';

interface ComponentProps {
	heading?: string;
	categories: FindRandomCategoriesQuery['findRandomCategories'];
}

type Props = ComponentProps & TypeHeadingLink;

export function CategoriesList({ heading, titleLink, titleLinkHref, categories }: Props) {
	return categories.length ? (
		<>
			{heading && (
				<Heading
					title={heading}
					titleLink={titleLink}
					titleLinkHref={titleLinkHref}
				/>
			)}
			<div className='mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
				{categories.map((category, i) => (
					<CategoryCard
						key={i}
						category={category}
					/>
				))}
			</div>
		</>
	) : (
		<EmptyState />
	);
}
