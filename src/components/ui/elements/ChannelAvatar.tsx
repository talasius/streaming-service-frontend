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
			xl: 'size-32',
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
		<div className='relative'>
			<Avatar
				className={cn(
					avatarSizes({ size }),
					isLive && 'ring-2 ring-rose-500',
					className
				)}>
				<AvatarImage
					src={getMediaSource(channel.avatar)}
					className='object-cover'
				/>
				<AvatarFallback className={cn(size === 'xl' && 'text-4xl')}>
					{channel.username.slice(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	);
}
