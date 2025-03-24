import type { TBaseColors } from '@/constants/color.constants';

export interface ConfigStore {
	theme: TBaseColors;
	setTheme: (theme: TBaseColors) => void;
}
