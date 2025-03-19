import { Header } from '@/components/layout/header/Header';
import { LayoutContainer } from '@/components/layout/LayoutContainer';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import React from 'react';

export default function SiteLayout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<div className='flex flex-col h-full'>
			<div className='flex-1'>
				<div className='fixed inset-y-0 z-50 h-[75px] w-full'>
					<Header />
				</div>
        <Sidebar />
				<LayoutContainer>{children}</LayoutContainer>
			</div>
		</div>
	);
}
