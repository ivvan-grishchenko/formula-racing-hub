import { cn } from '@lib/utils';
import * as Slot from '@rn-primitives/slot';
import {
	Canvas,
	DataSourceParam,
	LinearGradient,
	Text as SkiaText,
	useFont,
	vec,
} from '@shopify/react-native-skia';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps, createContext, RefAttributes, useContext, useState } from 'react';
import {
	LayoutChangeEvent,
	Platform,
	Text as RNText,
	type Role,
	StyleSheet,
	View,
} from 'react-native';

type FontFamily =
	| 'JetBrainsMono-Bold.ttf'
	| 'JetBrainsMono-BoldItalic.ttf'
	| 'JetBrainsMono-ExtraBold.ttf'
	| 'JetBrainsMono-ExtraBoldItalic.ttf'
	| 'JetBrainsMono-ExtraLight.ttf'
	| 'JetBrainsMono-ExtraLightItalic.ttf'
	| 'JetBrainsMono-Italic.ttf'
	| 'JetBrainsMono-Light.ttf'
	| 'JetBrainsMono-LightItalic.ttf'
	| 'JetBrainsMono-Medium.ttf'
	| 'JetBrainsMono-MediumItalic.ttf'
	| 'JetBrainsMono-Regular.ttf'
	| 'JetBrainsMono-SemiBold.ttf'
	| 'JetBrainsMono-SemiBoldItalic.ttf'
	| 'JetBrainsMono-Thin.ttf'
	| 'JetBrainsMono-ThinItalic.ttf';

const FONTS: Record<FontFamily, ReturnType<typeof require>> = {
	'JetBrainsMono-Bold.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Bold.ttf'),
	'JetBrainsMono-BoldItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-BoldItalic.ttf'),
	'JetBrainsMono-ExtraBold.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraBold.ttf'),
	'JetBrainsMono-ExtraBoldItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraBoldItalic.ttf'),
	'JetBrainsMono-ExtraLight.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraLight.ttf'),
	'JetBrainsMono-ExtraLightItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-ExtraLightItalic.ttf'),
	'JetBrainsMono-Italic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Italic.ttf'),
	'JetBrainsMono-Light.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Light.ttf'),
	'JetBrainsMono-LightItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-LightItalic.ttf'),
	'JetBrainsMono-Medium.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Medium.ttf'),
	'JetBrainsMono-MediumItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-MediumItalic.ttf'),
	'JetBrainsMono-Regular.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Regular.ttf'),
	'JetBrainsMono-SemiBold.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-SemiBold.ttf'),
	'JetBrainsMono-SemiBoldItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-SemiBoldItalic.ttf'),
	'JetBrainsMono-Thin.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-Thin.ttf'),
	'JetBrainsMono-ThinItalic.ttf': require('../../assets/fonts/JetBrains Mono/JetBrainsMono-ThinItalic.ttf'),
};

type GradientTextProps = ComponentProps<typeof View> & {
	colors?: string[];
	fontFamily?: FontFamily;
	fontSize?: number;
	text: string;
};

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

const TextClassContext = createContext<string | undefined>(undefined);

export function GradientText({
	colors = ['#7bf1a8', '#016630'],
	fontFamily = 'JetBrainsMono-Regular.ttf',
	fontSize = 16,
	text,
	...props
}: GradientTextProps) {
	const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
	const requires = FONTS[fontFamily];
	const font = useFont(requires as DataSourceParam, fontSize);

	const handleLayout = (event: LayoutChangeEvent) => {
		const { height, width } = event.nativeEvent.layout;

		setDimensions({ height, width });
	};

	if (!font || dimensions.width === 0 || dimensions.height === 0)
		return <View className="flex-1" onLayout={handleLayout} {...props} />;

	const textMetrics = font.measureText(text);

	const textX = 0;
	const textY = textMetrics.height;

	return (
		<View onLayout={handleLayout} {...props}>
			<Canvas style={StyleSheet.absoluteFill}>
				<SkiaText font={font} text={text} x={textX} y={textY}>
					<LinearGradient
						colors={colors}
						end={vec(textX + textMetrics.width, textY)}
						// Match gradient exactly to the measured text boundaries
						start={vec(textX, textY)}
					/>
				</SkiaText>
			</Canvas>
		</View>
	);
}

function Text({
	asChild = false,
	className,
	variant = 'default',
	...props
}: ComponentProps<typeof RNText> &
	RefAttributes<RNText> &
	TextVariantProps & {
		asChild?: boolean;
	}) {
	const textClass = useContext(TextClassContext);
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
