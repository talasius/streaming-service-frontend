'use client';

import { Button } from '@/components/ui/common';
import { PAGES } from '@/config/pages-url.config';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ProfileMenu } from './ProfileMenu';

export function HeaderMenu() {
	const t = useTranslations('layout.header.headerMenu');
	const { isAuthenticated } = useAuth();

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			{isAuthenticated ? (
				<ProfileMenu />
			) : (
				<>
					<Link href={PAGES.LOGIN}>
						<Button variant='secondary'>{t('login')}</Button>
					</Link>
					<Link href={PAGES.REGISTER}>
						<Button>{t('register')}</Button>
					</Link>
				</>
			)}
		</div>
	);
}
