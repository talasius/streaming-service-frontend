import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Select,
	SelectTrigger,
	Textarea,
} from '@/components/ui/common';
import { useCreateSponsorshipPlanMutation } from '@/graphql/generated/output';
import { useSponsorshipPlans } from '@/hooks/useSponsorshipPlans';
import {
	createPlanSchema,
	type TCreatePlanSchema,
} from '@/schemas/plan/create-plan.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreatePlanForm() {
	const t = useTranslations('dashboard.plans.createForm');

	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const { refetch } = useSponsorshipPlans();

	const form = useForm<TCreatePlanSchema>({
		resolver: zodResolver(createPlanSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 125,
		},
	});

	const [create, { loading: isCreateLoading }] = useCreateSponsorshipPlanMutation({
		onCompleted() {
			setIsDialogOpen(false);
			form.reset();
			refetch();
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TCreatePlanSchema) {
		create({ variables: { data } });
	}

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
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
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('descriptionLabel')}</FormLabel>
									<FormControl>
										<Textarea
											placeholder={t('descriptionPlaceholder')}
											disabled={isCreateLoading}
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('descriptionDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('priceLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder={t('priceLabel')}
											type='number'
											disabled={isCreateLoading}
											{...field}
										/>
									</FormControl>
									<FormDescription>{t('priceDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button disabled={!isValid || isCreateLoading}>{t('submitButton')}</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
