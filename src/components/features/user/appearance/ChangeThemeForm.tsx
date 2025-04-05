'use client';

import { Form, FormField } from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements';
import {
	changeThemeSchema,
	TChangeThemeSchema,
} from '@/schemas/user/change-theme.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoonStar, SunMedium } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';

export function ChangeThemeForm() {
	const t = useTranslations('dashboard.settings.appearance.theme');
	const { theme, setTheme } = useTheme();

	const form = useForm<TChangeThemeSchema>({
		resolver: zodResolver(changeThemeSchema),
		values: {
			theme: theme === 'dark' ? 'dark' : 'light',
		},
	});

	function onChange(value: boolean) {
		const newTheme = value ? 'light' : 'dark';

		setTheme(newTheme);
		form.setValue('theme', newTheme);
	}

	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name='theme'
				render={({ field }) => (
					<CardContainer
						heading={t('heading')}
						description={t('description')}
						rightContent={
							<>
								{field.value === 'dark' ? (
									<SunMedium
										onClick={() => onChange(field.value === 'dark')}
										size={40}
										className='rounded-full p-2 hover:cursor-pointer hover:bg-accent/50 light:hover:bg-accent transition-colors duration-150 ease-in-out'
									/>
								) : (
									<MoonStar
										onClick={() => onChange(field.value === 'dark')}
										size={40}
										className='rounded-full p-2 hover:cursor-pointer hover:bg-accent/50 light:hover:bg-accent transition-colors duration-150 ease-in-out'
									/>
								)}
							</>
						}
					/>
				)}
			/>
		</Form>
	);
}
