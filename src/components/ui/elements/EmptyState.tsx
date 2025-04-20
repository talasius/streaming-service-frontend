import { cn } from '@/utils';
import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	className?: string;
}

export function EmptyState({ className }: Props) {
	const t = useTranslations('components.emptyState');
	return (
		<div
			className={cn(
				'flex h-[75vh] w-full flex-col items-center justify-center',
				className
			)}>
			<SearchX className='size-20 text-muted-foreground' />
			<h1 className='mt-6 text-2xl font-semibold'>{t('heading')}</h1>
			<p className='mt-3 w-full text-center text-muted-foreground lg:w-[60%]'>
				{t('message')}
			</p>
		</div>
	);
}
