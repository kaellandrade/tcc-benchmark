import { useEffect, useRef, useCallback } from "react";
import type { FileTab } from "@/models";
import {
  getLanguageData,
  updateLanguageFiles,
  deleteLanguageData,
} from "@/lib/codeStorage";

interface UseCodeStorageOptions {
  languageId: string;
  /** Debounce em ms para auto-save (padrão: 1000) */
  debounceMs?: number;
}

interface UseCodeStorageReturn {
  /** Carrega os dados salvos da linguagem. Retorna null se não houver. */
  loadFiles: () => Promise<{ files: FileTab[]; activeFileId: string } | null>;
  /** Salva os arquivos e aba ativa no IndexedDB (com debounce interno). */
  saveFiles: (files: FileTab[], activeFileId: string) => void;
  /** Salva imediatamente, sem debounce. */
  saveFilesNow: (files: FileTab[], activeFileId: string) => Promise<void>;
  /** Remove todos os dados salvos dessa linguagem. */
  clearFiles: () => Promise<void>;
}

/**
 * Hook para persistir arquivos de código no IndexedDB por linguagem.
 * Faz auto-save com debounce quando `saveFiles` é chamado.
 */
export function useCodeStorage({
  languageId,
  debounceMs = 1000,
}: UseCodeStorageOptions): UseCodeStorageReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpa o timer ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const loadFiles = useCallback(async () => {
    const data = await getLanguageData(languageId);
    if (!data) return null;
    return { files: data.files, activeFileId: data.activeFileId };
  }, [languageId]);

  const saveFilesNow = useCallback(
    async (files: FileTab[], activeFileId: string) => {
      await updateLanguageFiles(languageId, files, activeFileId);
    },
    [languageId]
  );

  const saveFiles = useCallback(
    (files: FileTab[], activeFileId: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        updateLanguageFiles(languageId, files, activeFileId).catch(
          console.error
        );
      }, debounceMs);
    },
    [languageId, debounceMs]
  );

  const clearFiles = useCallback(async () => {
    await deleteLanguageData(languageId);
  }, [languageId]);

  return { loadFiles, saveFiles, saveFilesNow, clearFiles };
}
