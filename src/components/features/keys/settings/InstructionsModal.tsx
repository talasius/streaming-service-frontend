'use client';

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/common';
import { HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function InstructionsModal() {
	const t = useTranslations('dashboard.keys.instructionsModal');
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					className='rounded-full size-10'>
					<HelpCircle className='size-6' />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-h-[80vh] max-w-[800px]! overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
					<DialogDescription className='text-sm text-muted-foreground'>
						{t('description')}
					</DialogDescription>
				</DialogHeader>

				<h2 className='text-lg font-semibold'>{t('step1Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step1Description')}</p>
				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('downloadObs')}</strong>
						<br />
						{t('downloadObsDescription')}{' '}
						<a
							href='https://obsproject.com'
							className='text-blue-500 underline hover:text-blue-700 transition-colors duration-200'
							target='_blank'
							rel='noopener noreferrer'>
							{t('obsLinkText')}
						</a>
						.
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('copyKeys')}</strong>
						<br />
						{t('copyKeysDescription')}
					</li>
				</ol>

				<h2 className='mt-4 text-lg font-semibold'>{t('step2Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step2Description')}</p>
				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('openObs')}</strong>
						<br />
						{t('openObsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('openStreamSettings')}</strong>
						<br />
						{t('openStreamSettingsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('enterDetails')}</strong>
						<br />
						{t('enterDetailsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('saveSettings')}</strong>
						<br />
						{t('saveSettingsDescription')}
					</li>
				</ol>

				<h2 className='mt-4 text-lg font-semibold'>{t('step3Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step3Description')}</p>
				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('startStream')}</strong>
						<br />
						{t('startStreamDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('monitorStream')}</strong>
						<br />
						{t('monitorStreamDescription')}
					</li>
				</ol>

				<p className='mt-4 text-sm text-muted-foreground'>{t('congrats')}</p>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant='secondary'>{t('close')}</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
