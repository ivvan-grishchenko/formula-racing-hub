import type { OpenF1Meeting, OpenF1Session, QueryWrapper } from '@api/openf1/types';

import { fetchMeetings, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { useQuery } from '@tanstack/react-query';
import { isAfter } from 'date-fns';
import { useCallback, useMemo } from 'react';

export type CalendarData = {
	error: Error | null;
	isLoading: boolean;
	isRefreshing: boolean;
	meetingsChronological: OpenF1Meeting[];
	nextMeetingKey: null | number;
	refetch: () => Promise<void>;
	roundByMeetingKey: Map<number, number>;
	sprintMeetingKeys: Set<number>;
	sprintWeekendCount: number;
};

export type CalendarFilter = 'completed' | 'upcoming';
type CalendarDataProps = { year: number };

/**
 * OpenF1 meetings and sprint metadata for the season calendar screen.
 */
export function useCalendarData({ year }: CalendarDataProps): CalendarData {
	const meetingsQueryObj: QueryWrapper<OpenF1Meeting> = useMemo(() => ({ year }), [year]);
	const meetingsQuery = useQuery({
		queryFn: () => fetchMeetings(meetingsQueryObj),
		queryKey: openf1Keys.meetings(meetingsQueryObj),
	});
	const { data: meetingsData, refetch: refetchMeetings } = meetingsQuery;

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = useMemo(() => ({ year }), [year]);
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { data: sessionsData, refetch: refetchSessions } = sessionsQuery;

	const sprintMeetingKeys = useMemo(() => {
		const keys = new Set<number>();

		if (!sessionsData) return keys;

		for (const session of sessionsData) {
			if (isSprintSession(session)) keys.add(session.meeting_key);
		}

		return keys;
	}, [sessionsData]);

	const roundByMeetingKey = useMemo(() => {
		const map = new Map<number, number>();

		meetingsData?.forEach((meeting, index) => {
			map.set(meeting.meeting_key, index + 1);
		});

		return map;
	}, [meetingsData]);

	const nextMeetingKey = useMemo(() => {
		const now = Date.now();

		return meetingsData?.find((meeting) => isAfter(meeting.date_end, now))?.meeting_key ?? null;
	}, [meetingsData]);

	const sprintWeekendCount = useMemo(() => {
		if (!meetingsData) return 0;

		return meetingsData.reduce(
			(count, meeting) => count + (sprintMeetingKeys.has(meeting.meeting_key) ? 1 : 0),
			0
		);
	}, [meetingsData, sprintMeetingKeys]);

	const isLoading = meetingsQuery.isPending || sessionsQuery.isPending;

	const isRefreshing = meetingsQuery.isRefetching || sessionsQuery.isRefetching;

	const error = meetingsQuery.error ?? sessionsQuery.error ?? null;

	const refetch = useCallback(async () => {
		await Promise.all([refetchMeetings(), refetchSessions()]);
	}, [refetchMeetings, refetchSessions]);

	return {
		error,
		isLoading,
		isRefreshing,
		meetingsChronological: meetingsData || [],
		nextMeetingKey,
		refetch,
		roundByMeetingKey,
		sprintMeetingKeys,
		sprintWeekendCount,
	};
}

function isSprintSession(session: OpenF1Session): boolean {
	return session.session_name === 'Sprint';
}
