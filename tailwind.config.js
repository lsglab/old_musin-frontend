module.exports = {
	purge: {
		mode: 'all',
		content: ['./src/**/*.html', './src/**/*.svelte'],
		options: {
			whitelistPatterns: [/svelte-/],
		},
	},
	theme: {
		extend: {
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
			},
		},
	},
	variants: {},
	plugins: [
		require('tailwindcss-fluid')({
			textSizes: {
				sm: {
					min: '10px',
					max: '20px',
					minvw: '640px',
					maxvw: '1280px',
				},
				md: {
					min: '20px',
					max: '30px',
					minvw: '640px',
					maxvw: '1280px',
				},
				lg: {
					min: '30px',
					max: '45px',
					minvw: '640px',
					maxvw: '1280px',
				},
				xl: {
					min: '50px',
					max: '70px',
					minvw: '640px',
					maxvw: '1280px',
				},
			},
		}),
	],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
};
