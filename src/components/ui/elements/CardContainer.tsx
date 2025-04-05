import { cn } from '@/utils';
import type { LucideIcon } from 'lucide-react';
import React from 'react';
import type { IconType } from 'react-icons';
import { Card } from '../common';

interface Props {
	heading: string;
	description?: string;
	icon?: IconType | LucideIcon;
	rightContent?: React.ReactNode;
	rightContentClassName?: string;
	className?: string;
}

export function CardContainer({
	children,
	heading,
	description,
	icon: Icon,
	rightContent,
	rightContentClassName,
	className,
}: React.PropsWithChildren<Props>) {
	return (
		<Card className={cn('p-5', className)}>
			<div className='flex items-center justify-between gap-x-5'>
				<div className='flex flex-row items-center gap-x-4'>
					{Icon && (
						<div className='rounded-full bg-foreground p-2.5'>
							<Icon className='size-7 text-secondary' />
						</div>
					)}
					<div className='space-y-1'>
						<h2 className='font-semibold tracking-wide min-w-24'>{heading}</h2>
						{description && (
							<p className='max-w-4xl text-sm text-muted-foreground text-pretty'>
								{description}
							</p>
						)}
					</div>
				</div>
				{rightContent && <div className={cn(rightContentClassName)}>{rightContent}</div>}
			</div>
			{children && <div>{children}</div>}
		</Card>
	);
}
