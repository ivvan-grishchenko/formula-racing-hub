import type { IllustrationProps } from '@components/onboarding/types';

import { NAV_THEME } from '@lib/theme';
import { Text } from '@ui/text';
import { ScanSearchIcon, TimerIcon, WindIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export function TrackIllustration({ data, width }: { data: IllustrationProps; width: number }) {
	const s = width / 350;
	const { colorScheme } = useColorScheme();

	return (
		<View className="relative h-[240px] w-full overflow-hidden bg-background">
			<View
				className="absolute rounded-[1px] bg-muted"
				style={{
					height: 3 * s,
					left: 30 * s,
					top: 50 * s,
					width: 120 * s,
				}}
			/>
			<View
				className="absolute rounded-[1px] bg-muted"
				style={{
					height: 80 * s,
					left: 140 * s,
					top: 50 * s,
					width: 3 * s,
				}}
			/>
			<View
				className="absolute rounded-[1px] bg-muted"
				style={{
					height: 3 * s,
					left: 90 * s,
					top: 130 * s,
					width: 180 * s,
				}}
			/>
			<View
				className="absolute rounded-[1px] bg-muted"
				style={{
					height: 45 * s,
					left: 90 * s,
					top: 90 * s,
					width: 3 * s,
				}}
			/>
			<View
				className="absolute rounded-full bg-primary"
				style={{
					height: 8 * s,
					left: 88 * s,
					top: 118 * s,
					width: 8 * s,
				}}
			/>
			<View
				className="absolute items-center justify-center rounded-full border border-border bg-card"
				style={{
					height: 44 * s,
					left: 158 * s,
					top: 78 * s,
					width: 44 * s,
				}}>
				<ScanSearchIcon
					color={colorScheme === 'dark' ? NAV_THEME.dark.colors.text : NAV_THEME.light.colors.text}
					size={24}
				/>
			</View>

			<View
				className="absolute rounded-[10px] bg-card px-2.5 py-2"
				style={{
					left: 8 * s,
					minWidth: 138 * s,
					top: 12 * s,
				}}>
				<View className="flex-row items-center gap-1.5">
					<TimerIcon
						color={
							colorScheme === 'dark'
								? NAV_THEME.dark.colors.primary
								: NAV_THEME.light.colors.primary
						}
						size={14}
					/>
					<Text className="text-[9px] font-bold uppercase text-muted-foreground">
						{data.leftLabel}
					</Text>
				</View>
				<Text className="mt-1 text-lg font-bold text-card-foreground">{data.leftValue}</Text>
			</View>

			<View
				className="absolute rounded-[10px] bg-card px-2.5 py-2"
				style={{
					left: 200 * s,
					top: 150 * s,
					width: 142 * s,
				}}>
				<View className="flex-row items-center gap-1.5">
					<WindIcon
						color={
							colorScheme === 'dark'
								? NAV_THEME.dark.colors.primary
								: NAV_THEME.light.colors.primary
						}
						size={14}
					/>
					<Text className="text-[9px] font-bold uppercase text-muted-foreground">
						{data.rightLabel}
					</Text>
				</View>
				<Text className="mt-1 text-lg font-bold text-primary">{data.rightValue}</Text>
			</View>
		</View>
	);
}
