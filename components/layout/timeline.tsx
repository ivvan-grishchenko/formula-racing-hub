import { THEME } from '@lib/theme';
import { Canvas, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia';
import { Text } from '@ui/text';
import { ComponentProps, ReactNode, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

type TimelineProps<T> = ComponentProps<typeof View> & {
	data: T[];
	keyExtractor: (item: T) => string;
	renderItem: (item: T) => ReactNode;
};

const COLORS = [THEME.dark.chart1, THEME.dark.chart5];

export function Timeline<T>({
	className,
	data,
	keyExtractor,
	renderItem,
	...props
}: TimelineProps<T>) {
	const [{ height, width }, setDimensions] = useState({ height: 0, width: 0 });

	const onLayout = (event: LayoutChangeEvent) => {
		const { height, width } = event.nativeEvent.layout;

		setDimensions({ height, width });
	};

	return (
		<View className="relative w-full gap-2" {...props}>
			{data.map((item, index) => (
				<View className="flex-row gap-2 pl-5" key={`${keyExtractor(item)}-${index}`}>
					<Text className="w-1/3">{keyExtractor(item)}</Text>
					<View className="w-2/3">{renderItem(item)}</View>
				</View>
			))}
			<View className="absolute left-1 top-0 h-full w-2" onLayout={onLayout}>
				{width > 0 && height > 0 && (
					<Canvas style={{ height, width }}>
						<RoundedRect height={height} r={4} width={width} x={0} y={0}>
							<LinearGradient
								colors={COLORS}
								end={vec(width / 2, height)}
								start={vec(width / 2, 0)}
							/>
						</RoundedRect>
					</Canvas>
				)}
			</View>
		</View>
	);
}
