import { cn } from '@lib/utils';
import { Text, TextClassContext } from '@ui/text';
import { ComponentProps, useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';

import { GlowOverlay } from './glow';

export type CardProps = ComponentProps<typeof View> &
	Pick<ComponentProps<typeof Pressable>, 'onPress'> & {
		glow?: boolean;
	};

function Card({ className, glow = false, onLayout, onPress, ...props }: CardProps) {
	const [frame, setFrame] = useState({ h: 0, w: 0 });
	const measuredRef = useRef(false);

	const handleLayout = useCallback(
		(event: LayoutChangeEvent) => {
			onLayout?.(event);

			if (measuredRef.current) return;

			measuredRef.current = true;
			const { height, width } = event.nativeEvent.layout;

			setFrame({ h: height, w: width });
		},
		[onLayout]
	);

	const CardWrapper = onPress ? Pressable : View;

	return (
		<TextClassContext.Provider value="text-card-foreground">
			<View className="relative overflow-visible">
				{glow && frame.w > 0 && frame.h > 0 && <GlowOverlay height={frame.h} width={frame.w} />}
				<CardWrapper
					className={cn(
						'border-border/70 relative z-[1] flex flex-col gap-6 rounded-xl border bg-card py-6 shadow-sm shadow-black/5',
						className
					)}
					onLayout={glow ? handleLayout : undefined}
					onPress={onPress}
					{...props}
				/>
			</View>
		</TextClassContext.Provider>
	);
}

function CardContent({ className, ...props }: ComponentProps<typeof View>) {
	return <View className={cn('px-6', className)} {...props} />;
}

function CardDescription({ className, ...props }: ComponentProps<typeof Text>) {
	return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<typeof View>) {
	return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

function CardHeader({ className, ...props }: ComponentProps<typeof View>) {
	return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<typeof Text>) {
	return (
		<Text
			aria-level={3}
			className={cn('font-semibold leading-none', className)}
			role="heading"
			{...props}
		/>
	);
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
