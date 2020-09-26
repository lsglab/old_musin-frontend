module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['airbnb-base', 'prettier'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				'import/no-mutable-exports': 'off',
				'import/prefer-default-export': 'off',
				'prefer-destructuring': 'off',
				'prettier/prettier': 'off',
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
	parserOptions: {
		ecmaVersion: 12,
		parser: 'babel-eslint',
		sourceType: 'module',
	},
	plugins: ['babel', 'svelte3', 'sort-keys-fix', 'sort-imports-es6-autofix'],
	root: true,
	rules: {
		'babel/camelcase': 'off',
		'babel/no-invalid-this': 'warn',
		'babel/no-unused-expressions': 'off',
		'babel/object-curly-spacing': 'off',
		'babel/semi': 'warn',
		'babel/valid-typeof': 'off',
		'for-direction': 'error',
		'getter-return': 'warn',
		'import/no-unresolved': [
			'error',
			{
				caseSensitive: false,
				ignore: ['^@sapper'],
			},
		],
		'import/order': 'off',
		'no-async-promise-executor': 'error',
		'no-compare-neg-zero': 'warn',
		'no-cond-assign': ['warn', 'always'],
		'no-console': 'off',
		'no-constant-condition': 'warn',
		'no-control-regex': 'warn',
		'no-debugger': 'off',
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
		'sort-imports-es6-autofix/sort-imports-es6': [
			'warn',
			{
				// allowSeparatedGroups: false,
				ignoreCase: false,
				// ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
			},
		],
		'sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
		'sort-keys-fix/sort-keys-fix': 'warn',
		'sort-vars': 'warn',
	},
	settings: {
		'svelte3/ignore-styles': () => true,
	},
};
