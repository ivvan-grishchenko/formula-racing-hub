import expoConfig from 'eslint-config-expo/flat.js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	expoConfig,
	eslintPluginPrettier,
	perfectionist.configs['recommended-natural'],
	{ ignores: ['dist/*'] },
]);
