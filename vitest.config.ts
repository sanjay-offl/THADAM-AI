import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/services/**/*.ts',
        'src/lib/utils.ts',
        'src/lib/validations.ts',
        'src/lib/rate-limit.ts',
        'src/providers/**/*.{ts,tsx}',
        'src/middleware.ts',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/index.ts',
        'node_modules',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
