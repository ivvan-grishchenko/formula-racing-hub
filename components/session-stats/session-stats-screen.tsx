import type { Circuit } from '@api/api-sports/types';

import { cn } from '@lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { GLOW_OUTSET } from '@ui/glow';
import { Icon } from '@ui/icon';
import { GradientText, Text } from '@ui/text';
import { Image } from 'expo-image';
import { MapPinIcon, TrophyIcon } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export type SessionStatsScreenProps = {
	circuit: Circuit | null;
};

export function SessionStatsScreen({ circuit }: SessionStatsScreenProps) {
	if (!circuit) {
		return (
			<ScrollView
				className="flex-1"
				contentContainerClassName="gap-4 pb-10"
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}>
				<Card>
					<CardHeader>
						<CardTitle>Circuit Data Unavailable</CardTitle>
					</CardHeader>
					<CardContent>
						<Text className="text-muted-foreground">
							Circuit information is not available for this meeting.
						</Text>
					</CardContent>
				</Card>
			</ScrollView>
		);
	}

	const dataLines: { data: number | string; title: string }[] = [
		{ data: circuit.numberOfLaps, title: 'Laps' },
		{ data: circuit.length, title: 'Circuit length' },
		{ data: circuit.distance, title: 'Race distance' },
		{ data: circuit.opened, title: 'Year opened' },
		{ data: circuit.capacity, title: 'Capacity' },
	];

	return (
		<ScrollView
			className="flex-1"
			contentContainerClassName="gap-4 pb-10"
			contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}>
			<View className="overflow-hidden rounded-xl border border-border">
				<Image
					accessibilityIgnoresInvertColors
					contentFit="contain"
					source={circuit.image}
					style={{ height: 180, width: '100%' }}
				/>
			</View>

			<Card>
				<CardHeader className="flex-row items-center gap-2">
					<Icon as={MapPinIcon} color="text" size={20} />
					<Text className="font-jetbrains-bold-italic text-xl text-card-foreground">
						{circuit.city}
					</Text>
				</CardHeader>
				<CardContent>
					{dataLines.map(({ data, title }, index) => (
						<View
							className={cn(
								'flex-row items-center justify-between',
								index !== dataLines.length - 1 && 'border-b border-b-border'
							)}
							key={title}>
							<Text>{title}</Text>
							<Text className="font-jetbrains-bold text-card-foreground">{data}</Text>
						</View>
					))}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<View className="flex-row items-center gap-2">
						<Icon as={TrophyIcon} color="text" size={18} />
						<CardTitle>Lap Record</CardTitle>
					</View>
				</CardHeader>
				<CardContent>
					<GradientText
						className="min-h-6"
						fontFamily="JetBrainsMono-Regular.ttf"
						fontSize={24}
						text={circuit.lapRecord.driver}
					/>
				</CardContent>
				<CardFooter className="flex-row items-center justify-between">
					<Text className="font-jetbrains-bold text-2xl text-card-foreground">
						{circuit.lapRecord.time}
					</Text>
					<Text className="font-jetbrains-bold text-lg text-primary">{circuit.lapRecord.year}</Text>
				</CardFooter>
			</Card>
		</ScrollView>
	);
}
