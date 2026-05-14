import type { OpenF1Stint } from '@api/openf1/types';

import { fetchStints } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { cn, getTyreColour } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@ui/skeleton';
import { Text } from '@ui/text';
import { View } from 'react-native';

import { useDriverContext } from './driver-context';

type TyreStrategyInnerProps = {
	isLoading: boolean;
	stints: OpenF1Stint[];
};

export function TyreStrategy() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const stintsQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchStints({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.stints({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
	});

	const isLoading = stintsQuery.isLoading;
	const stints = stintsQuery.data ?? [];

	return <TyreStrategyInner isLoading={isLoading} stints={stints} />;
}

function TyreStrategyInner({ isLoading, stints }: TyreStrategyInnerProps) {
	if (isLoading) {
		return (
			<View className="flex flex-col gap-2">
				<Skeleton style={{ borderRadius: 8, height: 36, width: '70%' }} />
				<Skeleton style={{ borderRadius: 8, height: 36, width: '45%' }} />
				<Skeleton style={{ borderRadius: 8, height: 36, width: '30%' }} />
			</View>
		);
	}

	if (!stints.length) {
		return (
			<View className="h-20 items-center justify-center rounded-xl border border-border bg-card">
				<Text className="font-jetbrains-light-italic" variant="muted">
					Tyre strategy not available
				</Text>
			</View>
		);
	}

	const totalLaps = Math.max(...stints.map((s) => s.lap_end));
	const sortedStints = [...stints].sort((a, b) => a.stint_number - b.stint_number);

	return (
		<View className="flex flex-col gap-2">
			{sortedStints.map((stint) => {
				const span = stint.lap_end - stint.lap_start + 1;
				const widthPercent = (span / totalLaps) * 100;
				const colour = getTyreColour(stint.compound);
				const isTextLight = stint.compound === 'HARD' || stint.compound === 'MEDIUM';

				return (
					<View
						className="flex flex-row items-center gap-3"
						key={`${stint.stint_number}-${stint.compound}`}>
						<View className="w-16 flex-row items-center justify-end">
							<Text className="font-jetbrains-light text-xs" variant="small">
								+{stint.tyre_age_at_start}
							</Text>
						</View>
						<View
							className="h-9 items-center justify-center rounded-md"
							style={{
								backgroundColor: colour,
								width: `${widthPercent}%`,
							}}>
							<Text
								className={cn(
									'font-jetbrains-semi-bold text-xs',
									isTextLight ? 'text-black' : 'text-white'
								)}>
								{stint.compound.toUpperCase()} {stint.lap_start}-{stint.lap_end}
							</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
}
