import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

const JAVA_CACHE_NAME = 'java-jars-cache';

// Rota Simples: Entrega o arquivo (200 OK)
registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),
    new CacheFirst({
        cacheName: JAVA_CACHE_NAME,
        plugins: [
            new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 30 * 24 * 60 * 60 }),
        ],
    })
);

// Rota para dependências externas
registerRoute(
    ({ url }) => url.href.includes('leaningtech.com') || url.href.includes('jsdelivr.net'),
    new CacheFirst({
        cacheName: 'external-libs',
        plugins: [ new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 365 * 24 * 60 * 60 }) ]
    })
);

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(JAVA_CACHE_NAME).then((cache) => {
            return cache.add('/jdk.compiler_17.jar').catch(console.error);
        })
    );
});