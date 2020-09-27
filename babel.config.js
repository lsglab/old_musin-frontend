const devMode = {
	plugins: [
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-object-rest-spread',
		'lodash',
	],
	presets: [],
};
const defaultMode = {
	plugins: [...devMode.plugins],
	presets: [...devMode.presets],
};
const legacyMode = {
	plugins: [...defaultMode.plugins],
	presets: [
		...defaultMode.presets,
		[
			'@babel/preset-env',
			{
				bugfixes: true,
				corejs: {
					proposals: true,
					version: '3.6',
				},
				loose: true,
				modules: false,
				spec: true,
				useBuiltIns: 'usage',
			},
		],
	],
};

module.exports = (api) => {
	api.cache(() => (process.env.SAPPER_LEGACY_BUILD !== undefined) !== (process.env.NODE_ENV === 'development'));
	// api.cache(false);
	const legacy = process.env.SAPPER_LEGACY_BUILD !== undefined;
	const dev = process.env.NODE_ENV === 'development';
	// console.log(`[BABEL] legacy: ${legacy}, dev: ${dev}`);
	// eslint-disable-next-line no-nested-ternary
	return legacy ? legacyMode : dev ? devMode : defaultMode;
};
