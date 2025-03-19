import { FindProfileQuery } from '@/graphql/generated/output';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '../common';
import { cn, getMediaSource } from '@/utils';

const avatarSizes = cva('', {
	variants: {
		size: {
			sm: 'size-7',
			default: 'size-9',
			lg: 'size-14',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface Props extends VariantProps<typeof avatarSizes> {
	channel: Pick<FindProfileQuery['findProfile'], 'username' | 'avatar'>;
	isLive?: boolean;
	className?: string;
}

export function ChannelAvatar({ channel, isLive, size, className }: Props) {
	return (
		<div className={cn('relative', className)}>
			<Avatar className={cn(avatarSizes({ size }), isLive && 'ring-2 ring-rose-500')}>
				<AvatarImage
					src={getMediaSource(channel.avatar)}
					className='object-cover'
				/>
				<AvatarFallback>{channel.username.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>
		</div>
	);
}
