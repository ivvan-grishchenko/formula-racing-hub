import { THEME } from '@lib/theme';
import { cn } from '@lib/utils';
import {
	Canvas,
	DashPathEffect,
	Group,
	Paint,
	RoundedRect,
	Shadow,
	SweepGradient,
	vec,
} from '@shopify/react-native-skia';
import { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View, type ViewProps } from 'react-native';
import {
	Easing,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';

/** Padding beyond the card used to draw the stroke without clipping (matches rounded-xl ~12px). */
export const GLOW_OUTSET = 12;
export const GLOW_CORNER_RADIUS = 12;

const STROKE_WIDTH = 2.75;
const TRAVEL_PERIOD_MS = 9_000;

type GlowOverlayContainerProps = ViewProps & {
	glow?: boolean;
};
type GlowStrokeOverlayProps = {
	height: number;
	width: number;
};

const positions = [0, 0.2, 0.4, 0.6, 0.8, 1];
const colors = [
	THEME.dark.chart1,
	THEME.dark.chart2,
	THEME.dark.chart3,
	THEME.dark.chart4,
	THEME.dark.chart5,
	THEME.dark.chart1,
];

export function GlowOverlay({ height, width }: GlowStrokeOverlayProps) {
	const progress = useSharedValue(0);

	const perimeter = 2 * (width + height);
	const arcLength = perimeter * 0.25;

	progress.value = withRepeat(
		withTiming(1, { duration: TRAVEL_PERIOD_MS, easing: Easing.linear }),
		-1,
		false
	);

	const phase = useDerivedValue(() => -progress.value * perimeter);

	const cx = GLOW_OUTSET + width / 2;
	const cy = GLOW_OUTSET + height / 2;

	if (width <= 0 || height <= 0) return null;

	const canvasW = width + GLOW_OUTSET * 2;
	const canvasH = height + GLOW_OUTSET * 2;

	return (
		<View pointerEvents="none" style={[styles.canvasWrap, { height: canvasH, width: canvasW }]}>
			<Canvas style={StyleSheet.absoluteFill}>
				<Group opacity={0.92}>
					<RoundedRect
						height={height}
						r={GLOW_CORNER_RADIUS}
						width={width}
						x={GLOW_OUTSET}
						y={GLOW_OUTSET}>
						<Shadow blur={4} color={colors[0]} dx={0} dy={0} />
					</RoundedRect>
					<RoundedRect
						height={height}
						r={GLOW_CORNER_RADIUS}
						width={width}
						x={GLOW_OUTSET}
						y={GLOW_OUTSET}>
						<Paint antiAlias strokeWidth={STROKE_WIDTH} style="stroke">
							<SweepGradient c={vec(cx, cy)} colors={colors} positions={positions} />
							<DashPathEffect intervals={[arcLength, perimeter - arcLength + 5]} phase={phase} />
						</Paint>
					</RoundedRect>
				</Group>
			</Canvas>
		</View>
	);
}

export function GlowOverlayContainer({
	className,
	glow = true,
	onLayout,
	...props
}: GlowOverlayContainerProps) {
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
		<View className="relative overflow-visible">
			{glow && frame.w > 0 && frame.h > 0 && <GlowOverlay height={frame.h} width={frame.w} />}
			<View className={cn('relative z-[1]', className)} onLayout={handleLayout} {...props} />
		</View>
	);
}

const styles = StyleSheet.create({
	canvasWrap: {
		left: -GLOW_OUTSET,
		position: 'absolute',
		top: -GLOW_OUTSET,
		zIndex: 0,
	},
});
