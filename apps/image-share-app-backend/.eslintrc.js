module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-console': ['error', {
      allow: [
        'error',
        'warn',
        'info',
        'debug',
      ],
    }],
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    // note you must disable the base rule as it can report incorrect errors
    // https://stackoverflow.com/questions/64052318/how-to-disable-warn-about-some-unused-params-but-keep-typescript-eslint-no-un
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // https://github.com/airbnb/javascript/blob/5c01a1094986c4dd50a6ee4d9f7617abdfabb58a/packages/eslint-config-airbnb-base/rules/imports.js#L71
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**', // tape, common npm pattern
          'tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          'test.{ts}', // repos with a single test file
          'test-*.{ts}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{ts}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.ts', // jest config
          '**/jest.setup.ts', // jest setup
          '**/vue.config.ts', // vue-cli config
          '**/webpack.config.ts', // webpack config
          '**/webpack.config.*.ts', // webpack config
          '**/rollup.config.ts', // rollup config
          '**/rollup.config.*.ts', // rollup config
          '**/gulpfile.ts', // gulp config
          '**/gulpfile.*.ts', // gulp config
          '**/Gruntfile{,.ts}', // grunt config
          '**/protractor.conf.ts', // protractor config
          '**/protractor.conf.*.ts', // protractor config
          '**/karma.conf.ts', // karma config
          '**/.eslintrc.ts', // eslint config
          'src/api/db/seeds/**/*.ts',
          'src/api/db/migrations/**/*.ts',
        ],
        optionalDependencies: false,
      },
    ],
  },
};