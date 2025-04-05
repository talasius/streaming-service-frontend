'use client';

import { useCurrent } from '@/hooks/useCurrent';
import { useTranslations } from 'next-intl';
import React from 'react';
import { VerifiedChannelAlert } from './VerifiedChannelAlert';
import { Heading } from '@/components/ui/elements';
import { CreatePlanForm } from '../forms/CreatePlanForm';
import { useSponsorshipPlans } from '@/hooks/useSponsorshipPlans';
import type { ColumnDef } from '@tanstack/react-table';
import {
	useRemoveSponsorshipPlanMutation,
	type FindMySponsorshipPlansQuery,
} from '@/graphql/generated/output';
import { formatDate } from '@/utils/format-date';
import { convertPrice } from '@/utils/convert-price';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/common';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable, DataTableSkeleton } from '@/components/ui/elements/DataTable';

export function PlansTable() {
	const t = useTranslations('dashboard.plans');

	const { user } = useCurrent();

	const { sponsorshipPlans, isSponsorshipPlansLoading, refetch } = useSponsorshipPlans();

	const plansColumns: ColumnDef<
		FindMySponsorshipPlansQuery['findMySponsorshipPlans'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => formatDate(row.original.createdAt, true),
		},
		{
			accessorKey: 'title',
			header: t('columns.title'),
			cell: ({ row }) => row.original.title,
		},
		{
			accessorKey: 'price',
			header: t('columns.price'),
			cell: ({ row }) => convertPrice(row.original.price),
		},
		{
			accessorKey: 'actions',
			header: t('columns.actions'),
			cell: ({ row }) => {
				const [remove, { loading: isRemoveLoading }] = useRemoveSponsorshipPlanMutation({
					onCompleted() {
						refetch();
					},
					onError({ graphQLErrors: [{ message }] }) {
						toast(message ?? t('errorMessage'));
					},
				});

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='size-8 p-0'>
								<MoreHorizontal size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side='right'>
							<DropdownMenuItem
								onClick={() => remove({ variables: { planId: row.original.id } })}
								disabled={isRemoveLoading}
								className=' group hover:cursor-pointer transition-colors duration-150 ease-in-out'>
								<Trash2
									size={16}
									className='mr-2 group-hover:text-rose-600'
								/>
								{t('columns.remove')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	return user?.isVerified ? (
		<div className='lg:px-10'>
			<div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
				<Heading
					title={t('header.heading')}
					description={t('header.description')}
					size='lg'
				/>
				<CreatePlanForm />
			</div>
			<div className='mt-5'>
				{isSponsorshipPlansLoading ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={plansColumns}
						data={sponsorshipPlans}
					/>
				)}
			</div>
		</div>
	) : (
		<VerifiedChannelAlert />
	);
}
