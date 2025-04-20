'use client';

import { Card } from '@/components/ui/common';
import { Heading, Hint } from '@/components/ui/elements';
import { FindCategoryBySlugQuery } from '@/graphql/generated/output';
import { getMediaSource } from '@/utils';
import { ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { StreamsList } from '../../stream/list/StreamsList';

interface Props {
	category: FindCategoryBySlugQuery['findCategoryBySlug'];
}

export function CategoryOverview({ category }: Props) {
	const t = useTranslations('categories.overview');
	const [imageError, setImageError] = React.useState(false);

	function handleImageError() {
		setImageError(true);
		console.warn('Cannot find requested category image!');
	}

	return (
		<div className='space-y-8 lg:px-10'>
			<div className='lg:flex lg:flex-row-reverse gap-x-6 lg:space-y-6 lg:items-end'>
				<Heading
					title={category.title}
					description={category.description ?? ''}
					size='xl'
				/>
				{category.thumbnailUrl && !imageError ? (
					<Image
						src={getMediaSource(category.thumbnailUrl)}
						alt={category.title}
						width={192}
						height={256}
						title={category.title}
						onError={() => handleImageError()}
						className='rounded-xl object-cover shrink-0'
					/>
				) : (
					<Card className='flex w-48 h-64 items-center justify-center transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
						<Hint
							label={category.title}
							side='right'>
							<ScrollText className='cursor-pointer size-10' />
						</Hint>
					</Card>
				)}
			</div>
			<StreamsList
				heading={t('heading')}
				streams={category.streams.sort((a, b) => (b.isLive ? 1 : 0) - (a.isLive ? 1 : 0))}
			/>
		</div>
	);
}
