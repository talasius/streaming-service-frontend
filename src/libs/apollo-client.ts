import { PAGES } from '@/config/pages-url.config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const httpLink = createUploadLink({
	uri: PAGES.SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': 'true',
	},
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
