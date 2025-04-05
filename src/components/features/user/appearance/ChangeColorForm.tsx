'use client';

import { CardContainer } from '@/components/ui/elements';
import { BASE_COLORS } from '@/constants/color.constants';
import { useConfig } from '@/hooks/useConfig';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export function ChangeColorForm() {
	const t = useTranslations('dashboard.settings.appearance.colors');
	const colorConfig = useConfig();

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='grid grid-flow-col gap-x-2 shrink-0'>
					{BASE_COLORS.map((theme, i) => {
						const isActive = colorConfig.theme === theme.name;

						return (
							<button
								key={i}
								onClick={() => colorConfig.setTheme(theme.name)}
								style={
									{
										'--theme-primary': `oklch${theme.color}`,
									} as React.CSSProperties
								}>
								<span
									className='flex size-9 shrink-0 -translate-x-1 items-center justify-center rounded-xl hover:border-2 hover:border-foreground'
									style={{
										background: 'var(--theme-primary)',
									}}>
									{isActive && (
										<Check
											size={20}
											className='text-white'
										/>
									)}
								</span>
							</button>
						);
					})}
				</div>
			}
		/>
	);
}
