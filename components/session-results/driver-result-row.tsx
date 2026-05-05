import type { OpenF1Driver, OpenF1Session, OpenF1SessionResult } from '@api/openf1/types';

import { cn, formatDurationTime, formatGapToLeaderTime } from '@lib/utils';
import { Text } from '@ui/text';
import { View } from 'react-native';

export type DriverResultRowProps = {
	driver: OpenF1Driver | undefined;
	isPolePosition?: boolean;
	leaderDuration: OpenF1SessionResult['duration'];
	result: OpenF1SessionResult;
	session: OpenF1Session;
};

export function DriverResultRow({
	driver,
	isPolePosition,
	leaderDuration,
	result,
	session,
}: DriverResultRowProps) {
	const isDnf = result.dnf || result.dsq || result.dns;
	const colour = driver?.team_colour;

	return (
		<View
			className={cn(
				'flex-row items-center gap-3 border-b border-border py-3',
				isPolePosition && 'pl-0'
			)}>
			{isPolePosition && <View className="h-14 w-1 rounded-sm bg-red-600" />}

			<View className="min-w-[28px]">
				<Text
					className={cn(
						'font-jetbrains-bold-italic text-2xl',
						isPolePosition ? 'text-foreground' : 'text-muted-foreground'
					)}>
					{result.position}
				</Text>
			</View>

			<View
				className="h-10 w-10 rounded-full"
				style={colour ? { backgroundColor: `#${colour}` } : undefined}
			/>

			<View className="min-w-0 flex-1">
				<Text className="font-jetbrains-bold text-sm" numberOfLines={1}>
					{driver?.name_acronym || `#${result.driver_number}`}
				</Text>
				{driver && (
					<Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
						{driver.team_name}
					</Text>
				)}
			</View>

			<View className="min-w-[70px] items-end gap-0.5">
				<Text className="font-jetbrains-bold text-sm text-foreground">
					{isDnf
						? '--:--.---'
						: isPolePosition
							? formatDurationTime(result.duration, session.session_type)
							: formatGapToLeaderTime(
									leaderDuration,
									result.duration,
									result.gap_to_leader,
									session.session_type
								)}
				</Text>
				<Text className="font-jetbrains-regular text-[11px] text-muted-foreground">
					{isDnf ? 'DNF' : `${result.number_of_laps} Laps`}
				</Text>
			</View>

			{isPolePosition && !isDnf && (
				<View className="rounded-md border border-red-600 bg-red-900/20 px-2 py-1">
					<Text className="font-jetbrains-bold text-xs text-foreground">FASTEST</Text>
				</View>
			)}
		</View>
	);
}
