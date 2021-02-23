// eslint sort keys disabled because it doesnt work correctly with the 5vw and 15vw padding properties
/* eslint-disable sort-keys */

module.exports = {
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
				'arrowIcon': 'resolve(arrow.svg)',
				'diamond-pattern': 'resolve(diamond-pattern.png)',
				'rect-pattern': 'resolve(rect-pattern.png)',
			}),
			boxShadow: {
				'equal': '0 5px 15px rgba(0,0,0,0.2)',
				'equal-xl': '0 10px 20px 5px rgba(0, 0, 0, 0.1);',
			},
			colors: {
				btnBlue: 'rgb(0, 119, 255)',
				heading: '#0a2540',
				heading2: '#336',
				purpleAccent: '#447',
			},
			fontSize: {
				'2.5xl': '1.7rem',
				'7xl': '5rem',
				'8xl': '6rem',
				'9xl': '7rem',
			},
			height: {
				'1/4': '25%',
				'2/10': '20%',
				'3/10': '30%',
				'7/10': '70%',
				'8/10': '80%',
				'80': '20rem',
				'inherit': 'inherit',
				'min-content': 'min-content',
			},
			inset: {
				'1/2': '50%',
				'1/4': '25%',
				'3/4': '75%',
				'4': '1rem',
				'center': 'calc(-50vw + 50%)',
			},
			listStyleType: {
				square: 'square',
			},
			margin: {
				full: '100%',
			},
			maxHeight: {
				0: '0',
			},
			padding: {
				'15vw': '15vw',
				'5vw': '5vw',
				'unset': 'unset',
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
