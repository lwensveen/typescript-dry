import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/cli.tsx',
        'src/**/ui.tsx',
        '**/*.d.ts',
        '**/docs/**',
        '**/*.config.{js,cjs,ts}',
      ],
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 80,
        statements: 80,
      },
    },
  },
});
