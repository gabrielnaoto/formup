module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
        ],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "react/jsx-props-no-spreading": 0,
    "import/extensions": 0,
    "no-unused-vars": 0,
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
};
