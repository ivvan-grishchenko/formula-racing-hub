import * as SecureStore from 'expo-secure-store';

/** Valid SecureStore key: alphanumeric, ".", "-", "_". */
const KEY = 'formula_racing_hub_onboarding_complete';

export async function clearOnboardingComplete(): Promise<void> {
	await SecureStore.deleteItemAsync(KEY);
}

export async function getOnboardingComplete(): Promise<boolean> {
	const v = await SecureStore.getItemAsync(KEY);

	return v === '1';
}

export async function setOnboardingComplete(): Promise<void> {
	await SecureStore.setItemAsync(KEY, '1');
}
