import { OpenF1Meeting } from '@api/openf1/types';
import { Card, CardContent } from '@ui/card';
import { Text } from '@ui/text';
import { format, isSameMonth } from 'date-fns';
import { Image } from 'expo-image';
import { View } from 'react-native';

type NextRaceProps = { nextMeeting: OpenF1Meeting };

export default function NextRace({ nextMeeting }: NextRaceProps) {
	return (
		<Card glow>
			<CardContent className="flex-row justify-between">
				<View>
					<View className="flex-row items-center gap-2">
						<View className="h-1.5 w-1.5 rounded-full bg-destructive" />
						<Text className="text-destructive">NEXT RACE</Text>
					</View>
					<Text className="font-jetbrains-semi-bold text-sm">{nextMeeting.meeting_name}</Text>
					<Text className="text-[11px]">
						{formatNextRaceDates(nextMeeting.date_start, nextMeeting.date_end)} ·{' '}
						{nextMeeting.location}
					</Text>
				</View>
				<View className="justify-center">
					<Image
						accessibilityIgnoresInvertColors
						contentFit="cover"
						source={nextMeeting.country_flag}
						style={{ borderRadius: 4, height: 48, width: 56 }}
					/>
				</View>
			</CardContent>
		</Card>
	);
}

function formatNextRaceDates(startIso: string, endIso: string): string {
	const start = new Date(startIso);
	const end = new Date(endIso);
	const sameMonth = isSameMonth(end, start);

	if (sameMonth) return `${format(start, 'dd')}-${format(end, 'dd LLLL')}`;

	return `${format(start, 'dd LLLL')}-${format(end, 'dd LLLL')}`;
}
