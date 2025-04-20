import { useGenerateStreamTokenMutation } from '@/graphql/generated/output';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import React from 'react';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from './useAuth';
import { useCurrent } from './useCurrent';

export function useStreamToken(channelId: string) {
	const [token, setToken] = React.useState('');
	const [name, setName] = React.useState('');
	const [identity, setIdentity] = React.useState('');

	const { isAuthenticated } = useAuth();
	const { user } = useCurrent();

	const [generateStreamToken] = useGenerateStreamTokenMutation({
		onCompleted(data) {
			const viewerToken = data.generateStreamToken.token;

			setToken(viewerToken);

			const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
				name?: string;
			};

			const name = decodedToken.name;
			const identity = decodedToken.jti;

			if (name) {
				setName(name);
			}

			if (identity) {
				setIdentity(identity);
			}
		},
		onError(error) {
			console.error(error.message);
		},
	});

	React.useEffect(() => {
		async function generateToken() {
			const userId = isAuthenticated && user ? user.id : uuid4();

			await generateStreamToken({
				variables: {
					data: {
						userId,
						channelId,
					},
				},
			});
		}

		const timeoutId = setTimeout(generateToken, 1000);

		return () => clearTimeout(timeoutId);
	}, [generateStreamToken, isAuthenticated, user, channelId]);

	return { token, name, identity };
}
