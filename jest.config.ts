/** @jest-config-loader ts-node */
import { defaults, defineConfig } from 'jest-config';

export default defineConfig({
  ...defaults,
  testEnvironment: 'node',
  collectCoverage: false, // npm test -- --collectCoverage
  collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!./src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    './dist/',
    '/src/cli.ts',
    './tests/'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
});
