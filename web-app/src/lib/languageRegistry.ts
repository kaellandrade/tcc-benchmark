import type { LanguageConfig } from "@/models/language";

const languageRegistry: Map<string, LanguageConfig> = new Map();

export function registerLanguage(config: LanguageConfig): void {
  languageRegistry.set(config.id, config);
}

export function getLanguage(id: string): LanguageConfig | undefined {
  return languageRegistry.get(id);
}

export function getAllLanguages(): LanguageConfig[] {
  return Array.from(languageRegistry.values());
}

export function hasLanguage(id: string): boolean {
  return languageRegistry.has(id);
}
