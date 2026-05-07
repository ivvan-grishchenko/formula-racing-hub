import { CalendarFilters } from '@components/calendar/calendar-filters';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { type CalendarFilter, useCalendarData } from '@hooks/use-calendar-data';
import { THEME } from '@lib/theme';
import { GLOW_OUTSET } from '@ui/glow';
import { Icon } from '@ui/icon';
import { UniversalSelect } from '@ui/select';
import { Text } from '@ui/text';
import { isAfter, isBefore, isWithinInterval, parseISO } from 'date-fns';
import { Search } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, TextInput, View } from 'react-native';

import { RaceCalendarCard } from './race-calendar-card';

export function CalendarScreen() {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const years = useMemo(() => {
		const currentYear = new Date().getFullYear();
		const years: number[] = [];

		for (let year = currentYear; year >= 2023; year--) years.push(year);

		return years;
	}, []);

	const {
		error,
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

	const onRefresh = useCallback(() => void refetch(), [refetch]);

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

	if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />;

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
				<View className="flex-1 gap-2">
					<UniversalSelect
						labelKeyExtractor={(option) => `${option} season`.toUpperCase()}
						onValueChange={(value) => setYear(Number(value))}
						options={years}
						value={String(year)}
						valueKeyExtractor={(option) => `${option}`}
					/>
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
							const isNext =
								timeFilter === 'upcoming' &&
								meeting.meeting_key === nextMeetingKey &&
								isAfter(meeting.date_end, Date.now());

							const isGlowing = isWithinInterval(new Date(), {
								end: parseISO(meeting.date_end),
								start: parseISO(meeting.date_start),
							});

							return (
								<RaceCalendarCard
									glow={isGlowing}
									isNext={isNext}
									isSprint={sprintMeetingKeys.has(meeting.meeting_key)}
									key={meeting.meeting_key}
									meeting={meeting}
									round={roundByMeetingKey.get(meeting.meeting_key) ?? 0}
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
