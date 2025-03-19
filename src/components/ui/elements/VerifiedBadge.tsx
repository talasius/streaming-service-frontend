import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';

interface Props extends VariantProps<typeof verifiedBadgeSizes> {
	className?: string;
}

const verifiedBadgeSizes = cva('', {
	variants: {
		size: {
			sm: 'size-3',
			default: 'size-4',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

export function VerifiedBadge({ size, className }: Props) {
	return (
		<span
			className={cn(
				'flex items-center justify-center rounded-full bg-primary p-0.5',
				className,
				verifiedBadgeSizes({ size })
			)}>
			<Check
				className={cn(
					'stroke-[4px] text-white',
					size === 'sm' ? 'size-2' : 'size-[11px]'
				)}
			/>
		</span>
	);
}
