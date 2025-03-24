'use client';

import {
  Form,
  FormField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common';
import { CardContainer } from '@/components/ui/elements/CardContainer';
import { languagesSlug } from '@/libs/i18n/config';
import { setLanguage } from '@/libs/i18n/language';
import {
  changeLanguageSchema,
  TChangeLanguageSchema,
} from '@/schemas/user/change-language.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function ChangeLanguageForm() {
	const t = useTranslations('dashboard.settings.appearance.language');

	const [isPending, startTransition] = useTransition();
	const locale = useLocale();

	const form = useForm<TChangeLanguageSchema>({
		resolver: zodResolver(changeLanguageSchema),
		values: {
			language: locale as TChangeLanguageSchema['language'],
		},
	});

	function onSubmit(data: TChangeLanguageSchema) {
		startTransition(async () => {
			try {
				await setLanguage(data.language);
			} catch (error) {
				console.error(error);
			}
		});
	}

	return (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<Form {...form}>
					<FormField
						control={form.control}
						name='language'
						render={({ field }) => (
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									form.handleSubmit(onSubmit)();
								}}
								value={field.value}>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder={t('selectPlaceholder')} />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(languagesSlug).map(([code, name]) => (
										<SelectItem
											key={code}
											value={code}
											disabled={isPending}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</Form>
			}
		/>
	);
}
