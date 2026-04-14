const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require('tailwindcss-animate')],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			colors: {
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
				},
				background: 'var(--background)',
				border: 'var(--border)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)',
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)',
				},
				foreground: 'var(--foreground)',
				input: 'var(--input)',
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)',
				},
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
				},
				ring: 'var(--ring)',
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
				sans: ['JetBrains Mono', 'ui-monospace', 'monospace'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
		},
	},
};
