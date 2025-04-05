import { Check, Copy, type LucideIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../common';
import { cn } from '@/utils';

interface Props {
	value: string | null;
	className?: string;
}

export function CopyButton({ value, className }: Props) {
	const [isCopied, setisCopied] = React.useState<boolean>(false);

	function onCopy() {
		if (!value) return;

		setisCopied(true);
		navigator.clipboard.writeText(value);
		setTimeout(() => {
			setisCopied(false);
		}, 2000);
	}

	const Icon: LucideIcon = isCopied ? Check : Copy;

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => onCopy()}
			disabled={!value || isCopied}
			className={cn(className)}>
			<Icon className='size-5' /> 
		</Button>
	);
}