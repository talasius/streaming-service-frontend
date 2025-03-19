import React from 'react';

export function useMediaQuery(q: string) {
	const [value, setValue] = React.useState(false);

	React.useEffect(() => {
		function onChange(e: MediaQueryListEvent) {
			setValue(e.matches);
		}

		const res = matchMedia(q);
		res.addEventListener('change', onChange);

		setValue(res.matches);

		return () => res.removeEventListener('change', onChange);
	}, [q]);

	return value;
}
