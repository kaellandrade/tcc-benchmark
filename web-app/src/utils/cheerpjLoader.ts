let cheerpjPromise: Promise<void> | null = null;

export function initializeCheerpJ(): Promise<void> {
  if (cheerpjPromise) return cheerpjPromise;

  cheerpjPromise = (async () => {
    if (!(window as any).cheerpjInit) {
      const script = document.createElement("script");
      script.src = "https://cjrtnc.leaningtech.com/4.2/loader.js";
      script.async = true;
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Falha ao baixar loader CheerpJ"));
        document.body.appendChild(script);
      });
    }

    console.log("🚀 Inicializando CheerpJ...");
    await (window as any).cheerpjInit({ version: 17 });
    console.log("✅ CheerpJ Pronto.");
  })();

  return cheerpjPromise;
}