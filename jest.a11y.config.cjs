module.exports = {
  roots: ['<rootDir>/src/test/a11y'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
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
