/** OpenF1 API response shapes — see https://openf1.org/docs/ */

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
	duration: number;
	gap_to_leader: number;
	meeting_key: number;
	number_of_laps: number;
	position: number;
	session_key: number;
};

export type QueryWrapper<T> = Partial<
	T & {
		[K in keyof T as `${K & string}<`]: T[K];
	} & {
		[K in keyof T as `${K & string}>`]: T[K];
	}
>;
