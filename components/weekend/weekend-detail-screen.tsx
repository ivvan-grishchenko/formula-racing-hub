import type { OpenF1Meeting, OpenF1Session } from '@api/openf1/types';

import { RaceCalendarCard } from '@components/calendar/race-calendar-card';
import { Timeline } from '@components/layout/timeline';
import { Card, CardContent, CardHeader } from '@ui/card';
import { GLOW_OUTSET } from '@ui/glow';
import { Icon } from '@ui/icon';
import { GradientText, Text } from '@ui/text';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'expo-router';
import { Calendar1Icon, ClockIcon, FlagIcon, MenuIcon, TrophyIcon } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

export type WeekendDetailScreenProps = { meeting: OpenF1Meeting; sessions: OpenF1Session[] };

export function WeekendDetailScreen({ meeting, sessions }: WeekendDetailScreenProps) {
	const router = useRouter();

	const handleSessionResults = () => {
		router.push({
			params: { meetingKey: meeting.meeting_key },
			pathname: '/(info)/results/[meetingKey]',
		});
	};

	const handleRaceControl = () => {
		router.push({
			params: { meetingKey: meeting.meeting_key },
			pathname: '/(info)/race-control/[meetingKey]',
		});
	};

	return (
		<ScrollView
			className="flex-1"
			contentContainerClassName="gap-4 pb-10"
			contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}
			showsVerticalScrollIndicator={false}>
			<RaceCalendarCard
				glow
				isNext
				isSprint={false}
				meeting={meeting}
				round={1}
				year={meeting.year}
			/>

			<View className="flex flex-row flex-wrap gap-3">
				<View className="min-h-[88px] w-[48%] items-center justify-center gap-2 rounded-xl border bg-card p-4">
					<View className="rounded-xl bg-muted p-4">
						<Icon as={MenuIcon} color="text" size={24} />
					</View>
					<Text className="font-jetbrains-bold">Starting grid</Text>
				</View>

				<Pressable
					className="min-h-[88px] w-[48%] items-center justify-center gap-2 rounded-xl border bg-card p-4"
					onPress={handleSessionResults}>
					<View className="rounded-xl bg-muted p-4">
						<Icon as={TrophyIcon} color="text" size={24} />
					</View>
					<Text className="font-jetbrains-bold">Session Results</Text>
				</Pressable>

				<View className="min-h-[88px] w-[48%] items-center justify-center gap-2 rounded-xl border bg-card p-4">
					<View className="rounded-xl bg-muted p-4">
						<Icon as={TrophyIcon} color="text" size={24} />
					</View>
					<Text className="font-jetbrains-bold">Session Stats</Text>
				</View>

				<Pressable
					className="min-h-[88px] w-[48%] items-center justify-center gap-2 rounded-xl border bg-card p-4"
					onPress={handleRaceControl}>
					<View className="rounded-xl bg-muted p-4">
						<Icon as={FlagIcon} color="text" size={24} />
					</View>
					<Text className="font-jetbrains-bold">Race Control</Text>
				</Pressable>
			</View>

			<Text className="font-jetbrains-bold-italic text-[13px] uppercase text-card-foreground">
				SESSION SCHEDULE
			</Text>

			<Timeline
				data={sessions}
				keyExtractor={(session) => session.session_type}
				renderItem={(session) => (
					<Card>
						<CardHeader>
							<GradientText
								className="min-h-6 border-b border-b-border"
								fontFamily="JetBrainsMono-SemiBold.ttf"
								text={session.session_name}
							/>
						</CardHeader>
						<CardContent>
							<View className="flex-row items-center gap-2">
								<Icon as={Calendar1Icon} color="text" size={16} />
								<Text>{format(parseISO(session.date_start), 'EEE, MMM d')}</Text>
							</View>
							<View className="flex-row items-center gap-2">
								<Icon as={ClockIcon} color="text" size={16} />
								<Text>{`${format(parseISO(session.date_start), 'HH:mm')} - ${format(parseISO(session.date_end), 'HH:mm')}`}</Text>
							</View>
						</CardContent>
					</Card>
				)}
			/>
		</ScrollView>
	);
}
