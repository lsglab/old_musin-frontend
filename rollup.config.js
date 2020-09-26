import { babelConfig, jsonConfig, preprocessConfig, terserConfig } from './opts.config';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import config from 'sapper/config/rollup';
import globals from './src/globals';
import json from '@rollup/plugin-json';
import module from 'module';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import svelte from 'rollup-plugin-svelte';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
// const legacy = !!process.env.SAPPER_LEGACY_BUILD && !dev;

const onwarn = (warning, warn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	warning.code === 'THIS_IS_UNDEFINED' ||
	warn(warning);

const replaceConfig = (browser) => ({
	'process.browser': browser,
	'process.env.NODE_ENV': JSON.stringify(mode),
	'process.globals': JSON.stringify(globals),
});
const svelteConfig = () => ({
	...preprocessConfig(dev),
	dev,
	hydratable: true,
	legacy: !!process.env.SAPPER_LEGACY_BUILD,
});
const clientOutput = () => ({
	...config.client.output(),
	format: process.env.SAPPER_LEGACY_BUILD ? 'system' : config.client.output().format,
});

export default {
	client: {
		context: 'this',
		input: config.client.input(),
		onwarn,
		output: clientOutput(),
		plugins: [
			replace(replaceConfig(true)),
			svelte({
				...svelteConfig(),
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			babel(babelConfig()),
			!dev && terser(terserConfig()),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
	},
	server: {
		context: 'this',
		external: Object.keys(pkg.dependencies).concat(module.builtinModules),
		input: config.server.input(),
		onwarn,
		output: config.server.output(),
		plugins: [
			replace(replaceConfig(false)),
			json(jsonConfig(dev)),
			svelte({
				...svelteConfig(),
				generate: 'ssr',
			}),
			resolve({
				dedupe: ['svelte'],
			}),
			commonjs(),
		],
		preserveEntrySignatures: 'strict',
	},
	serviceworker: {
		context: 'this',
		input: config.serviceworker.input(),
		onwarn,
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace(replaceConfig(false)),
			commonjs(),
			babel(babelConfig()),
			!dev && terser(terserConfig()),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
	},
};
