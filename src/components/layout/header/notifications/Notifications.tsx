import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/common';
import { useGetUnreadNotificationsCountQuery } from '@/graphql/generated/output';
import { Bell, Loader } from 'lucide-react';
import { NotificationsList } from './NotificationsList';

export function Notifications() {
	const { data, loading: isLoading } = useGetUnreadNotificationsCountQuery();

	const count = data?.getUnreadNotificationsCount || 0;
	const displayCount = count > 10 ? '+9' : count;

	if (isLoading)
		return (
			<Loader
				size={24}
				className='animate-spin'
			/>
		);

	return (
		<Popover>
			<PopoverTrigger className='cursor-pointer'>
				{count !== 0 && (
					<div className='absolute right-[75px] top-5 rounded-full bg-primary px-1.5 text-xs font-semibold text-white'>
						{displayCount}
					</div>
				)}
				<Bell
					size={20}
					className='text-foreground'
				/>
			</PopoverTrigger>
			<PopoverContent
				align='end'
				className='max-h-[500px] w-80 overflow-y-auto'>
				<NotificationsList />
			</PopoverContent>
		</Popover>
	);
}
