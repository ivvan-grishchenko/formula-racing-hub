import { ApiError, createApiClient, toApiError } from '@lib/http';

import type { ApiSportsCircuit, Circuit } from './types';

const CIRCUIT_WORKER_URL =
	process.env.EXPO_PUBLIC_CIRCUIT_WORKER_URL ??
	'https://formula-racing-hub-sports-worker.bben-rasha.workers.dev';
const WORKER_SECRET = process.env.EXPO_PUBLIC_WORKER_SECRET ?? '';

const circuitApiClient = createApiClient({
	baseUrl: CIRCUIT_WORKER_URL,
	defaultHeaders: {
		Accept: 'application/json',
		'X-Worker-Secret': WORKER_SECRET,
	},
	timeoutMs: 10_000,
});

export async function fetchCircuitByName(name: string): Promise<Circuit | null> {
	try {
		const response = await circuitApiClient.get<ApiSportsCircuit[]>('circuits', {
			query: { search: name },
		});

		return response.length > 0 ? response[0] : null;
	} catch (error) {
		throw handleError(error);
	}
}

function handleError(err: unknown): ApiError {
	if (err instanceof ApiError) return err;

	return toApiError(err);
}
