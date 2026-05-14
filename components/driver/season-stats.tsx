import type {
	OpenF1Driver,
	OpenF1Session,
	OpenF1SessionResult,
	QueryWrapper,
} from '@api/openf1/types';

import { fetchDriver, fetchSessionResult } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Skeleton } from '@ui/skeleton';
import { Text } from '@ui/text';
import { useMemo } from 'react';
import { View } from 'react-native';

type SeasonStatsProps = {
	driver: OpenF1Driver;
	sessions: OpenF1Session[];
};

export function SeasonStats({ driver, sessions }: SeasonStatsProps) {
	const sessionKeys = sessions.map((s) => s.session_key);

	const actualDriverNumberQueryObj: QueryWrapper<OpenF1Driver> = useMemo(
		() => ({ full_name: driver.full_name, session_key: sessionKeys.at(0) }),
		[driver.full_name, sessionKeys]
	);
	const actualDriverNumberQuery = useQuery({
		queryFn: () => fetchDriver(actualDriverNumberQueryObj),
		queryKey: openf1Keys.drivers(actualDriverNumberQueryObj),
		select: (data) => data.at(0)?.driver_number || null,
	});
	const { data: actualDriverNumber } = actualDriverNumberQuery;

	const seasonStatsQuery = useQueries({
		queries: actualDriverNumber
			? sessionKeys.map((sk) => {
					const query: QueryWrapper<OpenF1SessionResult> = {
						driver_number: actualDriverNumber,
						session_key: sk,
					};

					return {
						queryFn: () => fetchSessionResult(query),
						queryKey: openf1Keys.sessionResult(query),
					};
				})
			: [],
	});

	const allResults = seasonStatsQuery.flatMap((q) => q.data ?? []);

	const seasonStats = useMemo(() => {
		const wins = allResults.filter((r) => r.position === 1).length;
		const podiums = allResults.filter((r) => r.position && r.position <= 3).length;
		const dnfs = allResults.filter((r) => r.dnf).length;

		return {
			dnfs,
			podiums,
			points: 0,
			position: 0,
			wins,
		};
	}, [allResults]);

	const isLoading =
		actualDriverNumberQuery.isLoading || seasonStatsQuery.some((ss) => ss.isLoading);

	if (isLoading) {
		return (
			<View className="flex-row gap-2">
				{[...Array(6)].map((_, i) => (
					<Skeleton className="h-20 w-14 rounded-lg" key={i} />
				))}
			</View>
		);
	}

	return (
		<View className="flex-row gap-2">
			<StatCard label="POS" value={`P${seasonStats.position}`} />
			<StatCard label="PTS" value={String(seasonStats.points)} />
			<StatCard label="WINS" value={String(seasonStats.wins)} />
			<StatCard label="PODS" value={String(seasonStats.podiums)} />
			<StatCard label="DNFs" value={String(seasonStats.dnfs)} />
		</View>
	);
}

function StatCard({ label, value }: { label: string; value: string }) {
	return (
		<View className="flex-1 items-center justify-center rounded-lg border border-border bg-card p-3">
			<Text className="font-jetbrains-bold text-2xl text-foreground">{value}</Text>
			<Text className="font-jetbrains-regular text-xs text-muted-foreground">{label}</Text>
		</View>
	);
}
