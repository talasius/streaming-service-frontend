import {
	useClearSessionCookieMutation,
	useFindUserStreamMetadataQuery,
} from '@/graphql/generated/output';
import React from 'react';
import { useAuth } from './useAuth';

export function useStreamMetadata() {
	const { isAuthenticated, exit } = useAuth();

	const { data, loading, refetch, error } = useFindUserStreamMetadataQuery({
		skip: !isAuthenticated,
	});
	const [clear] = useClearSessionCookieMutation();

	React.useEffect(() => {
		if (error && !data) {
			if (isAuthenticated) {
				clear();
			}
			exit();
		}
	}, [isAuthenticated, exit, clear]);

	return {
		streamMetadata: data?.findProfile.stream ?? [],
		isMetadataLoading: loading,
		refetch,
	};
}

export type TUseStreamMetadata = ReturnType<typeof useStreamMetadata>;
