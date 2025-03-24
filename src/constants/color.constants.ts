export const BASE_COLORS = [
  {
    name: 'yellow',
    color: '(82.5% 42.75% 79.939)',
  },
  {
    name: 'rose',
    color: '(66.6% 45% 23.312)',
  },
  {
    name: 'pink',
    color: '(64.3% 61% 0.712)',
  },
	{
		name: 'violet',
		color: '(54.1% 61.75% 293.009)',
	},
	{
		name: 'soft-blue',
		color: '(73.3% 28% 283.284)',
	},
	{
		name: 'blue',
		color: '(62.8% 32.75% 245.286)',
	},
	{
		name: 'turquoise',
		color: '(70.9% 30% 187.169)',
	},
	{
		name: 'lime-green',
		color: '(72.2% 15.75% 163.101)',
	},
	{
		name: 'mint',
		color: '(80.5% 52.5% 145.119)',
	},
] as const;

export type TBaseColors = (typeof BASE_COLORS)[number]['name'];
