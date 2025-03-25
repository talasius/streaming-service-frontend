'use client';

import { Button } from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements/CardContainer';
import {
	useFindSessionsByUserQuery,
	useRemoveSessionMutation,
	type FindSessionsByUserQuery,
} from '@/graphql/generated/output';
import { getBrowserIcon } from '@/utils/get-browser-icon';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { SessionModal } from './SessionModal';
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal';
import { Trash2 } from 'lucide-react';

interface Props {
	session: FindSessionsByUserQuery['findSessionsByUser'][0];
	isCurrent?: boolean;
}

export function SessionItem({ session, isCurrent }: Props) {
	const t = useTranslations('dashboard.settings.sessions.sessionsItem');

	const { refetch } = useFindSessionsByUserQuery();

	const [remove, { loading: isRemoveLoading }] = useRemoveSessionMutation({
		onCompleted() {
			refetch();
			toast.success(t('successMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	if (!session || !session.metadata) return null;

	const icon = getBrowserIcon(session.metadata.device.browser);

	return (
		<CardContainer
			heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
			description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
			icon={icon}
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!isCurrent && (
						<ConfirmModal
							heading={t('confirmModal.heading')}
							message={t('confirmModal.message')}
							onConfirm={() => remove({ variables: { id: session.id } })}>
							<Button
								variant='ghost'
								size='icon'
								disabled={isRemoveLoading}
								className='hover:text-rose-600'>
								<Trash2 size={20} />
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>{t('detailsButton')}</Button>
					</SessionModal>
				</div>
			}
		/>
	);
}
