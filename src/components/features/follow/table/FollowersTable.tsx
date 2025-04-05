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
	type FindMyFollowersQuery,
	useFindMyFollowersQuery,
} from '@/graphql/generated/output';
import { formatDate } from '@/utils/format-date';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function FollowersTable() {
	const t = useTranslations('dashboard.followers');

	const { data, loading: isFollowersLoading } = useFindMyFollowersQuery();
	const followers = data?.findMyFollowers ?? [];

	const followersColumns: ColumnDef<FindMyFollowersQuery['findMyFollowers'][0]>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.createdAt, true),
		},
		{
			accessorKey: 'follower',
			header: t('columns.user'),
			cell: ({ row }) => (
				<div className='flex items-center gap-x-2'>
					<ChannelAvatar
						channel={row.original.follower}
						size='sm'
					/>
					<h2>{row.original.follower.displayName}</h2>
					{row.original.follower.isVerified && <VerifiedBadge size='sm' />}
				</div>
			),
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
							href={`/${row.original.follower.username}`}
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
						columns={followersColumns}
						data={followers}
					/>
				)}
			</div>
		</div>
	);
}
