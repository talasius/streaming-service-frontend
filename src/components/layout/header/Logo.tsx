import { LogoImage } from '@/components/images/LogoImage';
import { PAGES } from '@/config/pages-url.config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Logo() {
	const t = useTranslations('layout.header.logo');

	return (
		<Link
			href={PAGES.HOME}
			className='flex items-center gap-x-4 transition-opacity hover:opacity-90'>
			<LogoImage />
			<div className='hidden leading-tight lg:block'>
				<h2 className='text-lg font-semibold tracking-wider text-accent-foreground'>
					Witch
				</h2>
				<p className='text-sm text-muted-foreground'>{t('platform')}</p>
			</div>
		</Link>
	);
}
