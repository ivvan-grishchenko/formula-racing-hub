import { Button } from '@components/ui/button';
import { Text } from '@components/ui/text';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Icon } from '@ui/icon';
import { BellRingIcon } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import {
	type LayoutChangeEvent,
	Pressable,
	ScrollView,
	useWindowDimensions,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { OnboardingFlowProps } from './types';

import { STEPS } from './data';
import { TrackIllustration } from './track-illustration';

function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
	const { height, width } = useWindowDimensions();
	const scrollRef = useRef<ScrollView>(null);
	const [index, setIndex] = useState(0);
	const [illustrationWidth, setIllustrationWidth] = useState(width - 40);

	const onIllustrationLayout = useCallback((e: LayoutChangeEvent) => {
		setIllustrationWidth(e.nativeEvent.layout.width);
	}, []);

	const goToPage = useCallback(
		(i: number) => {
			const clamped = Math.max(0, Math.min(STEPS.length - 1, i));

			scrollRef.current?.scrollTo({ animated: true, x: clamped * width });
			setIndex(clamped);
		},
		[width]
	);

	const handleMomentumEnd = useCallback(
		(e: { nativeEvent: { contentOffset: { x: number } } }) => {
			const x = e.nativeEvent.contentOffset.x;
			const i = Math.round(x / width);

			setIndex(Math.max(0, Math.min(STEPS.length - 1, i)));
		},
		[width]
	);

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
			<ScrollView
				horizontal
				onMomentumScrollEnd={handleMomentumEnd}
				pagingEnabled
				ref={scrollRef}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				style={{ flex: 1 }}>
				{STEPS.map((step, i) => (
					<View key={step.badge} style={{ minHeight: height, width }}>
						<View className="flex-1 gap-4 px-5 pb-7 pt-4">
							<View className="flex-row items-center justify-between">
								<View className="min-h-[44px] flex-row items-center gap-3">
									<Text className="font-jetbrains-bold text-[11px] text-foreground">
										FORMULA RACING HUB
									</Text>
								</View>
								<Pressable accessibilityRole="button" hitSlop={8} onPress={onComplete}>
									<Text className="text-sm text-muted-foreground">Skip</Text>
								</Pressable>
							</View>

							<View className="items-center">
								<Badge>
									<Text>{step.badge}</Text>
								</Badge>
							</View>

							<Text className="border-b-0 pb-0 font-jetbrains-italic" variant="h2">
								{step.title}
							</Text>

							<Text className="text-[13px]" variant="muted">
								{step.body}
							</Text>

							<View onLayout={onIllustrationLayout}>
								<TrackIllustration data={step.illustration} width={illustrationWidth} />
							</View>

							<Card>
								<CardHeader className="flex-row items-center gap-2">
									<Icon as={BellRingIcon} color="notification" size={16} />
									<CardTitle className="pt-1">{step.featureTitle}</CardTitle>
								</CardHeader>
								<CardContent>
									<Text>{step.featureBody}</Text>
								</CardContent>
							</Card>

							<View className="flex-row items-center justify-center gap-2 py-2">
								{STEPS.map((_, dot) => (
									<Pressable
										accessibilityLabel={`Go to step ${dot + 1}`}
										className="h-11 w-11 items-center justify-center"
										hitSlop={4}
										key={dot}
										onPress={() => goToPage(dot)}>
										{dot === index ? (
											<View className="h-1 w-6 rounded-sm bg-primary" />
										) : (
											<View className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
										)}
									</Pressable>
								))}
							</View>
						</View>
					</View>
				))}
			</ScrollView>

			<View className="px-5 pb-7">
				<Button
					className="w-full"
					onPress={() => (index < STEPS.length - 1 ? goToPage(index + 1) : onComplete())}
					size="lg">
					<Text className="font-jetbrains-semi-bold text-sm text-primary-foreground">
						{index < STEPS.length - 1 ? 'Continue' : 'Get started'}
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}

export { OnboardingFlow };
