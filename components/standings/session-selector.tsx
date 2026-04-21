import type { OpenF1Session } from '@api/openf1/types';

import { cn } from '@lib/utils';
import { Option, TriggerRef } from '@rn-primitives/select';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/select';
import { ComponentPropsWithoutRef, forwardRef, useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NativeSelectScrollViewProps = ComponentPropsWithoutRef<typeof ScrollView>;

type SessionSelectorProps = {
	session: OpenF1Session;
	sessions: OpenF1Session[];
	setSession: (session: OpenF1Session) => void;
};

export function SessionSelector({ session, sessions, setSession }: SessionSelectorProps) {
	const ref = useRef<TriggerRef>(null);
	const scrollRef = useRef<ScrollView>(null);

	const insets = useSafeAreaInsets();
	const contentInsets = {
		bottom: Platform.select({ android: insets.bottom + 24, ios: insets.bottom }),
		left: 12,
		right: 12,
		top: insets.top,
	};

	const currentValue = useMemo(
		() => ({
			label: `${session.country_name}, ${session.circuit_short_name}`,
			value: String(session.session_key),
		}),
		[session]
	);

	const handleValueChange = (option: Option) => {
		if (!option) return;

		const selectedKey = Number(option.value);
		const foundSession = sessions.find((s) => s.session_key === selectedKey);

		if (foundSession) setSession(foundSession);
	};

	return (
		<Select onValueChange={handleValueChange} value={currentValue}>
			<SelectTrigger className="w-[210px]" ref={ref}>
				<SelectValue className="font-jetbrains-thin-italic" placeholder="Select a session" />
			</SelectTrigger>
			<SelectContent className="w-[210px]" insets={contentInsets}>
				<NativeSelectScrollView ref={scrollRef}>
					<SelectGroup>
						{sessions.map((s) => (
							<SelectItem
								key={s.session_key}
								label={`${s.country_name}, ${s.circuit_short_name}`}
								onLayout={(e) => {
									const y = e.nativeEvent.layout.y;

									if (s.session_key === session.session_key)
										scrollRef.current?.scrollTo({ animated: true, y });
								}}
								value={`${s.session_key}`}>
								{s.country_name}, {s.circuit_short_name}
							</SelectItem>
						))}
					</SelectGroup>
				</NativeSelectScrollView>
			</SelectContent>
		</Select>
	);
}

const NativeSelectScrollView = forwardRef<ScrollView, NativeSelectScrollViewProps>(
	function NativeSelectScrollView({ className, ...props }, ref) {
		return <ScrollView className={cn('max-h-52', className)} ref={ref} {...props} />;
	}
);
