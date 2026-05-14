/** OpenF1 API response shapes — see https://openf1.org/docs/ */

/** Drivers championship — beta; race sessions only. */
export type OpenF1ChampionshipDriver = {
	driver_number: number;
	meeting_key: number;
	points_current: null | number;
	points_start: null | number;
	position_current: number;
	position_start: number;
	session_key: number;
};

/** Teams championship — beta; race sessions only. */
export type OpenF1ChampionshipTeam = {
	meeting_key: number;
	points_current: null | number;
	points_start: null | number;
	position_current: number;
	position_start: number;
	session_key: number;
	team_name: string;
};

export type OpenF1Driver = {
	broadcast_name: string;
	driver_number: number;
	first_name: string;
	full_name: string;
	headshot_url: string;
	last_name: string;
	meeting_key: number;
	name_acronym: string;
	session_key: number;
	team_colour: string;
	team_name: string;
};

export type OpenF1Meeting = {
	circuit_image: string;
	circuit_short_name: string;
	circuit_type: string;
	country_code: string;
	country_flag: string;
	country_name: string;
	date_end: string;
	date_start: string;
	gmt_offset: string;
	is_cancelled: boolean;
	location: string;
	meeting_key: number;
	meeting_name: string;
	meeting_official_name: string;
	year: number;
};

export type OpenF1RaceControl = {
	category: string;
	date: string;
	driver_number: null | number;
	flag: string;
	lap_number: number;
	meeting_key: number;
	message: string;
	qualifying_phase: null | number;
	scope: null | string;
	sector: null | string;
	session_key: number;
};

export type OpenF1Session = {
	circuit_short_name: string;
	country_name: string;
	date_end: string;
	date_start: string;
	gmt_offset: string;
	is_cancelled: boolean;
	location: string;
	meeting_key: number;
	session_key: number;
	session_name: string;
	session_type: string;
	year: number;
};

export type OpenF1SessionResult = {
	dnf: boolean;
	dns: boolean;
	driver_number: number;
	dsq: boolean;
	duration: number | number[];
	gap_to_leader: number | number[] | string;
	meeting_key: number;
	number_of_laps: number;
	position: number;
	session_key: number;
};

export type OpenF1StartingGrid = {
	driver_number: number;
	lap_duration: number;
	meeting_key: number;
	position: number;
	session_key: number;
};

export type OpenF1Weather = {
	air_temperature: number;
	humidity: number;
	meeting_key: number;
	pressure: number;
	session_key: number;
	track_temperature: number;
	wind_direction: number;
	wind_speed: number;
};

export type OpenF1Position = {
	date: string;
	driver_number: number;
	meeting_key: number;
	position: number;
	session_key: number;
};

export type OpenF1Overtake = {
	date: string;
	driver_number: number;
	meeting_key: number;
	overtaken_driver_number: number;
	overtaking_driver_number: number;
	position: number;
	session_key: number;
};

export type OpenF1Stint = {
	compound: string;
	driver_number: number;
	lap_end: number;
	lap_start: number;
	meeting_key: number;
	session_key: number;
	stint_number: number;
	tyre_age_at_start: number;
};

export type OpenF1Pit = {
	date: string;
	driver_number: number;
	lap_number: number;
	lane_duration: number;
	meeting_key: number;
	pit_duration: number;
	session_key: number;
	stop_duration: number;
};

export type OpenF1TeamRadio = {
	date: string;
	driver_number: number;
	meeting_key: number;
	recording_url: string;
	session_key: number;
};

export type OpenF1Lap = {
	date_start: string;
	driver_number: number;
	duration_sector_1: number;
	duration_sector_2: number;
	duration_sector_3: number;
	i1_speed: number;
	i2_speed: number;
	is_pit_out_lap: boolean;
	lap_duration: number | number[];
	lap_number: number;
	meeting_key: number;
	session_key: number;
	st_speed: number;
};

export type QueryWrapper<T> = Partial<
	T & {
		[K in keyof T as `${K & string}<`]: T[K];
	} & {
		[K in keyof T as `${K & string}>`]: T[K];
	}
>;
