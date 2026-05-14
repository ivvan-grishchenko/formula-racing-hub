import type { OpenF1Driver, OpenF1Session } from '@api/openf1/types';

import { fetchDriver, fetchSessions, fetchStartingGrid } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { GLOW_OUTSET } from '@ui/glow';
import { Text } from '@ui/text';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';

export type StartingGridScreenProps = {
	meetingKey: number;
};

export function StartingGridScreen({ meetingKey }: StartingGridScreenProps) {
	const router = useRouter();
	const [selectedSession, setSelectedSession] = useState<null | OpenF1Session>(null);

	const sessionsQueryObj = useMemo(() => ({ meeting_key: meetingKey }), [meetingKey]);
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { refetch: refetchSessions } = sessionsQuery;

	const qualifyingSessions = useMemo(
		() => (sessionsQuery.data ?? []).filter((session) => session.session_type === 'Qualifying'),
		[sessionsQuery.data]
	);

	const selectedSessionKey = selectedSession?.session_key;

	const startingGridQueryObj = useMemo(
		() => ({ session_key: selectedSessionKey }),
		[selectedSessionKey]
	);
	const startingGridQuery = useQuery({
		enabled: !!selectedSessionKey,
		queryFn: () => fetchStartingGrid(startingGridQueryObj),
		queryKey: openf1Keys.startingGrid(startingGridQueryObj),
	});
	const { data: gridData, refetch: refetchGrid } = startingGridQuery;

	const driversQueryObj = useMemo(
		() => ({ session_key: selectedSessionKey }),
		[selectedSessionKey]
	);
	const driversQuery = useQuery({
		enabled: !!selectedSessionKey,
		queryFn: () => fetchDriver(driversQueryObj),
		queryKey: openf1Keys.drivers(driversQueryObj),
	});
	const { refetch: refetchDrivers } = driversQuery;

	const driverMap = useMemo(() => {
		const map = new Map<number, OpenF1Driver>();

		driversQuery.data?.forEach((d) => map.set(d.driver_number, d));

		return map;
	}, [driversQuery.data]);

	const handleRefresh = useCallback(() => {
		void refetchSessions();
		void refetchGrid();
		void refetchDrivers();
	}, [refetchSessions, refetchGrid, refetchDrivers]);

	const isLoading =
		sessionsQuery.isLoading || startingGridQuery.isLoading || driversQuery.isLoading;
	const isRefreshing =
		sessionsQuery.isRefetching || startingGridQuery.isRefetching || driversQuery.isRefetching;
	const error = sessionsQuery.error || startingGridQuery.error || driversQuery.error || null;

	if (isLoading) return <Loader />;

	if (error) return <ErrorDisplay message={error.message} onRetry={handleRefresh} />;

	if (!qualifyingSessions.length)
		return (
			<View className="flex-1 items-center justify-center p-4">
				<Text className="text-center text-muted-foreground">
					No qualifying sessions for this meeting.
				</Text>
			</View>
		);

	if (!selectedSession) {
		const defaultSession = qualifyingSessions[0];

		setSelectedSession(defaultSession);

		return <Loader />;
	}

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
				{qualifyingSessions.map((session) => (
					<View
						className={`rounded-lg px-4 py-2.5 ${selectedSession?.session_key === session.session_key ? 'bg-muted' : 'bg-card'}`}
						key={session.session_key}>
						<Pressable
							className="items-center"
							hitSlop={8}
							onPress={() => setSelectedSession(session)}>
							<Text
								className={`font-jetbrains-bold text-xs ${selectedSession?.session_key === session.session_key ? 'text-foreground' : 'text-muted-foreground'}`}>
								{session.session_name}
							</Text>
						</Pressable>
					</View>
				))}
			</View>

			{!gridData?.length ? (
				<View className="flex-1 items-center justify-center p-4">
					<Text className="text-center text-muted-foreground">
						No grid available for this session.
					</Text>
					<Text className="mt-2 text-center text-sm text-muted-foreground">
						Check back after qualifying.
					</Text>
				</View>
			) : (
				<View className="gap-0">
					{gridData.map((gridEntry) => {
						const driver = driverMap.get(gridEntry.driver_number);
						const colour = driver?.team_colour;
						const isPole = gridEntry.position === 1;

						const handleDriverPress = () => {
							router.push({
								params: {
									driverNumber: String(gridEntry.driver_number),
									meetingKey: String(meetingKey),
								},
								pathname: '/driver/[driverNumber]',
							});
						};

						return (
							<Pressable
								className={cn(
									'flex-row items-center gap-3 border-b border-border py-3',
									isPole && 'pl-0'
								)}
								hitSlop={8}
								key={gridEntry.driver_number}
								onPress={handleDriverPress}>
								{isPole && <View className="h-14 w-1 rounded-sm bg-red-600" />}

								<View className="min-w-[28px]">
									<Text
										className={cn(
											'font-jetbrains-bold-italic text-2xl',
											isPole ? 'text-foreground' : 'text-muted-foreground'
										)}>
										{gridEntry.position}
									</Text>
								</View>

								<View
									className="h-10 w-10 rounded-full"
									style={colour ? { backgroundColor: `#${colour}` } : undefined}
								/>

								<View className="min-w-0 flex-1">
									<Text className="font-jetbrains-bold text-sm" numberOfLines={1}>
										{driver?.name_acronym || `#${gridEntry.driver_number}`}
									</Text>
									{driver && (
										<Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
											{driver.team_name}
										</Text>
									)}
								</View>

								<View className="min-w-[70px] items-end gap-0.5">
									<Text className="font-jetbrains-bold text-sm text-foreground">
										{gridEntry.lap_duration?.toFixed(3) || '--'}
									</Text>
									<Text className="font-jetbrains-regular text-[11px] text-muted-foreground">
										Lap Time
									</Text>
								</View>

								{isPole && (
									<View className="rounded-md border border-red-600 bg-red-900/20 px-2 py-1">
										<Text className="font-jetbrains-bold text-xs text-foreground">POLE</Text>
									</View>
								)}
							</Pressable>
						);
					})}
				</View>
			)}
		</ScrollView>
	);
}
