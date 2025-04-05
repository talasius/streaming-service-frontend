'use client';

import { Button } from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements';
import { ConfirmModal } from '@/components/ui/elements';
import { PAGES } from '@/config/pages-url.config';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

export function DeactivateCard() {
	const t = useTranslations('dashboard.settings.account.deactivation');
	const { replace } = useRouter();

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='flex items-center gap-x-4'>
					<ConfirmModal
						heading={t('confirmModal.heading')}
						message={t('confirmModal.message')}
						onConfirm={() => replace(PAGES.DEACTIVATE)}>
						<Button>{t('deactivateButton')}</Button>
					</ConfirmModal>
				</div>
			}
		/>
	);
}
