import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.{ts,tsx}'],
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: [
				'src/components/**/*.{ts,tsx}',
				'src/helpers/**/*.ts',
				'src/context/**/*.tsx',
			],
			exclude: ['src/**/*.test.*', 'src/**/index.ts'],
		},
	},
});
