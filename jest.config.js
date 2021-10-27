const { defaults } = require('jest-config');

module.exports = async () => {
  return {
    ...defaults,
    rootDir: __dirname,
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverage: false, // npm test -- --collectCoverage
    collectCoverageFrom: [
      'src/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
      ...defaults.coveragePathIgnorePatterns,
      '/test/',
      '/src/cli.ts'
    ]
  }
};
