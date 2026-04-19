import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
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
	...tanstackQueryPlugin.configs['flat/recommended'],
	{ ignores: ['dist/*'] },
	{
		rules: {
			'class-methods-use-this': 'off',
			'key-spacing': ['error', { afterColon: true }],
			'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-multi-spaces': 'error',
			'no-restricted-syntax': ['off', 'ForOfStatement'],
			'no-return-await': 'off',
			'no-var': 'error',
			'object-curly-spacing': ['error', 'always'],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', next: 'return', prev: '*' },
				{ blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
				{
					blankLine: 'any',
					next: ['const', 'let', 'var'],
					prev: ['const', 'let', 'var'],
				},
			],
			'prettier/prettier': 'error',
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
		},
	},
]);
