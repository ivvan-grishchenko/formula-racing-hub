import type { OpenF1Meeting, OpenF1Session } from '@api/openf1/types';

import { RaceCalendarCard } from '@components/calendar/race-calendar-card';
import { Timeline } from '@components/layout/timeline';
import { Card, CardContent, CardHeader } from '@ui/card';
import { GLOW_OUTSET } from '@ui/glow';
import { Icon } from '@ui/icon';
import { GradientText, Text } from '@ui/text';
import { format, parseISO } from 'date-fns';
import { Calendar1Icon, ClockIcon, LucideIcon, MenuIcon, TrophyIcon } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export type WeekendDetailScreenProps = { meeting: OpenF1Meeting; sessions: OpenF1Session[] };

const grid: { icon: LucideIcon; title: string }[] = [
	{ icon: MenuIcon, title: 'Starting grid' },
	{ icon: TrophyIcon, title: 'Session Results' },
	{ icon: TrophyIcon, title: 'Session Stats' },
	{ icon: TrophyIcon, title: 'Race Control' },
];

export function WeekendDetailScreen({ meeting, sessions }: WeekendDetailScreenProps) {
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
				{grid.map(({ icon, title }, index) => (
					<View
						className="min-h-[88px] w-[48%] items-center justify-center gap-2 rounded-xl border bg-card p-4"
						key={`${title}-${index}`}>
						<View className="rounded-xl bg-muted p-4">
							<Icon as={icon} color="text" size={24} />
						</View>
						<Text className="font-jetbrains-bold">{title}</Text>
					</View>
				))}
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
							{/*<Text className="font-jetbrains-semi-bold">{session.session_name}</Text>*/}
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
