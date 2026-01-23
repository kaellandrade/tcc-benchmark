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

export async function warmupCheerpJ() {
  console.log("Iniciando aquecimento do cache offline...");

  // 1. Garante que o loader inicializou
  await loadCheerpJInstance();

  // 2. Executa uma operação "fake" para forçar o CheerpJ a baixar
  // as bibliotecas principais do Java (java.lang.*, java.util.*, java.io.*)
  try {
    // Compilar e rodar um Hello World simples em memória força o download
    // da maior parte da runtime necessária.
    // Como já temos a JavaRuntime configurada, você pode invocar o próprio compilador
    // em um arquivo dummy, ou apenas carregar classes comuns.

    // Carrega classes básicas de IO e Util que o compilador usa
    await cheerpjRunMain("java.util.Scanner", "/app/jdk.compiler_17.jar", "");

    console.log("Cache do CheerpJ aquecido com sucesso!");
  } catch (e) {
    // É normal falhar pois não passamos argumentos reais,
    // o importante é que o navegador baixou os arquivos.
    console.log("Aquecimento finalizado (erros esperados ignorados).");
  }
}