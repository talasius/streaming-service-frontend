'use client';

import { Button } from '@/components/ui/common';
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal';
import { useDisableTotpMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

export function DisableTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor.disable');
	const { refetch } = useCurrent();
	const [disable, { loading: isDisableLoading }] = useDisableTotpMutation({
		onCompleted() {
			refetch();
			toast.success(t('successMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});
	return (
		<ConfirmModal
			heading={t('heading')}
			message={t('message')}
			onConfirm={() => disable()}>
			<Button
				variant='secondary'
				disabled={isDisableLoading}>
				{t('trigger')}
			</Button>
		</ConfirmModal>
	);
}
