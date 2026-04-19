import { MainHeader } from '@components/layout/main-header';
import { animatedTabSlotRender } from '@components/tabs/animated-tab-slot';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { Href } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { CalendarIcon, HomeIcon, LucideIcon, SettingsIcon, ShuffleIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs: { href: Href; icon: LucideIcon; name: string }[] = [
	{ href: '/(tabs)/home', icon: HomeIcon, name: 'home' },
	{ href: '/(tabs)/calendar', icon: CalendarIcon, name: 'calendar' },
	{ href: '/(tabs)/standings', icon: ShuffleIcon, name: 'standings' },
	{ href: '/(tabs)/settings', icon: SettingsIcon, name: 'settings' },
];

/**
 * TabList must be a direct child of Tabs so Expo Router can register tab screens.
 * @see https://docs.expo.dev/router/advanced/custom-tabs/
 */
export default function TabsLayout() {
	return (
		<SafeAreaView className="flex-1" edges={['top', 'bottom']}>
			<Tabs>
				<View className="flex-1">
					<MainHeader />
					<View className="flex-1 pt-6">
						<TabSlot detachInactiveScreens renderFn={animatedTabSlotRender} />
					</View>
				</View>

				<TabList asChild>
					<View className="mx-5 mb-7 rounded-xl border border-border bg-card px-4 py-4">
						{tabs.map(({ href, icon, name }, index) => (
							<TabTrigger asChild href={href} key={`${index}-${name}`} name={name}>
								<Button variant="outline">
									<Icon as={icon} color="text" size={22} />
								</Button>
							</TabTrigger>
						))}
					</View>
				</TabList>
			</Tabs>
		</SafeAreaView>
	);
}
