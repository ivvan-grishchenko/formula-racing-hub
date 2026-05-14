import { fetchLaps } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@ui/skeleton';
import { Text } from '@ui/text';
import { intervalToDuration } from 'date-fns';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import type { LapWithDuration } from './types';

import { useDriverContext } from './driver-context';

type LapTimesChartInnerProps = {
	isLoading: boolean;
	laps: LapWithDuration[];
};

export function LapTimesChart() {
	const { driverNumber, sessionInfo } = useDriverContext();
	const isRace = sessionInfo.sessionType.toLowerCase() === 'race';

	const lapsQuery = useQuery({
		enabled: !!sessionInfo.sessionKey && !isRace,
		queryFn: () => fetchLaps({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.laps({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
		select: (data): LapWithDuration[] =>
			data
				.map((l) => ({
					duration_sector_1: l.duration_sector_1 ?? 0,
					duration_sector_2: l.duration_sector_2 ?? 0,
					duration_sector_3: l.duration_sector_3 ?? 0,
					lap_duration: l.lap_duration ?? 0,
					lap_number: l.lap_number,
				}))
				.sort((a, b) => a.lap_number - b.lap_number),
	});

	const isLoading = lapsQuery.isLoading;
	const laps = lapsQuery.data ?? [];

	return <LapTimesChartInner isLoading={isLoading} laps={laps} />;
}

function formatLapDuration(totalSeconds: number): string {
	const duration = intervalToDuration({ end: Math.round(totalSeconds * 1000), start: 0 });
	const mins = duration.minutes ?? 0;
	const secs = (duration.seconds ?? 0).toString().padStart(2, '0');
	const ms = Math.round((totalSeconds % 1) * 1000)
		.toString()
		.padStart(3, '0');

	return `${mins}:${secs}.${ms}`;
}

function formatSectorDuration(totalSeconds: number): string {
	const duration = intervalToDuration({ end: Math.round(totalSeconds * 1000), start: 0 });
	const secs = duration.seconds ?? 0;
	const ms = Math.round((totalSeconds % 1) * 1000)
		.toString()
		.padStart(1, '0');

	return `${secs}.${ms.toString().padEnd(1, '0')}`;
}

function LapTimesChartInner({ isLoading, laps }: LapTimesChartInnerProps) {
	if (isLoading) {
		return (
			<View className="gap-3">
				<Skeleton style={{ borderRadius: 12, height: 160 }} />
				<Skeleton style={{ borderRadius: 8, height: 28 }} />
			</View>
		);
	}

	if (!laps.length) {
		return (
			<View className="gap-3">
				<View className="h-[160px] items-center justify-center rounded-xl border border-border bg-card">
					<Text className="font-jetbrains-light-italic" variant="muted">
						Lap data not available
					</Text>
				</View>
			</View>
		);
	}

	const best = laps.reduce((b, l) => (l.lap_duration < b.lap_duration ? l : b), laps[0]);
	const data = laps.map((lap) => ({ label: lap.lap_number.toString(), value: lap.lap_duration }));

	return (
		<View className="gap-3">
			<View className="rounded-xl border border-border bg-card p-4">
				<LineChart
					data={data}
					height={160}
					hideDataPoints
					maxValue={Math.max(...laps.map((l) => l.lap_duration)) + 2}
					minValue={Math.min(...laps.map((l) => l.lap_duration)) - 2}
					noOfSections={4}
					spacing={Math.max(4, 300 / laps.length)}
					strokeColor="#7bf1a8"
					strokeWidth={2}
					width={280}
					xAxisColor="rgba(255,255,255,0.15)"
					xAxisLabelTextStyle={{
						color: '#9ca8ab',
						fontFamily: 'JetBrainsMono-Regular.ttf',
						fontSize: 10,
					}}
					xAxisThickness={1}
					yAxisColor="rgba(255,255,255,0.15)"
					yAxisTextStyle={{
						color: '#9ca8ab',
						fontFamily: 'JetBrainsMono-Regular.ttf',
						fontSize: 10,
					}}
					yAxisThickness={1}
				/>
			</View>
			<View className="flex-row items-center justify-between rounded-lg border border-border bg-card px-4 py-2">
				<Text variant="small">
					Best:{' '}
					<Text className="font-jetbrains-medium" style={{ color: '#7bf1a8' }}>
						{formatLapDuration(best.lap_duration)}
					</Text>
				</Text>
				<Text className="font-jetbrains-light" variant="small">
					S1: {formatSectorDuration(best.duration_sector_1)}
				</Text>
				<Text className="font-jetbrains-light" variant="small">
					S2: {formatSectorDuration(best.duration_sector_2)}
				</Text>
				<Text className="font-jetbrains-light" variant="small">
					S3: {formatSectorDuration(best.duration_sector_3)}
				</Text>
			</View>
		</View>
	);
}
