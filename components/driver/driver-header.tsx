import type { OpenF1Driver } from '@api/openf1/types';

import { Card } from '@ui/card';
import { GlowOverlayContainer } from '@ui/glow';
import { Skeleton } from '@ui/skeleton';
import { Text } from '@ui/text';
import { Image } from 'expo-image';
import { View } from 'react-native';

type DriverHeaderProps = {
	driver?: null | OpenF1Driver;
};

export function DriverHeader({ driver }: DriverHeaderProps) {
	if (!driver) {
		return (
			<View className="h-[120px] flex-row items-center gap-4 rounded-xl border border-border bg-card p-4">
				<Skeleton className="h-20 w-20 rounded-xl" />
				<View className="flex-1 gap-2">
					<Skeleton className="h-6 w-32 rounded" />
					<Skeleton className="h-4 w-24 rounded" />
					<Skeleton className="h-4 w-20 rounded" />
				</View>
			</View>
		);
	}

	const { driver_number, first_name, headshot_url, last_name, team_name } = driver;

	return (
		<GlowOverlayContainer>
			<Card className="p-4">
				<View className="flex-row items-center gap-4 p-4">
					<Image
						contentFit="cover"
						source={headshot_url}
						style={{ borderRadius: 12, height: 100, width: 100 }}
						transition={200}
					/>
					<View className="gap-2">
						<Text className="font-jetbrains-bold text-xl text-foreground">
							{first_name} {last_name}
						</Text>
						<Text className="font-jetbrains-medium text-lg text-muted-foreground">
							#{driver_number}
						</Text>
						<Text className="font-jetbrains-regular text-sm text-muted-foreground">
							{team_name}
						</Text>
					</View>
				</View>
			</Card>
		</GlowOverlayContainer>
	);
}
