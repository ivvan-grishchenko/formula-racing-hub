import type { OpenF1Session } from '@api/openf1/types';
import type { DriverStandingRow } from '@hooks/use-standings-data';

import { fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { YearSelector } from '@components/calendar/year-selector';
import { Loader } from '@components/layout/loader';
import { DriverStandingLine } from '@components/standings/driver-standing-line';
import { useStandingsData } from '@hooks/use-standings-data';
import { THEME } from '@lib/theme';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@ui/card';
import { GLOW_OUTSET } from '@ui/glow';
import { Text } from '@ui/text';
import { format } from 'date-fns';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { ConstructorStandingLine } from './constructor-standing-line';
import { SessionSelector } from './session-selector';
import { StandingsFilter } from './standings-filter';

export type StandingsSegment = 'constructors' | 'drivers';

export function StandingsScreen() {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [segment, setSegment] = useState<StandingsSegment>('drivers');

	const sessionsQueryObj = {
		'date_start<': format(Date.now(), 'yyyy-MM-dd'),
		is_cancelled: false,
		session_name: 'Race',
		year,
	};
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { data: sessions, refetch: refetchSessions } = sessionsQuery;

	useEffect(() => {
		setSession(sessions?.at(-1));
	}, [sessions]);

	const [session, setSession] = useState<OpenF1Session | undefined>(sessions?.at(-1));

	const { constructorRows, driverRows, error, isLoading, isRefreshing, refetch } = useStandingsData(
		{ session_key: session?.session_key }
	);

	const onRefresh = useCallback(() => {
		void refetch();
		void refetchSessions();
	}, [refetch, refetchSessions]);

	if (isLoading || sessionsQuery.isPending) return <Loader />;

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="gap-4 pb-10"
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}
				refreshControl={
					<RefreshControl
						onRefresh={onRefresh}
						refreshing={isRefreshing}
						tintColor={palette.primary}
					/>
				}
				showsVerticalScrollIndicator={false}>
				<View className="flex-row justify-between gap-4">
					<YearSelector className="w-[160px]" onSelectedYearChange={setYear} selectedYear={year} />
					{session && sessions && (
						<SessionSelector session={session} sessions={sessions} setSession={setSession} />
					)}
				</View>

				<StandingsFilter segment={segment} setSegment={setSegment} />

				{error ? (
					<Text className="font-jetbrains-regular text-sm text-destructive">
						Could not load standings. Pull to retry.
					</Text>
				) : null}

				<Card className="gap-0 py-4">
					<CardHeader className="flex-row justify-between pb-2">
						<Text variant="muted">Position</Text>
						<Text variant="muted">Points</Text>
					</CardHeader>
					<CardContent className="gap-0 px-6">
						{segment === 'drivers'
							? driverRows.map((row) => <DriverStandingLine key={row.driver_number} row={row} />)
							: constructorRows.map((row) => (
									<ConstructorStandingLine key={row.team_name} row={row} />
								))}
					</CardContent>
				</Card>
			</ScrollView>
		</View>
	);
}
