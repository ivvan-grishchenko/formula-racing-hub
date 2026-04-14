import '../global.css';

import { NAV_THEME } from '@lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { LucideProvider } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

void SplashScreen.preventAutoHideAsync();

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
	const { colorScheme } = useColorScheme();

	useEffect(() => {
		void SplashScreen.hideAsync();
	}, []);

	return (
		<ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
			<Stack />
			<PortalHost />
		</ThemeProvider>
	);
}
