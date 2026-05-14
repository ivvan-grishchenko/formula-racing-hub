import type { OpenF1Driver, OpenF1Session } from '@api/openf1/types';

import { ErrorDisplay } from '@components/layout/error-display';
import { Loader } from '@components/layout/loader';
import { RefreshControl, ScrollView } from 'react-native';

import { DriverHeader } from './driver-header';
import { LapTimesChart } from './lap-times-chart';
import { OvertakesSection } from './overtakes-section';
import { PitStopsSection } from './pit-stops-section';
import { PositionArcChart } from './position-arc-chart';
import { SeasonPointsChart } from './season-points-chart';
import { SeasonStats } from './season-stats';
import { SessionPicker } from './session-picker';
import { SessionResult } from './session-result';
import { TeamRadio } from './team-radio';
import { TyreStrategy } from './tyre-strategy';

type DriverScreenProps = {
	driver?: null | OpenF1Driver;
	error: Error | null;
	isLoading: boolean;
	isRefreshing: boolean;
	refetch: () => void;
	sessions?: OpenF1Session[];
	setYear: (year: number) => void;
	year: number;
};

export function DriverScreen({
	driver,
	error,
	isLoading,
	isRefreshing,
	refetch,
	sessions,
	setYear,
	year,
}: DriverScreenProps) {
	if (isLoading) return <Loader />;

	if (error) return <ErrorDisplay message={error.message} onRetry={refetch} />;

	return (
		<ScrollView
			className="flex-1"
			contentContainerClassName="gap-4 px-4 pb-10 pt-3"
			refreshControl={
				<RefreshControl onRefresh={refetch} refreshing={isRefreshing} tintColor="white" />
			}
			showsVerticalScrollIndicator={false}>
			<DriverHeader driver={driver} />

			<SessionPicker setYear={setYear} year={year} />

			{sessions && driver && <SeasonStats driver={driver} sessions={sessions} />}

			{/*

			<SeasonPointsChart />

			<SessionResult />

			<LapTimesChart />

			<PositionArcChart />

			<TyreStrategy />

			<OvertakesSection />

			<PitStopsSection />

			<TeamRadio />*/}
		</ScrollView>
	);
}
