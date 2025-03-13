import { VerifyAccountForm } from '@/components/features/auth/forms/VerifyAccountForm';
import { PAGES } from '@/config/pages-url.config';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function VerifyAccountPage(props: {
	searchParams: Promise<{ token: string }>;
}) {
	const searchParams = await props.searchParams;

	if (!searchParams.token) {
		return redirect(PAGES.REGISTER);
	}

	return <VerifyAccountForm />
}
