import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import strip from '@rollup/plugin-strip';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
import module from 'module';
import sass from 'sass';
import scss from 'rollup-plugin-scss';
import config from 'sapper/config/rollup';
import pkg from './package.json';
import {
	sassOpts,
	preprocessOpts as svelteConfig,
	terserOpts as terserConfig,
	babelOpts as babelConfig,
} from './opts.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const replaceConfig = (browser) => ({
	'process.browser': browser,
	'process.env.NODE_ENV': JSON.stringify(mode),
});
const sassConfig = { ...sassOpts, dev, hydratable: true };

// eslint-disable-next-line no-shadow
const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace(replaceConfig(true)),
			url({
				limit: 20000,
				emitFiles: true,
			}),
			scss({
				output: 'static/bundle.css',
				sass,
				...sassConfig,
			}),
			svelte({
				...svelteConfig,
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			babel(babelConfig),
			!dev && terser(terserConfig),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
	server: {
		input: config.server.input(),
		output: { ...config.server.output(), format: 'esm' },
		plugins: [
			replace(replaceConfig(false)),
			svelte({
				...svelteConfig,
				generate: 'ssr',
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
			replace(replaceConfig(false)),
			commonjs(),
			babel(babelConfig),
			!dev && terser(terserConfig),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
};
