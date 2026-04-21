import type { DriverStandingRow } from '@hooks/use-standings-data';

import { OpenF1ChampionshipDriver } from '@api/openf1/types';
import { cn } from '@lib/utils';
import { Text } from '@ui/text';
import { View } from 'react-native';

import { formatPoints } from './constructor-standing-line';

export function DriverStandingLine({ row }: { row: DriverStandingRow }) {
	const colour = row.driver?.team_colour;

	return (
		<View className="flex-row items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
			<View className="min-w-[28px] flex-row items-center gap-2">
				<Text className="font-jetbrains-semi-bold text-sm">{row.position_current}</Text>
			</View>
			<View className="flex-1 flex-row items-center gap-3">
				<View
					className="h-6 w-1 rounded"
					style={colour ? { backgroundColor: `#${colour}` } : undefined}
				/>
				<View className="min-w-0 flex-1">
					<Text className="font-jetbrains-semi-bold text-sm" numberOfLines={1}>
						{row.driver
							? `${row.driver.first_name} ${row.driver.last_name}`
							: `#${row.driver_number}`}
					</Text>
					{row.driver && (
						<Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
							{row.driver.team_name}
						</Text>
					)}
				</View>
			</View>
			<View className="items-end gap-0.5">
				<Text className="font-jetbrains-semi-bold text-sm">{formatPoints(row.points_current)}</Text>
				<PositionChange
					position_current={row.position_current}
					position_start={row.position_start}
				/>
			</View>
		</View>
	);
}

export function PositionChange({
	position_current,
	position_start,
}: Pick<OpenF1ChampionshipDriver, 'position_current' | 'position_start'>) {
	const delta = position_start - position_current;

	if (delta === 0) return null;

	const up = delta > 0;

	return (
		<Text
			className={cn(
				'font-jetbrains-regular text-[11px]',
				up ? 'text-chart-2' : 'text-destructive'
			)}>
			{up ? `↑${delta}` : `↓${-delta}`}
		</Text>
	);
}
