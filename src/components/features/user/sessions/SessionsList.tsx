'use client';

import { Heading } from '@/components/ui/elements';
import { ToggleCardSkeleton } from '@/components/ui/elements';
import {
	useFindCurrentSessionQuery,
	useFindSessionsByUserQuery,
} from '@/graphql/generated/output';
import { useTranslations } from 'next-intl';
import { SessionItem } from './SessionItem';

export function SessionsList() {
	const t = useTranslations('dashboard.settings.sessions');

	const { data: sessionData, loading: isCurrenSessionLoading } =
		useFindCurrentSessionQuery();
	const currentSession = sessionData?.findCurrentSession!;

	const { data: sessionsData, loading: isSessionsDataLoading } =
		useFindSessionsByUserQuery();
	const sessions = sessionsData?.findSessionsByUser ?? [];

	return (
		<div className='space-y-6'>
			<Heading
				title={t('info.current')}
				size='sm'
			/>
			{isCurrenSessionLoading ? (
				<ToggleCardSkeleton />
			) : (
				<SessionItem
					session={currentSession}
					isCurrent
				/>
			)}
			<Heading
				title={t('info.active')}
				size='sm'
			/>
			{isSessionsDataLoading ? (
				Array.from({ length: 3 }).map((_, i) => <ToggleCardSkeleton key={i} />)
			) : sessions.length ? (
				sessions.map((session, i) => (
					<SessionItem
						key={i}
						session={session}
					/>
				))
			) : (
				<div className='text-muted-foreground'>{t('info.notFound')}</div>
			)}
		</div>
	);
}
