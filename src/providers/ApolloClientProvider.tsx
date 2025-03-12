'use client';

import { client } from '@/libs/apollo-client';
import { ApolloProvider } from '@apollo/client';
import React from 'react';

export function ApolloClientProvider({ children }: React.PropsWithChildren<unknown>) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
