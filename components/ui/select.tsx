import { cn } from '@lib/utils';
import * as SelectPrimitive from '@rn-primitives/select';
import { Icon } from '@ui/icon';
import { TextClassContext } from '@ui/text';
import { Check, ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { ComponentProps, Fragment, ReactNode, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

import { NativeOnlyAnimatedView } from './native-only-animated-view';

export type UniversalSelectProps<T> = {
	className?: string;
	disabled?: boolean;
	labelKeyExtractor: (option: T) => string;
	onValueChange?: (value: string) => void;
	options: T[];
	placeholder?: string;
	size?: 'default' | 'sm';
	value?: string;
	valueKeyExtractor: (option: T) => string;
};

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

function SelectTrigger({
	children,
	className,
	ref,
	size = 'default',
	...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
	children?: ReactNode;
	size?: 'default' | 'sm';
}) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				'dark:bg-input/30 dark:active:bg-input/50 flex h-10 flex-row items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 shadow-sm shadow-black/5 sm:h-9',
				Platform.select({
					web: 'focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-input/50 w-fit whitespace-nowrap text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
				}),
				props.disabled && 'opacity-50',
				size === 'sm' && 'h-8 py-2 sm:py-1.5',
				className
			)}
			ref={ref}
			{...props}>
			<>{children}</>
			<Icon aria-hidden={true} as={ChevronDown} color="text" size={12} />
		</SelectPrimitive.Trigger>
	);
}

function SelectValue({
	className,
	ref,
	...props
}: ComponentProps<typeof SelectPrimitive.Value> & {
	className?: string;
}) {
	const { value } = SelectPrimitive.useRootContext();

	return (
		<SelectPrimitive.Value
			className={cn(
				'line-clamp-1 flex min-w-0 flex-1 flex-row items-center gap-2 text-sm text-foreground',
				!value && 'text-muted-foreground',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : Fragment;

function SelectContent({
	children,
	className,
	portalHost,
	position = 'popper',
	...props
}: ComponentProps<typeof SelectPrimitive.Content> & {
	className?: string;
	portalHost?: string;
}) {
	return (
		<SelectPrimitive.Portal hostName={portalHost}>
			<FullWindowOverlay>
				<SelectPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
					<TextClassContext.Provider value="text-popover-foreground">
						<NativeOnlyAnimatedView className="z-50" entering={FadeIn} exiting={FadeOut}>
							<SelectPrimitive.Content
								className={cn(
									'relative z-50 min-w-[8rem] rounded-md border border-border bg-popover shadow-md shadow-black/5',
									Platform.select({
										native: 'p-1',
										web: cn(
											'origin-(--radix-select-content-transform-origin) max-h-52 overflow-y-auto overflow-x-hidden animate-in fade-in-0 zoom-in-95',
											props.side === 'bottom' && 'slide-in-from-top-2',
											props.side === 'top' && 'slide-in-from-bottom-2'
										),
									}),
									position === 'popper' &&
										Platform.select({
											web: cn(
												props.side === 'bottom' && 'translate-y-1',
												props.side === 'top' && '-translate-y-1'
											),
										}),
									className
								)}
								position={position}
								{...props}>
								<SelectScrollUpButton />
								<SelectPrimitive.Viewport
									className={cn(
										'p-1',
										position === 'popper' &&
											cn(
												'w-full',
												Platform.select({
													web: 'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]',
												})
											)
									)}>
									{children}
								</SelectPrimitive.Viewport>
								<SelectScrollDownButton />
							</SelectPrimitive.Content>
						</NativeOnlyAnimatedView>
					</TextClassContext.Provider>
				</SelectPrimitive.Overlay>
			</FullWindowOverlay>
		</SelectPrimitive.Portal>
	);
}

function SelectItem({
	children,
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			className={cn(
				'group relative flex w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8 active:bg-accent sm:py-1.5',
				Platform.select({
					web: '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 cursor-default outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none [&_svg]:pointer-events-none',
				}),
				props.disabled && 'opacity-50',
				className
			)}
			{...props}>
			<View className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Icon as={Check} color="text" size={12} />
				</SelectPrimitive.ItemIndicator>
			</View>
			<SelectPrimitive.ItemText className="select-none font-jetbrains-thin text-sm text-foreground group-active:text-accent-foreground" />
		</SelectPrimitive.Item>
	);
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			className={cn('px-2 py-2 text-xs text-muted-foreground sm:py-1.5', className)}
			{...props}
		/>
	);
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollDownButton({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	if (Platform.OS !== 'web') return null;

	return (
		<SelectPrimitive.ScrollDownButton
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}>
			<Icon as={ChevronDownIcon} color="text" size={12} />
		</SelectPrimitive.ScrollDownButton>
	);
}

/**
 * @platform Web only
 * Returns null on native platforms
 */
function SelectScrollUpButton({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	if (Platform.OS !== 'web') return null;

	return (
		<SelectPrimitive.ScrollUpButton
			className={cn('flex cursor-default items-center justify-center py-1', className)}
			{...props}>
			<Icon as={ChevronUpIcon} color="text" size={12} />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectSeparator({
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			className={cn(
				'-mx-1 my-1 h-px bg-border',
				Platform.select({ web: 'pointer-events-none' }),
				className
			)}
			{...props}
		/>
	);
}

function UniversalSelect<T>({
	className,
	disabled,
	labelKeyExtractor,
	onValueChange,
	options,
	placeholder = 'Select an option',
	size = 'default',
	value,
	valueKeyExtractor,
}: UniversalSelectProps<T>) {
	const ref = useRef<SelectPrimitive.TriggerRef>(null);
	const scrollRef = useRef<ScrollView>(null);
	const [width, setWidth] = useState(0);
	const insets = useSafeAreaInsets();

	const contentInsets = {
		bottom: Platform.select({ android: insets.bottom + 24, ios: insets.bottom }),
		left: 12,
		right: 12,
		top: insets.top,
	};
	const selectedOption = value
		? options.find((opt) => valueKeyExtractor(opt) === value)
		: undefined;
	const selectValue: Option = selectedOption
		? { label: labelKeyExtractor(selectedOption), value: valueKeyExtractor(selectedOption) }
		: undefined;

	const handleValueChange = (option: Option) => {
		if (option && onValueChange) onValueChange(option.value);
	};
	const onLayout = (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;

		setWidth(width);
	};

	return (
		<View className={className}>
			<Select
				disabled={disabled}
				onLayout={onLayout}
				onValueChange={handleValueChange}
				value={selectValue}>
				<SelectTrigger disabled={disabled} ref={ref} size={size}>
					<SelectValue className="font-jetbrains-thin-italic" placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent insets={contentInsets}>
					<ScrollView className="max-h-52" ref={scrollRef} style={{ width }}>
						<SelectGroup>
							{options.map((option) => (
								<SelectItem
									key={valueKeyExtractor(option)}
									label={labelKeyExtractor(option)}
									onLayout={(e) => {
										const y = e.nativeEvent.layout.y;

										if (valueKeyExtractor(option) === value)
											scrollRef.current?.scrollTo({ animated: true, y });
									}}
									value={valueKeyExtractor(option)}>
									{labelKeyExtractor(option)}
								</SelectItem>
							))}
						</SelectGroup>
					</ScrollView>
				</SelectContent>
			</Select>
		</View>
	);
}

export {
	type Option,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	UniversalSelect,
};
