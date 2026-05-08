import type { OpenF1Meeting, QueryWrapper } from '@api/openf1/types';

import { fetchCircuitByName } from '@api/api-sports/client';
import { apiSportsKeys } from '@api/api-sports/query-keys';
import { fetchMeetings } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { Loader } from '@components/layout/loader';
import { SessionStatsScreen } from '@components/session-stats/session-stats-screen';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';

export default function SessionStatsPage() {
	const { meetingKey } = useLocalSearchParams<{ meetingKey: string }>();

	const meetingQueryObj: QueryWrapper<OpenF1Meeting> = { meeting_key: Number(meetingKey) };
	const meetingQuery = useQuery({
		enabled: !!meetingKey,
		queryFn: () => fetchMeetings(meetingQueryObj),
		queryKey: openf1Keys.meetings(meetingQueryObj),
		select: (meetings) => meetings.at(0) || null,
	});

	const circuitQuery = useQuery({
		enabled: !!meetingQuery.data?.circuit_short_name,
		queryFn: () => fetchCircuitByName(meetingQuery.data?.circuit_short_name ?? ''),
		queryKey: apiSportsKeys.circuits(meetingQuery.data?.circuit_short_name ?? ''),
		staleTime: 0,
	});

	if (meetingQuery.isLoading || circuitQuery.isLoading) return <Loader />;

	return <SessionStatsScreen circuit={circuitQuery.data ?? null} />;
}
