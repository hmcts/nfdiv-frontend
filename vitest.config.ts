import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@hmcts/nodejs-logging': new URL('./src/test/unit/mocks/hmcts/nodejs-logging', import.meta.url).pathname,
    },
  },
  test: {
    include: ['src/main/**/*.test.ts'],
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test/setup-vitest.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov', 'json'],
    },
  },
});
