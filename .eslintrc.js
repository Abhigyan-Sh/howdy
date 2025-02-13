export default {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['simple-import-sort'],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/sort': 'error',
    'unicorn/filename-case': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/no-onchange': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
};

// export default {
//   'env': {
//     'browser': true,
//     'es2021': true
//   },
//   'extends': 'eslint:recommended',
//   // 'parser': 'babel-eslint',
//   'overrides': [
//   ],
//   'parserOptions': {
//     'ecmaVersion': 'latest',
//     'sourceType': 'module',
//     'ecmaFeatures': {
//       jsx: true
//     }
//   },
//   'rules': {
//     'indent': [
//       'error',
//       2
//     ],
//     'linebreak-style': [
//       'error',
//       'unix'
//     ],
//     'quotes': [
//       'error',
//       'single'
//     ],
//     'semi': [
//       'error',
//       'never'
//     ]
//   }
// }