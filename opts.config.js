import autoprefixer from 'autoprefixer';
import colorguard from 'colorguard';
import cssnano from 'cssnano';
import path from 'path';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import sass from 'sass';
import sveltePreprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';

const postcssConfig = (dev) => ({
	plugins: [
		postcssImport(),
		colorguard({
			threshold: 10,
		}),
		tailwindcss('./tailwind.config.js'),
		postcssUrl([
			{
				assetsPath: 'static',
				basePath: [
					path.resolve('node_modules/'),
					path.resolve('src/assets/'),
					path.resolve('src/assets/styles/'),
					path.resolve('src/assets/media/'),
				],
				fallback: 'copy',
				ignoreFragmentWarning: true,
				maxSize: 20,
				optimizeSvgEncode: true,
				shrink: 0,
				url: 'inline',
				useHash: true,
			},
			{
				multi: true,
				url: (asset) => {
					return asset.url.replace('static/', '/'); // Fix relative asset path
				},
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
	embedSourceMap: dev,
	includePaths: ['./node_modules/'],
	indentType: 'tab',
	indentWidth: 4,
	indentedSyntax: false,
	lineFeed: 'lf',
	outputStyle: dev ? 'expanded' : 'compressed',
	sourceMap: dev,
	sourceMapContents: dev,
});
const preprocessConfig = (dev) => ({
	preprocess: sveltePreprocess({
		markupTagName: 'template',
		postcss: true,
		sass: {
			implementation: sass,
			renderSync: true,
			...sassConfig(dev),
		},
		sourceMap: dev,
	}),
});
const terserConfig = (module) => ({
	compress: {
		booleans_as_integers: true,
		defaults: true,
		drop_console: true,
		hoist_funs: true,
		hoist_vars: true,
		keep_fargs: false,
		passes: 3,
		toplevel: true,
		unsafe: true,
		unsafe_Function: true,
		unsafe_arrows: true,
		unsafe_math: true,
		unsafe_proto: true,
		unsafe_undefined: true,
	},
	format: {
		indent_level: 0,
		webkit: true,
	},
	mangle: {
		toplevel: true,
	},
	module,
	parse: {
		html5_comments: false,
	},
	toplevel: true,
	warnings: true,
});
const babelConfig = (skip) => ({
	babelHelpers: 'bundled',
	exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
	extensions: ['.js', '.mjs', '.cjs', '.ts', '.html', '.svelte'],
	skipPreflightCheck: skip,
});
const jsonConfig = (dev) => ({
	compact: !dev,
	preferConst: true,
});

export { postcssConfig, sassConfig, preprocessConfig, terserConfig, babelConfig, jsonConfig };
