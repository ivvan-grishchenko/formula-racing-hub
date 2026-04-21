import { Button } from '@ui/button';
import { Text } from '@ui/text';
import { View } from 'react-native';

import type { StandingsSegment } from './standings-screen';

type StandingsFilterProps = {
	segment: StandingsSegment;
	setSegment: (segment: StandingsSegment) => void;
};

export function StandingsFilter({ segment, setSegment }: StandingsFilterProps) {
	return (
		<View className="flex-row flex-wrap gap-2">
			<Button
				className="rounded-[10px] px-3.5 py-2"
				onPress={() => setSegment('drivers')}
				size="sm"
				variant={segment === 'drivers' ? 'default' : 'outline'}>
				<Text
					className={
						segment === 'drivers'
							? 'font-jetbrains-bold text-[10px] uppercase text-primary-foreground'
							: 'font-jetbrains-bold text-[10px] uppercase text-secondary-foreground'
					}>
					Drivers
				</Text>
			</Button>
			<Button
				className="rounded-[10px] px-3.5 py-2"
				onPress={() => setSegment('constructors')}
				size="sm"
				variant={segment === 'constructors' ? 'default' : 'outline'}>
				<Text
					className={
						segment === 'constructors'
							? 'font-jetbrains-bold text-[10px] uppercase text-primary-foreground'
							: 'font-jetbrains-bold text-[10px] uppercase text-secondary-foreground'
					}>
					Constructors
				</Text>
			</Button>
		</View>
	);
}
