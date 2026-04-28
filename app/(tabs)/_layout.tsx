import { Header } from '@components/layout/header';
import { AnimatedTabButton } from '@components/tabs/animated-tab-button';
import { animatedTabSlotRender } from '@components/tabs/animated-tab-slot';
import { Href } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { CalendarIcon, HomeIcon, LucideIcon, SettingsIcon, ShuffleIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs: { href: Href; icon: LucideIcon; name: string }[] = [
	{ href: '/(tabs)/home', icon: HomeIcon, name: 'home' },
	{ href: '/(tabs)/calendar', icon: CalendarIcon, name: 'calendar' },
	{ href: '/(tabs)/standings', icon: ShuffleIcon, name: 'standings' },
	{ href: '/(tabs)/settings', icon: SettingsIcon, name: 'settings' },
];

export default function TabsLayout() {
	return (
		<SafeAreaView className="flex-1" edges={['top', 'bottom']}>
			<Tabs>
				<View className="flex-1">
					<Header />
					<View className="flex-1 pt-6">
						<TabSlot detachInactiveScreens renderFn={animatedTabSlotRender} />
					</View>
				</View>

				<TabList asChild>
					<View className="w-fit items-center justify-center gap-4 self-center rounded-xl border border-border bg-card px-4 py-4">
						{tabs.map((tab) => (
							<TabTrigger asChild href={tab.href} key={tab.name} name={tab.name}>
								<AnimatedTabButton icon={tab.icon} />
							</TabTrigger>
						))}
					</View>
				</TabList>
			</Tabs>
		</SafeAreaView>
	);
}
