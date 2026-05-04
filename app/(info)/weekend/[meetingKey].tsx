import type { OpenF1Meeting, OpenF1Session, QueryWrapper } from '@api/openf1/types';

import { fetchMeetings, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { Loader } from '@components/layout/loader';
import { WeekendDetailScreen } from '@components/weekend/weekend-detail-screen';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

export default function WeekendDetailPage() {
	const { meetingKey } = useLocalSearchParams<{ meetingKey: string }>();

	const meetingQueryObj: QueryWrapper<OpenF1Meeting> = { meeting_key: Number(meetingKey) };
	const meetingQuery = useQuery({
		queryFn: () => fetchMeetings(meetingQueryObj),
		queryKey: openf1Keys.meetings(meetingQueryObj),
		select: (meetings) => meetings.at(0) || null,
	});

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = { meeting_key: Number(meetingKey) };
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});

	if (meetingQuery.isPending || sessionsQuery.isPending) return <Loader />;

	return (
		meetingQuery.data &&
		sessionsQuery.data && (
			<WeekendDetailScreen meeting={meetingQuery.data} sessions={sessionsQuery.data} />
		)
	);
}
