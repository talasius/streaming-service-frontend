import type { TypeHeadingLink } from '@/types/types';
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

interface ComponentProps extends VariantProps<typeof headingSizes> {
	title: string;
	description?: string;
	className?: string;
}

type Props = ComponentProps & TypeHeadingLink;

export function Heading({
	size,
	title,
	titleLink,
	titleLinkHref,
	description,
	className,
}: Props) {
	return (
		<div className={cn('space-y-2', className)}>
			<h1 className={cn('font-semibold text-foreground', headingSizes({ size }))}>
				{titleLink && (
					<a
						href={titleLinkHref}
						className='text-primary'>
						{titleLink}
					</a>
				)}
				{title}
			</h1>
			{description && <p className='text-muted-foreground'>{description}</p>}
		</div>
	);
}
