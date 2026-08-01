/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      enabled: false, // npm test -- --coverage
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['dist/', 'src/**/*.d.ts', 'src/cli.ts', 'tests/']
    },
    globals: true,
    watch: false
  }
});
