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
import { PAGES } from '@/config/pages-url.config';
import { useCreateUserMutation } from '@/graphql/generated/output';
import {
  createAccountSchema,
  type TCreateAccountSchema,
} from '@/schemas/auth/create-account.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';

export function CreateAccountForm() {
	const t = useTranslations('auth.register');
	const [isSuccess, setIsSuccess] = React.useState(false);
	const form = useForm<TCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const [create, { loading: isCreating }] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true);
			form.reset();
		},
		onError({ graphQLErrors }) {
			if (graphQLErrors) {
				graphQLErrors.map(({ message }) => {
					toast.error(message);
				});
			} else {
				toast.error(t('errorMessage'));
			}
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TCreateAccountSchema) {
		create({ variables: { data } });
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref={PAGES.LOGIN}>
			{isSuccess ? (
				<Alert>
					<CircleCheck size={4} />
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
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('usernameLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder='johndoe'
											disabled={isCreating}
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('usernameDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('emailLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder='example@example.com'
											disabled={isCreating}
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
											placeholder='********'
											type='password'
											disabled={isCreating}
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('passwordDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							className='mt-2 w-full'
							disabled={!isValid || isCreating}>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	);
}
