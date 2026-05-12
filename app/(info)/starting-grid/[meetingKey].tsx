import { StartingGridScreen } from '@components/grid/starting-grid-screen';
import { useLocalSearchParams } from 'expo-router';

export default function StartingGridPage() {
	const { meetingKey } = useLocalSearchParams<{ meetingKey: string }>();

	const numericMeetingKey = Number(meetingKey);

	return <StartingGridScreen meetingKey={numericMeetingKey} />;
}
