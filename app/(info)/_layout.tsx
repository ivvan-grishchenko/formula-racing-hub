import { Header } from '@components/layout/header';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoLayout() {
	return (
		<SafeAreaView className="flex-1" edges={['top']}>
			<Header />
			<View className="flex-1 pt-6">
				<Stack
					screenOptions={{
						animation: 'slide_from_right',
						animationDuration: 200,
						headerShown: false,
					}}
				/>
			</View>
		</SafeAreaView>
	);
}
