import { ApiError, createApiClient, toApiError } from '@lib/http';
import { SlidingWindowThrottle } from '@lib/rate-limit';

import type {
	OpenF1ChampionshipDriver,
	OpenF1ChampionshipTeam,
	OpenF1Driver,
	OpenF1Meeting,
	OpenF1RaceControl,
	OpenF1Session,
	OpenF1SessionResult,
	OpenF1StartingGrid,
	OpenF1Weather,
	QueryWrapper,
} from './types';

const BASE = 'https://api.openf1.org/v1/';
const openF1Throttle = new SlidingWindowThrottle(3, 1000);
const openF1ApiClient = createApiClient({
	baseUrl: BASE,
	defaultHeaders: { Accept: 'application/json' },
	timeoutMs: 8_000,
});

export async function fetchChampionshipDrivers(
	queryRaw: QueryWrapper<OpenF1ChampionshipDriver>
): Promise<OpenF1ChampionshipDriver[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1ChampionshipDriver[]>('championship_drivers', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchChampionshipTeams(
	queryRaw: QueryWrapper<OpenF1ChampionshipTeam>
): Promise<OpenF1ChampionshipTeam[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1ChampionshipTeam[]>('championship_teams', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchDriver(queryRaw: QueryWrapper<OpenF1Driver>): Promise<OpenF1Driver[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1Driver[]>('drivers', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchMeetings(
	queryRaw: QueryWrapper<OpenF1Meeting>
): Promise<OpenF1Meeting[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1Meeting[]>('meetings', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchRaceControl(
	queryRaw: QueryWrapper<OpenF1RaceControl>
): Promise<OpenF1RaceControl[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1RaceControl[]>('race_control', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchSessionResult(
	queryRaw: QueryWrapper<OpenF1SessionResult>
): Promise<OpenF1SessionResult[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1SessionResult[]>('session_result', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchStartingGrid(
	queryRaw: QueryWrapper<OpenF1StartingGrid>
): Promise<OpenF1StartingGrid[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1StartingGrid[]>('starting_grid', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchSessions(
	queryRaw: QueryWrapper<OpenF1Session>
): Promise<OpenF1Session[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1Session[]>('sessions', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

export async function fetchWeather(
	queryRaw: QueryWrapper<OpenF1Weather>
): Promise<OpenF1Weather[]> {
	try {
		return await openF1Throttle.run(() =>
			openF1ApiClient.get<OpenF1Weather[]>('weather', { query: queryRaw })
		);
	} catch (error) {
		throw handleError(error);
	}
}

function handleError(err: unknown): ApiError {
	if (
		err instanceof ApiError &&
		typeof err.details === 'object' &&
		err.details !== null &&
		'detail' in err.details
	) {
		const errorMessage = String(err.details.detail).startsWith('Live F1 session in progress')
			? 'Live session is currently in progress. Please try again later'
			: String(err.details.detail);

		return new ApiError(errorMessage, 'http', 401, err.details);
	}

	return toApiError(err);
}
