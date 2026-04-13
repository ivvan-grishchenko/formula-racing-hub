import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
	dark: require('../assets/images/react-native-reusables-dark.png'),
	light: require('../assets/images/react-native-reusables-light.png'),
};

const SCREEN_OPTIONS = {
	headerRight: () => <ThemeToggle />,
	headerTransparent: true,
	title: 'React Native Reusables',
};

const IMAGE_STYLE: ImageStyle = {
	height: 76,
	width: 76,
};

export default function Screen() {
	const { colorScheme } = useColorScheme();

	return (
		<>
			<Stack.Screen options={SCREEN_OPTIONS} />
			<View className="flex-1 items-center justify-center gap-8 p-4">
				<Image resizeMode="contain" source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} />
				<View className="gap-2 p-4">
					<Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
						1. Edit <Text variant="code">app/index.tsx</Text> to get started.
					</Text>
					<Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
						2. Save to see your changes instantly.
					</Text>
				</View>
				<View className="flex-row gap-2">
					<Link asChild href="https://reactnativereusables.com">
						<Button>
							<Text>Browse the Docs</Text>
						</Button>
					</Link>
					<Link asChild href="https://github.com/founded-labs/react-native-reusables">
						<Button variant="ghost">
							<Text>Star the Repo</Text>
							<Icon as={StarIcon} />
						</Button>
					</Link>
				</View>
			</View>
		</>
	);
}

const THEME_ICONS = {
	dark: MoonStarIcon,
	light: SunIcon,
};

function ThemeToggle() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<Button
			className="ios:size-9 rounded-full web:mx-4"
			onPressIn={toggleColorScheme}
			size="icon"
			variant="ghost">
			<Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
		</Button>
	);
}
