import type { OpenF1RaceControl } from '@api/openf1/types';

import { UniversalSelect } from '@ui/select';
import { useMemo } from 'react';

export type CategoryFilterProps = {
	events: OpenF1RaceControl[];
	onCategoryChange: (category: null | string) => void;
	selectedCategory: null | string;
};

const CATEGORIES = [
	{ label: 'Flags', value: 'flag' },
	{ label: 'Safety Car', value: 'safetycar' },
	{ label: 'Session Status', value: 'sessionstatus' },
	{ label: 'Car Event', value: 'carevent' },
	{ label: 'DRS', value: 'drs' },
];

export function CategoryFilter({
	events,
	onCategoryChange,
	selectedCategory,
}: CategoryFilterProps) {
	const options = useMemo(() => {
		const uniqueCategories = new Set(events.map((e) => e.category.toLowerCase()));

		const availableCategories = CATEGORIES.filter((c) => uniqueCategories.has(c.value));

		return [{ label: 'All Categories', value: 'all' }, ...availableCategories];
	}, [events]);

	const handleValueChange = (value: string) => {
		onCategoryChange(value === 'all' ? null : value);
	};

	return (
		<UniversalSelect
			className="h-20 w-1/2 px-4"
			labelKeyExtractor={(option) => option.label}
			onValueChange={handleValueChange}
			options={options}
			placeholder="All Categories"
			value={selectedCategory || 'all'}
			valueKeyExtractor={(option) => option.value}
		/>
	);
}
