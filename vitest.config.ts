import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.{ts,tsx}'],
		coverage: {
			include: [
				'src/components/**/*.{ts,tsx}',
				'src/helpers/**/*.ts',
				'src/context/**/*.tsx',
			],
			exclude: ['src/**/*.test.*', 'src/**/index.ts'],
		},
	},
});
