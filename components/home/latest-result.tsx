import type { OpenF1Session } from '@api/openf1/types';

import { LatestRaceResultRow } from '@hooks/use-home-data';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader } from '@ui/card';
import { Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { addSeconds, format, intervalToDuration } from 'date-fns';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';

type LatestResultProps = {
	latestRace: OpenF1Session;
	latestRaceResult: LatestRaceResultRow[];
};

export default function LatestResult({ latestRace, latestRaceResult }: LatestResultProps) {
	return (
		<View className="gap-1">
			<View className="flex-row items-center justify-between">
				<Text className="font-jetbrains-italic" variant="large">
					LATEST RESULT
				</Text>
				<Button variant="ghost">
					<Text>FULL RESULTS</Text>
					<Icon as={ChevronRight} color="text" />
				</Button>
			</View>
			<Card className="min-h-[204px]">
				<CardHeader className="flex-row justify-between">
					<Text variant="muted">
						{latestRace.circuit_short_name} GP - {latestRace.session_name}
					</Text>
					<Text variant="muted">{latestRaceResult.at(0)?.number_of_laps || 0} Laps</Text>
				</CardHeader>
				<CardContent className="gap-3">
					{latestRaceResult.map((result, index) => (
						<View
							className="flex-row items-center justify-between"
							key={`${result.name_acronym}-${index}`}>
							<View className="flex-row items-center gap-3">
								<Text>{index + 1}</Text>
								<View
									className="h-5 w-1 rounded"
									style={{ backgroundColor: `#${result.team_colour}` }}
								/>
								<Text>{result.name_acronym}</Text>
							</View>
							<Text>
								{index === 0
									? formatDuration(result.duration)
									: `+${format(addSeconds(new Date(0), result.gap_to_leader), 'ss.SSS')}`}
							</Text>
						</View>
					))}
				</CardContent>
			</Card>
		</View>
	);
}

function formatDuration(totalSeconds: number): string {
	const ms = Math.round((totalSeconds % 1) * 1000);
	const duration = intervalToDuration({ end: Math.floor(totalSeconds) * 1000, start: 0 });

	// Helper to ensure two-digit padding
	const pad = (n: number | undefined) => (n || 0).toString().padStart(2, '0');

	// Format: H:mm:ss.SSS
	// Use duration.hours directly (no padding) for the first unit
	return `${duration.hours || 0}:${pad(duration.minutes)}:${pad(duration.seconds)}.${ms.toString().padStart(3, '0')}`;
}
