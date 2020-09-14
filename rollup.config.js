import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import module from 'module';
import config from 'sapper/config/rollup';
import pkg from './package.json';
import globals from './src/globals';
import { babelConfig, preprocessConfig, terserConfig, jsonConfig } from './opts.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const replaceConfig = (browser) => ({
	'process.browser': browser,
	'process.env.NODE_ENV': JSON.stringify(mode),
	'process.globals': JSON.stringify(globals),
});
const svelteConfig = () => ({
	...preprocessConfig(dev),
	dev,
	hydratable: true,
});

// eslint-disable-next-line no-shadow
const onwarn = (warning, warn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	warning.code === 'THIS_IS_UNDEFINED' ||
	warn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		context: 'this',
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
			babel(babelConfig(dev)),
			!dev && terser(terserConfig(true)),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
	server: {
		input: config.server.input(),
		output: config.server.output(),
		context: 'this',
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
		external: Object.keys(pkg.dependencies).concat(module.builtinModules),
		preserveEntrySignatures: 'strict',
		onwarn,
	},
	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		context: 'this',
		plugins: [
			resolve(),
			replace(replaceConfig(false)),
			commonjs(),
			babel(babelConfig(dev)),
			!dev && terser(terserConfig(false)),
			!dev && strip(),
		],
		preserveEntrySignatures: false,
		onwarn,
	},
};
