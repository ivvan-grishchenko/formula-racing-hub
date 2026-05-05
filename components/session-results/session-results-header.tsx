import type { OpenF1Session, OpenF1Weather } from '@api/openf1/types';

import { THEME } from '@lib/theme';
import { Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { CloudIcon, WindIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export type SessionResultsHeaderProps = {
	session: OpenF1Session;
	weather: null | OpenF1Weather;
};

export function SessionResultsHeader({ session, weather }: SessionResultsHeaderProps) {
	const { colorScheme } = useColorScheme();

	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-1">
				<Text className="font-jetbrains-bold text-[9px] uppercase tracking-wider text-muted-foreground">
					{session.session_name}
				</Text>
				<Text className="font-jetbrains-bold-italic text-2xl text-foreground">
					{session.circuit_short_name.toUpperCase()} GP
				</Text>
			</View>
			{weather && (
				<View className="items-end gap-0.5">
					<View className="flex-row gap-1">
						<Icon
							as={CloudIcon}
							color={
								colorScheme === 'dark' ? THEME.dark.mutedForeground : THEME.light.mutedForeground
							}
							size={16}
						/>
						<Text className="font-jetbrains-regular text-xs text-muted-foreground">
							{weather.air_temperature}°C
						</Text>
					</View>
					<View className="flex-row gap-1">
						<Icon
							as={WindIcon}
							color={
								colorScheme === 'dark' ? THEME.dark.mutedForeground : THEME.light.mutedForeground
							}
							size={16}
						/>
						<Text className="font-jetbrains-regular text-xs text-muted-foreground">
							{weather.wind_speed} km/h
						</Text>
					</View>
				</View>
			)}
		</View>
	);
}
