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
import { FormWrapper } from '@/components/ui/elements/FormWrapper';
import {
	useCreateSocialLinkMutation,
	useFindSocialLinksQuery,
} from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	socialLinksSchema,
	type TSocialLinksSchema,
} from '@/schemas/user/social-links.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SocialLinksList } from './SocialLinksList';

export function SocialLinksForm() {
	const t = useTranslations('dashboard.settings.profile.socialLinks.createForm');

	const { refetch, loading: isLinksLoading } = useFindSocialLinksQuery();
	const { user } = useCurrent();

	const form = useForm<TSocialLinksSchema>({
		resolver: zodResolver(socialLinksSchema),
		defaultValues: {
			title: '',
			url: '',
		},
	});

	const [create, { loading: isCreateLoading }] = useCreateSocialLinkMutation({
		onCompleted() {
			form.reset();
			refetch();
			toast.success(t('successMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			form.reset();
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TSocialLinksSchema) {
		create({ variables: { data } });
	}

	return isLinksLoading ? (
		<SocialLinksFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('titleLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('titlePlaceholder')}
										disabled={isCreateLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{t('titleDescription')}</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('urlLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder={`${t('urlPlaceholder')}${user?.username}`}
										disabled={isCreateLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>{`${t('urlDescription')}${
									user?.username
								}`}</FormDescription>
							</FormItem>
						)}
					/>
					<div className='flex justify-end p-5'>
						<Button disabled={!isValid || isCreateLoading}>{t('submitButton')}</Button>
					</div>
				</form>
			</Form>
			<SocialLinksList />
		</FormWrapper>
	);
}

export function SocialLinksFormSkeleton() {
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
