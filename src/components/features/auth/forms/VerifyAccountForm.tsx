'use client';

import { useVerifyAccountMutation } from '@/graphql/generated/output';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';

export function VerifyAccountForm() {
	const t = useTranslations('auth.verify');

	const { push } = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token') ?? '';

	const [verify] = useVerifyAccountMutation({
		onCompleted() {
			toast.success(t('successMessage'));
			push('/dashboard/settings');
		},
		onError({ graphQLErrors }) {
			if (graphQLErrors) {
				graphQLErrors.map(({ message }) => {
					toast.error(message);
				});
			} else {
        toast.error(t('errorMessage'));
      }

			push('/account/create');
		},
	});

	React.useEffect(() => {
		verify({
			variables: {
				data: {
					token,
				},
			},
		});
	}, [token]);

	return (
		<AuthWrapper heading={t('heading')}>
			<div className='flex justify-center'>
				<Loader
					size={32}
					className='animate-spin'
				/>
			</div>
		</AuthWrapper>
	);
}
