'use client';

import { PAGES } from '@/config/pages-url.config';
import { useDeactivateAccountMutation } from '@/graphql/generated/output';
import { useAuth } from '@/hooks/useAuth';
import {
	deactivateSchema,
	type TDeactivateSchema,
} from '@/schemas/auth/deactivate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/common';

export function DeactivateForm() {
	const t = useTranslations('auth.deactivate');
	const { replace } = useRouter();
	const { exit } = useAuth();

	const [showConfirm, setShowConfirm] = React.useState(false);

	const form = useForm<TDeactivateSchema>({
		resolver: zodResolver(deactivateSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [deactivate, { loading: isDeactivateLoading }] = useDeactivateAccountMutation({
		onCompleted(data) {
			if (data.deactivateAccount.message) {
				setShowConfirm(true);
			} else {
				exit();
				toast.success(t('successMessage'));
				replace(PAGES.HOME);
			}
		},
		onError({ graphQLErrors: [{ message }] }) {
			form.reset();
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TDeactivateSchema) {
		deactivate({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonHref={PAGES.HOME}
			backButtonLabel={t('backButtonLabel')}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'>
					{showConfirm ? (
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('pinLabel')}</FormLabel>
									<FormControl>
										<InputOTP
											maxLength={6}
											{...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>{t('pinDescription')}</FormDescription>
								</FormItem>
							)}
						/>
					) : (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('emailLabel')}</FormLabel>
										<FormControl>
											<Input
												disabled={isDeactivateLoading}
												type='email'
												placeholder='example@example.com'
												{...field}
											/>
										</FormControl>
										<FormDescription>{t('emailDescription')}</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('passwordLabel')}</FormLabel>
										<FormControl>
											<Input
												disabled={isDeactivateLoading}
												type='password'
												placeholder='********'
												{...field}
											/>
										</FormControl>
										<FormDescription>{t('passwordDescription')}</FormDescription>
									</FormItem>
								)}
							/>
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isDeactivateLoading}>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
