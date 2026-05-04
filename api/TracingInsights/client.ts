import { ApiError, createApiClient, toApiError } from '@lib/http';

import type { DriverOfTheDay } from './types';

const BASE = 'https://raw.githubusercontent.com/TracingInsights/DOTD/refs/heads/main/';
const tracingInsightsApiClient = createApiClient({
	baseUrl: BASE,
});

export async function fetchDriverOfTheDay(
	year: number,
	race: string
): Promise<DriverOfTheDay | null> {
	try {
		const path = `${year}/${race}/dotd.json`;

		return await tracingInsightsApiClient.get<DriverOfTheDay>(path);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) return null;
		throw toApiError(error);
	}
}
