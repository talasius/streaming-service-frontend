'use client';

import { Heading } from '@/components/ui/elements';
import { DataTable, DataTableSkeleton } from '@/components/ui/elements/DataTable';
import {
	type FindMyTransactionsQuery,
	TransactionStatus,
	useFindMyTransactionsQuery,
} from '@/graphql/generated/output';
import { convertPrice } from '@/utils/convert-price';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

export function TransactionsTable() {
	const t = useTranslations('dashboard.transactions');

	const { data, loading: isTransactionsLoading } = useFindMyTransactionsQuery();
	const transactions = data?.findMyTransactions ?? [];

	const transactionsColumns: ColumnDef<
		FindMyTransactionsQuery['findMyTransactions'][0]
	>[] = [
		{
			accessorKey: 'createdAt',
			header: t('columns.date'),
			cell: ({ row }) => row.original.createdAt,
		},
		{
			accessorKey: 'status',
			header: t('columns.status'),
			cell: ({ row }) => {
				const status = row.original.status;
				let statusColor = '';

				switch (status) {
					case TransactionStatus.Success:
						statusColor = 'text-green-600';
						return <div className={`py-1.5 ${statusColor}`}>{t('status.success')}</div>;
					case TransactionStatus.Pending:
						statusColor = 'text-yellow-600';
						return <div className={`py-1.5 ${statusColor}`}>{t('status.pending')}</div>;
					case TransactionStatus.Failed:
						statusColor = 'text-red-600';
						return <div className={`py-1.5 ${statusColor}`}>{t('status.failed')}</div>;
					case TransactionStatus.Expired:
						statusColor = 'text-muted-foreground';
						return <div className={`py-1.5 ${statusColor}`}>{t('status.expired')}</div>;
					default:
						statusColor = 'text-black';
						return <div className={`py-1.5 ${statusColor}`}>{status}</div>;
				}
			},
		},
		{
			accessorKey: 'amount',
			header: t('columns.amount'),
			cell: ({ row }) => convertPrice(row.original.amount),
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
				{isTransactionsLoading ? (
					<DataTableSkeleton />
				) : (
					<DataTable
						columns={transactionsColumns}
						data={transactions}
					/>
				)}
			</div>
		</div>
	);
}
