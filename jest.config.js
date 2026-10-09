/** @type {import('jest').Config} */
export default {
  roots: ['<rootDir>/src/main'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: { module: 'ES2022', target: 'ES2022' } }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-jest.ts'],
  setupFiles: ['<rootDir>/src/test/setup-jest-esm.ts'],
  moduleNameMapper: {
    '@hmcts/nodejs-logging': '<rootDir>/src/test/unit/mocks/hmcts/nodejs-logging',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
