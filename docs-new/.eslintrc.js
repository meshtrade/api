module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Docusaurus specific adjustments
    'react/prop-types': 'off', // TypeScript handles prop validation
    'react/react-in-jsx-scope': 'off', // Not needed with modern React
    'import/no-unresolved': 'off', // Docusaurus handles module resolution
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Code quality
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',

    // Style consistency
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-double'],
    'space-before-function-paren': 'off', // Let prettier handle this

    // React specific
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    {
      files: ['docusaurus.config.js', 'sidebars.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  ignorePatterns: [
    'build/',
    '.docusaurus/',
    'node_modules/',
    '*.min.js',
    '.yarn/',
  ],
};
