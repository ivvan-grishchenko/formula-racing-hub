import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

/** Matches Tailwind `font-sans` / `font-mono` and `expo-font` registration for JetBrains Mono. */
export const FONT_FAMILY = 'JetBrains Mono' as const;

export const THEME = {
	dark: {
		accent: 'oklch(0.275 0.011 216.9)',
		accentForeground: 'oklch(0.987 0.002 197.1)',
		background: 'oklch(0.148 0.004 228.8)',
		border: 'oklch(1 0 0 / 10%)',
		card: 'oklch(0.218 0.008 223.9)',
		cardForeground: 'oklch(0.987 0.002 197.1)',
		chart1: 'oklch(0.871 0.15 154.449)',
		chart2: 'oklch(0.723 0.219 149.579)',
		chart3: 'oklch(0.627 0.194 149.214)',
		chart4: 'oklch(0.527 0.154 150.069)',
		chart5: 'oklch(0.448 0.119 151.328)',
		destructive: 'oklch(0.704 0.191 22.216)',
		foreground: 'oklch(0.987 0.002 197.1)',
		input: 'oklch(1 0 0 / 15%)',
		muted: 'oklch(0.275 0.011 216.9)',
		mutedForeground: 'oklch(0.723 0.014 214.4)',
		popover: 'oklch(0.218 0.008 223.9)',
		popoverForeground: 'oklch(0.987 0.002 197.1)',
		primary: 'oklch(0.437 0.078 188.216)',
		primaryForeground: 'oklch(0.984 0.014 180.72)',
		radius: '0.625rem',
		ring: 'oklch(0.56 0.021 213.5)',
		secondary: 'oklch(0.274 0.006 286.033)',
		secondaryForeground: 'oklch(0.985 0 0)',
	},
	light: {
		accent: 'oklch(0.963 0.002 197.1)',
		accentForeground: 'oklch(0.218 0.008 223.9)',
		background: 'oklch(1 0 0)',
		border: 'oklch(0.925 0.005 214.3)',
		card: 'oklch(1 0 0)',
		cardForeground: 'oklch(0.148 0.004 228.8)',
		chart1: 'oklch(0.871 0.15 154.449)',
		chart2: 'oklch(0.723 0.219 149.579)',
		chart3: 'oklch(0.627 0.194 149.214)',
		chart4: 'oklch(0.527 0.154 150.069)',
		chart5: 'oklch(0.448 0.119 151.328)',
		destructive: 'oklch(0.577 0.245 27.325)',
		foreground: 'oklch(0.148 0.004 228.8)',
		input: 'oklch(0.925 0.005 214.3)',
		muted: 'oklch(0.963 0.002 197.1)',
		mutedForeground: 'oklch(0.56 0.021 213.5)',
		popover: 'oklch(1 0 0)',
		popoverForeground: 'oklch(0.148 0.004 228.8)',
		primary: 'oklch(0.511 0.096 186.391)',
		primaryForeground: 'oklch(0.984 0.014 180.72)',
		radius: '0.625rem',
		ring: 'oklch(0.723 0.014 214.4)',
		secondary: 'oklch(0.967 0.001 286.375)',
		secondaryForeground: 'oklch(0.21 0.006 285.885)',
	},
};

export const NAV_THEME: Record<'dark' | 'light', Theme> = {
	dark: {
		...DarkTheme,
		colors: {
			background: THEME.dark.background,
			border: THEME.dark.border,
			card: THEME.dark.card,
			notification: THEME.dark.destructive,
			primary: THEME.dark.primary,
			text: THEME.dark.foreground,
		},
	},
	light: {
		...DefaultTheme,
		colors: {
			background: THEME.light.background,
			border: THEME.light.border,
			card: THEME.light.card,
			notification: THEME.light.destructive,
			primary: THEME.light.primary,
			text: THEME.light.foreground,
		},
	},
};
