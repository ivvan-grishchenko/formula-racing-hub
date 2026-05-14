import { fetchPosition, fetchStartingGrid } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@ui/skeleton';
import { Text } from '@ui/text';
import { format } from 'date-fns';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import type { PositionArcPoint } from './types';

import { useDriverContext } from './driver-context';

type PositionArcChartInnerProps = {
	finishPosition: null | number;
	isLoading: boolean;
	positionArc: PositionArcPoint[];
	startingGridPosition: null | number;
};

export function PositionArcChart() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const positionQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchPosition({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.position({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
		select: (data): PositionArcPoint[] =>
			data
				.map((p) => ({ date: p.date, position: p.position }))
				.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
	});

	const gridQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchStartingGrid({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.startingGrid({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
		select: (data) => data.at(0)?.position_number ?? null,
	});

	const positionArc = positionQuery.data ?? [];
	const isLoading = positionQuery.isLoading;
	const finishPosition = positionQuery.data?.at(-1)?.position ?? null;
	const startingGridPosition = gridQuery.data ?? null;

	return (
		<PositionArcChartInner
			finishPosition={finishPosition}
			isLoading={isLoading}
			positionArc={positionArc}
			startingGridPosition={startingGridPosition}
		/>
	);
}

function PositionArcChartInner({
	finishPosition,
	isLoading,
	positionArc,
	startingGridPosition,
}: PositionArcChartInnerProps) {
	if (isLoading) {
		return (
			<View className="gap-3">
				<Skeleton style={{ borderRadius: 12, height: 160 }} />
				<Skeleton style={{ borderRadius: 8, height: 22 }} />
			</View>
		);
	}

	if (!positionArc.length) {
		return (
			<View className="gap-3">
				<View className="h-[160px] items-center justify-center rounded-xl border border-border bg-card">
					<Text className="font-jetbrains-light-italic" variant="muted">
						Position data not available
					</Text>
				</View>
			</View>
		);
	}

	const maxPos = Math.max(...positionArc.map((p) => p.position), 20);
	const data = positionArc.map((p, i) => ({
		label: i === 0 || i === positionArc.length - 1 ? format(new Date(p.date), 'HH:mm') : '',
		value: p.position,
	}));

	return (
		<View className="gap-3">
			<View className="rounded-xl border border-border bg-card p-4">
				<LineChart
					adjustToWidth
					data={data}
					height={160}
					hideDataPoints
					initialSpacing={24}
					maxValue={1}
					minValue={maxPos}
					noOfSections={5}
					spacing={(280 - 48) / Math.max(positionArc.length - 1, 1)}
					stepChart
					stepHeight={120 / maxPos}
					strokeColor="#00c950"
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
			<View className="flex-row items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2">
				<Text className="font-jetbrains-light" variant="small">
					Started:{' '}
					<Text className="font-jetbrains-medium" style={{ color: '#9ca8ab' }}>
						P{startingGridPosition ?? '-'}
					</Text>
				</Text>
				<Text className="font-jetbrains-light" style={{ color: '#9ca8ab' }}>
					·
				</Text>
				<Text className="font-jetbrains-light" variant="small">
					Finished:{' '}
					<Text className="font-jetbrains-medium" style={{ color: '#00c950' }}>
						P{finishPosition ?? '-'}
					</Text>
				</Text>
			</View>
		</View>
	);
}
