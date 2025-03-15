import {
	useClearSessionCookieMutation,
	useFindProfileQuery,
} from '@/graphql/generated/output';
import React from 'react';
import { useAuth } from './useAuth';

export function useCurrent() {
	const { isAuthenticated, exit } = useAuth();

	const { data, loading, refetch, error } = useFindProfileQuery({
		skip: !isAuthenticated,
	});
	const [clear] = useClearSessionCookieMutation();

	React.useEffect(() => {
		if (error) {
			if (isAuthenticated) {
				clear();
			}
			exit();
		}
	}, [isAuthenticated, exit, clear]);

	return {
		user: data?.findProfile,
		isProfileLoading: loading,
		refetch,
	};
}
