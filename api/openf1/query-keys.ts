/** Centralized TanStack Query keys for OpenF1. */
import type {
	OpenF1Driver,
	OpenF1Meeting,
	OpenF1RaceControl,
	OpenF1Session,
	OpenF1SessionResult,
	QueryWrapper,
} from '@api/openf1/types';

export const openf1Keys = {
	drivers: (query: QueryWrapper<OpenF1Driver>) => ['drivers', ...Object.values(query)] as const,
	meetings: (query: QueryWrapper<OpenF1Meeting>) => ['meetings', ...Object.values(query)] as const,
	raceControl: (query: QueryWrapper<OpenF1RaceControl>) =>
		['raceControl', ...Object.values(query)] as const,
	sessionResult: (query: QueryWrapper<OpenF1SessionResult>) =>
		['sessionResult', ...Object.values(query)] as const,
	sessions: (query: QueryWrapper<OpenF1Session>) => ['sessions', ...Object.values(query)] as const,
};
