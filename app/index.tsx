import { OnboardingFlow } from '@components/onboarding/onboarding-flow';
import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import {
	clearOnboardingComplete,
	getOnboardingComplete,
	setOnboardingComplete,
} from '@lib/onboarding-storage';
import { Link, Stack } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

const HOME_OPTIONS = {
	headerTransparent: true,
	title: 'Formula Racing Hub',
};

export default function Screen() {
	const [ready, setReady] = React.useState(false);
	const [showOnboarding, setShowOnboarding] = React.useState(true);

	React.useEffect(() => {
		let cancelled = false;
		void getOnboardingComplete().then((done) => {
			if (!cancelled) {
				setShowOnboarding(!done);
				setReady(true);
			}
		});
		return () => {
			cancelled = true;
		};
	}, []);

	const finishOnboarding = React.useCallback(() => {
		void setOnboardingComplete();
		setShowOnboarding(false);
	}, []);

	const resetOnboarding = React.useCallback(() => {
		void clearOnboardingComplete().then(() => {
			setShowOnboarding(true);
		});
	}, []);

	if (!ready) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator />
			</View>
		);
	}

	if (showOnboarding) {
		return (
			<>
				<Stack.Screen options={{ headerShown: false }} />
				<OnboardingFlow onComplete={finishOnboarding} />
			</>
		);
	}

	return (
		<>
			<Stack.Screen options={HOME_OPTIONS} />
			<View className="flex-1 items-center justify-center gap-8 p-4">
				<View className="gap-2 p-4">
					<Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
						Welcome to Formula Racing Hub.
					</Text>
					<Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
						Build out sessions, timing, and hub features from here.
					</Text>
				</View>
				<View className="flex-row flex-wrap items-center justify-center gap-2">
					<Link asChild href="https://reactnativereusables.com">
						<Button>
							<Text>Browse the Docs</Text>
						</Button>
					</Link>
					<Link asChild href="https://github.com/founded-labs/react-native-reusables">
						<Button variant="ghost">
							<Text className="text-primary">Star the Repo</Text>
							<Icon as={StarIcon} />
						</Button>
					</Link>
					<Button onPress={resetOnboarding} variant="outline">
						<Text className="text-primary">Reset onboarding</Text>
					</Button>
				</View>
			</View>
		</>
	);
}
