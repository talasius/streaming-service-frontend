'use client';

import { Heading, ToggleCardSkeleton } from '@/components/ui/elements';
import { useStreamMetadata } from '@/hooks/useStreamMetadata';
import { useTranslations } from 'next-intl';
import { InstructionsModal } from './InstructionsModal';
import { CreateIngressForm } from './forms/CreateIngressForm';
import { StreamKey } from './forms/StreamKey';
import { StreamURL } from './forms/StreamURL';

export function KeysSettings() {
	const t = useTranslations('dashboard.keys.header');

	const { streamMetadata, isMetadataLoading } = useStreamMetadata();

	return (
		<div className='lg:px-10'>
			<div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
				<Heading
					title={t('heading')}
					description={t('description')}
					size='lg'
				/>
				<div className='flex items-center gap-x-4'>
					<CreateIngressForm />
					<InstructionsModal />
				</div>
			</div>
			<div className='mt-5 space-y-6'>
				{isMetadataLoading ? (
					Array.from({ length: 2 }).map((_, i) => <ToggleCardSkeleton key={i} />)
				) : (
					<>
						<StreamURL value={streamMetadata?.serverUrl!} />
            <StreamKey value={streamMetadata?.streamKey!} />
					</>
				)}
			</div>
		</div>
	);
}
