import { LogoImage } from '@/components/images/LogoImage';
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/common';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	heading: string;
	backButtonLabel?: string;
	backButtonHref?: string;
}

export function AuthWrapper({
	children,
	heading,
	backButtonLabel,
	backButtonHref,
}: React.PropsWithChildren<Props>) {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-[450px]'>
				<CardHeader className='flex-row items-center justify-center gap-x-4'>
					<LogoImage />
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className='-mt-2'>
					{backButtonLabel && backButtonHref && (
						<Button
							variant='ghost'
							className='w-full'>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
