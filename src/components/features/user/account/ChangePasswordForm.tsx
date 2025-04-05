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
	Separator,
	Skeleton,
} from '@/components/ui/common';
import { FormWrapper } from '@/components/ui/elements';
import { useChangePasswordMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	changePasswordSchema,
	type TChangePasswordSchema,
} from '@/schemas/user/change-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChangePasswordForm() {
	const t = useTranslations('dashboard.settings.account.password');
	const { isProfileLoading } = useCurrent();

	const form = useForm<TChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
	});

	const [update, { loading: isUpdateLoading }] = useChangePasswordMutation({
		onCompleted() {
			toast.success(t('success  Message'));
			form.reset();
		},
		onError({ graphQLErrors: [{ message }] }) {
			form.reset();
			toast.error(message ?? t('errormessage'));
		},
	});

	const { isValid, isDirty } = form.formState;

	function onSubmit(data: TChangePasswordSchema) {
		update({ variables: { data } });
	}
	return isProfileLoading ? (
		<ChangeInfoSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'>
					<FormField
						control={form.control}
						name='oldPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('oldPasswordLabel')}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='********'
										disabled={isUpdateLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('oldPasswordDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('newPasswordLabel')}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='********'
										disabled={isUpdateLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('newPasswordDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button disabled={!isValid || !isDirty || isUpdateLoading}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	);
}

export function ChangeInfoSkeleton() {
	return (
		<div className='h-fit w-full rounded-xl bg-card p-5'>
			<div className='pb-5'>
				<Skeleton className='w-60 h-6' />
			</div>
			<div className='grid gap-y-5'>
				<div className='flex flex-col gap-y-3'>
					<Skeleton className='w-40 h-3.5' />
					<Skeleton className='w-full h-9 rounded-xl' />
					<Skeleton className='w-60 h-5' />
				</div>
				<div className='flex flex-col gap-y-2'>
					<Skeleton className='w-40 h-3.5' />
					<Skeleton className='w-full h-9 rounded-xl' />
					<Skeleton className='w-60 h-5' />
				</div>
			</div>
		</div>
	);
}
