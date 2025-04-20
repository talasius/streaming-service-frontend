'use client';

import { Card } from '@/components/ui/common';
import { Hint } from '@/components/ui/elements';
import { PAGES } from '@/config/pages-url.config';
import type { FindRandomCategoriesQuery } from '@/graphql/generated/output';
import { useSidebar } from '@/hooks/useSidebar';
import { cn, getMediaSource } from '@/utils';
import { generateRandomColor } from '@/utils/color';
import { ScrollText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	category: FindRandomCategoriesQuery['findRandomCategories'][0];
}

export function CategoryCard({ category }: Props) {
	const { isCollapsed } = useSidebar();
	const [randomColor, setRandomColor] = React.useState('');
	const [imageError, setImageError] = React.useState(false);

	React.useEffect(() => {
		setRandomColor(generateRandomColor());
	}, []);

	function handleImageError() {
		setImageError(true);
		console.warn('Cannot find requested category image!');
	}

	return (
		<article>
			<Link
				href={`${PAGES.CATEGORIES}/${category.slug}`}
				className='size-full space-y-3'
				title={category.title}>
				<div
					className={cn(
						'group relative cursor-pointer rounded-xl',
						isCollapsed ? 'h-60' : 'h-52'
					)}>
					<div
						className='absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100'
						style={{
							backgroundColor: randomColor,
						}}
					/>
					{category.thumbnailUrl && !imageError ? (
						<Image
							src={getMediaSource(category.thumbnailUrl)}
							alt={category.title}
							fill
							onError={() => handleImageError()}
							className='rounded-xl object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'
						/>
					) : (
						<Card className='flex size-full items-center justify-center transition-transform group-hover:-translate-y-2 group-hover:translate-x-2'>
							<Hint
								label={category.title}
								side='right'>
								<ScrollText className='cursor-pointer' />
							</Hint>
						</Card>
					)}
				</div>
				<div>
					<h2 className='truncate text-base font-semibold text-foreground hover:text-primary'>
						{category.title}
					</h2>
				</div>
			</Link>
		</article>
	);
}
