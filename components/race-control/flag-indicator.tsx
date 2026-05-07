import { Icon } from '@ui/icon';
import { Car, Flag, FlagTriangleRight, Layers, ShieldAlert, Timer } from 'lucide-react-native';
import { View } from 'react-native';

type FlagIndicatorProps = {
	category: string;
	flag: string;
	size?: number;
};

export function FlagIndicator({ category, flag, size = 16 }: FlagIndicatorProps) {
	const { color, icon: IconComponent } = getFlagConfig(category, flag);

	return (
		<View
			className="h-8 w-8 items-center justify-center rounded-full"
			style={{ backgroundColor: color }}>
			<Icon as={IconComponent} color="text" size={size} />
		</View>
	);
}

function getFlagConfig(category: string, flag: string): { color: string; icon: typeof Flag } {
	const flagLower = flag?.toLowerCase();
	const categoryLower = category?.toLowerCase();

	if (flagLower === 'green') return { color: '#22c55e', icon: Flag };
	if (flagLower === 'blue') return { color: '#3b82f6', icon: FlagTriangleRight };
	if (flagLower === 'yellow') return { color: '#eab308', icon: FlagTriangleRight };
	if (flagLower === 'double yellow') return { color: '#f97316', icon: FlagTriangleRight };
	if (flagLower === 'red') return { color: '#ef4444', icon: Flag };
	if (flagLower === 'chequered') return { color: '#090b0c', icon: Flag };
	if (flagLower === 'black and white') return { color: '#6b7280', icon: Flag };

	if (categoryLower === 'safetycar') return { color: '#f97316', icon: ShieldAlert };
	if (categoryLower === 'sessionstatus') return { color: '#3b82f6', icon: Timer };
	if (categoryLower === 'carevent') return { color: '#ef4444', icon: Car };
	if (categoryLower === 'drs') return { color: '#8b5cf6', icon: Layers };

	return { color: '#6b7280', icon: Flag };
}
