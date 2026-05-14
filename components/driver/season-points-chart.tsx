import { useDriverContext } from '@components/driver/driver-context';
import { THEME } from '@lib/theme';
import { Text } from '@ui/text';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Skeleton } from 'react-native-reusables';

export function SeasonPointsChart() {
	const { seasonData, seasonLoading } = useDriverContext();

	if (seasonLoading) {
		return (
			<View className="w-full">
				<Skeleton style={{ borderRadius: 12, height: 140 }} />
			</View>
		);
	}

	const { championshipData, driver } = seasonData;

	if (!championshipData.length) {
		return (
			<View className="h-[140px] items-center justify-center rounded-xl border border-border bg-card">
				<Text className="font-jetbrains-light-italic text-sm text-muted-foreground">
					Season points data not available
				</Text>
			</View>
		);
	}

	const teamColour = driver?.team_colour ? `#${driver.team_colour}` : THEME.dark.chart1;

	const chartData = championshipData.map((row) => ({
		label: row.circuit_short_name.slice(0, 3).toUpperCase(),
		value: row.points,
	}));

	const maxPoints = Math.max(...championshipData.map((d) => d.points), 25);

	return (
		<View className="w-full overflow-hidden rounded-xl border border-border bg-card p-4">
			<BarChart
				adjustToWidth
				barWidth={20}
				data={chartData}
				frontColor={teamColour}
				gradientColor={teamColour}
				height={140}
				hideRules
				maxValue={maxPoints}
				noOfSections={4}
				showGradient
				spacing={24}
				xAxisColor="rgba(255,255,255,0.15)"
				xAxisLabelTextStyle={{
					color: '#9ca8ab',
					fontFamily: 'JetBrainsMono-Regular.ttf',
					fontSize: 8,
				}}
				xAxisThickness={1}
				yAxisColor="rgba(255,255,255,0.15)"
				yAxisTextStyle={{ color: '#9ca8ab', fontFamily: 'JetBrainsMono-Regular.ttf', fontSize: 10 }}
				yAxisThickness={1}
			/>
		</View>
	);
}
