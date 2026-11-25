import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/test/a11y/**/*.ts'],
    environment: 'node',
    globals: true,
    retry: 3,
    setupFiles: ['./src/test/setup-vitest-esm.ts'],
    reporters: [
      'default',
      [
        'html',
        {
          outputFile: './functional-output/accessibility/reports/Accessibility report.html',
        },
      ],
    ],
  },
});
