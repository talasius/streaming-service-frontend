import { Input } from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements';
import { CopyButton } from '@/components/ui/elements';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	value: string | null;
}

export function StreamURL({ value }: Props) {
	const t = useTranslations('dashboard.keys.url');
	return (
		<CardContainer
			heading={t('heading')}
			rightContent={
				<div className='flex w-full items-center gap-x-4'>
					<Input
						placeholder={t('placeholder')}
						value={value ?? ''}
						disabled
					/>
					<CopyButton value={value} />
				</div>
			}
      rightContentClassName='w-full ml-4'
		/>
	);
}
