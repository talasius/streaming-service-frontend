'use client';

import { Button, Form, FormField, Skeleton } from '@/components/ui/common';
import { ChannelAvatar } from '@/components/ui/elements';
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal';
import { FormWrapper } from '@/components/ui/elements/FormWrapper';
import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import { uploadFileShema, type TUploadFileSchema } from '@/schemas/upload-file.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ChangeAvatarForm() {
	const t = useTranslations('dashboard.settings.profile.avatar');

	const { user, isProfileLoading, refetch } = useCurrent();
	const inputRef = useRef<HTMLInputElement>(null);

	const form = useForm<TUploadFileSchema>({
		resolver: zodResolver(uploadFileShema),
		values: {
			file: user?.avatar!,
		},
	});

	const [update, { loading: isUpdateLoading }] = useChangeProfileAvatarMutation({
		onCompleted() {
			refetch();
			toast.success(t('successfullUpdate'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorUpdating'));
		},
	});

	const [remove, { loading: isRemoveLoading }] = useRemoveProfileAvatarMutation({
		onCompleted() {
			refetch();
			toast.success(t('successfullRemove'));
		},
		onError({ graphQLErrors: [{ message }] }) {
			toast.error(message ?? t('errorRemoving'));
		},
	});

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file) {
			form.setValue('file', file);
			update({ variables: { avatar: file } });
		}
	}

	return isProfileLoading || !user ? (
		<ChangeProfileAvatarSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<div className='px-5 pb-5'>
							<div className='w-full items-center lg:flex space-x-6'>
								<ChannelAvatar
									channel={{
										username: user?.username,
										avatar:
											field.value instanceof File
												? URL.createObjectURL(field.value)
												: field.value,
									}}
									size='xl'
									className='ring-2 ring-primary'
								/>
								<div className='space-y-3'>
									<div className='flex items-center gap-x-3'>
										<input
											className='hidden'
											type='file'
											ref={inputRef}
											onChange={handleImageChange}
										/>
										<Button
											variant='default'
											onClick={() => inputRef.current?.click()}
											disabled={isUpdateLoading || isRemoveLoading}>
											{t('updateButton')}
										</Button>
										{user.avatar && (
											<ConfirmModal
												heading={t('confirmModal.heading')}
												message={t('confirmModal.message')}
												onConfirm={() => remove()}>
												<Button
													size='icon'
													variant='ghost'
													disabled={isUpdateLoading || isRemoveLoading}
													className='hover:text-red-500 transition-colors duration-200'>
													<Trash2 size={16} />
												</Button>
											</ConfirmModal>
										)}
									</div>
									<p className='text-sm text-muted-foreground'>{t('info')}</p>
								</div>
							</div>
						</div>
					)}
				/>
			</Form>
		</FormWrapper>
	);
}

export function ChangeProfileAvatarSkeleton() {
	return (
		<div className='h-52 w-full rounded-xl bg-card p-5'>
			<div className='pb-5'>
				<Skeleton className='w-60 h-6' />
			</div>
			<div className='flex items-center space-x-6 shrink-0'>
				<Skeleton className='size-32 rounded-full' />
				<div className='flex flex-col space-y-3 grow-0'>
					<div className='flex items-center gap-x-3'>
						<Skeleton className='w-32 h-10 rounded-xl' />
						<Skeleton className='size-7 rounded-full' />
					</div>
					<Skeleton className='w-sm h-5' />
				</div>
			</div>
		</div>
	);
}
