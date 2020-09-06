import sveltePreprocess from 'svelte-preprocess';
import sass from 'sass';
import path from 'path';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import colorguard from 'colorguard';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const postcssConfig = (dev) => ({
	plugins: [
		postcssImport(),
		colorguard({
			threshold: 10,
		}),
		tailwindcss('./tailwind.config.js'),
		postcssUrl([
			{
				url: 'inline',
				fallback: 'copy',
				ignoreFragmentWarning: true,
				optimizeSvgEncode: true,
				maxSize: 20,
				shrink: 0,
				useHash: true,
				basePath: [
					path.resolve('node_modules/'),
					path.resolve('src/assets/'),
					path.resolve('src/assets/fonts/'),
					path.resolve('src/assets/media/'),
					path.resolve('src/assets/styles/'),
					path.resolve('static/'),
				],
				assetsPath: 'static',
			},
			{
				url: (asset) => {
					return asset.url.replace('static/', '/'); // Fix relative asset path
				},
				multi: true,
			},
		]),
		!dev && autoprefixer,
		!dev &&
			cssnano({
				preset: 'advanced',
			}),
		postcssFailOnWarn,
	].filter(Boolean),
});
const sassConfig = (dev) => ({
	indentedSyntax: false,
	outputStyle: dev ? 'expanded' : 'compressed',
	lineFeed: 'lf',
	includePaths: ['./node_modules/'],
	indentType: 'tab',
	indentWidth: 4,
	sourceMap: dev,
	sourceMapContents: dev,
	embedSourceMap: dev,
});
const preprocessConfig = (dev) => ({
	preprocess: sveltePreprocess({
		sourceMap: dev,
		markupTagName: 'template',
		defaults: {
			markup: 'html',
			script: 'javascript',
			style: 'scss',
		},
		postcss: { ...postcssConfig(dev) },
		sass: {
			renderSync: true,
			implementation: sass,
			...sassConfig(dev),
		},
	}),
});
const terserConfig = () => ({
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
	},
	mangle: {
		toplevel: true,
	},
	toplevel: true,
	warnings: true,
	format: {
		indent_level: 0,
		webkit: true,
	},
	parse: {
		html5_comments: false,
	},
});
const babelConfig = (skip) => ({
	extensions: ['.js', '.mjs', '.cjs', '.ts', '.html', '.svelte'],
	babelHelpers: 'bundled',
	exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
	skipPreflightCheck: skip,
});
const jsonConfig = (dev) => ({
	compact: !dev,
	preferConst: true,
});

export { postcssConfig, sassConfig, preprocessConfig, terserConfig, babelConfig, jsonConfig };
