'use client';

import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
} from '@/components/ui/common';
import { useResetPasswordMutation } from '@/graphql/generated/output';
import {
	resetPasswordSchema,
	type TResetPasswordSchema,
} from '@/schemas/auth/reset-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';
import { PAGES } from '@/config/pages-url.config';

export function ResetPasswordForm() {
	const t = useTranslations('auth.resetPassword');
	const [isSuccess, setIsSuccess] = React.useState(false);

	const form = useForm<TResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const [reset, { loading: isResetting }] = useResetPasswordMutation({
		onCompleted() {
			setIsSuccess(true);
		},
		onError({ graphQLErrors }) {
			if (graphQLErrors) {
				graphQLErrors.map(({ message }) => {
					toast.error(message);
				});
			} else {
				toast.error(t('errorMessage'));
			}

			form.reset();
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TResetPasswordSchema) {
		reset({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref={PAGES.LOGIN}>
			{isSuccess ? (
				<Alert>
					<CircleCheck size={16} />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>{t('successAlertDescription')}</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-y-3'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('emailLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder='example@example.com'
											disabled={isResetting}
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('emailDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							disabled={!isValid || isResetting}
							className='mt-2 w-full'>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	);
}
