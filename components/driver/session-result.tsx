import type { OpenF1SessionResult } from '@api/openf1/types';

import { fetchSessionResult } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { formatDurationTime } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@ui/text';
import { View } from 'react-native';
import { Skeleton } from 'react-native-reusables';

import { useDriverContext } from './driver-context';

type SessionResultInnerProps = {
	isLoading: boolean;
	isRefreshing?: boolean;
	result: null | OpenF1SessionResult;
	sessionType: string;
};

export function SessionResult() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const resultQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchSessionResult({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.sessionResult({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
		select: (r) => r.at(0) ?? null,
	});

	const result = resultQuery.data ?? null;
	const isLoading = resultQuery.isLoading;
	const isRefreshing = resultQuery.isFetching && !resultQuery.isLoading;

	return (
		<SessionResultInner
			isLoading={isLoading}
			isRefreshing={isRefreshing}
			result={result}
			sessionType={sessionInfo.sessionType}
		/>
	);
}

function ResultCard({ label, value }: { label: string; value: string }) {
	return (
		<View className="flex-1 items-center justify-center rounded-lg border border-border bg-card p-3">
			<Text className="font-jetbrains-regular text-xs text-muted-foreground">{label}</Text>
			<Text className="font-jetbrains-bold text-lg text-foreground">{value}</Text>
		</View>
	);
}

function SessionResultInner({
	isLoading,
	isRefreshing,
	result,
	sessionType,
}: SessionResultInnerProps) {
	const isLoadingState = isLoading || isRefreshing;

	if (isLoadingState) {
		return (
			<View className="flex-row gap-2">
				{[...Array(4)].map((_, i) => (
					<Skeleton className="flex-1 rounded-lg" key={i} style={{ height: 64 }} />
				))}
			</View>
		);
	}

	if (!result) {
		return (
			<View className="flex-row gap-2">
				{[...Array(4)].map((_, i) => (
					<View
						className="flex-1 items-center justify-center rounded-lg border border-border bg-card p-3"
						key={i}>
						<Text className="font-jetbrains-regular text-xs text-muted-foreground">—</Text>
						<Text className="font-jetbrains-bold text-lg text-muted-foreground">—</Text>
					</View>
				))}
			</View>
		);
	}

	const isRace = sessionType.toLowerCase() === 'race';
	const isQualifying =
		sessionType.toLowerCase() === 'qualifying' ||
		sessionType.toLowerCase() === 'sprint_qualifying' ||
		sessionType.toLowerCase() === 'sprint shootout';

	const position = result.dnf || result.dsq || result.dns ? 'DNF' : result.position.toString();
	const lapTime = formatDurationTime(result.duration, sessionType);

	if (isRace) {
		return (
			<View className="flex-row gap-2">
				<ResultCard label="POS" value={position} />
				<ResultCard label="TIME" value={lapTime} />
				<ResultCard label="LAPS" value={result.number_of_laps.toString()} />
				<ResultCard label="PTS" value={result.points?.toString() ?? '—'} />
			</View>
		);
	}

	if (isQualifying) {
		return (
			<View className="flex-row gap-2">
				<ResultCard label="POS" value={position} />
				<ResultCard label="LAP TIME" value={lapTime} />
				<ResultCard label="LAPS" value={result.number_of_laps.toString()} />
				<ResultCard label="" value="" />
			</View>
		);
	}

	return (
		<View className="flex-row gap-2">
			<ResultCard label="POS" value={position} />
			<ResultCard label="LAP TIME" value={lapTime} />
			<ResultCard label="LAPS" value={result.number_of_laps.toString()} />
		</View>
	);
}
