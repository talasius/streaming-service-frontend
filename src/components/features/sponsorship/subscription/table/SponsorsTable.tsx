'use client';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/common';
import { ChannelAvatar, Heading, VerifiedBadge } from '@/components/ui/elements';
import { DataTable, DataTableSkeleton } from '@/components/ui/elements/DataTable';
import {
	type FindMySponsorsQuery,
	useFindMySponsorsQuery,
} from '@/graphql/generated/output';
import { formatDate } from '@/utils/format-date';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function SponsorsTable() {
	const t = useTranslations('dashboard.sponsors');

	const { data, loading: isFollowersLoading } = useFindMySponsorsQuery();
	const users = data?.findMySponsors ?? [];

	const usersColumns: ColumnDef<FindMySponsorsQuery['findMySponsors'][0]>[] = [
		{
			accessorKey: 'expiresAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.expiresAt),
		},
		{
			accessorKey: 'user',
			header: t('columns.user'),
			cell: ({ row }) => (
				<div className='flex items-center gap-x-2'>
					<ChannelAvatar
						channel={row.original.user}
						size='sm'
					/>
					<h2>{row.original.user.displayName}</h2>
					{row.original.user.isVerified && <VerifiedBadge size='sm' />}
				</div>
			),
		},
		{
			accessorKey: 'plan',
			header: t('columns.plan'),
			cell: ({ row }) => row.original.plan.title,
		},
		{
			accessorKey: 'actions',
			header: t('columns.actions'),
			cell: ({ row }) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='size-8 p-0'>
							<MoreHorizontal size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='right'>
						<Link
							href={`/${row.original.user.username}`}
							target='_blank'
							rel='noreferrer'>
							<DropdownMenuItem>
								<User
									size={16}
									className='mr-2'
								/>
								{t('columns.viewChannel')}
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];

  

	return (
		<div className='lg:px-10'>
			<Heading
				title={t('header.heading')}
				description={t('header.description')}
				size='lg'
			/>
			<div className='mt-5'>
				{isFollowersLoading ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={usersColumns}
						data={users}
					/>
				)}
			</div>
		</div>
	);
}
