export interface ApiSportsCircuit {
	capacity: number;
	city: string;
	country: string;
	distance: string;
	id: number;
	image: string;
	lapRecord: {
		driver: string;
		time: string;
		year: number;
	};
	length: string;
	name: string;
	numberOfLaps: number;
	opened: number;
}

export type Circuit = ApiSportsCircuit;
