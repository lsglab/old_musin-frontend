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
			width: {
				'9/20': '45%',
			},
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
			transitionTimingFunction: {
				default: 'easeInOutExpo',
				linear: 'linear',
				ease: 'ease',
				easeIn: 'ease-in',
				easeOut: 'ease-out',
				easeInOut: 'ease-in-out',
				easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
				easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
				easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
				easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
				easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
				easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
				easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
				easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
				easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
				easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
				easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
				easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
				easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
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
