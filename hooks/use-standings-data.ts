import type {
	OpenF1ChampionshipDriver,
	OpenF1ChampionshipTeam,
	OpenF1Driver,
	QueryWrapper,
} from '@api/openf1/types';

import { fetchChampionshipDrivers, fetchChampionshipTeams, fetchDriver } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

export type ConstructorStandingRow = OpenF1ChampionshipTeam & {
	team_colour?: string;
};

export type DriverStandingRow = OpenF1ChampionshipDriver & {
	driver: null | OpenF1Driver;
};

export type StandingsData = {
	constructorRows: ConstructorStandingRow[];
	driverRows: DriverStandingRow[];
	error: Error | null;
	isLoading: boolean;
	isRefreshing: boolean;
	refetch: () => Promise<void>;
};

type UseStandingsDataProps = {
	session_key?: number;
};

/**
 * Driver and constructor championship standings from OpenF1 `championship_*` endpoints for the latest
 * completed race session in the selected season.
 */
export function useStandingsData({ session_key }: UseStandingsDataProps): StandingsData {
	const driversQueryObj: QueryWrapper<OpenF1Driver> = { session_key };
	const driversQuery = useQuery({
		enabled: !!session_key,
		queryFn: () => fetchDriver(driversQueryObj),
		queryKey: openf1Keys.drivers(driversQueryObj),
	});
	const { data: drivers, refetch: refetchDrivers } = driversQuery;

	const championshipDriversQueryObj: QueryWrapper<OpenF1ChampionshipDriver> = { session_key };
	const championshipDriversQuery = useQuery({
		enabled: !!session_key,
		queryFn: () => fetchChampionshipDrivers(championshipDriversQueryObj),
		queryKey: openf1Keys.championshipDrivers(championshipDriversQueryObj),
	});
	const { data: championshipDrivers, refetch: refetchChampionshipDrivers } =
		championshipDriversQuery;

	const championshipTeamsQueryObj: QueryWrapper<OpenF1ChampionshipTeam> = { session_key };
	const championshipTeamsQuery = useQuery({
		enabled: !!session_key,
		queryFn: () => fetchChampionshipTeams(championshipTeamsQueryObj),
		queryKey: openf1Keys.championshipTeams(championshipTeamsQueryObj),
	});
	const { data: championshipTeams, refetch: refetchChampionshipTeams } = championshipTeamsQuery;

	const driverByNumber = useMemo(() => {
		const map = new Map<number, OpenF1Driver>();

		for (const driver of drivers || []) {
			map.set(driver.driver_number, driver);
		}

		return map;
	}, [drivers]);

	const teamColourByName = useMemo(() => {
		const map = new Map<string, string>();

		for (const driver of drivers || []) {
			if (!map.has(driver.team_name)) map.set(driver.team_name, driver.team_colour);
		}

		return map;
	}, [drivers]);

	const driverRows = useMemo((): DriverStandingRow[] => {
		const rows = championshipDrivers || [];

		if (!rows.length) return [];

		return [...rows]
			.sort((a, b) => a.position_current - b.position_current)
			.map((row) => ({
				...row,
				driver: driverByNumber.get(row.driver_number) ?? null,
			}));
	}, [championshipDrivers, driverByNumber]);

	const constructorRows = useMemo((): ConstructorStandingRow[] => {
		const rows = championshipTeams || [];

		if (!rows.length) return [];

		return [...rows]
			.sort((a, b) => a.position_current - b.position_current)
			.map((row) => ({
				...row,
				team_colour: teamColourByName.get(row.team_name),
			}));
	}, [championshipTeams, teamColourByName]);

	const error =
		driversQuery.error ?? championshipDriversQuery.error ?? championshipTeamsQuery.error ?? null;

	const isLoading =
		driversQuery.isPending ||
		championshipDriversQuery.isPending ||
		championshipTeamsQuery.isPending;

	const isRefreshing =
		driversQuery.isRefetching ||
		championshipDriversQuery.isRefetching ||
		championshipTeamsQuery.isRefetching;

	const refetch = useCallback(async () => {
		await Promise.all([refetchDrivers(), refetchChampionshipDrivers(), refetchChampionshipTeams()]);
	}, [refetchDrivers, refetchChampionshipDrivers, refetchChampionshipTeams]);

	return {
		constructorRows,
		driverRows,
		error,
		isLoading,
		isRefreshing,
		refetch,
	};
}
