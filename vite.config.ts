import { defineConfig } from 'vite'
import logseqPlugin from 'vite-plugin-logseq'

export default defineConfig({
  plugins: [logseqPlugin()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'LogseqCleanSidebar',
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: ['@logseq/libs'],
      output: {
        globals: {
          '@logseq/libs': 'LogseqApi'
        }
      }
    }
  }
})
