/** Centralized TanStack Query keys for OpenF1. */
import type {
	OpenF1ChampionshipDriver,
	OpenF1ChampionshipTeam,
	OpenF1Driver,
	OpenF1Lap,
	OpenF1Meeting,
	OpenF1Overtake,
	OpenF1Pit,
	OpenF1Position,
	OpenF1RaceControl,
	OpenF1Session,
	OpenF1SessionResult,
	OpenF1StartingGrid,
	OpenF1Stint,
	OpenF1TeamRadio,
	OpenF1Weather,
	QueryWrapper,
} from '@api/openf1/types';

export const openf1Keys = {
	championshipDrivers: (query: QueryWrapper<OpenF1ChampionshipDriver>) =>
		['championshipDrivers', ...Object.values(query)] as const,
	championshipTeams: (query: QueryWrapper<OpenF1ChampionshipTeam>) =>
		['championshipTeams', ...Object.values(query)] as const,
	drivers: (query: QueryWrapper<OpenF1Driver>) => ['drivers', ...Object.values(query)] as const,
	laps: (query: QueryWrapper<OpenF1Lap>) => ['laps', ...Object.values(query)] as const,
	meetings: (query: QueryWrapper<OpenF1Meeting>) => ['meetings', ...Object.values(query)] as const,
	overtakes: (query: QueryWrapper<OpenF1Overtake>) =>
		['overtakes', ...Object.values(query)] as const,
	pit: (query: QueryWrapper<OpenF1Pit>) => ['pit', ...Object.values(query)] as const,
	position: (query: QueryWrapper<OpenF1Position>) =>
		['position', ...Object.values(query)] as const,
	raceControl: (query: QueryWrapper<OpenF1RaceControl>) =>
		['raceControl', ...Object.values(query)] as const,
	sessionResult: (query: QueryWrapper<OpenF1SessionResult>) =>
		['sessionResult', ...Object.values(query)] as const,
	sessions: (query: QueryWrapper<OpenF1Session>) => ['sessions', ...Object.values(query)] as const,
	startingGrid: (query: QueryWrapper<OpenF1StartingGrid>) =>
		['startingGrid', ...Object.values(query)] as const,
	stints: (query: QueryWrapper<OpenF1Stint>) => ['stints', ...Object.values(query)] as const,
	teamRadio: (query: QueryWrapper<OpenF1TeamRadio>) =>
		['teamRadio', ...Object.values(query)] as const,
	weather: (query: QueryWrapper<OpenF1Weather>) => ['weather', ...Object.values(query)] as const,
};
