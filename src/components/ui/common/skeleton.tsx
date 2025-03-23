import { cn } from '@/utils/';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='skeleton'
			className={cn('dark:bg-muted bg-card animate-pulse rounded-md', className)}
			{...props}
		/>
	);
}

export { Skeleton };
