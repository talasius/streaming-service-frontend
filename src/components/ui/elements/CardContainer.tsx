import React from 'react';
import { Card } from '../common';
import { cn } from '@/utils';

interface Props {
	heading: string;
	description: string;
	rightContent?: React.ReactNode;
	className?: string;
}

export function CardContainer({
	children,
	heading,
	description,
	rightContent,
	className,
}: React.PropsWithChildren<Props>) {
	return (
		<Card className={cn('p-5', className)}>
			<div className='flex items-center justify-between gap-x-1'>
				<div className='space-y-1'>
					<h2 className='font-semibold tracking-wide'>{heading}</h2>
					<p className='max-w-4xl text-sm text-muted-foreground'>{description}</p>
				</div>
				{rightContent && <div>{rightContent}</div>}
			</div>
			{children && <div className='mt-4'>{children}</div>}
		</Card>
	);
}
