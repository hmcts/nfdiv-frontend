module.exports = {
  roots: ['<rootDir>/src/test/a11y'],
  testRegex: '(/src/test/.*|\\.(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  testTimeout: 15000,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
