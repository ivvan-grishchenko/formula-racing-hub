import type { OpenF1Driver, OpenF1RaceControl, OpenF1Session } from '@api/openf1/types';

import { UniversalSelect } from '@ui/select';
import { useState } from 'react';
import { View } from 'react-native';

import { CategoryFilter } from './category-filter';
import { RaceControlList } from './race-control-list';

export type RaceControlScreenProps = {
	drivers: OpenF1Driver[] | undefined;
	events: OpenF1RaceControl[];
	isRefreshing: boolean;
	onRefresh: () => void;
	selectedSessionKey: number;
	sessions: OpenF1Session[];
	setSelectedSessionKey: (sessionKey: number) => void;
};

export function RaceControlScreen({
	drivers,
	events,
	selectedSessionKey,
	sessions,
	setSelectedSessionKey,
}: RaceControlScreenProps) {
	const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

	return (
		<View className="flex-1 gap-4">
			<View className="flex-row justify-between">
				<CategoryFilter
					events={events}
					onCategoryChange={setSelectedCategory}
					selectedCategory={selectedCategory}
				/>
				<UniversalSelect
					className="w-1/2"
					labelKeyExtractor={(option) => `${option.session_type}, ${option.session_name}`}
					onValueChange={(value) => setSelectedSessionKey(Number(value))}
					options={sessions}
					value={String(selectedSessionKey)}
					valueKeyExtractor={(option) => String(option.session_key)}
				/>
			</View>
			<RaceControlList drivers={drivers} events={events} selectedCategory={selectedCategory} />
		</View>
	);
}
