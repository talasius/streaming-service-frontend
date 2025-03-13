import { LoginForm } from '@/components/features/auth/forms/LoginForm';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
	className?: string;
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.login');

	return {
		title: t('heading'),
	};
}

export default function LoginPage({ className }: Props) {
	return <LoginForm />;
}
