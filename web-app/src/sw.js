import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

cleanupOutdatedCaches();

// 1. Precaching (Gera cache do seu app, ícones e do jdk.compiler_17.jar automaticamente)
precacheAndRoute(self.__WB_MANIFEST);

// 2. Cache Específico para o CheerpJ (Leaning Technologies)
// O CheerpJ é modular. Precisamos armazenar TUDO que ele baixar.
registerRoute(
    ({ url }) => url.href.includes('leaningtech.com'),
    new CacheFirst({
        cacheName: 'cheerpj-runtime-cache',
        plugins: [
            // Garante que só cacheamos respostas válidas (CORS enabled)
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 2000, // AUMENTADO: CheerpJ tem muitos arquivos pequenos
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
            }),
        ],
    })
);

// 3. Cache para Pyodide e outras libs (CDN jsdelivr)
registerRoute(
    ({ url }) => url.href.includes('jsdelivr.net') || url.href.includes('pyodide'),
    new CacheFirst({
        cacheName: 'external-libs-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
            }),
        ],
    })
);

// 4. Cache para arquivos JAR locais que não estão no precache (segurança extra)
registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),
    new CacheFirst({
        cacheName: 'java-jars-local',
        plugins: [
            new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 30 * 24 * 60 * 60 }),
        ],
    })
);

// Listener de mensagens para "Pular espera" e atualizar o app imediatamente se houver nova versão
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});