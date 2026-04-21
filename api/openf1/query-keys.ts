/** Centralized TanStack Query keys for OpenF1. */
import type {
	OpenF1ChampionshipDriver,
	OpenF1ChampionshipTeam,
	OpenF1Driver,
	OpenF1Meeting,
	OpenF1RaceControl,
	OpenF1Session,
	OpenF1SessionResult,
	QueryWrapper,
} from '@api/openf1/types';

export const openf1Keys = {
	championshipDrivers: (query: QueryWrapper<OpenF1ChampionshipDriver>) =>
		['championshipDrivers', ...Object.values(query)] as const,
	championshipTeams: (query: QueryWrapper<OpenF1ChampionshipTeam>) =>
		['championshipTeams', ...Object.values(query)] as const,
	drivers: (query: QueryWrapper<OpenF1Driver>) => ['drivers', ...Object.values(query)] as const,
	meetings: (query: QueryWrapper<OpenF1Meeting>) => ['meetings', ...Object.values(query)] as const,
	raceControl: (query: QueryWrapper<OpenF1RaceControl>) =>
		['raceControl', ...Object.values(query)] as const,
	sessionResult: (query: QueryWrapper<OpenF1SessionResult>) =>
		['sessionResult', ...Object.values(query)] as const,
	sessions: (query: QueryWrapper<OpenF1Session>) => ['sessions', ...Object.values(query)] as const,
};
