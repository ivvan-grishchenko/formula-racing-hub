import { OnboardingFlow } from '@components/onboarding/onboarding-flow';
import { getOnboardingComplete, setOnboardingComplete } from '@lib/onboarding-storage';
import { Redirect, Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Screen() {
	const [ready, setReady] = useState(false);
	const [showOnboarding, setShowOnboarding] = useState(true);

	useEffect(() => {
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

	const finishOnboarding = useCallback(() => {
		void setOnboardingComplete();
		setShowOnboarding(false);
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

	return <Redirect href="/home" />;
}
