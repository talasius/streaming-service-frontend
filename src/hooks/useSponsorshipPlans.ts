import { useFindMySponsorshipPlansQuery } from '@/graphql/generated/output';
import { useAuth } from './useAuth';

export function useSponsorshipPlans() {
	const { isAuthenticated } = useAuth();

	const { data, loading, refetch } = useFindMySponsorshipPlansQuery({
		skip: !isAuthenticated,
	});
	return {
		sponsorshipPlans: data?.findMySponsorshipPlans ?? [],
		isSponsorshipPlansLoading: loading,
		refetch,
	};
}
