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
} from '@/components/ui/common';
import { PAGES } from '@/config/pages-url.config';
import { useNewPasswordMutation } from '@/graphql/generated/output';
import {
  newPasswordSchema,
  type TNewPasswordSchema,
} from '@/schemas/auth/new-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../AuthWrapper';

export function NewPasswordForm() {
	const t = useTranslations('auth.newPassword');
	const { push } = useRouter();

	const params = useParams<{ token: string }>();

	const form = useForm<TNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: '',
		},
	});

	const [setNewPassword, { loading: isSubmitting }] = useNewPasswordMutation({
		onCompleted() {
			toast.success(t('successMessage'));
			push(PAGES.LOGIN);
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

	function onSubmit(data: TNewPasswordSchema) {
		setNewPassword({ variables: { data: { ...data, token: params.token } } });
	}
	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref={PAGES.LOGIN}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('passwordLabel')}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='********'
										disabled={isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('passwordDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('passwordRepeatLabel')}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='********'
										disabled={isSubmitting}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('passwordRepeatDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Button
						disabled={!isValid || isSubmitting}
						className='mt-2 w-full'>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
