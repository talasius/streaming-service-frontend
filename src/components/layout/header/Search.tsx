'use client';

import { Button, Input } from '@/components/ui/common';
import { PAGES } from '@/config/pages-url.config';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

export function Search() {
	const t = useTranslations('layout.header.search');
	const [searchTerm, setSearchTerm] = React.useState('');

	const { push } = useRouter();

	function onSubmit(
		e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
	) {
		e.preventDefault();

		if (!searchTerm.trim()) return;

		if (searchTerm.trim()) {
			push(`${PAGES.STREAMS}?q=${searchTerm}`);
		} else {
			push(PAGES.STREAMS);
		}
	}

	return (
		<div className='ml-auto hidden lg:block'>
			<form
				className='relative flex items-center'
				onSubmit={onSubmit}>
				<Input
					placeholder={t('placeholder')}
					type='text'
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onSubmit(e);
						}
					}}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='w-full rounded-full pl-4 pr-10 lg:w-100'
				/>
				<Button
					disabled={!searchTerm.trim()}
					type='submit'
					className='absolute h-[34px] w-[38px] right-0 rounded-full'>
					<SearchIcon
						className='absolute'
						size={18}
					/>
				</Button>
			</form>
		</div>
	);
}
