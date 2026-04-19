export const tracingInsightsKeys = {
	driverOfTheDay: (year: number, race: string) => ['dotd', year, race] as const,
};
