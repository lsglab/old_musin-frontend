module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		ecmaVersion: 12,
	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['babel', 'svelte3'],
	rules: {
		'babel/camelcase': 'off',
		'babel/no-invalid-this': 'warn',
		'babel/object-curly-spacing': 'off',
		'babel/semi': 'warn',
		'babel/no-unused-expressions': 'off',
		'babel/valid-typeof': 'off',
		'for-direction': 'error',
		'getter-return': 'warn',
		'no-async-promise-executor': 'error',
		'no-compare-neg-zero': 'warn',
		'no-cond-assign': ['warn', 'always'],
		'no-constant-condition': 'warn',
		'no-control-regex': 'warn',
		'no-dupe-args': 'warn',
		'no-dupe-else-if': 'warn',
		'no-dupe-keys': 'warn',
		'no-duplicate-case': 'warn',
		'no-empty': 'warn',
		'no-empty-character-class': 'warn',
		'no-ex-assign': 'warn',
		'no-extra-boolean-cast': 'warn',
		'no-extra-semi': 'warn',
		'no-func-assign': 'warn',
		'no-import-assign': 'warn',
		'no-inner-declarations': 'warn',
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'warn',
		'no-misleading-character-class': 'warn',
		'no-console': 'off',
		'no-debugger': 'off',
		'import/no-unresolved': [
			'error',
			{
				caseSensitive: false,
				ignore: ['^@sapper'],
			},
		],
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				'import/no-mutable-exports': 'off',
				'import/prefer-default-export': 'off',
				'prettier/prettier': 'off',
				'prefer-destructuring': 'off',
			},
		},
		{
			files: ['*worker.js'],
			rules: {
				'no-restricted-globals': [0],
			},
		},
		{
			files: [
				'postcss.config.js',
				'postcss.config.mjs',
				'rollup.config.js',
				'rollup.config.mjs',
				'opts.config.js',
				'opts.config.mjs',
				'tailwind.config.js',
				'svelte.config.js',
			],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies: true,
					},
				],
			},
		},
		{
			files: ['*.js'],
			rules: {
				'global-require': 'off',
			},
		},
	],
	settings: {
		'svelte3/ignore-styles': () => true,
	},
};
