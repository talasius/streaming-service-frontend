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
					/>
				)
			}
			children={children}
		/>
	);
}

export function ToggleCardSkeleton() {
	return <Skeleton className='mt-6 h-20 w-full' />;
}
