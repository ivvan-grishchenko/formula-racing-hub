import { baseFetch } from '@lib/http';

import type { DriverOfTheDay } from './types';

const BASE = 'https://raw.githubusercontent.com/TracingInsights/DOTD/refs/heads/main';

export function fetchDriverOfTheDay(year: number, race: string): Promise<DriverOfTheDay> {
	try {
		const url = `${year}/${race}/dotd.json`;

		return baseFetch<DriverOfTheDay>(BASE, url);
	} catch {
		return Promise.resolve({
			race_name: 'Japanese Grand Prix',
			voting_results: [],
			winner: 'Oscar Piastri',
			year: 2026,
		});
	}
}
