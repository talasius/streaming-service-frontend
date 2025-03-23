import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server';
import { PAGES } from './config/pages-url.config';

export default function middleware(req: NextRequest) {
	const { url, cookies, nextUrl } = req;
	const session = cookies.get('session')?.value;

	const isAuthRoute = nextUrl.pathname.startsWith(PAGES.ACCOUNT);
	const isDeactivateRoute = nextUrl.pathname === PAGES.DEACTIVATE;
	const isDashboardRoute = nextUrl.pathname.startsWith(PAGES.DASHBOARD);

	if (!session && isDashboardRoute) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, url));
	}
	if (!session && isDeactivateRoute) {
		return NextResponse.redirect(new URL(PAGES.LOGIN, url));
	}

	if (session && isAuthRoute && !isDeactivateRoute) {
		return NextResponse.redirect(new URL(PAGES.SETTINGS, url));
	}

	return NextResponse.next();
}
export const config: MiddlewareConfig = {
	matcher: ['/account/:path*', '/dashboard/:path*'],
};
