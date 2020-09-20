module.exports = {
	purge: {
		mode: 'all',
		preserveHtmlElements: false,
		content: ['./__sapper__/export/**/*.html', './__sapper__/export/**/*.js'],
		options: {
			keyframes: true,
			fontFace: true,
			variables: true,
		},
	},
	theme: {
		extend: {
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
			},
			inset: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
			},
		},
		fontWeight: {
			light: 300,
			normal: 400,
			bold: 600,
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
