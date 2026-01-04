// src/utils/cheerpjLoader.ts (Com compilador embutido para suportar Java 17)
let initializationPromise: Promise<void> | null = null;

export function loadCheerpJInstance(): Promise<void> {
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    if (!(window as any).cheerpjInit) {
      const script = document.createElement("script");
      // ATENÇÃO: Atualizado para 4.2
      script.src = "https://cjrtnc.leaningtech.com/4.2/loader.js";
      script.async = true;

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Falha ao carregar CheerpJ 4.2"));
        document.body.appendChild(script);
      });
    }

    try {
      // Inicializa o CheerpJ
      await (window as any).cheerpjInit({ version: 17 });
      console.log("CheerpJ 4.2 Pronto");
    } catch (err) {
      initializationPromise = null;
      throw err;
    }
  })();

  return initializationPromise;
}
