const presets = [
	[
		'@babel/preset-env',
		{
			bugfixes: true,
			corejs: {
				proposals: true,
				version: '3.6',
			},
			loose: true,
			spec: true,
			useBuiltIns: 'usage',
		},
	],
];
const plugins = [
	'@babel/plugin-proposal-optional-chaining',
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-syntax-dynamic-import',
	'lodash',
];

module.exports = (api) => {
	const dev = api.env('development');
	return dev ? { plugins } : { plugins, presets };
};
