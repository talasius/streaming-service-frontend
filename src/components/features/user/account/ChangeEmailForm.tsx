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
import { PAGES } from '@/config/pages-url.config';
import { useChangeEmailMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	changeEmailSchema,
	type TChangeEmailSchema,
} from '@/schemas/user/change-email.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChangeEmailForm() {
	const t = useTranslations('dashboard.settings.account.email');
	const { user, isProfileLoading } = useCurrent();
	const { push } = useRouter();

	const form = useForm<TChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			email: '',
		},
	});

	const [update, { loading: isUpdateLoading }] = useChangeEmailMutation({
		onCompleted() {
			toast.success(t('successMessage'));
			push(PAGES.LOGIN);
		},
		onError({ graphQLErrors: [{ message }] }) {
			form.reset();
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid, isDirty } = form.formState;

	function onSubmit(data: TChangeEmailSchema) {
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
						name='email'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('emailLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={user?.email ?? t('emailPlaceholder')}
										disabled={isUpdateLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('emailDescription')}</FormDescription>
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
			<div className='flex flex-col gap-y-3'>
				<Skeleton className='w-40 h-3.5' />
				<Skeleton className='w-full h-9 rounded-xl' />
				<Skeleton className='w-60 h-5' />
			</div>
		</div>
	);
}
