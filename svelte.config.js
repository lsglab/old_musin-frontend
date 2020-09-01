// eslint-disable-next-line import/no-extraneous-dependencies
import sveltePreprocess from 'svelte-preprocess';
import postcssConfig from './postcss.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

export default {
	preprocess: sveltePreprocess({
		sourceMap: dev,
		postcss: { ...postcssConfig },
		sass: {
			renderSync: true,
		},
		globalStyle: {},
	}),
};
