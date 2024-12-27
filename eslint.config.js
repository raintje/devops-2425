/**
 * @type { import('eslint').Linter.Config[] }
 */
module.exports = [
   {
    files: ['**/*.ts', '**/*.tsx'],     
    languageOptions: {
        parser: require('@typescript-eslint/parser'),
        parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
        },
    },
    plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    ignores: ['eslint.config.js', 'prettier.config.js'],
   },
   {
    settings: {
        env: {
            node: true,
            jest: true,
        },
    },
   },
];