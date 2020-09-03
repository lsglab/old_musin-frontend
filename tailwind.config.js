module.exports = {
	purge: {
		mode: 'all',
		content: ['./src/**/*.html', './src/**/*.svelte'],
		// options: {
		// 	whitelistPatterns: [/svelte-/],
		// },
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
	},
};
