'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common';
import {
  useEnabletTotpMutation,
  useGenerateTotpSecretQuery,
} from '@/graphql/generated/output';
import { useCurrent } from '@/hooks/useCurrent';
import {
  enableTotpSchema,
  type TEnableTotpSchema,
} from '@/schemas/user/enable-totp.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function EnableTotp() {
	const t = useTranslations('dashboard.settings.account.twoFactor.enable');
	const { refetch } = useCurrent();
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const [isCopied, setIsCopied] = React.useState(false);

	const { data, loading: isGenerateLoading } = useGenerateTotpSecretQuery();
	const twoFactorAuth = data?.generateTotpSecret;

	const form = useForm<TEnableTotpSchema>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: '',
		},
	});

	const [enable, { loading: isEnableLoading }] = useEnabletTotpMutation({
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

	function onSubmit(data: TEnableTotpSchema) {
		enable({
			variables: {
				data: {
					secret: twoFactorAuth?.secret || '',
					pin: data.pin,
				},
			},
		});
	}

	function onCopy(text: string) {
		navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1500);
	}

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='tracking-wide'>{t('heading')}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col items-center gap-4'>
						<div className='flex flex-col items-center justify-center gap-4'>
							<span className='text-sm text-muted-foreground'>
								{twoFactorAuth?.qrcodeUrl ? t('qrInstructions') : ''}
							</span>
							<img
								src={twoFactorAuth?.qrcodeUrl}
								alt='QR'
								className='rounded-xl'
							/>
						</div>
						<div
							className='flex items-center gap-2 group'
							onClick={() => onCopy(twoFactorAuth?.secret!)}>
							<span className='text-sm text-muted-foreground'>
								{twoFactorAuth?.secret && t('secretCodeLabel')}
							</span>
							<span className='text-sm leading-0 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer'>
								{twoFactorAuth?.secret && twoFactorAuth.secret}
							</span>
							{isCopied ? (
								<Check
									name='Copy code'
									size={16}
									className='cursor-pointer text-primary transition-colors'
								/>
							) : (
								<ClipboardList
									name='Copy code'
									size={16}
									className='cursor-pointer text-muted-foreground group-hover:text-primary transition-colors'
								/>
							)}
						</div>
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center max-sm:items-center'>
									<FormLabel>{t('pinLabel')}</FormLabel>
									<FormControl>
										<InputOTP
											disabled={isEnableLoading}
											maxLength={6}
											{...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>{t('pinDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type='submit'
								disabled={!isValid || isGenerateLoading || isEnableLoading}>
								{t('submitButton')}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
