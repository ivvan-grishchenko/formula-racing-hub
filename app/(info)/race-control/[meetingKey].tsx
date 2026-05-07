import type {
	OpenF1Driver,
	OpenF1RaceControl,
	OpenF1Session,
	QueryWrapper,
} from '@api/openf1/types';

import { fetchDriver, fetchRaceControl, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { RaceControlScreen } from '@components/race-control/race-control-screen';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function RaceControlPage() {
	const { meetingKey } = useLocalSearchParams<{ meetingKey: string }>();
	const numericMeetingKey = Number(meetingKey);

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = {
		meeting_key: numericMeetingKey,
	};
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { data: sessions, refetch: refetchSessions } = sessionsQuery;

	const [selectedSessionKey, setSelectedSessionKey] = useState<number | undefined>(
		sessions?.at(-1)?.session_key
	);

	useEffect(() => {
		if (sessions) setSelectedSessionKey(sessions.at(-1)?.session_key);
	}, [sessions]);

	const raceControlQueryObj: QueryWrapper<OpenF1RaceControl> = {
		session_key: selectedSessionKey,
	};
	const raceControlQuery = useQuery({
		enabled: !!selectedSessionKey,
		queryFn: () => fetchRaceControl(raceControlQueryObj),
		queryKey: openf1Keys.raceControl(raceControlQueryObj),
	});

	const driversQueryObj: QueryWrapper<OpenF1Driver> = {
		session_key: selectedSessionKey,
	};
	const driversQuery = useQuery({
		enabled: !!selectedSessionKey,
		queryFn: () => fetchDriver(driversQueryObj),
		queryKey: openf1Keys.drivers(driversQueryObj),
	});

	const {
		data: raceData,
		error: errorRace,
		isLoading: isLoadingRace,
		isRefetching: isRefetchingRace,
		refetch: refetchRace,
	} = raceControlQuery;
	const {
		data: driversData,
		error: errorDrivers,
		isLoading: isLoadingDrivers,
		isRefetching: isRefetchingDrivers,
		refetch: refetchDrivers,
	} = driversQuery;

	const isLoading = isLoadingRace || isLoadingDrivers || sessionsQuery.isLoading;
	const isRefreshing = isRefetchingRace || isRefetchingDrivers;
	const error = errorRace || errorDrivers || null;

	const handleRefresh = useCallback(() => {
		void refetchRace();
		void refetchDrivers();
		void refetchSessions();
	}, [refetchRace, refetchDrivers, refetchSessions]);

	if (isLoading) return <Loader />;

	if (error) return <ErrorDisplay message={error.message} onRetry={handleRefresh} />;

	return (
		raceData &&
		sessions &&
		selectedSessionKey && (
			<RaceControlScreen
				drivers={driversData}
				events={raceData}
				isRefreshing={isRefreshing}
				onRefresh={handleRefresh}
				selectedSessionKey={selectedSessionKey}
				sessions={sessions}
				setSelectedSessionKey={setSelectedSessionKey}
			/>
		)
	);
}
