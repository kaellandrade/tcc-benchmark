/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly PACKAGE_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}