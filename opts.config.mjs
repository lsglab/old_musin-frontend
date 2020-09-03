import sveltePreprocess from 'svelte-preprocess';
import sass from 'sass';
import Fiber from 'fibers';
import postcssConfig from './postcss.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const sassOpts = {
	outputStyle: 'compressed',
	precision: 2,
	includePaths: ['./node_modules/'],
	fiber: Fiber,
};
const preprocessOpts = {
	preprocess: sveltePreprocess({
		sourceMap: dev,
		postcss: { ...postcssConfig },
		sass: {
			renderSync: false,
			implementation: sass,
			...sassOpts,
		},
	}),
};
const terserOpts = {
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
};
const babelOpts = {
	extensions: ['.js', '.mjs', '.cjs', '.html', '.svelte'],
	babelHelpers: 'bundled',
	exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
	skipPreflightCheck: false,
};

export { sassOpts, preprocessOpts, terserOpts, babelOpts };
