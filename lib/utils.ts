import type { OpenF1SessionResult } from '@api/openf1/types';

import { type ClassValue, clsx } from 'clsx';
import { addSeconds, format, intervalToDuration } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const QUALIFYING_SESSION_TYPE = 'qualifying';

export function formatDurationTime(
	duration: OpenF1SessionResult['duration'],
	sessionType: string
): string {
	function formatDuration(totalSeconds: number): string {
		const ms = Math.round((totalSeconds % 1) * 1000);
		const duration = intervalToDuration({ end: Math.floor(totalSeconds) * 1000, start: 0 });

		// Helper to ensure two-digit padding
		const pad = (n: number | undefined) => (n || 0).toString().padStart(2, '0');

		// Format: H:mm:ss.SSS
		// Use duration.hours directly (no padding) for the first unit
		return `${duration.hours || 0}:${pad(duration.minutes)}:${pad(duration.seconds)}.${ms.toString().padStart(3, '0')}`;
	}

	if (Array.isArray(duration))
		return sessionType.toLocaleLowerCase() === QUALIFYING_SESSION_TYPE
			? formatDuration(findLastNonNull(duration) || 0)
			: 'unknown';

	return formatDuration(duration);
}

export function formatGapToLeaderTime(
	leaderDuration: OpenF1SessionResult['duration'],
	driverDuration: OpenF1SessionResult['duration'],
	gapToLeader: OpenF1SessionResult['gap_to_leader'],
	sessionType: string
): string {
	if (typeof gapToLeader === 'string') return gapToLeader;

	function formatGapToLeader(totalGapToLeader: number) {
		const totalSeconds = addSeconds(new Date(0), totalGapToLeader);

		return `+${format(totalSeconds, 'ss.SSS')}`;
	}

	if (Array.isArray(gapToLeader))
		return sessionType.toLocaleLowerCase() === QUALIFYING_SESSION_TYPE
			? formatGapToLeader(
					Number(findLastNonNull(driverDuration as number[])) -
						Number(findLastNonNull(leaderDuration as number[]))
				)
			: 'unknown';

	return formatGapToLeader(gapToLeader);
}

function findLastNonNull(arr: number[]): null | number {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] !== null) return arr[i];
	}

	return null;
}

export const TYRE_COLOURS: Record<string, string> = {
	SOFT: '#DC0000',
	MEDIUM: '#FFD900',
	HARD: '#FFFFFF',
	INTERMEDIATE: '#43B02A',
	WET: '#1E90FF',
};

export function getTyreColour(compound: string): string {
	return TYRE_COLOURS[compound.toUpperCase()] ?? '#888888';
}
