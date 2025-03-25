'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/common';
import { ChannelAvatar, VerifiedBadge } from '@/components/ui/elements';
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
	const t = useTranslations('layout.header.headerMenu.profileMenu');
	const { push } = useRouter();

	const { exit } = useAuth();
	const { user, isProfileLoading } = useCurrent();

	const [logout] = useLogoutUserMutation({
		onCompleted() {
			exit();
			toast.success(t('successMessage'));
			push(PAGES.LOGIN);
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
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
						<div className='flex items-center gap-x-1.5'>
            <h2 className='font-medium text-foreground'>{user.username}</h2>
						{user.isVerified && <VerifiedBadge />}
            </div>
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

					<DropdownMenuItem
						onClick={() => logout()}
						className='group'>
						<LogOut
							size={16}
							className='mr-2 group-hover:text-red-600 transition-colors duration-200 ease-in-out'
						/>
						<p className='group-hover:text-red-600 transition-colors duration-200 ease-in-out'>
							{t('logout')}
						</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
