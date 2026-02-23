import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strict,
	{
		files: ['src/**/*.{ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
		},
		settings: {
			react: { version: 'detect' },
		},
	},
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'build-tool/**',
			'example/**',
			'docs/**',
			'*.config.*',
		],
	}
);
