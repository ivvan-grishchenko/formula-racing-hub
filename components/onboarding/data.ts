import type { OnboardingStep } from './types';

export const STEPS: OnboardingStep[] = [
	{
		badge: '2023+ SEASON DATA',
		body: 'Deep dive into post-session analytics, driver standings, and gap-to-leader metrics.',
		featureBody: 'Get notified for session starts, red flags, and final classification results.',
		featureTitle: 'Race Control Alerts',
		illustration: {
			leftLabel: 'SECTOR 1',
			leftValue: '28.452',
			rightLabel: 'GAP TO LDR',
			rightValue: '+1.24s',
		},
		title: 'MASTER THE\nTELEMETRY',
	},
	{
		badge: 'OPEN F1 · SESSION DATA',
		body: 'Live timing, tyre stints, and sector splits from OpenF1. Built for fans who read the race as fast as it unfolds.',
		featureBody:
			'Pin drivers, compare gaps, and watch deltas update as cars cross each timing line.',
		featureTitle: 'Live timing board',
		illustration: {
			leftLabel: 'BEST LAP',
			leftValue: '1:24.872',
			rightLabel: 'GAP P2',
			rightValue: '-0.342s',
		},
		title: 'FOLLOW EVERY\nSESSION LIVE',
	},
	{
		badge: 'FREE · HISTORICAL DATA',
		body: 'Sessions, standings, and race-control highlights in one hub. Tune alerts so you never miss lights out or the chequered flag.',
		featureBody: 'Continue to explore the Formula Racing Hub by proceeding to the Home screen.',
		featureTitle: 'Ready when you are',
		illustration: {
			leftLabel: 'STANDINGS',
			leftValue: 'P3',
			rightLabel: 'NEXT SESSION',
			rightValue: 'Q3',
		},
		title: 'YOUR PIT WALL,\nANYWHERE',
	},
];
