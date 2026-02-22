import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
	// ESM build
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/es/index.js',
			format: 'es',
			sourcemap: true,
		},
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: './tsconfig.build.json' }),
			postcss({ extract: 'react-wire-table.css', minimize: true }),
			terser(),
		],
		external: [/^react/, /^classifizer/],
	},
	// CJS build
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/cjs/index.js',
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.build.json',
				declaration: false,
				declarationMap: false,
				declarationDir: undefined,
			}),
			postcss({ extract: false, inject: false }),
			terser(),
		],
		external: [/^react/, /^classifizer/],
	},
];
