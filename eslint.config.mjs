import expoConfig from 'eslint-config-expo/flat.js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	expoConfig,
	eslintPluginPrettier,
	reactCompiler.configs.recommended,
	perfectionist.configs['recommended-natural'],
	{ ignores: ['dist/*'] },
]);
