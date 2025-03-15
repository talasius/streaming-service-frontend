import { PAGES } from '@/config/pages-url.config';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
	uri: PAGES.SERVER_URL,
	credentials: 'include',
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
