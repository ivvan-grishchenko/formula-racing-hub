import { Loader } from '@components/layout/loader';
import { useHomeData } from '@hooks/use-home-data';
import { THEME } from '@lib/theme';
import { useColorScheme } from 'nativewind';
import { useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import DriverFocus from './driver-focus';
import LatestResult from './latest-result';
import NextRace from './next-race';

export function HomeScreen() {
	const { colorScheme } = useColorScheme();
	const tint = THEME[colorScheme === 'dark' ? 'dark' : 'light'].primary;

	const {
		driverOfTheDay,
		isLoading,
		isRefreshing,
		latestRace,
		latestRaceResult,
		nextRace,
		refetch,
	} = useHomeData();

	const onRefresh = useCallback(() => {
		void refetch();
	}, [refetch]);

	if (isLoading) return <Loader />;

	return (
		<View className="flex-1">
			<View className="flex-1">
				<ScrollView
					className="flex-1"
					contentContainerClassName="gap-5 pb-28"
					contentContainerStyle={{ paddingHorizontal: 16 }}
					refreshControl={
						<RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} tintColor={tint} />
					}
					showsVerticalScrollIndicator={false}>
					{nextRace && <NextRace nextMeeting={nextRace} />}

					{latestRace && latestRaceResult && (
						<LatestResult latestRace={latestRace} latestRaceResult={latestRaceResult} />
					)}

					{driverOfTheDay && <DriverFocus driverOfTheDay={driverOfTheDay} />}
				</ScrollView>
			</View>
		</View>
	);
}
