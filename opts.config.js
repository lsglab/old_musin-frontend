import { statSync } from 'fs';
import autoprefixer from 'autoprefixer';
import copy from 'cp-file';
import cssnano from 'cssnano';
import path from 'path';
import postcssAssets from 'postcss-assets';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import sass from 'sass';
import sveltePreprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';

const staticPath = path.resolve(__dirname, 'static/');
const postcssConfig = (dev) => ({
	plugins: [
		postcssImport(),
		tailwindcss('./tailwind.config.js'),
		// postcssUrl([
		// 	{
		// 		assetsPath: path.resolve('static/'),
		// 		basePath: [
		// 			path.resolve('src/assets/styles/'),
		// 			path.resolve('src/assets/media/'),
		// 			path.resolve('src/assets/fonts/'),
		// 			path.resolve('src/assets/'),
		// 			path.resolve('node_modules/'),
		// 		],
		// 		hashOptions: {
		// 			append: dev,
		// 			method: 'xxhash64',
		// 			shrink: 0,
		// 		},
		// 		url: 'copy',
		// 		useHash: !dev,
		// 	},
		// 	{
		// 		multi: true,
		// 		url: (asset) => {
		// 			return asset.url.replace('static/', '/'); // Fix relative asset path
		// 		},
		// 	},
		// ]),
		postcssAssets({
			basePath: '.',
			loadPaths: ['src/assets/media/', 'src/assets/fonts/', 'src/assets/styles/', 'src/assets/', 'node_modules/'],
			relative: true,
		}),
		postcssUrl({
			url: (asset) => {
				const oldPath = asset.absolutePath;
				const oldName = asset.pathname;
				const newName = dev ? oldName : statSync(oldPath).mtime.getTime().toString(16) + path.extname(oldName);
				const newPath = path.resolve(staticPath, newName);
				if (newName !== oldName) copy.sync(oldPath, newPath);
				console.log(`${oldPath} -> ${newPath})`);
				return newName;
			},
		}),
		!dev && autoprefixer,
		!dev &&
			cssnano({
				preset: 'advanced',
			}),
		!dev && postcssFailOnWarn,
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
const terserConfig = () => ({
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
	parse: {
		html5_comments: false,
	},
	toplevel: true,
	warnings: true,
});
const babelConfig = () => ({
	babelHelpers: 'bundled',
	configFile: './babel.config.js',
	exclude: ['node_modules/@babel/**', 'node_modules/core-js/**', 'node_modules/core-js-pure/**'],
	extensions: ['.js', '.mjs', '.cjs', '.ts', '.html', '.svelte'],
});
const jsonConfig = (dev) => ({
	compact: !dev,
	preferConst: true,
});

export { postcssConfig, sassConfig, preprocessConfig, terserConfig, babelConfig, jsonConfig };
