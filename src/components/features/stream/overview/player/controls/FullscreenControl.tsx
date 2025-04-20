import { Button } from '@/components/ui/common';
import { Hint } from '@/components/ui/elements';
import { type LucideIcon, Maximize, Minimize } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	isFullscreen: boolean;
	onToggle: () => void;
}

export function FullscreenControl({ isFullscreen, onToggle }: Props) {
	const t = useTranslations('stream.video.player.fullscreen');

	const Icon: LucideIcon = isFullscreen ? Minimize : Maximize;

	return (
		<div className='flex items-center justify-center gap-4'>
			<Hint
				label={isFullscreen ? t('exit') : t('enter')}
				asChild>
				<Button
					variant='ghost'
					size='icon'
					onClick={onToggle}
					className='text-white hover:bg-white/10'>
					<Icon size={24} />
				</Button>
			</Hint>
		</div>
	);
}
