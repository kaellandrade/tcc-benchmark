import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { ExpirationPlugin } from 'workbox-expiration'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),

    new CacheFirst({
        cacheName: 'java-jars-cache',
        plugins: [
            new RangeRequestsPlugin(),

            new ExpirationPlugin({
                maxEntries: 2,
                maxAgeSeconds: 30 * 24 * 60 * 60,
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
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
            }),
            {
                cacheWillUpdate: async ({ response }) => {
                    if (response && response.status === 200) {
                        return response;
                    }
                    return null;
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