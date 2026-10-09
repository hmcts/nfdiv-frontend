/** @type {import('jest').Config} */
export default {
  roots: ['<rootDir>/src/test/a11y'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: { module: 'ES2022', target: 'ES2022' } }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFiles: ['<rootDir>/src/test/setup-jest-esm.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './functional-output/accessibility/reports',
        filename: 'Accessibility report.html',
        expand: true,
        disableAttachReport: true,
      },
    ],
  ],
};
