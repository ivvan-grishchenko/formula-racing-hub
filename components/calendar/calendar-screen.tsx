import { CalendarFilters } from '@components/calendar/calendar-filters';
import { Loader } from '@components/layout/loader';
import { type CalendarFilter, useCalendarData } from '@hooks/use-calendar-data';
import { THEME } from '@lib/theme';
import { GLOW_OUTSET } from '@ui/glow';
import { Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { isBefore } from 'date-fns';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, TextInput, View } from 'react-native';

import { RaceCalendarCard } from './race-calendar-card';
import { YearSelector } from './year-selector';

export function CalendarScreen() {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
	const [year, setYear] = useState<number>(new Date().getFullYear());

	const {
		isLoading,
		isRefreshing,
		meetingsChronological,
		nextMeetingKey,
		refetch,
		roundByMeetingKey,
		sprintMeetingKeys,
		sprintWeekendCount,
	} = useCalendarData({ year });

	const [timeFilter, setTimeFilter] = useState<CalendarFilter>('upcoming');
	const [sprintOnly, setSprintOnly] = useState(false);
	const [query, setQuery] = useState('');

	const onRefresh = useCallback(() => {
		void refetch();
	}, [refetch]);

	const filteredMeetings = useMemo(() => {
		const q = query.trim().toLowerCase();

		let list = meetingsChronological.filter((meeting) => {
			const completed = isBefore(meeting.date_end, Date.now());

			if (timeFilter === 'completed' && !completed) return false;

			if (timeFilter === 'upcoming' && completed) return false;

			if (sprintOnly && !sprintMeetingKeys.has(meeting.meeting_key)) return false;

			if (!q) return true;

			const hay = [
				meeting.meeting_name,
				meeting.circuit_short_name,
				meeting.country_name,
				meeting.location,
				meeting.country_code,
			]
				.join(' ')
				.toLowerCase();

			return hay.includes(q);
		});

		if (timeFilter === 'completed') list = [...list].reverse();

		return list;
	}, [meetingsChronological, query, sprintMeetingKeys, sprintOnly, timeFilter]);
	const roundsCount = meetingsChronological.length;

	if (isLoading) return <Loader />;

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1"
				contentContainerClassName="gap-4 pb-10"
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: GLOW_OUTSET }}
				keyboardDismissMode="on-drag"
				keyboardShouldPersistTaps="handled"
				refreshControl={
					<RefreshControl
						onRefresh={onRefresh}
						refreshing={isRefreshing}
						tintColor={palette.primary}
					/>
				}
				showsVerticalScrollIndicator={false}>
				<View className="gap-2">
					<YearSelector onSelectedYearChange={setYear} selectedYear={year} />
					<Text className="font-jetbrains-regular text-[13px] text-muted-foreground">
						{roundsCount} rounds • {sprintWeekendCount} sprints
					</Text>
				</View>

				<View className="flex-row items-center gap-2 rounded-lg border border-border bg-muted px-3.5 py-2.5">
					<Icon as={Search} color={palette.mutedForeground} size={16} />
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						className="flex-1 font-jetbrains-regular text-[13px] text-foreground"
						onChangeText={setQuery}
						placeholder="Search circuits, countries..."
						placeholderTextColor={palette.mutedForeground}
						value={query}
					/>
				</View>

				<CalendarFilters
					onFilterChange={setTimeFilter}
					palette={palette}
					setSprintOnly={() => setSprintOnly((value) => !value)}
					sprintOnly={sprintOnly}
					timeFilter={timeFilter}
				/>

				{!filteredMeetings.length ? (
					<View className="items-center py-10">
						<Text className="font-jetbrains-regular text-sm text-muted-foreground">
							No races match your filters.
						</Text>
					</View>
				) : (
					<View className="gap-4">
						{filteredMeetings.map((meeting) => {
							return (
								<RaceCalendarCard
									glow={timeFilter === 'upcoming' && nextMeetingKey === meeting.meeting_key}
									key={meeting.meeting_key}
									meeting={meeting}
									nextMeetingKey={nextMeetingKey}
									roundByMeetingKey={roundByMeetingKey}
									sprintMeetingKeys={sprintMeetingKeys}
									timeFilter={timeFilter}
									year={year}
								/>
							);
						})}
					</View>
				)}
			</ScrollView>
		</View>
	);
}
