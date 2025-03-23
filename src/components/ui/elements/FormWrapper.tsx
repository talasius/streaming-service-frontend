import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../common';

interface Props {
	heading: string;
}

export function FormWrapper({ children, heading }: React.PropsWithChildren<Props>) {
	return (
		<Card className='p-0 gap-0'>
			<CardHeader className='p-4'>
				<CardTitle className='text-lg'>{heading}</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>{children}</CardContent>
		</Card>
	);
}
