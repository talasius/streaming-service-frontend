'use client';

import { Skeleton } from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements/CardContainer';
import { useCurrent } from '@/hooks/useCurrent';
import { useTranslations } from 'next-intl';
import { DisableTotp } from './DisableTotp';
import { EnableTotp } from './EnableTotp';

export function TotpWrapper() {
	const t = useTranslations('dashboard.settings.account.twoFactor');
	const { user, isProfileLoading } = useCurrent();
	return isProfileLoading ? (
		<ChangeInfoSkeleton />
	) : (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!user?.isTotpEnabled ? <EnableTotp /> : <DisableTotp />}
				</div>
			}
		/>
	);
}

export function ChangeInfoSkeleton() {
	return (
		<div className='h-fit w-full rounded-xl bg-card p-5'>
			<div className='mb-3'>
				<Skeleton className='w-60 h-6' />
			</div>
			<div className='flex items-center gap-x-4'>
      <Skeleton className='grow w-full h-12 rounded-lg'/>
      <Skeleton className='w-20 h-10 rounded-xl'/>
			</div>
		</div>
	);
}
