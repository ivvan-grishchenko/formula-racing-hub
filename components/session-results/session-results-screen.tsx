import type {
	OpenF1Driver,
	OpenF1Session,
	OpenF1SessionResult,
	OpenF1Weather,
	QueryWrapper,
} from '@api/openf1/types';

import { fetchDriver, fetchSessionResult, fetchWeather } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { DriverResultRow } from '@components/session-results/driver-result-row';
import { SessionResultsHeader } from '@components/session-results/session-results-header';
import { useQuery } from '@tanstack/react-query';
import { GLOW_OUTSET } from '@ui/glow';
import { Text } from '@ui/text';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';

export type SessionResultsScreenProps = {
	onRefresh: () => void;
	sessions: OpenF1Session[];
};

export function SessionResultsScreen({ onRefresh, sessions }: SessionResultsScreenProps) {
	const [selectedTab, setSelectedTab] = useState(sessions[0].session_name);

	const sessionForTab = useMemo(
		() => sessions.find((s) => s.session_name === selectedTab),
		[sessions, selectedTab]
	);

	const activeSessionKey = sessionForTab?.session_key;

	const resultsQueryObj: QueryWrapper<OpenF1SessionResult> = { session_key: activeSessionKey };
	const resultsQuery = useQuery({
		enabled: !!activeSessionKey,
		queryFn: () => fetchSessionResult(resultsQueryObj),
		queryKey: openf1Keys.sessionResult(resultsQueryObj),
	});
	const { data: results, refetch: refetchResults } = resultsQuery;

	const driversQueryObj: QueryWrapper<OpenF1Driver> = { session_key: activeSessionKey };
	const driversQuery = useQuery({
		enabled: !!activeSessionKey,
		queryFn: () => fetchDriver(driversQueryObj),
		queryKey: openf1Keys.drivers(driversQueryObj),
	});
	const { data: drivers, refetch: refetchDrivers } = driversQuery;

	const weatherQueryObj: QueryWrapper<OpenF1Weather> = { session_key: activeSessionKey };
	const weatherQuery = useQuery({
		enabled: !!activeSessionKey,
		queryFn: () => fetchWeather(weatherQueryObj),
		queryKey: openf1Keys.weather(weatherQueryObj),
		select: (data) => data.at(0) || null,
	});
	const { data: weather, refetch: refetchWeather } = weatherQuery;

	const isLoading = resultsQuery.isLoading || driversQuery.isLoading || weatherQuery.isLoading;
	const isRefreshing =
		resultsQuery.isRefetching || driversQuery.isRefetching || weatherQuery.isRefetching;
	const error = resultsQuery.error || driversQuery.error || weatherQuery.error || null;

	const driverMap = useMemo(() => {
		const map = new Map<number, OpenF1Driver>();

		drivers?.forEach((d) => map.set(d.driver_number, d));

		return map;
	}, [drivers]);

	const handleRefresh = useCallback(() => {
		onRefresh();
		void refetchResults();
		void refetchDrivers();
		void refetchWeather();
	}, [onRefresh, refetchResults, refetchDrivers, refetchWeather]);

	if (isLoading) return <Loader />;

	if (error) return <ErrorDisplay message={error.message} onRetry={handleRefresh} />;

	return (
		<ScrollView
			className="flex-1"
			contentContainerClassName="gap-4 pb-10"
			contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}
			refreshControl={
				<RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} tintColor="white" />
			}
			showsVerticalScrollIndicator={false}>
			<View className="flex-row flex-wrap gap-2">
				{sessions.map(({ session_name }, index) => (
					<View
						className={`rounded-lg px-4 py-2.5 ${selectedTab === session_name ? 'bg-muted' : 'bg-card'}`}
						key={`${session_name}-${index}`}>
						<Pressable
							className="items-center"
							hitSlop={8}
							onPress={() => setSelectedTab(session_name)}>
							<Text
								className={`font-jetbrains-bold text-xs ${selectedTab === session_name ? 'text-foreground' : 'text-muted-foreground'}`}>
								{session_name}
							</Text>
						</Pressable>
					</View>
				))}
			</View>

			{sessionForTab && weather && (
				<SessionResultsHeader session={sessionForTab} weather={weather} />
			)}

			<View className="gap-0">
				{sessionForTab &&
					results?.map((result) => (
						<DriverResultRow
							driver={driverMap.get(result.driver_number)}
							isPolePosition={result.position === 1}
							key={result.driver_number}
							leaderDuration={results[0].duration}
							result={result}
							session={sessionForTab}
						/>
					))}
			</View>
		</ScrollView>
	);
}
