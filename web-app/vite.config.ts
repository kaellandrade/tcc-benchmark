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
            includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
            manifest: {
                "name": "DcompLab",
                "short_name": "DcompLab",
                "start_url": ".",
                "display": "standalone",
                "background_color": "#826FFF",
                "theme_color": "#A459D1",
                "scope": ".",
                "orientation":"portrait",
                "description": "IDE completa para compilar Python, C e Java offline. Programe em qualquer lugar com o DcompLab.",
                "categories": ["education", "productivity", "utilities"],
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
                ],
                "screenshots":[
                    {
                        "src": "screenshots/01_splash.jpg",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Tela de Splash"
                    },
                    {
                        "src": "screenshots/02_python_dark.jpg",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Ambiente Python Dark"
                    },
                    {
                        "src": "screenshots/03_java_dark.jpg",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Ambiente Java Dark"
                    },
                    {
                        "src": "screenshots/04_java_dark_saida",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Ambiente Java Dark Saída"
                    },
                    {
                        "src": "screenshots/05_java_light.jpg",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Ambiente Java Light"
                    },
                    {
                        "src": "screenshots/06_java_light_saida.jpg",
                        "sizes": "1080x2340",
                        "type": "image/jpeg",
                        "form_factor": "narrow",
                        "label": "Ambiente Java Light Saída"
                    },
                    {
                        "src": "screenshots/07_desk_light.png",
                        "sizes": "2560x1438",
                        "type": "image/png",
                        "form_factor": "wide",
                        "label": "Ambiente Desktop Light"
                    },
                    {
                        "src": "screenshots/08_desk_dark.png",
                        "sizes": "2560x1438",
                        "type": "image/png",
                        "form_factor": "wide",
                        "label": "Ambiente Desktop Dark"
                    }
                ]
            },
            injectManifest: {
                maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,jar,json,wasm,bin}'],
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
