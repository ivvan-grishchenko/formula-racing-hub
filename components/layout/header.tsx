import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import { Button } from '@ui/button';
import { useRouter } from 'expo-router';
import { ChevronLeft, Eclipse, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export function Header() {
	const router = useRouter();
	const { colorScheme, toggleColorScheme } = useColorScheme();

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
			<Button accessibilityLabel="Theme" hitSlop={8} onPress={toggleColorScheme} variant="outline">
				<Icon as={colorScheme === 'dark' ? Sun : Eclipse} color="notification" size={18} />
			</Button>
		</View>
	);
}
