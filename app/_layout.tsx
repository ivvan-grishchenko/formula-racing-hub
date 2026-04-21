import '../global.css';

import { NAV_THEME } from '@lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

void SplashScreen.preventAutoHideAsync();

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 60_000,
		},
	},
});

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	const [loaded, error] = useFonts({
		'JetBrains-Bold': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Bold.ttf'),
		'JetBrains-BoldItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-BoldItalic.ttf'),
		'JetBrains-ExtraBold': require('../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraBold.ttf'),
		'JetBrains-ExtraBoldItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraBoldItalic.ttf'),
		'JetBrains-ExtraLight': require('../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraLight.ttf'),
		'JetBrains-ExtraLightItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraLightItalic.ttf'),
		'JetBrains-Italic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Italic.ttf'),
		'JetBrains-Light': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Light.ttf'),
		'JetBrains-LightItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-LightItalic.ttf'),
		'JetBrains-Medium': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Medium.ttf'),
		'JetBrains-MediumItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-MediumItalic.ttf'),
		'JetBrains-Regular': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Regular.ttf'),
		'JetBrains-SemiBold': require('../assets/fonts/JetBrains Mono/JetBrainsMono-SemiBold.ttf'),
		'JetBrains-SemiBoldItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-SemiBoldItalic.ttf'),
		'JetBrains-Thin': require('../assets/fonts/JetBrains Mono/JetBrainsMono-Thin.ttf'),
		'JetBrains-ThinItalic': require('../assets/fonts/JetBrains Mono/JetBrainsMono-ThinItalic.ttf'),
	});

	useEffect(() => {
		if (loaded || error) void SplashScreen.hideAsync();
	}, [loaded, error]);

	if (!loaded && !error) return null;

	return (
		<GestureHandlerRootView>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
					<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
					<Stack screenOptions={{ headerShown: false }} />
					<PortalHost />
				</ThemeProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
