import { defineConfig } from 'vite'

export default defineConfig({
    base: '',
    build: {
        outDir: 'dist',

        rollupOptions: {
            input: {
                dist: 'src/DeepDive.ts'
            },
            output: {
                entryFileNames: `[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
})