import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server';
import { PAGES } from './config/pages-url.config';

export default function middleware(req: NextRequest) {
	const { url, cookies } = req;
	const session = cookies.get('session')?.value;

	const isAuthPage = url.includes(PAGES.ACCOUNT);

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL(PAGES.SETTINGS, url));
		}

		return NextResponse.next();
	}
	if (!session) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, url));
	}
}
export const config: MiddlewareConfig = {
	matcher: ['/account/:path*', '/dashboard/:path*'],
};
