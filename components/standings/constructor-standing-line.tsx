import type { ConstructorStandingRow } from '@hooks/use-standings-data';

import { Text } from '@ui/text';
import { View } from 'react-native';

export function ConstructorStandingLine({ row }: { row: ConstructorStandingRow }) {
	const colour = row.team_colour;

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
				<Text className="font-jetbrains-semi-bold text-sm" numberOfLines={1}>
					{row.team_name}
				</Text>
			</View>
			<Text className="font-jetbrains-semi-bold text-sm">{formatPoints(row.points_current)}</Text>
		</View>
	);
}

export function formatPoints(value: null | number | undefined): string {
	if (value == null || Number.isNaN(Number(value))) return '—';
	const n = Number(value);

	return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
