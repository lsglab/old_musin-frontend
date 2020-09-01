import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import strip from '@rollup/plugin-strip';
import url from '@rollup/plugin-url';
import rollupSass from 'rollup-plugin-sass';
import { terser } from 'rollup-plugin-terser';
import module from 'module';
import config from 'sapper/config/rollup';
import pkg from './package.json';
import svelteConfig from './svelte.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

// eslint-disable-next-line no-shadow
const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

const sassOpts = {
	outputStyle: 'compressed',
	precision: 2,
	includePaths: ['./node_modules/'],
	// fiber: Fiber,
};

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			rollupSass({ options: sassOpts }),
			url({
				limit: 20000,
				emitFiles: false,
				publicPath: './static/',
			}),
			image({
				dom: true,
			}),
			svelte({
				...svelteConfig,
				dev,
				hydratable: true,
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			!dev &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					babelHelpers: 'runtime',
					exclude: ['node_modules/@babel/**'],
				}),
			!dev &&
				terser({
					module: true,
					compress: {
						defaults: true,
						booleans_as_integers: true,
						drop_console: true,
						hoist_funs: true,
						hoist_vars: true,
						keep_fargs: false,
						passes: 3,
						toplevel: true,
						unsafe: true,
						unsafe_arrows: true,
						unsafe_Function: true,
						unsafe_math: true,
						unsafe_proto: true,
						unsafe_undefined: true,
						safari10: true,
					},
					mangle: {
						toplevel: true,
						safari10: true,
					},
					toplevel: true,
					warnings: true,
					safari10: true,
					ie8: true,
					format: {
						indent_level: 0,
						webkit: true,
					},
					parse: {
						html5_comments: false,
					},
				}),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
	server: {
		input: config.server.input(),
		output: { ...config.server.output(), format: 'esm' },
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				...svelteConfig,
				generate: 'ssr',
				dev,
				hydratable: true,
			}),
			resolve({
				dedupe: ['svelte'],
			}),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(module.builtinModules),
		preserveEntrySignatures: 'strict',
		onwarn,
	},
	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			commonjs(),
			!dev &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					babelHelpers: 'runtime',
					exclude: ['node_modules/@babel/**'],
				}),
			!dev &&
				terser({
					module: true,
					compress: {
						defaults: true,
						booleans_as_integers: true,
						drop_console: true,
						hoist_funs: true,
						hoist_vars: true,
						keep_fargs: false,
						passes: 3,
						toplevel: true,
						unsafe: true,
						unsafe_arrows: true,
						unsafe_Function: true,
						unsafe_math: true,
						unsafe_proto: true,
						unsafe_undefined: true,
						safari10: true,
					},
					mangle: {
						toplevel: true,
						safari10: true,
					},
					toplevel: true,
					warnings: true,
					safari10: true,
					ie8: true,
					format: {
						indent_level: 0,
						webkit: true,
					},
					parse: {
						html5_comments: false,
					},
				}),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
};
