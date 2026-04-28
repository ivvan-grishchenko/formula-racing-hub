import { Button } from '@components/ui/button';
import { Icon } from '@ui/icon';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { LucideIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(Button);

const ACTIVE_SCALE = 1.15;
const INACTIVE_SCALE = 1;

const SPRING_CONFIG = {
	damping: 15,
	stiffness: 150,
};

type AnimatedTabButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
	icon: LucideIcon;
};

export function AnimatedTabButton({ icon, isFocused = false, ...props }: AnimatedTabButtonProps) {
	const scale = useSharedValue(INACTIVE_SCALE);

	useEffect(() => {
		scale.value = withSpring(isFocused ? ACTIVE_SCALE : INACTIVE_SCALE, SPRING_CONFIG);
	}, [isFocused, scale]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<AnimatedButton
			{...props}
			className="h-12 w-12"
			size="icon"
			style={animatedStyle}
			variant="outline">
			<Icon as={icon} color="text" size={28} />
		</AnimatedButton>
	);
}
