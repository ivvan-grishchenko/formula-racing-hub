import { cn } from '@lib/utils';
import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(cn('text-base text-foreground'), {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			blockquote: 'mt-4 border-l-2 pl-3 font-jetbrains-light italic sm:mt-6 sm:pl-6',
			code: cn(
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-jetbrains-semi-bold font-mono text-sm font-semibold'
			),
			default: 'font-jetbrains-regular',
			h1: cn('text-center font-jetbrains-extra-bold text-4xl font-extrabold tracking-tight'),
			h2: cn(
				'border-b border-border pb-2 font-jetbrains-bold text-3xl font-semibold tracking-tight'
			),
			h3: cn('font-jetbrains-semi-bold text-2xl font-semibold tracking-tight'),
			h4: cn('font-jetbrains-medium text-xl font-semibold tracking-tight'),
			large: 'font-jetbrains-semi-bold text-lg font-semibold',
			lead: 'font-jetbrains-medium text-xl text-muted-foreground',
			muted: 'font-jetbrains-regular text-sm text-muted-foreground',
			p: 'mt-3 font-jetbrains-medium leading-7 sm:mt-6',
			small: 'font-jetbrains-light text-sm font-medium leading-none',
		},
	},
});

type TextVariant = NonNullable<TextVariantProps['variant']>;

type TextVariantProps = VariantProps<typeof textVariants>;

const ROLE: Partial<Record<TextVariant, Role>> = {
	blockquote: Platform.select({ web: 'blockquote' as Role }),
	code: Platform.select({ web: 'code' as Role }),
	h1: 'heading',
	h2: 'heading',
	h3: 'heading',
	h4: 'heading',
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
	h1: '1',
	h2: '2',
	h3: '3',
	h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
	asChild = false,
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof RNText> &
	React.RefAttributes<RNText> &
	TextVariantProps & {
		asChild?: boolean;
	}) {
	const textClass = React.useContext(TextClassContext);
	const Component = asChild ? Slot.Text : RNText;

	return (
		<Component
			aria-level={variant ? ARIA_LEVEL[variant] : undefined}
			className={cn('font-jetbrains-regular', textVariants({ variant }), textClass, className)}
			role={variant ? ROLE[variant] : undefined}
			{...props}
		/>
	);
}

export { Text, TextClassContext };
