import type {
	OpenF1Driver,
	OpenF1Meeting,
	OpenF1Session,
	OpenF1SessionResult,
	QueryWrapper,
} from '@api/openf1/types';

import { fetchDriver, fetchMeetings, fetchSessionResult, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { fetchDriverOfTheDay } from '@api/TracingInsights/client';
import { tracingInsightsKeys } from '@api/TracingInsights/query-keys';
import { useQueries, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';

export type LatestRaceResultRow = Pick<OpenF1Driver, 'name_acronym' | 'team_colour'> &
	Pick<OpenF1SessionResult, 'duration' | 'gap_to_leader' | 'number_of_laps'>;

type HomeData = {
	driverOfTheDay?: null | OpenF1Driver;
	error: Error | null;
	isLoading: boolean;
	isRefreshing: boolean;
	latestRace?: null | OpenF1Session;
	latestRaceResult?: LatestRaceResultRow[] | null;
	nextRace?: null | OpenF1Meeting;
	refetch: () => Promise<void>;
};

const IGNORE_COUNTRY_NAMES = ['Bahrain', 'Saudi Arabia'];

/**
 * OpenF1 data for the home screen: next meeting, latest completed race, podium, drivers, grid, race control feed.
 */
export function useHomeData(): HomeData {
	const year = useMemo(() => new Date().getFullYear(), []);

	const nextRaceQueryObj: QueryWrapper<OpenF1Meeting> = {
		'date_start>': format(Date.now(), 'yyyy-MM-dd'),
		year,
	};
	const nextRaceQuery = useQuery({
		queryFn: () => fetchMeetings(nextRaceQueryObj),
		queryKey: openf1Keys.meetings(nextRaceQueryObj),
		select: (meetings) =>
			meetings.filter((meeting) => !IGNORE_COUNTRY_NAMES.includes(meeting.country_name)).at(0) ||
			null,
	});
	const { data: nextRace, refetch: refetchNextRace } = nextRaceQuery;

	const latestRaceQueryObj: QueryWrapper<OpenF1Session> = {
		'date_start<': format(Date.now(), 'yyyy-MM-dd'),
		is_cancelled: false,
		session_name: 'Race',
		year,
	};
	const latestRaceQuery = useQuery({
		queryFn: () => fetchSessions(latestRaceQueryObj),
		queryKey: openf1Keys.sessions(latestRaceQueryObj),
		select: (sessions) => sessions.at(-1),
	});
	const { data: latestRace, refetch: refetchLatestRace } = latestRaceQuery;

	const latestRaceMeetingQueryObj: QueryWrapper<OpenF1Meeting> = {
		meeting_key: latestRace?.meeting_key,
	};
	const latestRaceMeetingQuery = useQuery({
		enabled: !!latestRace?.meeting_key,
		queryFn: () => fetchMeetings(latestRaceMeetingQueryObj),
		queryKey: openf1Keys.meetings(latestRaceMeetingQueryObj),
		select: (meetings) => meetings.at(0) || null,
	});
	const { data: latestRaceMeeting, refetch: refetchLatestRaceMeeting } = latestRaceMeetingQuery;

	const latestRaceResultQueryObj: QueryWrapper<OpenF1SessionResult> = {
		'position<': 3,
		session_key: latestRaceQuery.data?.session_key,
	};
	const latestRaceResultQuery = useQuery({
		enabled: !!latestRaceQuery.data?.session_key,
		queryFn: () => fetchSessionResult(latestRaceResultQueryObj),
		queryKey: openf1Keys.sessionResult(latestRaceResultQueryObj),
		select: (results) => [...results].sort((a, b) => a.position - b.position),
	});
	const { data: latestRaceResult, refetch: refetchLatestRaceResult } = latestRaceResultQuery;

	const driversQuery = useQueries({
		queries: latestRaceResult
			? latestRaceResult.map((result) => {
					const driverQueryObj: QueryWrapper<OpenF1Driver> = {
						driver_number: result.driver_number,
						session_key: result.session_key,
					};

					return {
						queryFn: () => fetchDriver(driverQueryObj),
						queryKey: openf1Keys.drivers(driverQueryObj),
						select: (drivers: OpenF1Driver[]) => drivers.at(0) || null,
					};
				})
			: [],
	});

	const driversData = driversQuery.map((driverQuery) => driverQuery.data);
	const driversPending = driversQuery.some((q) => q.isPending);
	const driversRefetching = driversQuery.some((q) => q.isRefetching);
	const driverQueryError = driversQuery.find((q) => q.error)?.error ?? null;
	const driversRefetch = driversQuery.map((driverQuery) => driverQuery.refetch);

	const driverOfTheDayFullNameQuery = useQuery({
		enabled: !!latestRaceMeeting?.meeting_name,
		queryFn: () => fetchDriverOfTheDay(year, latestRaceMeeting?.meeting_name || ''),
		queryKey: tracingInsightsKeys.driverOfTheDay(year, latestRaceMeeting?.meeting_name || ''),
		select: (data) => data.winner,
	});
	const { data: driverOfTheDayFullName, refetch: refetchDriverOfTheDayFullName } =
		driverOfTheDayFullNameQuery;

	const fetchedDriverOfTheDay = driversData.find((driver) => {
		const [firstName, lastName] = driverOfTheDayFullName?.split(' ') || [];

		return driver?.first_name === firstName && driver?.last_name === lastName;
	});

	const driverOfTheDayQueryObj: QueryWrapper<OpenF1Driver> = {
		first_name: driverOfTheDayFullName?.split(' ').at(0),
		last_name: driverOfTheDayFullName?.split(' ').at(1),
		session_key: latestRace?.session_key,
	};
	const driverOfTheDayQuery = useQuery({
		enabled: !fetchedDriverOfTheDay,
		queryFn: () => fetchDriver(driverOfTheDayQueryObj),
		queryKey: openf1Keys.drivers(driverOfTheDayQueryObj),
		select: (driver) => driver.at(0) || null,
	});
	const { data: driverOfTheDay, refetch: refetchDriverOfTheDay } = driverOfTheDayQuery;

	const latestRaceResultMerged = useMemo(() => {
		if (!latestRaceResult?.length) return null;

		if (driversQuery.length !== latestRaceResult.length) return null;

		return latestRaceResult.reduce((rows, result) => {
			const driver = driversData.find((driver) => driver?.driver_number === result.driver_number);

			if (!driver) return rows;

			rows.push({
				duration: result.duration,
				gap_to_leader: result.gap_to_leader,
				name_acronym: driver.name_acronym,
				number_of_laps: result.number_of_laps,
				team_colour: driver.team_colour,
			});

			return rows;
		}, [] as LatestRaceResultRow[]);
	}, [driversData, driversQuery.length, latestRaceResult]);

	const isLoading =
		nextRaceQuery.isPending ||
		latestRaceQuery.isPending ||
		latestRaceMeetingQuery.isPending ||
		latestRaceResultQuery.isPending ||
		driversPending ||
		driverOfTheDayFullNameQuery.isPending ||
		driverOfTheDayQuery.isPending;

	const isRefreshing =
		nextRaceQuery.isRefetching ||
		latestRaceQuery.isRefetching ||
		latestRaceMeetingQuery.isRefetching ||
		latestRaceResultQuery.isRefetching ||
		driversRefetching ||
		driverOfTheDayFullNameQuery.isRefetching ||
		driverOfTheDayQuery.isRefetching;

	const error =
		nextRaceQuery.error ??
		latestRaceQuery.error ??
		latestRaceMeetingQuery.error ??
		latestRaceResultQuery.error ??
		driverQueryError ??
		driverOfTheDayFullNameQuery.error ??
		driverOfTheDayQuery.error ??
		null;

	const refetch = useCallback(async () => {
		await Promise.all([
			refetchNextRace(),
			refetchLatestRace(),
			refetchLatestRaceMeeting(),
			refetchLatestRaceResult(),
			...driversRefetch.map((r) => r()),
			refetchDriverOfTheDayFullName(),
			refetchDriverOfTheDay(),
		]);
	}, [
		refetchNextRace,
		refetchLatestRace,
		refetchLatestRaceMeeting,
		refetchLatestRaceResult,
		driversRefetch,
		refetchDriverOfTheDayFullName,
		refetchDriverOfTheDay,
	]);

	return {
		driverOfTheDay: fetchedDriverOfTheDay || driverOfTheDay,
		error,
		isLoading,
		isRefreshing,
		latestRace,
		latestRaceResult: latestRaceResultMerged,
		nextRace,
		refetch,
	};
}
