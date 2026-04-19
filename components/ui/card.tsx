import { cn } from '@lib/utils';
import { Text, TextClassContext } from '@ui/text';
import { ComponentProps, useCallback, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { GlowOverlay } from './glow';

type CardProps = ComponentProps<typeof View> & {
	glow?: boolean;
};

function Card({ className, glow = false, onLayout, ...props }: CardProps) {
	const [frame, setFrame] = useState({ h: 0, w: 0 });

	const handleLayout = useCallback(
		(event: LayoutChangeEvent) => {
			onLayout?.(event);
			const { height, width } = event.nativeEvent.layout;

			setFrame({ h: height, w: width });
		},
		[onLayout]
	);

	return (
		<TextClassContext.Provider value="text-card-foreground">
			<View className="relative overflow-visible">
				{glow && frame.w > 0 && frame.h > 0 && <GlowOverlay height={frame.h} width={frame.w} />}
				<View
					className={cn(
						'border-border/70 relative z-[1] flex flex-col gap-6 rounded-xl border bg-card py-6 shadow-sm shadow-black/5',
						className
					)}
					onLayout={handleLayout}
					{...props}
				/>
			</View>
		</TextClassContext.Provider>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View>) {
	return <View className={cn('px-6', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
	return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof View>) {
	return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View>) {
	return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
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
