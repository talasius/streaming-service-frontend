import { useFindChatSettingsQuery } from '@/graphql/generated/output';
import { useAuth } from './useAuth';

export function useChatSettings() {
	const { isAuthenticated } = useAuth();

	const { data, loading, refetch } = useFindChatSettingsQuery({
		skip: !isAuthenticated,
	});

	return {
		chatSettings: data?.findProfile.stream ?? [],
		isChatSettingsLoading: loading,
		refetch,
	};
}

export type TUseChatSettings = ReturnType<typeof useChatSettings>;
