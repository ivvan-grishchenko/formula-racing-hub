import type { OpenF1Driver, OpenF1RaceControl } from '@api/openf1/types';

import { Card, CardContent, CardFooter, CardHeader } from '@ui/card';
import { Text } from '@ui/text';
import { View } from 'react-native';

import { FlagIndicator } from './flag-indicator';

export type RaceControlEventCardProps = {
	driver?: OpenF1Driver;
	event: OpenF1RaceControl;
};

export function RaceControlEventCard({ driver, event }: RaceControlEventCardProps) {
	const formattedTime = formatTime(event.date);
	const lapText = event.lap_number ? `Lap ${event.lap_number}` : null;

	return (
		<Card>
			<CardHeader className="flex-row items-center gap-2">
				<FlagIndicator category={event.category} flag={event.flag} size={18} />
				<Text className="font-jetbrains-bold text-sm text-foreground">{event.flag}</Text>
				{lapText && <Text className="font-jetbrains text-xs text-muted-foreground">{lapText}</Text>}
			</CardHeader>
			<CardContent>
				<Text className="font-jetbrains text-sm text-muted-foreground" numberOfLines={2}>
					{event.message}
				</Text>
				<View className="flex-row items-center gap-2">
					<Text className="font-jetbrains text-muted-foreground/70 text-xs">{formattedTime}</Text>
				</View>
			</CardContent>
			{driver && (
				<CardFooter className="flex-row gap-2">
					<View
						className="h-6 w-1 rounded"
						style={driver.team_colour ? { backgroundColor: `#${driver.team_colour}` } : undefined}
					/>
					<Text className="font-jetbrains-medium-italic">{driver.full_name}</Text>
				</CardFooter>
			)}
		</Card>
	);
}

function formatTime(dateStr: string): string {
	const date = new Date(dateStr);

	return date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
}
