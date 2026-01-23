import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

cleanupOutdatedCaches();
// Precache dos assets do Vite (index.html, js, css, icons)
precacheAndRoute(self.__WB_MANIFEST);

const JAVA_CACHE_NAME = 'java-jars-cache';
const COMPILER_URL = '/jdk.compiler_17.jar';

// 1. INSTALAÇÃO: Baixa o JAR imediatamente e salva "cru" no cache
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Força atualização imediata
    event.waitUntil(
        caches.open(JAVA_CACHE_NAME).then(async (cache) => {
            console.log('⬇️ [SW] Baixando JDK para Cache...');
            try {
                const response = await fetch(COMPILER_URL);
                if (response.ok) {
                    await cache.put(COMPILER_URL, response);
                    console.log('✅ [SW] JDK Salvo com sucesso!');
                } else {
                    console.error('❌ [SW] Falha ao baixar JDK:', response.status);
                }
            } catch (err) {
                console.error('❌ [SW] Erro de rede na instalação:', err);
            }
        })
    );
});

// 2. ATIVAÇÃO: Limpa caches antigos e assume o controle
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// 3. ROTA MANUAL PARA ARQUIVOS .JAR
// Aqui nós agimos como um servidor real, processando HEAD e Ranges manualmente
registerRoute(
    ({ url }) => url.pathname.endsWith('.jar'),
    async ({ request }) => {
        try {
            const cache = await caches.open(JAVA_CACHE_NAME);

            // Tenta encontrar o arquivo no cache pela URL (ignorando headers de range na busca)
            // Usamos a URL limpa como chave
            const cacheKey = request.url.split('?')[0];
            let cachedResponse = await cache.match(cacheKey);

            // Se não estiver no cache (primeiro acesso ou erro na instalação), tenta baixar
            if (!cachedResponse) {
                try {
                    console.log(`🌐 [SW] Baixando da rede: ${request.url}`);
                    const networkResponse = await fetch(request);
                    if (networkResponse.ok) {
                        // Clona e salva para o futuro
                        await cache.put(cacheKey, networkResponse.clone());
                        cachedResponse = networkResponse;
                    } else {
                        return networkResponse;
                    }
                } catch (error) {
                    return new Response("Offline e arquivo não encontrado.", { status: 504 });
                }
            }

            // --- AQUI ACONTECE A MÁGICA DO RANGE ---

            // 1. Pega o arquivo binário (Blob) do cache
            const blob = await cachedResponse.blob();
            const totalSize = blob.size;

            // 2. Prepara os Headers que o CheerpJ EXIGE
            const headers = new Headers();
            headers.set('Accept-Ranges', 'bytes');
            headers.set('Content-Type', 'application/java-archive');
            headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
            headers.set('Access-Control-Allow-Origin', '*');

            // CASO A: Requisição HEAD (CheerpJ checando se suportamos Range)
            if (request.method === 'HEAD') {
                headers.set('Content-Length', totalSize.toString());
                return new Response(null, { status: 200, headers });
            }

            // CASO B: Requisição GET com Range (O "fatiamento")
            const rangeHeader = request.headers.get('Range');
            if (rangeHeader) {
                const parts = rangeHeader.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
                const chunkSize = (end - start) + 1;

                // Fatiamos o Blob manualmente
                const slicedBlob = blob.slice(start, end + 1);

                headers.set('Content-Range', `bytes ${start}-${end}/${totalSize}`);
                headers.set('Content-Length', chunkSize.toString());

                // RETORNAMOS 206 (PARTIAL CONTENT) - ISSO É O QUE FALTAVA
                return new Response(slicedBlob, { status: 206, headers });
            }

            // CASO C: Requisição GET Normal (Arquivo inteiro)
            headers.set('Content-Length', totalSize.toString());
            return new Response(blob, { status: 200, headers });

        } catch (error) {
            console.error('❌ [SW] Erro crítico no handler de JAR:', error);
            return new Response("Erro interno no Service Worker", { status: 500 });
        }
    }
);

// 4. Rota para dependências externas (CheerpJ Runtime, Handlers, Pyodide)
registerRoute(
    ({ url }) => url.href.includes('leaningtech.com') || url.href.includes('jsdelivr.net'),
    async ({ request }) => {
        const cache = await caches.open('external-libs');
        const cachedResp = await cache.match(request);
        if (cachedResp) return cachedResp;

        try {
            const netResp = await fetch(request);
            if (netResp.ok) {
                cache.put(request, netResp.clone());
            }
            return netResp;
        } catch (e) {
            return new Response("Dependência externa offline não encontrada.", { status: 504 });
        }
    }
);