import { TextClassContext } from '@components/ui/text';
import { cn } from '@lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

const buttonVariants = cva(
	cn('group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none'),
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				default: cn('h-10 px-4 py-2 sm:h-9', Platform.select({ web: 'has-[>svg]:px-3' })),
				icon: 'h-10 w-10 sm:h-9 sm:w-9',
				lg: cn('h-11 rounded-md px-6 sm:h-10', Platform.select({ web: 'has-[>svg]:px-4' })),
				sm: cn('h-9 gap-1.5 rounded-md px-3 sm:h-8', Platform.select({ web: 'has-[>svg]:px-2.5' })),
			},
			variant: {
				default: cn(
					'active:bg-primary/90 bg-primary shadow-sm shadow-black/5',
					Platform.select({ web: 'hover:bg-primary/90' })
				),
				destructive: cn(
					'active:bg-destructive/90 dark:bg-destructive/60 bg-destructive shadow-sm shadow-black/5',
					Platform.select({
						web: 'hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
					})
				),
				ghost: cn(
					'dark:active:bg-accent/50 active:bg-accent',
					Platform.select({ web: 'dark:hover:bg-accent/50 hover:bg-accent' })
				),
				link: '',
				outline: cn(
					'dark:bg-input/30 dark:active:bg-input/50 border border-border bg-background shadow-sm shadow-black/5 active:bg-accent dark:border-input',
					Platform.select({
						web: 'dark:hover:bg-input/50 hover:bg-accent',
					})
				),
				secondary: cn(
					'active:bg-secondary/80 bg-secondary shadow-sm shadow-black/5',
					Platform.select({ web: 'hover:bg-secondary/80' })
				),
			},
		},
	}
);

const buttonTextVariants = cva(
	cn(
		'text-sm font-medium text-foreground',
		Platform.select({ web: 'pointer-events-none transition-colors' })
	),
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				default: '',
				icon: '',
				lg: '',
				sm: '',
			},
			variant: {
				default: 'text-primary-foreground',
				destructive: 'text-white',
				ghost: 'group-active:text-accent-foreground',
				link: cn(
					'text-primary group-active:underline',
					Platform.select({ web: 'underline-offset-4 hover:underline group-hover:underline' })
				),
				outline: cn(
					'group-active:text-accent-foreground',
					Platform.select({ web: 'group-hover:text-accent-foreground' })
				),
				secondary: 'text-secondary-foreground',
			},
		},
	}
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
	React.RefAttributes<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

function Button({ className, size, variant, ...props }: ButtonProps) {
	return (
		<TextClassContext.Provider value={buttonTextVariants({ size, variant })}>
			<Pressable
				className={cn(props.disabled && 'opacity-50', buttonVariants({ size, variant }), className)}
				role="button"
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
