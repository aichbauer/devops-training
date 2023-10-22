const defaultProject = {
  transform: {
    '^.+\\.(ts)$': '@swc/jest',
  },
  modulePaths: ['<rootDir>'],
  testEnvironment: 'node',
};

module.exports = {
  projects: [
    {
      ...defaultProject,
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.[jt]s?(x)'],
    },
    {
      ...defaultProject,
      displayName: 'integration',
      testMatch: [
        '<rootDir>/__tests__/integration/**/*.spec.[jt]s?(x)',
        '<rootDir>/src/**/__tests__/**/*.spec.integration.[jt]s?(x)',
      ],
      setupFilesAfterEnv: ['<rootDir>/__setup__/integration/jest.setup-env.ts'],
      globalSetup: '<rootDir>/__setup__/integration/jest.global-setup.ts',
    },
  ],
};
