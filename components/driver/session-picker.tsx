import { UniversalSelect } from '@ui/select';
import { useMemo } from 'react';
import { View } from 'react-native';

type SessionPickerProps = {
	setYear: (year: number) => void;
	year: number;
};

export function SessionPicker({ setYear, year }: SessionPickerProps) {
	const currentYear = new Date().getFullYear();

	const yearOptions = useMemo(
		() => Array.from({ length: currentYear - 2023 + 1 }, (_, i) => currentYear - i),
		[currentYear]
	);

	return (
		<View className="flex-row">
			<UniversalSelect
				className="flex-1"
				labelKeyExtractor={(item) => `${item}`}
				onValueChange={(val) => setYear(Number(val))}
				options={yearOptions}
				value={String(year)}
				valueKeyExtractor={(item) => `${item}`}
			/>
		</View>
	);
}
