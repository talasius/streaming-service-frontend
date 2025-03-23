'use client';

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
import { PAGES } from '@/config/pages-url.config';
import { useLoginUserMutation } from '@/graphql/generated/output';
import { loginSchema, type TLoginSchema } from '@/schemas/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
	const t = useTranslations('auth.login');

	const { auth } = useAuth();
	const { push } = useRouter();

	const [isShowTwoFactor, setIsShowTwoFactor] = React.useState(false);

	const form = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	});

	const [login, { loading: isLoggingIn }] = useLoginUserMutation({
		onCompleted(data) {
			if (data.loginUser.message) {
				setIsShowTwoFactor(true);
			} else {
				auth();

				toast.success(t('successMessage'));
				push(PAGES.SETTINGS);
			}

			form.reset();
		},
		onError({graphQLErrors: [{message}]}) {
      toast.error(message ?? t('errorMessage'))
      form.reset()
    },
	});

	const { isValid } = form.formState;

	function onSubmit(data: TLoginSchema) {
		login({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref={PAGES.REGISTER}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'>
					{isShowTwoFactor ? (
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
								name='login'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('loginLabel')}</FormLabel>
										<FormControl>
											<Input
												placeholder='johndoe'
												disabled={isLoggingIn}
												{...field}
											/>
										</FormControl>
										<FormDescription>{t('loginDescription')}</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>{t('passwordLabel')}</FormLabel>
											<Link
												href={PAGES.FORGOT_PASSWORD}
												className='ml-auto inline-block text-sm'>
												{t('forgotPassword')}
											</Link>
										</div>
										<FormControl>
											<Input
												placeholder='********'
												type='password'
												disabled={isLoggingIn}
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
						disabled={(!isShowTwoFactor && !isValid) || isLoggingIn}
						className='mt-2 w-full'>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
