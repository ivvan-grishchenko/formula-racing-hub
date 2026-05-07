import type { OpenF1Meeting, OpenF1Session, QueryWrapper } from '@api/openf1/types';

import { fetchMeetings, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { DriverStandingLine } from '@components/standings/driver-standing-line';
import { useStandingsData } from '@hooks/use-standings-data';
import { THEME } from '@lib/theme';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@ui/card';
import { GLOW_OUTSET } from '@ui/glow';
import { UniversalSelect } from '@ui/select';
import { Text } from '@ui/text';
import { format } from 'date-fns';
import { useColorScheme } from 'nativewind';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { ConstructorStandingLine } from './constructor-standing-line';
import { StandingsFilter } from './standings-filter';

export type StandingsSegment = 'constructors' | 'drivers';

export function StandingsScreen() {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [segment, setSegment] = useState<StandingsSegment>('drivers');

	const years = useMemo(() => {
		const currentYear = new Date().getFullYear();
		const years: number[] = [];

		for (let year = currentYear; year >= 2023; year--) years.push(year);

		return years;
	}, []);

	const meetingsQueryObj: QueryWrapper<OpenF1Meeting> = useMemo(
		() => ({
			'date_start<': format(Date.now(), 'yyyy-MM-dd'),
			is_cancelled: false,
			year,
		}),
		[year]
	);

	const meetingsQuery = useQuery({
		queryFn: () => fetchMeetings(meetingsQueryObj),
		queryKey: openf1Keys.meetings(meetingsQueryObj),
		staleTime: 0,
	});
	const { data: meetings, refetch: refetchMeetings } = meetingsQuery;

	const [meetingKey, setMeetingKey] = useState<number | undefined>(meetings?.at(-1)?.meeting_key);

	useEffect(() => {
		if (meetings) setMeetingKey(meetings.at(-1)?.meeting_key);
	}, [meetings]);

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = useMemo(
		() => ({
			meeting_key: meetingKey,
		}),
		[meetingKey]
	);
	const sessionsQuery = useQuery({
		enabled: !!meetingKey,
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
		select: (sessions) => sessions.at(-1)?.session_key,
	});
	const { data: sessionKey, refetch: refetchSessions } = sessionsQuery;

	const { constructorRows, driverRows, error, isLoading, isRefreshing, refetch } = useStandingsData(
		{ session_key: sessionKey }
	);

	const onRefresh = useCallback(() => {
		void refetchMeetings();
		void refetchSessions();
		void refetch();
	}, [refetch, refetchMeetings, refetchSessions]);

	const totalLoading = meetingsQuery.isLoading || sessionsQuery.isLoading || isLoading;
	const totalError = meetingsQuery.error || sessionsQuery.error || error || null;
	const totalRefetching = meetingsQuery.isRefetching || sessionsQuery.isRefetching || isRefreshing;

	if (totalLoading) return <Loader />;

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="gap-4 pb-10"
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}
				refreshControl={
					<RefreshControl
						onRefresh={onRefresh}
						refreshing={totalRefetching}
						tintColor={palette.primary}
					/>
				}
				showsVerticalScrollIndicator={false}>
				<View className="flex-1 flex-row justify-between gap-4 overflow-hidden">
					<UniversalSelect
						className="w-[140px]"
						labelKeyExtractor={(option) => `${option} season`.toUpperCase()}
						onValueChange={(value) => setYear(Number(value))}
						options={years}
						value={String(year)}
						valueKeyExtractor={(option) => `${option}`}
					/>
					{meetingKey && meetings && (
						<UniversalSelect
							className="w-full flex-1"
							labelKeyExtractor={(option) => `${option.country_name}, ${option.circuit_short_name}`}
							onValueChange={(value) => setMeetingKey(Number(value))}
							options={meetings}
							value={String(meetingKey)}
							valueKeyExtractor={(option) => String(option.meeting_key)}
						/>
					)}
				</View>

				{totalError ? (
					<ErrorDisplay message={totalError.message} onRetry={refetch} />
				) : (
					<Fragment>
						<StandingsFilter segment={segment} setSegment={setSegment} />

						<Card className="gap-0 py-4">
							<CardHeader className="flex-row justify-between pb-2">
								<Text variant="muted">Position</Text>
								<Text variant="muted">Points</Text>
							</CardHeader>
							<CardContent className="gap-0 px-6">
								{segment === 'drivers'
									? driverRows.map((row) => (
											<DriverStandingLine key={row.driver_number} row={row} />
										))
									: constructorRows.map((row) => (
											<ConstructorStandingLine key={row.team_name} row={row} />
										))}
							</CardContent>
						</Card>
					</Fragment>
				)}
			</ScrollView>
		</View>
	);
}
