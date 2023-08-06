import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
// eslint-disable-next-line import/default
import viteLinter from 'vite-plugin-linter';
import tsConfigPaths from 'vite-tsconfig-paths';

const { EsLinter, linterPlugin } = viteLinter;

import { peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ['src/components', 'src/lib'],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: './src/components/index.ts',
      name: 'caroumesh',
      formats: ['es', 'umd'],
      fileName: (format) => `caroumesh.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          '@react-three/fiber': 'ReactThreeFiber',
          'query-string': 'query-string',
          react: 'React',
          'react-dom': 'ReactDom',
          three: 'THREE',
        },
      },
    },
  },
}));
