import fs from 'fs';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { config as loadEnv } from 'dotenv';
loadEnv()

const useHttps = process.env.VITE_HTTPS === 'true'
const httpsConfig = useHttps ? {
    key: fs.readFileSync(process.env.VITE_SERVER_PRIVKEY),
    cert: fs.readFileSync(process.env.VITE_SERVER_FULLCHAIN),
} : undefined

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        host: process.env.VITE_SERVER_HOST || 'localhost',
        https: httpsConfig
    }
});
