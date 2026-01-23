import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { RangeRequestsPlugin } from 'workbox-range-requests'; // Essencial para o CheerpJ

// Limpa caches de versões antigas do SW
cleanupOutdatedCaches();

// Faz o precache dos assets gerados pelo build do Vite (index.html, js, css)
// Nota: O seu jdk.compiler_17.jar NÃO deve ser processado aqui se você o removeu do includeAssets
precacheAndRoute(self.__WB_MANIFEST);

// 1. Rota ESPECÍFICA para arquivos JAR (O Compilador)
// Usa RangeRequestsPlugin para permitir que o CheerpJ leia "pedaços" do arquivo do cache
registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),
    new CacheFirst({
        cacheName: 'cheerpj-jars-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200], // Aceita respostas opacas (0) e OK (200)
            }),
            new ExpirationPlugin({
                maxEntries: 20, // Limite conservador para arquivos grandes
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
            }),
            // AQUI ESTÁ A CORREÇÃO DO ERRO "HTTP server does not support the Range header":
            new RangeRequestsPlugin(),
        ],
    })
);

// 2. Rota para a Runtime do CheerpJ (Recursos da Leaning Technologies)
// O CheerpJ baixa centenas de pequenos arquivos. Precisamos de um limite alto.
registerRoute(
    ({ url }) => url.href.includes('leaningtech.com'),
    new CacheFirst({
        cacheName: 'cheerpj-runtime-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 2000, // Aumentado para suportar toda a runtime Java
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 ano
            }),
            new RangeRequestsPlugin(), // Boa prática para módulos WASM grandes da runtime
        ],
    })
);

// 3. Rota para Bibliotecas Externas (Pyodide, etc via CDN)
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

// Permite que a aplicação peça ao SW para atualizar imediatamente (skipWaiting)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});