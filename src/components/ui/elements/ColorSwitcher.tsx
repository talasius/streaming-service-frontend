'use client';

import { useConfig } from '@/hooks/useConfig';
import React from 'react';

export function ColorSwitcher() {
	const { theme } = useConfig();

	React.useEffect(() => {
		document.body.classList.forEach((className) => {
			if (className.match(/^theme.*/)) {
				document.body.classList.remove(className);
			}
		});

		if (theme) {
			return document.body.classList.add(`theme-${theme}`);
		}
	}, [theme]);
	return null;
}
