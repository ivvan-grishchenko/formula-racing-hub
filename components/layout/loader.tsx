import { THEME } from '@lib/theme';
import { cn } from '@lib/utils';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Text as RNText, View } from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

type AnimatedGlyphProps = {
	char: string;
	className?: string;
	index: number;
	shadowColor: string;
};
type LoaderProps = { className?: string; text?: string };

const AnimatedText = Animated.createAnimatedComponent(RNText);

const CHAR_DELAY_MS = 50;
const PULSE_DURATION_MS = 500;
const REPEAT_GAP_MS = 2000;

export function Loader({ className, text = 'Loading...' }: LoaderProps) {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
	const shadowColor = colorScheme === 'dark' ? palette.foreground : palette.mutedForeground;

	const chars = text.split('');

	return (
		<View className="flex-1 items-center justify-center">
			<View className="mt-3 flex-row flex-wrap items-center justify-center">
				{chars.map((char, i) => (
					<AnimatedGlyph
						char={char}
						className={className}
						index={i}
						key={`${char}-${i}`}
						shadowColor={shadowColor}
					/>
				))}
			</View>
		</View>
	);
}

function AnimatedGlyph({ char, className, index, shadowColor }: AnimatedGlyphProps) {
	const progress = useSharedValue(0);

	useEffect(() => {
		progress.value = withDelay(
			index * CHAR_DELAY_MS,
			withRepeat(
				withSequence(
					withTiming(1, {
						duration: PULSE_DURATION_MS,
						easing: Easing.inOut(Easing.ease),
					}),
					withTiming(0, { duration: 0 }),
					withDelay(REPEAT_GAP_MS, withTiming(0, { duration: 0 }))
				),
				-1,
				false
			)
		);
	}, [index, progress]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [0, 0.5, 1], [0.5, 1, 0.5]),
		textShadowColor: shadowColor,
		textShadowOffset: { height: 0, width: 0 },
		textShadowRadius: interpolate(progress.value, [0, 0.5, 1], [0, 1.5, 0]),
		transform: [{ scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.1, 1]) }],
	}));

	return (
		<AnimatedText
			className={cn('font-jetbrains-bold text-foreground', className)}
			style={animatedStyle}>
			{char === ' ' ? '\u00A0' : char}
		</AnimatedText>
	);
}
