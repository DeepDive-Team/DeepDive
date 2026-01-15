import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',

        rollupOptions: {
            input: {
                dist: 'src/ts/DeepDive.ts'
            },
            output: {
                entryFileNames: `[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    }
})