import { configStorage } from '@/store/config/config.store';

export function useConfig() {
	const theme = configStorage((state) => state.theme);
	const setTheme = configStorage((state) => state.setTheme);

	return {
		theme,
		setTheme,
	};
}
