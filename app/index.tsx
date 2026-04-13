import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import { Link, Stack } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

const SCREEN_OPTIONS = {
	headerTransparent: true,
	title: 'React Native Reusables',
};

export default function Screen() {
	return (
		<>
			<Stack.Screen options={SCREEN_OPTIONS} />
			<View className="flex-1 items-center justify-center gap-8 p-4">
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
