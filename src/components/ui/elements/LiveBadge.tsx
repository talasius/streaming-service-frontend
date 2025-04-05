import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props extends VariantProps<typeof liveBadgeSizes> {
	className?: string;
}

const liveBadgeSizes = cva('', {
	variants: {
		size: {
			sm: 'size-2',
			lg: 'p-0.5 px-1.5',
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});

export function LiveBadge({ size, className }: Props) {
	const t = useTranslations('components.liveBadge');

	return (
		<div
			className={cn(
				'rounded-full bg-rose-500 text-center text-[10px] font-semibold uppercase tracking-wide text-white',
				liveBadgeSizes({ size }),
				className
			)}>
			{size === 'lg' && t('text')}
		</div>
	);
}
