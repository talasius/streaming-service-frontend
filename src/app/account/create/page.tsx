import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
	className?: string;
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.register');

	return {
		title: t('heading'),
	};
}

export default function Page({ className }: Props) {
	return <CreateAccountForm />;
}
