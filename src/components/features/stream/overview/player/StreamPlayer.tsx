import { useTracks } from '@livekit/components-react';
import { RemoteParticipant, Track } from 'livekit-client';
import React from 'react';
import { useEventListener } from 'usehooks-ts';
import { FullscreenControl } from './controls/FullscreenControl';
import { VolumeControl } from './controls/VolumeControl';

interface Props {
	participant: RemoteParticipant;
}

export function StreamPlayer({ participant }: Props) {
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	const [volume, setVolume] = React.useState(0);
	const [isFullscreen, setIsFullscreen] = React.useState(false);

	function onVolumeChange(value: number) {
		setVolume(+value);

		if (videoRef.current) {
			videoRef.current.muted = value === 0;
			videoRef.current.volume = +value * 0.01;
		}
	}

	function toggleMute() {
		const isMuted = volume === 0;

		setVolume(isMuted ? 50 : 0);

		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			videoRef.current.volume = isMuted ? 0.5 : 0;
		}
	}

	React.useEffect(() => {
		onVolumeChange(0);
	}, []);

	function toggleFullscreen() {
		if (isFullscreen) {
			document.exitFullscreen();
		} else if (wrapperRef.current) {
			wrapperRef.current.requestFullscreen();
		}
	}

	function handleFullscreenChange() {
		const isCurrentlyFullscreen = document.fullscreenElement !== null;

		setIsFullscreen(isCurrentlyFullscreen);
	}

	useEventListener('fullscreenchange' as keyof WindowEventMap, handleFullscreenChange);

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter((track) => track.participant.identity === participant.identity)
		.forEach((track) => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current);
			}
		});

	return (
		/*TODO: Remove bg-card testing class form div element */
		<div
			ref={wrapperRef}
			className='relative flex h-full bg-card rounded-xl overflow-hidden'>
			<video ref={videoRef} />
			<div className='absolute top-0 size-full opacity-0 hover:opacity-100 transition-opacity duration-[350ms]'>
				<div className='absolute bottom-0 flex h-16 w-full items-center justify-between px-4 bg-gradient-to-t from-black/30 to-transparent'>
					<VolumeControl
						onToggle={toggleMute}
						onChange={onVolumeChange}
						value={volume}
					/>
					<FullscreenControl
						isFullscreen={isFullscreen}
						onToggle={toggleFullscreen}
					/>
				</div>
			</div>
		</div>
	);
}
