import type { OpenF1Driver, OpenF1Session, QueryWrapper } from '@api/openf1/types';

import { fetchDriver, fetchSessions } from '@api/openf1/client';
import { openf1Keys } from '@api/openf1/query-keys';
import { DriverScreen } from '@components/driver/driver-screen';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

export default function DriverPage() {
	const params = useLocalSearchParams<{
		driverNumber: string;
		meetingKey?: string;
		sessionKey?: string;
	}>();
	const [year, setYear] = useState(new Date().getFullYear());

	const driverQueryObj: QueryWrapper<OpenF1Driver> = {
		driver_number: Number(params.driverNumber),
		...(params.sessionKey && { session_key: Number(params.sessionKey) }),
		...(params.meetingKey && { meeting_key: Number(params.meetingKey) }),
	};
	const driverQuery = useQuery({
		queryFn: () => fetchDriver(driverQueryObj),
		queryKey: openf1Keys.drivers(driverQueryObj),
		select: (data) => data.at(0) || null,
	});
	const { data: driver, refetch: refetchDriver } = driverQuery;

	const sessionsQueryObj: QueryWrapper<OpenF1Session> = useMemo(
		() => ({
			'date_start<': format(Date.now(), 'yyyy-MM-dd'),
			is_cancelled: false,
			session_name: 'Race',
			year,
		}),
		[year]
	);
	const sessionsQuery = useQuery({
		queryFn: () => fetchSessions(sessionsQueryObj),
		queryKey: openf1Keys.sessions(sessionsQueryObj),
	});
	const { data: sessions, refetch: refetchSessions } = sessionsQuery;

	const isLoading = driverQuery.isLoading || sessionsQuery.isLoading;
	const isRefreshing = driverQuery.isRefetching || sessionsQuery.isRefetching;
	const error = driverQuery.error ?? sessionsQuery.error ?? null;

	const refetch = useCallback(() => {
		void refetchDriver();
		void refetchSessions();
	}, [refetchDriver, refetchSessions]);

	return (
		<DriverScreen
			driver={driver}
			error={error}
			isLoading={isLoading}
			isRefreshing={isRefreshing}
			refetch={refetch}
			sessions={sessions}
			setYear={setYear}
			year={year}
		/>
	);
}
