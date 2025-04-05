'use client';

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/common';
import { useCreateIngressMutation } from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
	createIngressSchema,
	IngressType,
	type TCreateIngressSchema,
} from '@/schemas/stream/create-ingress.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreateIngressForm() {
	const t = useTranslations('dashboard.keys.createModal');
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	const { refetch } = useCurrent();

	const form = useForm<TCreateIngressSchema>({
		resolver: zodResolver(createIngressSchema),
		defaultValues: {
			ingressType: IngressType.RTMP,
		},
	});

	const [create, { loading: isCreateLoading }] = useCreateIngressMutation({
		onCompleted() {
			refetch();
			setIsDialogOpen(false);
			toast.success(t('successMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorMessage'));
		},
	});

	const { isValid } = form.formState;

	function onSubmit(data: TCreateIngressSchema) {
		create({ variables: { ingressType: data.ingressType } });
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
							name='ingressType'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='mb-4'>{t('ingressTypeLabel')}</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												field.onChange(Number(value));
											}}
											defaultValue={field.value.toString()}>
											<SelectTrigger className='w-full border-border'>
												<SelectValue placeholder={t('ingressTypePlaceholder')} />
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value={IngressType.RTMP.toString()}
													disabled={isCreateLoading}>
													RTMP
												</SelectItem>
												<SelectItem
													value={IngressType.WHIP.toString()}
													disabled={isCreateLoading}>
													WHIP
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>{t('ingressTypeDescription')}</FormDescription>
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
