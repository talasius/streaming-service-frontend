'use client';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input,
} from '@/components/ui/common';
import {
	useFindSocialLinksQuery,
	useRemoveSocialLinkMutation,
	useUpdateSocialLinkMutation,
	type FindSocialLinksQuery,
} from '@/graphql/generated/output';
import {
	socialLinksSchema,
	type TSocialLinksSchema,
} from '@/schemas/user/social-links.schema';
import type { DraggableProvided } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	socialLink: FindSocialLinksQuery['findSocialLinks'][0];
	provided: DraggableProvided;
}

export function SocialLinkItem({ socialLink, provided }: Props) {
	const t = useTranslations('dashboard.settings.profile.socialLinks.editForm');

	const [editingId, setEditingId] = React.useState<string | null>(null);

	const { refetch } = useFindSocialLinksQuery();

	const form = useForm<TSocialLinksSchema>({
		resolver: zodResolver(socialLinksSchema),
		values: {
			title: socialLink.title ?? '',
			url: socialLink.url ?? '',
		},
	});

	const { isValid, isDirty } = form.formState;

	function toggleEdit(id: string | null) {
		setEditingId(id);
	}

	const [update, { loading: isUpdateLoading }] = useUpdateSocialLinkMutation({
		onCompleted() {
			toggleEdit(null);
			refetch();
			toast.success(t('successUpdateMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorUpdateMessage'));
		},
	});

	const [remove, { loading: isRemoveLoading }] = useRemoveSocialLinkMutation({
		onCompleted() {
			refetch();
			toast.success(t('successRemoveMessage'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorRemoveMessage'));
		},
	});

	function onSubmit(data: TSocialLinksSchema) {
		update({ variables: { id: socialLink.id, data: data } });
	}
	return (
		<div
			className='mb-4 flex items-center gap-x-2 rounded-xl border border-border bg-background text-sm'
			ref={provided.innerRef}
			{...provided.draggableProps}>
			<div
				className='rounded-l-xl border-r border-r-border px-2 py-9 text-foreground transition'
				{...provided.dragHandleProps}>
				<GripVertical size={20} />
			</div>
			<div className='space-y-1 px-2'>
				{editingId === socialLink.id ? (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex gap-x-6'>
							<div className='w-96 space-y-2'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder='YouTube'
													disabled={isUpdateLoading || isRemoveLoading}
													className='h-8'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='url'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder='https://youtube.com/@yourname'
													disabled={isUpdateLoading || isRemoveLoading}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															e.preventDefault();
															onSubmit(form.getValues());
														}
													}}
													className='h-8'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<div className='flex items-center gap-x-4'>
								<Button
									variant='secondary'
									onClick={() => toggleEdit(null)}>
									{t('cancelButton')}
								</Button>
								<Button
									disabled={!isValid || !isDirty || isUpdateLoading || isRemoveLoading}>
									{t('submitButton')}
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<>
						<h2 className='text-lg tracking-wide font-semibold text-foreground'>
							{socialLink.title}
						</h2>
						<p className='text-muted-foreground'>{socialLink.url}</p>
					</>
				)}
			</div>
			<div className='ml-auto flex items-center gap-x-2 pr-4'>
				{editingId !== socialLink.id && (
					<Button
						onClick={() => toggleEdit(socialLink.id)}
						variant='ghost'
						size='icon'
						className='text-muted-foreground hover:text-primary'>
						<Pencil
							size={16}
							className='cursor-pointer'
						/>
					</Button>
				)}
				<Button
					variant='ghost'
					size='icon'
					onClick={() => remove({ variables: { id: socialLink.id } })}
					className='text-muted-foreground hover:text-rose-600'>
					<Trash2
						size={16}
						className='cursor-pointer'
					/>
				</Button>
			</div>
		</div>
	);
}
