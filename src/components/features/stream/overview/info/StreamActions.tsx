import { FollowButton } from '@/components/ui/elements/FollowButton';
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamActions({ channel }: Props) {
	const t = useTranslations('stream.actions');
	return (
		<div className='lg:inline-flex lg:space-y-0 space-x-3 space-y-4 items-center'>
			<FollowButton channel={channel} />
		</div>
	);
}
