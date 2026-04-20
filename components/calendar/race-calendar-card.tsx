import type { OpenF1Meeting } from '@api/openf1/types';

import { formatNextRaceDates } from '@components/home/next-race';
import { CalendarFilter } from '@hooks/use-calendar-data';
import { Badge } from '@ui/badge';
import { Card, CardProps } from '@ui/card';
import { Text } from '@ui/text';
import { isAfter } from 'date-fns';
import { Image } from 'expo-image';
import { useMemo } from 'react';
import { View } from 'react-native';

type RaceCalendarCardProps = CardProps & {
	meeting: OpenF1Meeting;
	nextMeetingKey: null | number;
	roundByMeetingKey: Map<number, number>;
	sprintMeetingKeys: Set<number>;
	timeFilter: CalendarFilter;
	year: number;
};

export function RaceCalendarCard({
	meeting,
	nextMeetingKey,
	roundByMeetingKey,
	sprintMeetingKeys,
	timeFilter,
	year,
	...props
}: RaceCalendarCardProps) {
	const isNext =
		timeFilter === 'upcoming' &&
		meeting.meeting_key === nextMeetingKey &&
		isAfter(meeting.date_end, Date.now());

	const statusLabel = useMemo(() => {
		if (isNext) return 'Upcoming';

		if (meeting.is_cancelled) return 'Cancelled';

		if (isAfter(meeting.date_end, Date.now())) return 'Scheduled';

		return 'Completed';
	}, [isNext, meeting.date_end, meeting.is_cancelled]);

	return (
		<Card className="gap-3 px-4 py-3" {...props}>
			<View className="flex-row justify-between gap-3">
				<View className="flex-1 gap-3">
					<Text className="text-xs text-muted-foreground">{meeting.circuit_short_name}</Text>

					<Text className="font-jetbrains-bold-italic text-lg uppercase leading-tight text-card-foreground">
						{meeting.meeting_name}
					</Text>

					<View className="flex-row items-center justify-between">
						<View className="flex-row items-center gap-2">
							<Badge
								className="rounded-md border-border bg-secondary px-2.5 py-1.5"
								variant="outline">
								<Text className="font-jetbrains-bold text-[9px] uppercase text-card-foreground">
									Round {roundByMeetingKey.get(meeting.meeting_key) ?? 0}
								</Text>
							</Badge>
							<Badge className="rounded-full border-0 bg-secondary px-2.5 py-1.5">
								<Text className="font-jetbrains-bold text-[10px] uppercase text-primary">Race</Text>
							</Badge>
							{sprintMeetingKeys.has(meeting.meeting_key) && (
								<Badge className="rounded-full border-0 bg-secondary px-2.5 py-1.5">
									<Text className="font-jetbrains-bold text-[10px] uppercase text-primary">
										Sprint
									</Text>
								</Badge>
							)}
						</View>
					</View>
				</View>
				<Image
					accessibilityIgnoresInvertColors
					contentFit="cover"
					source={meeting.country_flag}
					style={{ borderRadius: 4, height: 70, width: 120 }}
				/>
			</View>

			<View className="flex-row justify-between">
				<View>
					<Text className="font-jetbrains-bold text-[10px] uppercase text-muted-foreground">
						Date
					</Text>
					<Text className="mt-1 font-jetbrains-bold text-[13px] text-card-foreground">
						{formatNextRaceDates(meeting.date_start, meeting.date_end)}, {year}
					</Text>
				</View>
				<View className="items-end gap-1">
					<Text className="font-jetbrains-bold text-[10px] uppercase text-muted-foreground">
						Status
					</Text>
					<Text className="font-jetbrains-bold text-[13px] text-primary">{statusLabel}</Text>
				</View>
			</View>
		</Card>
	);
}
