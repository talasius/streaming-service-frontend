import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const headingSizes = cva('', {
	variants: {
		size: {
			sm: 'text-lg',
			defaul: 'text-2xl',
			lg: 'text-4xl',
			xl: 'text-5xl',
		},
	},
	defaultVariants: {
		size: 'defaul',
	},
});

interface Props extends VariantProps<typeof headingSizes> {
	title: string;
	description?: string;
	className?: string;
}

export function Heading({ size, title, description, className }: Props) {
	return (
		<div className={cn('space-y-2', className)}>
			<h1 className={cn('font-semibold text-foreground', headingSizes({ size }))}>
				{title}
			</h1>
			{description && <p className='text-muted-foreground'>{description}</p>}
		</div>
	);
}
