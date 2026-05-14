export type LapWithDuration = {
	duration_sector_1: number;
	duration_sector_2: number;
	duration_sector_3: number;
	lap_duration: number;
	lap_number: number;
};

export type OvertakeStats = {
	lost: number;
	lostMostAt: null | string;
	made: number;
	madeMostAt: null | string;
};

export type PositionArcPoint = {
	date: string;
	position: number;
};

export type SeasonPointsRow = {
	circuit_short_name: string;
	date_end: string;
	meeting_key: number;
	meeting_name: string;
	points: number;
	position: number;
};

export type SeasonStats = {
	dnfs: number;
	podiums: number;
	points: number;
	position: number;
	wins: number;
};
