module.exports = {
	purge: {
		mode: 'all',
		content: [
			'./src/**/*.html',
			'./src/**/*.svelte',
			'./src/**/*.css',
			'./src/**/*.less',
			'./src/**/*.{c,m,}js',
			'./src/**/*.scss',
			'./src/**/*.sass',
		],
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
