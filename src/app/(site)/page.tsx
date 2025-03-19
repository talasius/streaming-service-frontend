'use client';

import { useCurrent } from '@/hooks/useCurrent';

export default function Home() {
	const { user, isProfileLoading } = useCurrent();

	return (
		<div className='font-bold'>
			{isProfileLoading ? (
				<div>Loading...</div>
			) : (
				<>{JSON.stringify(user?.displayName)} is cool</>
			)}
		</div>
	);
}
