import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntel = createNextIntlPlugin('./src/libs/i18n/request.ts');

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fe27ae21-31d1-4353-a802-aa388f02eead.selstorage.ru',
			},
		],
	},
};

export default withNextIntel(nextConfig);
