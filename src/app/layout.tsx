import { ApolloClientProvider } from '@/providers/ApolloClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import '@/styles/globals.css';
import '@/styles/themes.css';
import { ColorSwitcher } from '@/components/ui/elements';

export const metadata: Metadata = {
	title: 'Witch',
	description: 'Modern streaming planform',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body className={`${GeistSans.variable} antialiased`}>
				<ColorSwitcher />
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						<ThemeProvider
							attribute='class'
							defaultTheme='dark'
							disableTransitionOnChange>
							<ToastProvider />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	);
}
