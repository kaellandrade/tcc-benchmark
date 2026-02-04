import type { LanguageData, FileTab } from "@/models";

const DB_NAME = "dcomplab";
const DB_VERSION = 1;
const STORE_NAME = "languages";

/**
 * Abre (ou cria) o banco IndexedDB.
 * O object store usa `languageId` como keyPath.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "languageId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Lê os dados de uma linguagem específica.
 * Retorna `null` se não houver dados salvos.
 */
export async function getLanguageData(
  languageId: string
): Promise<LanguageData | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(languageId);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Salva (cria ou atualiza) os dados de uma linguagem.
 */
export async function saveLanguageData(data: LanguageData): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put({ ...data, updatedAt: Date.now() });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Remove todos os dados de uma linguagem.
 */
export async function deleteLanguageData(languageId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(languageId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Lista os dados de todas as linguagens salvas.
 */
export async function getAllLanguageData(): Promise<LanguageData[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Atualiza apenas os arquivos e aba ativa de uma linguagem.
 * Se a linguagem não existir, cria um novo registro.
 */
export async function updateLanguageFiles(
  languageId: string,
  files: FileTab[],
  activeFileId: string
): Promise<void> {
  const data: LanguageData = {
    languageId,
    files,
    activeFileId,
    updatedAt: Date.now(),
  };
  await saveLanguageData(data);
}
