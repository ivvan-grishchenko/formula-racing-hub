type IllustrationProps = {
	leftLabel: string;
	leftValue: string;
	rightLabel: string;
	rightValue: string;
};

type OnboardingFlowProps = {
	onComplete: () => void;
};

type OnboardingStep = {
	badge: string;
	body: string;
	featureBody: string;
	featureTitle: string;
	illustration: IllustrationProps;
	title: string;
};

export { IllustrationProps, OnboardingFlowProps, OnboardingStep };
