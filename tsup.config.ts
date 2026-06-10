import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts', './src/cli.ts'],
  format: ['cjs'],
  clean: true,
  dts: true,
  shims: true,
  sourcemap: true,
  minify: true
});
