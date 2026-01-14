/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.spec.ts'],

    exclude: [
      'node_modules',
      'dist',
      'coverage',
    ],

    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.routes.ts',
        '**/index.ts',
        '**/config/**',
        '**/server.ts',
        '**/app.ts',
        '**/contracts/**',
        '**/__tests__/**',
      ],
    },
  },
});
