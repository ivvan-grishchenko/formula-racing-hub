import type { LucideIcon } from 'lucide-react-native';

import { fetchOvertakes } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { Icon } from '@components/ui/icon';
import { THEME } from '@lib/theme';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@ui/skeleton';
import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react-native';
import { View } from 'react-native';

import type { OvertakeStats } from './types';

import { useDriverContext } from './driver-context';

type OvertakesSectionInnerProps = {
	isLoading: boolean;
	stats: OvertakeStats;
};

type StatCardProps = {
	count: number;
	icon: LucideIcon;
	iconColor: string;
	label: string;
	trackName?: string;
};

export function OvertakesSection() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const overtakesQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchOvertakes({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.overtakes({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
	});

	const isLoading = overtakesQuery.isLoading;
	const overtakes = overtakesQuery.data ?? [];

	const stats: OvertakeStats = (() => {
		const made = overtakes.filter((o) => o.overtaking_driver_number === driverNumber).length;
		const lost = overtakes.filter((o) => o.overtaken_driver_number === driverNumber).length;

		return { lost, lostMostAt: null, made, madeMostAt: null };
	})();

	return <OvertakesSectionInner isLoading={isLoading} stats={stats} />;
}

function OvertakesSectionInner({ isLoading, stats }: OvertakesSectionInnerProps) {
	if (isLoading) {
		return (
			<View className="flex flex-row gap-4 px-6">
				<Skeleton className="h-24 flex-1 rounded-lg" />
				<Skeleton className="h-24 flex-1 rounded-lg" />
			</View>
		);
	}

	if (!stats.lost && !stats.made) {
		return (
			<View className="px-6">
				<View className="font-jetbrains-regular text-sm text-muted-foreground">
					No overtake data available
				</View>
			</View>
		);
	}

	return (
		<View className="flex flex-row px-6">
			<StatCard
				count={stats.made}
				icon={ArrowUpFromLine}
				iconColor={THEME.dark.chart2}
				label="overtakes"
				trackName={stats.madeMostAt}
			/>
			<View className="mx-2 w-px bg-border" />
			<StatCard
				count={stats.lost}
				icon={ArrowDownFromLine}
				iconColor={THEME.dark.destructive}
				label="overtaken"
				trackName={stats.lostMostAt}
			/>
		</View>
	);
}

function StatCard({ count, icon: IconComponent, iconColor, label, trackName }: StatCardProps) {
	return (
		<View className="flex flex-1 flex-col items-center gap-2">
			<View className="flex flex-row items-center gap-1.5">
				<Icon as={IconComponent} color={iconColor} size={20} />
				<View className="font-jetbrains-bold text-2xl font-bold text-foreground">{count}</View>
			</View>
			<View className="flex flex-col items-center">
				<View className="font-jetbrains-medium text-sm text-muted-foreground">{label}</View>
				{trackName && (
					<View className="mt-0.5 font-jetbrains-light text-xs text-muted-foreground">
						{trackName}
					</View>
				)}
			</View>
		</View>
	);
}
