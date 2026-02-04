import { useState, useCallback, useEffect } from "react";
import type { UserConfig } from "@/models";
import {
  getUserConfig,
  saveUserConfig,
} from "@/lib/userConfigStorage";

/**
 * Hook para ler e persistir as configurações do usuário no localStorage.
 * O estado é inicializado a partir do localStorage e cada mutação persiste automaticamente.
 */
export function useUserConfig() {
  const [config, setConfig] = useState<UserConfig>(getUserConfig);

  // Aplica tema no <html> sempre que mudar
  useEffect(() => {
    if (config.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [config.theme]);

  const setTheme = useCallback((theme: UserConfig["theme"]) => {
    setConfig((prev) => {
      const next = { ...prev, theme };
      saveUserConfig(next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setConfig((prev) => {
      const next = { ...prev, theme: prev.theme === "dark" ? "light" as const : "dark" as const };
      saveUserConfig(next);
      return next;
    });
  }, []);

  return {
    config,
    isDarkMode: config.theme === "dark",
    setTheme,
    toggleTheme,
  };
}
