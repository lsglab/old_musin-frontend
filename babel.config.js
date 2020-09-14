const presets = [
	[
		'@babel/preset-env',
		{
			bugfixes: true,
			spec: true,
			loose: true,
			useBuiltIns: 'usage',
			corejs: {
				version: '3.6',
				proposals: true,
			},
		},
	],
];
const plugins = [
	'@babel/plugin-syntax-dynamic-import',
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-proposal-optional-chaining',
];

module.exports = (api) => {
	const dev = api.env('development');
	return dev ? { plugins } : { presets, plugins };
};
