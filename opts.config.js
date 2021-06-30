// import autoprefixer from 'autoprefixer';
import { readFileSync } from 'fs';
import copy from 'cp-file';
import cssnano from 'cssnano';
import hash from 'xxhashjs';
import path from 'path';
import postcssAssets from 'postcss-assets';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import postcssFlexbugs from 'postcss-flexbugs-fixes';
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
		postcssAssets({
			loadPaths: ['src/assets/media/', 'src/assets/fonts/'],
			relative: true,
		}),
		postcssUrl({
			url: (asset, dir) => {
				const oldPath = path.resolve(dir.from, asset.url);
				const oldName = path.basename(oldPath);
				const newName = dev
					? oldName
					: hash.h32(readFileSync(oldPath, { encoding: 'utf-8' }), 12345).toString(16);
				const newPath = path.resolve(staticPath, newName);
				// console.log(
				// 	`[DEBUG] file: ${dir.file},\n\tfrom: ${dir.from},\n\tto: ${dir.to},\n\turl: ${asset.url},\n\trelative: ${asset.relativePath},\n\tabsolute: ${asset.absolutePath},\n\toldPath: ${oldPath},\n\toldName: ${oldName},\n\tnewName: ${newName},\n\tnewPath: ${newPath}`
				// );
				copy.sync(oldPath, newPath, { overwrite: false });
				// console.log(`[POSTCSS] ${oldPath} -> ${newPath}`);
				return `/${newName}`;
			},
		}),
		!dev && postcssFlexbugs(),
		// !dev && autoprefixer({ grid: 'autoplace' }),
		!dev &&
			cssnano({
				preset: 'advanced',
			}),
		!dev && postcssFailOnWarn(),
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
	keep_classnames: true,
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
