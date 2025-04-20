import { PAGES } from '@/config/pages-url.config';
import {
	useFindMyFollowingsQuery,
	useFollowChannelMutation,
	useUnfollowChannelMutation,
	type FindChannelByUsernameQuery,
} from '@/graphql/generated/output';
import { useAuth } from '@/hooks/useAuth';
import { useCurrent } from '@/hooks/useCurrent';
import { cn } from '@/utils';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHeartCrack } from 'react-icons/fa6';
import { Button } from '../common';
import { Hint } from './Hint';
import { ConfirmModal } from './ConfirmModal';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
	className?: string;
}

export function FollowButton({ channel, className }: Props) {
	const t = useTranslations('stream.actions.follow');
	const { push } = useRouter();
	const [isHovered, setIsHovered] = React.useState(false);

	const { isAuthenticated } = useAuth();
	const { user, isProfileLoading } = useCurrent();

	const {
		data,
		loading: isFollowingsLoading,
		refetch,
	} = useFindMyFollowingsQuery({
		skip: !isAuthenticated,
	});

	const followings = data?.findMyFollowing;

	const [follow, { loading: isFollowLoading }] = useFollowChannelMutation({
		onCompleted() {
			refetch();
		},
		onError(error) {
			console.error(error);
		},
	});
	const [unfollow, { loading: isUnfollowLoading }] = useUnfollowChannelMutation({
		onCompleted() {
			refetch();
		},
		onError(error) {
			console.error(error);
		},
	});

	const channelOwner = user?.id === channel.id;
	const existingFollow = followings?.some(
		(following) => following.followingId === channel.id
	);

	if (channelOwner || isProfileLoading) return null;

	return existingFollow ? (
			<ConfirmModal
				heading={`${t('unfollowButton')} ${channel.displayName}?`}
				message={t('confirmUnfollowMessage')}
				onConfirm={() => unfollow({ variables: { channelId: channel.id } })}
				hasHint
				hintText={t('unfollowButton')}>
				<Button
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					disabled={isFollowingsLoading || isUnfollowLoading}
					variant='secondary'
					className={cn(
						'px-2 w-10 h-7 rounded-lg hover:bg-rose-400 group transition-colors duration-300',
						className
					)}>
					{isHovered ? (
						<FaHeartCrack className='size-5' />
					) : (
						<Heart className='size-4 **:fill-white' />
					)}
				</Button>
			</ConfirmModal>
	) : (
		<Button
			onClick={() =>
				isAuthenticated
					? follow({ variables: { channelId: channel.id } })
					: push(PAGES.LOGIN)
			}
			disabled={isFollowingsLoading || isFollowLoading}
			className={cn('px-2 w-24 h-7 rounded-lg group', className)}>
			<Heart className='size-4 group-hover:scale-125 group-hover:fill-white transition-all' />
			{t('followButton')}
		</Button>
	);
}
