import { Button, Slider } from '@/components/ui/common';
import { Hint } from '@/components/ui/elements';
import { type LucideIcon, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
	onToggle: () => void;
	onChange: (value: number) => void;
	value: number;
}

export function VolumeControl({ value, onChange, onToggle }: Props) {
	const t = useTranslations('stream.video.player');

	const isMuted = value === 0;
	const isAboutHalf = value > 50;

	let Icon: LucideIcon = Volume1;

	if (isMuted) {
		Icon = VolumeX;
	} else if (isAboutHalf) {
		Icon = Volume2;
	}

	function handleChange(value: number[]) {
		onChange(value[0]);
	}

	return (
		<div className='flex items-center gap-2 group'>
			<Hint label={t('volume')} asChild>
				<Button
					variant='ghost'
					size='icon'
					onClick={onToggle}
					className='text-white hover:bg-white/10'>
					<Icon size={24} />
				</Button>
			</Hint>
			<Slider
				className='w-32 cursor-pointer hidden group-hover:flex'
				onValueChange={handleChange}
				value={[value]}
				max={100}
				step={1}
				role='slider'
			/>
		</div>
	);
}
