import path from "path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            strategies:"injectManifest",
            srcDir: 'src',
            filename: 'sw.js',
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png','jdk.compiler_17.jar'],
            manifest: {
                "name": "DcompLab",
                "short_name": "DcompLab",
                "start_url": ".",
                "display": "standalone",
                "background_color": "#826FFF",
                "theme_color": "#A459D1",
                "scope": ".",
                "description": "Aplicativo para compilação de códigos offline em diferentes plataformas.",
                "icons": [
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-128x.png",
                        "sizes": "72x72",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-128x.png",
                        "sizes": "96x96",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-128x.png",
                        "sizes": "128x128",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-256x.png",
                        "sizes": "144x144",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-256x.png",
                        "sizes": "152x152",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-256x.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-512x.png",
                        "sizes": "384x384",
                        "type": "image/png"
                    },
                    {
                        "src": "pwa-icons/dcomp-lab-icon-pwa-512x.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ]
            },
            injectManifest: {
                maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,jar,json,wasm}'],
            }
        }),
        nodePolyfills({
            include: ['util', 'stream', 'buffer', 'events', 'process'],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        include: ['JSCPP'],
    },
})
