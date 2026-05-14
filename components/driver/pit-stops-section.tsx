import type { OpenF1Pit } from '@api/openf1/types';

import { fetchPit } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { Text } from '@components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { Skeleton } from 'react-native-reusables';

import { useDriverContext } from './driver-context';

type PitStopsSectionInnerProps = {
	isLoading: boolean;
	pitStops: OpenF1Pit[];
};

export function PitStopsSection() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const pitQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () => fetchPit({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.pit({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
	});

	const isLoading = pitQuery.isLoading;
	const pitStops = pitQuery.data ?? [];

	return <PitStopsSectionInner isLoading={isLoading} pitStops={pitStops} />;
}

function formatPitDuration(seconds: number): string {
	if (seconds < 25) {
		return `${seconds.toFixed(1)}s`;
	}

	return `${(seconds / 1000).toFixed(1)}s`;
}

function PitStopsSectionInner({ isLoading, pitStops }: PitStopsSectionInnerProps) {
	if (isLoading) {
		return (
			<View className="flex flex-col gap-3 px-6">
				<Skeleton className="h-5 w-32 rounded" />
				<Skeleton className="h-5 w-40 rounded" />
			</View>
		);
	}

	if (!pitStops || pitStops.length === 0) {
		return (
			<View className="px-6">
				<Text className="text-sm text-muted-foreground">No pit stop data available</Text>
			</View>
		);
	}

	return (
		<View className="flex flex-col gap-2 px-6">
			{pitStops.map((pitStop) => (
				<View className="flex flex-row items-center gap-2" key={pitStop.lap_number}>
					<Text className="font-jetbrains-medium text-sm text-muted-foreground">
						Lap {pitStop.lap_number}
					</Text>
					<View className="h-1 w-1 rounded-full bg-muted-foreground" />
					<Text className="font-jetbrains-regular text-sm text-foreground">
						{formatPitDuration(pitStop.lane_duration)}s
					</Text>
				</View>
			))}
		</View>
	);
}
