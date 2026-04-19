import type { LucideIcon, LucideProps } from 'lucide-react-native';

import { NAV_THEME } from '@lib/theme';
import { Theme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { useMemo } from 'react';
import { ColorValue } from 'react-native';

type IconProps = Omit<LucideProps, 'color'> & {
	as: LucideIcon;
	color?: ColorValue | ThemeColor | ThemeColorTuple;
};
type ThemeColor = keyof Theme['colors'];
type ThemeColorTuple = [ThemeColor, ThemeColor];

function Icon({ as: IconComponent, color, size = 14, ...props }: IconProps) {
	const { colorScheme } = useColorScheme();
	const calculatedColor = useMemo(() => {
		if (!color) return undefined;

		if (isThemeColor(color))
			return colorScheme === 'dark' ? NAV_THEME.dark.colors[color] : NAV_THEME.light.colors[color];

		if (isThemeColorTuple(color))
			return colorScheme === 'dark'
				? NAV_THEME.dark.colors[color[0]]
				: NAV_THEME.light.colors[color[1]];

		return color;
	}, [color, colorScheme]);

	return <IconComponent color={calculatedColor} size={size} {...props} />;
}

function isThemeColor(value: unknown): value is ThemeColor {
	return typeof value === 'string' && Object.keys(NAV_THEME.dark.colors).includes(value);
}

function isThemeColorTuple(value: unknown): value is ThemeColorTuple {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
		typeof value[0] === 'string' &&
		typeof value[1] === 'string'
	);
}

export { Icon };
