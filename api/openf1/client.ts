import { baseFetch } from '@lib/http';
import { SlidingWindowThrottle } from '@lib/rate-limit';
import { stringify } from 'qs';

import type {
	OpenF1Driver,
	OpenF1Meeting,
	OpenF1RaceControl,
	OpenF1Session,
	OpenF1SessionResult,
	QueryWrapper,
} from './types';

const BASE = 'https://api.openf1.org/v1';
const openF1Throttle = new SlidingWindowThrottle(3, 1000);

export function fetchDriver(queryRaw: QueryWrapper<OpenF1Driver>): Promise<OpenF1Driver[]> {
	try {
		const query = stringify(queryRaw, { encode: false });

		return openF1Throttle.run(() => baseFetch<OpenF1Driver[]>(BASE, `/drivers?${query}`));
	} catch {
		return Promise.resolve([]);
	}
}

export function fetchMeetings(queryRaw: QueryWrapper<OpenF1Meeting>): Promise<OpenF1Meeting[]> {
	try {
		const query = stringify(queryRaw, { encode: false });

		return openF1Throttle.run(() => baseFetch<OpenF1Meeting[]>(BASE, `/meetings?${query}`));
	} catch {
		return Promise.resolve([]);
	}
}

export function fetchRaceControl(
	queryRaw: QueryWrapper<OpenF1RaceControl>
): Promise<OpenF1RaceControl[]> {
	try {
		const query = stringify(queryRaw, { encode: false });

		return openF1Throttle.run(() => baseFetch<OpenF1RaceControl[]>(BASE, `/race_control?${query}`));
	} catch {
		return Promise.resolve([]);
	}
}

export function fetchSessionResult(
	queryRaw: QueryWrapper<OpenF1SessionResult>
): Promise<OpenF1SessionResult[]> {
	try {
		const query = stringify(queryRaw, { encode: false });

		return openF1Throttle.run(() =>
			baseFetch<OpenF1SessionResult[]>(BASE, `/session_result?${query}`)
		);
	} catch {
		return Promise.resolve([]);
	}
}

export function fetchSessions(queryRaw: QueryWrapper<OpenF1Session>): Promise<OpenF1Session[]> {
	try {
		const query = stringify(queryRaw, { encode: false });

		return openF1Throttle.run(() => baseFetch<OpenF1Session[]>(BASE, `/sessions?${query}`));
	} catch {
		return Promise.resolve([]);
	}
}
