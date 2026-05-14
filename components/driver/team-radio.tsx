import type { OpenF1TeamRadio } from '@api/openf1/types';
import type { AVPlaybackStatus } from 'expo-av';

import { fetchTeamRadio } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
import { Text } from '@components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { Audio } from 'expo-av';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Skeleton } from 'react-native-reusables';

import { useDriverContext } from './driver-context';

type TeamRadioInnerProps = {
	clips: OpenF1TeamRadio[];
	isLoading: boolean;
};

export function TeamRadio() {
	const { driverNumber, sessionInfo } = useDriverContext();

	const radioQuery = useQuery({
		enabled: !!sessionInfo.sessionKey,
		queryFn: () =>
			fetchTeamRadio({ driver_number: driverNumber, session_key: sessionInfo.sessionKey! }),
		queryKey: openf1Keys.teamRadio({
			driver_number: driverNumber,
			session_key: sessionInfo.sessionKey!,
		}),
	});

	const isLoading = radioQuery.isLoading;
	const clips = radioQuery.data ?? [];

	return <TeamRadioInner clips={clips} isLoading={isLoading} />;
}

function TeamRadioInner({ clips, isLoading }: TeamRadioInnerProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [sound, setSound] = useState<Audio.Sound | null>(null);

	const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
		if (status.isLoaded && status.didJustFinish) {
			setIsPlaying(false);
		}
	};

	const loadAudio = useCallback(
		async (url: string) => {
			if (sound) {
				await sound.unloadAsync();
			}

			const { sound: newSound } = await Audio.Sound.createAsync(
				{ uri: url },
				{},
				onPlaybackStatusUpdate
			);

			setSound(newSound);
		},
		[sound]
	);

	useEffect(() => {
		(async () => {
			const { status } = await Audio.requestPermissionsAsync();

			if (status !== 'granted') {
				// Audio permission not granted
			}
		})();
	}, []);

	useEffect(() => {
		if (clips.length > 0 && clips[currentIndex]) {
			loadAudio(clips[currentIndex].recording_url);
		}

		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [currentIndex, clips, loadAudio, sound]);

	const handleNext = () => {
		if (currentIndex < clips.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			setIsPlaying(false);
		}
	};

	const handlePlayPause = async () => {
		if (!sound) return;

		if (isPlaying) {
			await sound.pauseAsync();
			setIsPlaying(false);
		} else {
			await sound.playAsync();
			setIsPlaying(true);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
			setIsPlaying(false);
		}
	};

	if (isLoading) {
		return (
			<View className="mx-6 rounded-xl border border-border bg-card p-4">
				<View className="flex flex-row items-center gap-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<View className="flex flex-1 flex-col gap-2">
						<Skeleton className="h-4 w-32 rounded" />
						<Skeleton className="h-3 w-24 rounded" />
					</View>
				</View>
			</View>
		);
	}

	if (!clips || clips.length === 0) {
		return (
			<View className="mx-6 rounded-xl border border-border bg-card p-4">
				<Text className="text-sm text-muted-foreground">No team radio available</Text>
			</View>
		);
	}

	const currentClip = clips[currentIndex];

	return (
		<View className="mx-6 rounded-xl border border-border bg-card p-4">
			<View className="flex flex-row items-center gap-4">
				<Button
					className="h-12 w-12 rounded-full bg-primary"
					onPress={handlePlayPause}
					size="icon"
					variant="default">
					<Icon as={isPlaying ? Pause : Play} color="#f0fdfa" size={24} />
				</Button>
				<View className="flex flex-1 flex-col gap-1">
					<Text className="font-jetbrains-medium text-sm text-foreground">Team radio</Text>
					<Text className="font-jetbrains-light text-xs text-muted-foreground">
						{currentClip.date}
					</Text>
				</View>
				<View className="flex flex-row items-center gap-2">
					<Button
						className="h-8 w-8 rounded-full"
						disabled={currentIndex === 0}
						onPress={handlePrev}
						size="icon"
						variant="ghost">
						<Icon as={SkipBack} color="#9ca8ab" size={16} />
					</Button>
					<Button
						className="h-8 w-8 rounded-full"
						disabled={currentIndex === clips.length - 1}
						onPress={handleNext}
						size="icon"
						variant="ghost">
						<Icon as={SkipForward} color="#9ca8ab" size={16} />
					</Button>
				</View>
			</View>
			<View className="mt-3 font-jetbrains-light text-xs text-muted-foreground">
				{currentIndex + 1} / {clips.length}
			</View>
		</View>
	);
}
