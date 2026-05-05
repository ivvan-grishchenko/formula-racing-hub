import type { OpenF1Session, QueryWrapper } from '@api/openf1/types';

import { fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { SessionResultsScreen } from '@components/session-results/session-results-screen';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';

export default function SessionResultsPage() {
	const { meetingKey } = useLocalSearchParams<{ meetingKey: string }>();

	const numericMeetingKey = Number(meetingKey);

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = { meeting_key: numericMeetingKey };
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { refetch: refetchSessions } = sessionsQuery;

	const onRefresh = useCallback(() => void refetchSessions(), [refetchSessions]);

	if (sessionsQuery.isLoading) return <Loader />;

	if (sessionsQuery.error)
		return <ErrorDisplay message={sessionsQuery.error.message} onRetry={onRefresh} />;

	return (
		sessionsQuery.data && (
			<SessionResultsScreen onRefresh={onRefresh} sessions={sessionsQuery.data} />
		)
	);
}
