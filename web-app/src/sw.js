import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { ExpirationPlugin } from 'workbox-expiration'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

const JAVA_CACHE_NAME = 'java-jars-cache';
const JAVA_COMPILER_URL = '/jdk.compiler_17.jar';


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(JAVA_CACHE_NAME).then((cache) => {
            console.log('Baixando Compilador Java para Offline...');
            return cache.add(JAVA_COMPILER_URL).catch(err => {
                console.error('Falha ao cachear compilador:', err);
            });
        })
    );
});

registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),
    new CacheFirst({
        cacheName: JAVA_CACHE_NAME,
        plugins: [
            new RangeRequestsPlugin(),


            {
                cachedResponseWillBeUsed: async ({ cachedResponse }) => {
                    if (cachedResponse) {

                        const newHeaders = new Headers(cachedResponse.headers);


                        newHeaders.set('Accept-Ranges', 'bytes');
                        newHeaders.set('Content-Type', 'application/java-archive');
                        newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');


                        return new Response(cachedResponse.body, {
                            status: cachedResponse.status,
                            statusText: cachedResponse.statusText,
                            headers: newHeaders
                        });
                    }
                    return cachedResponse;
                }
            },

            new ExpirationPlugin({
                maxEntries: 2,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
            }),
        ],
    })
)

registerRoute(
    ({ url }) => url.href.includes('cdn.jsdelivr.net') || url.href.includes('cheerpj.com'),
    new CacheFirst({
        cacheName: 'external-libs',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 365 * 24 * 60 * 60,
            }),
            {
                cacheWillUpdate: async ({ response }) => {
                    return (response && response.status === 200) ? response : null;
                }
            }
        ]
    })
)

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})