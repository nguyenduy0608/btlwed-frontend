import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        mainFields: [],
    },
    plugins: [react()],
    build: {
        outDir: './build',
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [esbuildCommonjs(['react-moment'])],
        },
    },
});
