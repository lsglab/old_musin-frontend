/* eslint-disable sort-keys-fix/sort-keys-fix */

module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	plugins: [],
	purge: {
		content: ['./__sapper__/export/**/*.html', './__sapper__/export/**/*.js'],
		mode: 'all',
		options: {
			fontFace: true,
			keyframes: true,
			variables: true,
		},
		preserveHtmlElements: false,
	},
	theme: {
		extend: {
			backgroundImage: () => ({
				arrowIcon: 'url(../assets/media/arrow.svg)',
			}),
			fontSize: {
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
			},
			height: {
				'2/10': '20%',
				'8/10': '80%',
				'100': '25rem',
				'min-content': 'min-content',
			},
			inset: {
				'1/2': '50%',
				'1/4': '25%',
				'3/4': '75%',
				'4': '1rem',
			},
			listStyleType: {
				square: 'square',
			},
			maxHeight: {
				0: '0',
			},
			transitionTimingFunction: {
				default: 'easeInOutExpo',
				ease: 'ease',
				easeIn: 'ease-in',
				easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
				easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
				easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
				easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				easeInOut: 'ease-in-out',
				easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
				easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
				easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
				easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
				easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
				easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
				easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
				easeOut: 'ease-out',
				easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
				easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
				easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
				easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
				linear: 'linear',
			},
			width: {
				'9/20': '45%',
				'200': '50rem',
			},
		},
		fontWeight: {
			bold: 600,
			light: 300,
			normal: 400,
		},
	},
	variants: {},
};
