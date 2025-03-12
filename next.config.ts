import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntel = createNextIntlPlugin('./src/libs/i18n/request.ts');

const nextConfig: NextConfig = {
	reactStrictMode: true,
};

export default withNextIntel(nextConfig);
