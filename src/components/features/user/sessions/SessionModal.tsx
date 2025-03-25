import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common';
import type { FindSessionsByUserQuery } from '@/graphql/generated/output';
import { formatDate } from '@/utils/format-date';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	session: FindSessionsByUserQuery['findSessionsByUser'][0];
}

export function SessionModal({ children, session }: React.PropsWithChildren<Props>) {
	const t = useTranslations('dashboard.settings.sessions.sessionModal');
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
				<div className='space-y-3'>
					<div className='flex items-center'>
						<span className='font-medium'>{t('device')}</span>
						<span className='ml-2 text-muted-foreground'>
							{session.metadata.device.browser}, {session.metadata.device.os}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('location')}</span>
						<span className='ml-2 text-muted-foreground'>
							{session.metadata.location.country}, {session.metadata.location.city}
						</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('ipAdress')}</span>
						<span className='ml-2 text-muted-foreground'>{session.metadata.ip}</span>
					</div>
					<div className='flex items-center'>
						<span className='font-medium'>{t('createdAt')}</span>
						<span className='ml-2 text-muted-foreground'>
							{formatDate(session.createdAt, true)}
						</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
