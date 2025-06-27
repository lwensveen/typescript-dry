import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    dts: true,
    splitting: false,
    clean: true,
    format: ['esm', 'cjs'],
    target: 'es2022',
  },
  {
    entry: ['src/cli.tsx'],
    format: ['esm'],
    target: 'es2022',
    // Ink, React, and devtools stay external (Node resolves them at runtime)
    external: ['ink', 'react', 'react-devtools-core', 'yoga-layout'],
    dts: false,
    clean: false,
    outExtension() {
      return { js: '.js' };
    },
  },
]);
