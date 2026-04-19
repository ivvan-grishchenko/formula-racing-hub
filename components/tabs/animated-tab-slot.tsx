import type { TabsDescriptor, TabsSlotRenderOptions } from 'expo-router/ui';

import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Screen } from 'react-native-screens';

/**
 * Tab slot renderer with a short fade-in when a tab becomes focused (Expo custom tabs pattern).
 * @see https://docs.expo.dev/router/advanced/custom-tabs/#how-do-i-create-animated-tabs
 */
export function animatedTabSlotRender(
	descriptor: TabsDescriptor,
	{ detachInactiveScreens, isFocused, loaded }: TabsSlotRenderOptions
): null | React.ReactElement {
	const { freezeOnBlur, lazy = true, unmountOnBlur } = descriptor.options;

	if (unmountOnBlur && !isFocused) return null;

	if (lazy && !loaded && !isFocused) return null;

	return (
		<Screen
			activityState={isFocused ? 2 : 0}
			enabled={detachInactiveScreens}
			freezeOnBlur={freezeOnBlur}
			key={descriptor.route.key}
			style={[styles.screen, isFocused ? styles.focused : styles.unfocused]}>
			<Animated.View
				entering={isFocused ? FadeIn.duration(220) : undefined}
				style={styles.animatedInner}>
				{descriptor.render()}
			</Animated.View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	animatedInner: {
		flex: 1,
		height: '100%',
		position: 'relative',
	},
	focused: {
		display: 'flex',
		flexGrow: 1,
		flexShrink: 0,
		zIndex: 1,
	},
	screen: {
		flex: 1,
		height: '100%',
		position: 'relative',
	},
	unfocused: {
		display: 'none',
		flexGrow: 0,
		flexShrink: 1,
		zIndex: -1,
	},
});
