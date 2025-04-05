import { Button, Input } from '@/components/ui/common';
import { CardContainer, CopyButton } from '@/components/ui/elements';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
	value: string | null;
}

export function StreamKey({ value }: Props) {
	const t = useTranslations('dashboard.keys.key');
	const [isVisible, setIsVisible] = React.useState(false);

	const Icon: LucideIcon = isVisible ? Eye : EyeOff;
	return (
		<CardContainer
			heading={t('heading')}
			rightContent={
				<div className='flex w-full items-center gap-x-4'>
					<Input
						placeholder={t('placeholder')}
						type={isVisible ? 'text' : 'password'}
						value={value ?? ''}
						disabled
					/>
					<Button
						variant='ghost'
						size='icon'
						className='size-9 rounded-full'
						onClick={() => setIsVisible(!isVisible)}
						disabled={!value}>
						<Icon className='size-5' />
					</Button>
					<CopyButton value={value} />
				</div>
			}
			rightContentClassName='w-full ml-4'
		/>
	);
}
