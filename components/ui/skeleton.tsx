import { cn } from '@lib/utils';
import { ComponentProps, RefAttributes } from 'react';
import { View } from 'react-native';

function Skeleton({ className, ...props }: ComponentProps<typeof View> & RefAttributes<View>) {
	return <View className={cn('animate-pulse rounded-md bg-accent', className)} {...props} />;
}

export { Skeleton };
