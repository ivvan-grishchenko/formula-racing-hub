import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import { Button } from '@ui/button';
import { useRouter } from 'expo-router';
import { Bell, ChevronLeft } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

export function MainHeader() {
	const router = useRouter();

	return (
		<View className="flex-row items-center justify-between px-4 pb-3 pt-1">
			<Button
				accessibilityLabel="Back"
				hitSlop={8}
				onPress={() => {
					if (router.canGoBack()) router.back();
				}}
				variant="outline">
				<Icon as={ChevronLeft} color="notification" size={18} />
			</Button>
			<Text className="font-jetbrains-bold-italic text-[11px]" numberOfLines={1}>
				FORMULA RACING HUB
			</Text>
			<Button
				accessibilityLabel="Notifications"
				hitSlop={8}
				onPress={() => undefined}
				variant="outline">
				<Icon as={Bell} color="notification" size={18} />
			</Button>
		</View>
	);
}
