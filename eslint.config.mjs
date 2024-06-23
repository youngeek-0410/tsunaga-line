import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginUnusedImport from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig} */
const commonConfig = {
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  plugins: {
    'unused-imports': pluginUnusedImport,
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
  },
};

/** @type {import("eslint").Linter.FlatConfig} */
const tslintConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
  },
  rules: {
    ...tseslint.configs['strictTypeChecked'].rules,
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};

/** @type {import("eslint").Linter.FlatConfig} */
const reactConfig = {
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  plugins: {
    react: pluginReact,
    'react-hooks': pluginReactHooks,
  },
  rules: {
    ...pluginReactConfig.rules,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
  },
};


export default [
  {
    ignores: [
      '.expo/',
      'src/api/',
      'src/fetcher/openapi-generated.d.ts',
      '*.config.js',
    ],
  },
  commonConfig,
  pluginJs.configs.recommended,
  tslintConfig,
  reactConfig,
  testConfig,
  ...compat.plugins('expo'),
];
