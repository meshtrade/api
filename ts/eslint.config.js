const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["*.js"],
    languageOptions: {
      globals: {
        module: "readonly",
      }
    }
  },
  prettier,
  {
    ignores: ["dist/**", ".prettierrc.js", "eslint.config.js", "src/**/*.d.ts", "src/**/*.js"],
  }
);