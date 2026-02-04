import type { UserConfig } from "@/models";
import { DEFAULT_USER_CONFIG } from "@/models";

const STORAGE_KEY = "dcomplab:config";

/**
 * Lê as configurações do usuário do localStorage.
 * Se não existir, retorna os valores padrão.
 */
export function getUserConfig(): UserConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_USER_CONFIG };

    const parsed = JSON.parse(raw) as Partial<UserConfig>;
    return { ...DEFAULT_USER_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_USER_CONFIG };
  }
}

/**
 * Salva as configurações do usuário no localStorage.
 */
export function saveUserConfig(config: UserConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    console.warn("Falha ao salvar configurações no localStorage.");
  }
}

/**
 * Atualiza parcialmente as configurações do usuário.
 */
export function updateUserConfig(partial: Partial<UserConfig>): void {
  const current = getUserConfig();
  saveUserConfig({ ...current, ...partial });
}

/**
 * Remove as configurações do usuário do localStorage.
 */
export function clearUserConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.warn("Falha ao remover configurações do localStorage.");
  }
}
