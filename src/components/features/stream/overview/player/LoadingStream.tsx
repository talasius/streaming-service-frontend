import { Card } from '@/components/ui/common';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export function LoadingStream() {
	const t = useTranslations('stream.video');

	return (
		<Card className='relative flex h-full flex-col items-center justify-center'>
			<Loader
				size={48}
				className='animate-spin text-muted-foreground'
			/>
			<p className='mt-3 text-lg text-muted-foreground'>{t('loading')}</p>
		</Card>
	);
}
