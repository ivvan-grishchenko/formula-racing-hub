import { type CalendarFilter } from '@hooks/use-calendar-data';
import { THEME } from '@lib/theme';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { Zap } from 'lucide-react-native';
import { View } from 'react-native';

type CalendarFilterProps = {
	onFilterChange: (value: CalendarFilter) => void;
	palette: (typeof THEME)['dark'];
	setSprintOnly: () => void;
	sprintOnly: boolean;
	timeFilter: CalendarFilter;
};

export function CalendarFilters({
	onFilterChange,
	palette,
	setSprintOnly,
	sprintOnly,
	timeFilter,
}: CalendarFilterProps) {
	return (
		<View className="flex-row flex-wrap gap-2">
			<Button
				className="rounded-[10px] px-3.5 py-2"
				onPress={() => onFilterChange('upcoming')}
				size="sm"
				variant={timeFilter === 'upcoming' ? 'default' : 'outline'}>
				<Text
					className={
						timeFilter === 'upcoming'
							? 'font-jetbrains-bold text-[10px] uppercase text-primary-foreground'
							: 'font-jetbrains-bold text-[10px] uppercase text-secondary-foreground'
					}>
					Upcoming
				</Text>
			</Button>
			<Button
				className="rounded-[10px] px-3.5 py-2"
				onPress={() => onFilterChange('completed')}
				size="sm"
				variant={timeFilter === 'completed' ? 'default' : 'outline'}>
				<Text
					className={
						timeFilter === 'completed'
							? 'font-jetbrains-bold text-[10px] uppercase text-primary-foreground'
							: 'font-jetbrains-bold text-[10px] uppercase text-secondary-foreground'
					}>
					Completed
				</Text>
			</Button>
			<Button
				className="rounded-[10px] px-3 py-2"
				onPress={() => setSprintOnly()}
				size="sm"
				variant={sprintOnly ? 'default' : 'outline'}>
				<View className="flex-row items-center gap-1">
					<Icon
						as={Zap}
						color={sprintOnly ? palette.primaryForeground : palette.mutedForeground}
						size={14}
					/>
					<Text
						className={
							sprintOnly
								? 'font-jetbrains-bold text-[10px] uppercase text-primary-foreground'
								: 'font-jetbrains-bold text-[10px] uppercase text-muted-foreground'
						}>
						Sprint
					</Text>
				</View>
			</Button>
		</View>
	);
}
