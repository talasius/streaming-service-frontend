import { Skeleton } from '@/components/ui/common';
import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { LoadingStream } from './LoadingStream';
import { OfflineStream } from './OfflineStream';
import { StreamPlayer } from './StreamPlayer';

interface Props {
	channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamVideo({ channel }: Props) {
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(channel.id);

	const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
		(track) => track.participant.identity === channel.id
	);

	let content: React.JSX.Element;

	if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineStream channel={channel} />;
	} else if (!participant || !tracks.length) {
    content = <LoadingStream />;
	} else {
		content = <StreamPlayer participant={participant} />;
	}

	return <div className='relative mb-6 aspect-video rounded-xl'>{content}</div>;
}

export function StreamVideoSkeleton() {
	return (
		<div className='mb-6 aspect-video relative'>
			<Skeleton className='size-full rounded-xl' />
			<div className='absolute bottom-4 w-full inline-flex items-center justify-between px-4'>
				<div className='inline-flex items-center gap-2'>
					<Skeleton className='size-8 rounded-xl' />
					<Skeleton className='h-3 w-32 rounded-md' />
				</div>
				<Skeleton className='right-0 size-8 rounded-xl' />
			</div>
		</div>
	);
}
