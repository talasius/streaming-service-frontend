'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/common';
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar';
import { PAGES } from '@/config/pages-url.config';
import { useLogoutUserMutation } from '@/graphql/generated/output';
import { useAuth } from '@/hooks/useAuth';
import { useCurrent } from '@/hooks/useCurrent';
import { LayoutDashboard, Loader, LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Notifications } from './notifications/Notifications';

export function ProfileMenu() {
	const t = useTranslations('layout.headerMenu.profileMenu');
	const { push } = useRouter();

	const { exit } = useAuth();
	const { user, isProfileLoading } = useCurrent();

	const [logout] = useLogoutUserMutation({
		onCompleted() {
			exit();
			toast.success(t('successMessage'));
			push(PAGES.LOGIN);
		},
		onError({ graphQLErrors }) {
			if (graphQLErrors) {
				graphQLErrors.map(({ message }) => toast.error(message));
			} else {
				toast.error(t('errorMessage'));
			}
		},
	});

	return isProfileLoading || !user ? (
		<Loader
			size={24}
			className='animate-spin text-muted-foreground'
		/>
	) : (
		<>
    <Notifications />
    <DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer'>
				<ChannelAvatar channel={user} />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-[230px]'>
				<div className='flex items-center gap-x-3 p-2'>
					<ChannelAvatar channel={user} />
					<h2 className='font-medium text-foreground'>{user.username}</h2>
				</div>
				<DropdownMenuSeparator />

				<Link href={`/${user.username}`}>
					<DropdownMenuItem>
						<User
							size={16}
							className='mr-2'
						/>
						{t('channel')}
					</DropdownMenuItem>
				</Link>

				<Link href={PAGES.SETTINGS}>
					<DropdownMenuItem>
						<LayoutDashboard
							size={16}
							className='mr-2'
						/>
						{t('dashboard')}
					</DropdownMenuItem>
				</Link>

				<DropdownMenuItem onClick={() => logout()}>
					<LogOut
						size={16}
						className='mr-2'
					/>
					{t('logout')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
    </>
	);
}
