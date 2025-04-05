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
	Textarea,
} from '@/components/ui/common';
import { FormWrapper } from '@/components/ui/elements';
import { useChangeProfileInfoMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	changeInfoSchema,
	type TChangeInfoSchema,
} from '@/schemas/user/change-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChangeInfoForm() {
	const t = useTranslations('dashboard.settings.profile.info');
	const { user, refetch, isProfileLoading } = useCurrent();

	const form = useForm<TChangeInfoSchema>({
		resolver: zodResolver(changeInfoSchema),
		values: {
			username: user?.username || '',
			displayName: user?.displayName || '',
			bio: user?.bio || '',
		},
	});

	const [change, { loading: isChangeLoading }] = useChangeProfileInfoMutation({
		onCompleted() {
			refetch();
			toast.success(t('successMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid, isDirty } = form.formState;

	function onSubmit(data: TChangeInfoSchema) {
		change({ variables: { data } });
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
						name='username'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('usernameLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={user?.username ?? t('usernamePlaceholder')}
										disabled={isChangeLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('usernameDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='displayName'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('displayNameLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={user?.displayName ?? t('displayNamePlaceholder')}
										disabled={isChangeLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('displayNameDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='bio'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('bioLabel')}</FormLabel>
								<FormControl>
									<Textarea
										className='resize-none'
										placeholder={`${t('bioPlaceholder')} ${user?.displayName}`}
										disabled={isChangeLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('bioDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button disabled={!isValid || !isDirty || isChangeLoading}>
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
				<div className='flex flex-col gap-y-2'>
					<Skeleton className='w-40 h-3.5' />
					<Skeleton className='w-full h-20 rounded-xl' />
					<Skeleton className='w-60 h-5' />
				</div>
			</div>
		</div>
	);
}
