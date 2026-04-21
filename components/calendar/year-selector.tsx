import { cn } from '@lib/utils';
import { TriggerRef } from '@rn-primitives/select';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/select';
import { useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type YearSelectorProps = {
	className?: string;
	onSelectedYearChange: (year: number) => void;
	selectedYear: number;
};

export function YearSelector({ className, onSelectedYearChange, selectedYear }: YearSelectorProps) {
	const ref = useRef<TriggerRef>(null);
	const seasons = useMemo(() => {
		const currentYear = new Date().getFullYear();
		const seasons: number[] = [];

		for (let year = currentYear; year >= 2023; year--) {
			seasons.push(year);
		}

		return seasons;
	}, []);

	const insets = useSafeAreaInsets();
	const contentInsets = {
		bottom: Platform.select({ android: insets.bottom + 24, ios: insets.bottom }),
		left: 12,
		right: 12,
		top: insets.top,
	};

	return (
		<Select
			onValueChange={(option) => onSelectedYearChange(Number(option?.value || selectedYear))}
			value={{ label: `${selectedYear} season`.toUpperCase(), value: `${selectedYear}` }}>
			<SelectTrigger className={cn('w-[180px]', className)} ref={ref}>
				<SelectValue className="font-jetbrains-thin-italic" placeholder="Select a season" />
			</SelectTrigger>
			<SelectContent className={cn('w-[180px]', className)} insets={contentInsets}>
				<NativeSelectScrollView>
					<SelectGroup>
						{seasons.map((season) => (
							<SelectItem key={season} label={`${season}`} value={`${season}`}>
								{season}
							</SelectItem>
						))}
					</SelectGroup>
				</NativeSelectScrollView>
			</SelectContent>
		</Select>
	);
}

/**
 * @platform Native only
 * Returns the children on the web
 */
function NativeSelectScrollView({ className, ...props }: React.ComponentProps<typeof ScrollView>) {
	return <ScrollView className={cn('max-h-52', className)} {...props} />;
}
