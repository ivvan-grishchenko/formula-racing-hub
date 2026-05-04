import { THEME } from '@lib/theme';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { AlertCircle } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

type ErrorDisplayProps = {
	message: string;
	onRetry?: () => void;
	title?: string;
};

export function ErrorDisplay({ message, onRetry, title }: ErrorDisplayProps) {
	const { colorScheme } = useColorScheme();
	const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

	return (
		<View className="flex-1 items-center justify-center gap-4 p-6">
			<Icon as={AlertCircle} color={palette.destructive} size={48} />
			<View className="gap-2 text-center">
				{title && (
					<Text className="text-center font-jetbrains-semi-bold text-lg text-foreground">
						{title}
					</Text>
				)}
				<Text className="text-center font-jetbrains-regular text-muted-foreground">{message}</Text>
			</View>
			{onRetry && (
				<Button onPress={onRetry} variant="outline">
					<Text>Try Again</Text>
				</Button>
			)}
		</View>
	);
}
