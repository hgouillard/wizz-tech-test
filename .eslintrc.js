/** @type {import('eslint').Linter.Config} */

module.exports = {
    root: true,
    env: {
        mocha: true,
        node: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'ESNext',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'vue',
    ],
    rules: {
        'linebreak-style': 0,
        'no-underscore-dangle': 0,
        'object-curly-newline': 0,
        'no-param-reassign': 0,
        'no-restricted-syntax': 0,
        'max-len': ['error', { code: 120, ignoreComments: true }],
        'operator-linebreak': ['error', 'after'],
        'no-console': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
