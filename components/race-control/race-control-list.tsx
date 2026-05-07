import type { OpenF1Driver, OpenF1RaceControl } from '@api/openf1/types';

import { Text } from '@ui/text';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { RaceControlEventCard } from './race-control-event-card';

export type RaceControlListProps = {
	drivers: OpenF1Driver[] | undefined;
	events: OpenF1RaceControl[];
	selectedCategory: null | string;
};

export function RaceControlList({ drivers, events, selectedCategory }: RaceControlListProps) {
	const filteredEvents = useMemo(() => {
		if (!selectedCategory) return events;

		return events.filter((e) => e.category?.toLowerCase() === selectedCategory?.toLowerCase());
	}, [events, selectedCategory]);

	const driverMap = useMemo(() => {
		if (!drivers) return null;
		const map = new Map<number, OpenF1Driver>();

		drivers.forEach((d) => map.set(d.driver_number, d));

		return map;
	}, [drivers]);

	if (!filteredEvents.length) {
		return (
			<View className="flex-1 items-center justify-center py-20">
				<Text className="font-jetbrains text-center text-muted-foreground">
					{selectedCategory ? `No ${selectedCategory} events found` : 'No race control events'}
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			className="flex-1"
			contentContainerClassName="gap-4 pb-10"
			contentContainerStyle={{ paddingHorizontal: 16 }}
			showsVerticalScrollIndicator={false}>
			{filteredEvents.map((event, index) => (
				<RaceControlEventCard
					driver={driverMap?.get(event.driver_number ?? 0)}
					event={event}
					key={`${event.date}-${index}`}
				/>
			))}
		</ScrollView>
	);
}
