module.exports = {
  roots: ['<rootDir>/src/main'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    '@hmcts/nodejs-logging': '<rootDir>/src/test/unit/mocks/hmcts/nodejs-logging',
  },
};
