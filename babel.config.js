const typescriptPreset = [
	'@babel/preset-typescript',
	{
		isTSX: false,
		allExtensions: false,
		allowDeclareFields: false,
		onlyRemoveTypeImports: false,
	},
];
const envPreset = [
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
];
const presets = [typescriptPreset, envPreset];
const plugins = [
	'@babel/plugin-syntax-dynamic-import',
	'@babel/plugin-proposal-class-properties',
	'@babel/plugin-proposal-optional-chaining',
];

module.exports = (api) => {
	const dev = api.env('development');
	return dev ? { presets: [typescriptPreset], plugins } : { presets, plugins };
};
