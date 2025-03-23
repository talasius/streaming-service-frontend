'use client';

import { PAGES } from '@/config/pages-url.config';
import { useVerifyAccountMutation } from '@/graphql/generated/output';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';
import { useAuth } from '@/hooks/useAuth';

export function VerifyAccountForm() {
	const t = useTranslations('auth.verify');

	const { auth } = useAuth();
	const { push } = useRouter();

	const searchParams = useSearchParams();

	const token = searchParams.get('token') ?? '';

	const [verify] = useVerifyAccountMutation({
		onCompleted() {
			auth();

			toast.success(t('successMessage'));
			push(PAGES.SETTINGS);
		},
		onError({graphQLErrors: [{message}]}) {
      toast.error(message ?? t('errorMessage'))
      push(PAGES.REGISTER)
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
