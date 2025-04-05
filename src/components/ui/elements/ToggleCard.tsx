import React from 'react';
import { CardContainer } from './CardContainer';
import { Skeleton, Switch } from '../common';

interface Props {
	heading: string;
	description: string;
	isDisabled?: boolean;
	value: boolean;
	onChange: (value: boolean) => void;
}

export function ToggleCard({
	children,
	heading,
	description,
	value,
	onChange,
	isDisabled,
}: React.PropsWithChildren<Props>) {
	return (
		<CardContainer
			heading={heading}
			description={description}
			rightContent={
				!children && (
					<Switch
						checked={value}
						onCheckedChange={onChange}
						disabled={isDisabled}
						className='cursor-pointer'
					/>
				)
			}
			children={children}
		/>
	);
}

export function ToggleCardSkeleton() {
	return (
		<div className='h-fit w-full rounded-xl bg-card p-5 not-last:mb-6'>
			<div className='flex items-center justify-between gap-x-4'>
				<div className='flex flex-col gap-y-3 grow'>
					<Skeleton className='h-5 w-3xs' />
					<Skeleton className='h-5 w-xl' />
				</div>
				<Skeleton className='h-5 w-9 rounded-xl' />
			</div>
		</div>
	);
}
