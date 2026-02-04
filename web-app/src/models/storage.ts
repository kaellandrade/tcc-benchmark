import type { FileTab } from "./language";

/**
 * Dados persistidos no IndexedDB por linguagem.
 * Cada linguagem tem seu próprio registro com arquivos e abas abertas.
 */
export interface LanguageData {
  /** ID da linguagem (ex: "python", "c", "java") */
  languageId: string;
  /** Todos os arquivos salvos do usuário nessa linguagem */
  files: FileTab[];
  /** ID do arquivo ativo no editor */
  activeFileId: string;
  /** Timestamp da última atualização */
  updatedAt: number;
}

/**
 * Configurações do usuário persistidas no localStorage.
 */
export interface UserConfig {
  /** Tema ativo: "dark" | "light" */
  theme: "dark" | "light";
}

/** Valores padrão para as configurações do usuário */
export const DEFAULT_USER_CONFIG: UserConfig = {
  theme: "dark",
};
