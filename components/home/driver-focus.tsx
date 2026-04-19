import type { OpenF1Driver } from '@api/openf1/types';

import { Text } from '@ui/text';
import { Image } from 'expo-image';
import { View } from 'react-native';

type DriverFocusProps = {
	driverOfTheDay: OpenF1Driver;
};

export default function DriverFocus({ driverOfTheDay }: DriverFocusProps) {
	return (
		<View className="gap-2">
			<Text className="font-jetbrains-italic" variant="large">
				DRIVER FOCUS
			</Text>
			<View className="h-[168px] flex-row rounded-xl border border-border bg-card shadow-sm shadow-black/5">
				<View className="h-full w-1/2 flex-col items-start justify-center gap-2 pl-6">
					<Text className="text-sm text-destructive">Driver of the day</Text>
					<Text className="font-jetbrains-extra-bold-italic" variant="h3">
						{driverOfTheDay.first_name} {driverOfTheDay.last_name}
					</Text>
					<Text variant="muted">{driverOfTheDay.team_name}</Text>
				</View>
				<View className="h-full w-1/2 items-center justify-center rounded-l-xl rounded-r-xl bg-border">
					<Image
						contentFit="cover"
						source={driverOfTheDay.headshot_url}
						style={{ height: 160, width: 160 }}
					/>
				</View>
			</View>
		</View>
	);
}
