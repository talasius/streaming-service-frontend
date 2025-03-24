import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ConfigStore } from './config.types';
import type { TBaseColors } from '@/constants/color.constants';

export const configStorage = create(
	persist<ConfigStore>(
		(set) => ({
			theme: 'turquoise',
			setTheme: (theme: TBaseColors) => set({ theme }),
		}),
		{
			name: 'config',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
