import path from 'path';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssReset from 'postcss-autoreset';
import postcssInitial from 'postcss-initial';
import postcssAssets from 'postcss-assets';
import postcssSprites from 'postcss-sprites';
import postcssFonts from 'postcss-font-magician';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import colorguard from 'colorguard';
// import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import stylelint from 'stylelint';

const production = process.env.NODE_ENV === 'production';

export default {
	plugins: [
		postcssImport({
			plugins: [stylelint],
		}),
		// tailwindcss,
		postcssFonts({
			display: 'swap',
			hosted: ['./assets/fonts', '/'],
			async: './assets/scripts/fontloader.js',
			formats: 'woff2 woff local eot svg otf',
			protocol: 'https:',
		}),
		postcssAssets({
			loadPaths: ['assets/media/', 'node_modules/'],
			relative: true,
			cachebuster: true,
		}),
		postcssSprites({
			spritePath: './tmp/',
			retina: true,
		}),
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
					path.resolve('./node_modules/'),
					path.resolve('./assets/'),
					path.resolve('./assets/styles/'),
					path.resolve('.'),
					path.resolve('./static/'),
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
		postcssReset({
			reset: 'initial',
		}),
		postcssInitial({
			reset: 'all',
		}),
		colorguard({
			threshold: 5,
		}),
		autoprefixer,
		production &&
			cssnano({
				preset: 'advanced',
			}),
		postcssFailOnWarn,
	].filter(Boolean),
};
