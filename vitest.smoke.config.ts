import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/test/smoke/**/*.ts'],
    environment: 'node',
    globals: true,
    retry: 20,
  },
});
