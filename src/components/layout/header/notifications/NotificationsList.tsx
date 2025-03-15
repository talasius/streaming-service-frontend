import { Separator } from '@/components/ui/common';
import {
	useGetUnreadNotificationsCountQuery,
	useGetUserNotificationsQuery,
} from '@/graphql/generated/output';
import { getNotificationIcon } from '@/utils/get-notification-icon';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import parse from 'html-react-parser';

export function NotificationsList() {
	const t = useTranslations('layout.headerMenu.profileMenu.notifications');

	const { refetch } = useGetUnreadNotificationsCountQuery();

	const { data, loading: isLoading } = useGetUserNotificationsQuery({
		onCompleted() {
			refetch();
		},
	});

	const notifications = data?.getUserNotifications ?? [];

	return (
		<>
			<h2 className='text-center text-lg font-medium'>{t('heading')}</h2>
			<Separator className='my-3' />
			{isLoading ? (
				<div className='flex items-center justify-center gap-x-2 text-sm text-foreground'>
					<Loader
						size={20}
						className='animate-spin'
					/>
					{t('loading')}
				</div>
			) : notifications ? (
				notifications.map((notification, i) => {
					const Icon = getNotificationIcon(notification.type);

					return (
						<Fragment key={i}>
							<div className='flex items-center gap-x-3 text-sm'>
								<div className='rounded-full bg-foreground p-2'>
									<Icon className='size-6 text-secondary' />
								</div>
								<div>{parse(notification.message)}</div>
							</div>
							{i < notifications.length - 1 && <Separator className='my-3' />}
						</Fragment>
					);
				})
			) : (
				<div className='text-center text-muted-foreground'>{t('empty')}</div>
			)}
		</>
	);
}
