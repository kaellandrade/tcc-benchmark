import type { LanguageRuntime, ExecutionResult, ExecuteOptions } from "@/models/language";
import { initializeCheerpJ } from "@/utils/cheerpjLoader";

export class JavaRuntime implements LanguageRuntime {
  private ready: boolean = false;
  private compilerLoaded: boolean = false;

  async initialize(): Promise<void> {
    if (this.ready) return;
    await initializeCheerpJ();
    this.ready = true;
  }

  private async loadCompilerToMemory(cj: any, appendLog: (s: string) => void) {
    if (this.compilerLoaded) return;
    try {
      appendLog("📥 Baixando JAR para RAM...");
      const response = await fetch('/jdk.compiler_17.jar');
      if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      cj.cheerpOSAddStringFile("/str/compiler.jar", bytes);
      this.compilerLoaded = true;
    } catch (e) {
      appendLog(`❌ Erro Load: ${e}`);
      throw e;
    }
  }

  // --- NOVA FUNÇÃO: Detecção de Pacotes (Igual ao Svelte) ---
  private deriveMainClass(code: string, simpleName: string): string {
    const match = code.match(/package\s+([a-zA-Z0-9_.]+);/);
    if (match && match[1]) {
      // Se tem package, o nome da classe para rodar é "pacote.NomeDaClasse"
      return `${match[1]}.${simpleName}`;
    }
    return simpleName;
  }

  async execute(code: string, options?: ExecuteOptions): Promise<ExecutionResult> {
    const onOutput = options?.onOutput;
    if (!this.ready) await this.initialize();

    const logs: string[] = [];
    const appendLog = (text: string) => {
      logs.push(text);
      onOutput?.(text + "\n");
    };

    // --- MUDANÇA 1: SEM FILTROS (Debug Mode) ---
    // Vamos capturar TUDO para ver se o "Hello World" está saindo ou se tem erro escondido
    const originalConsole = { log: console.log, info: console.info, warn: console.warn, error: console.error };

    const intercept = (...args: any[]) => {
      const text = args.map(a => String(a)).join(" ");
      // COMENTEI O FILTRO PARA VERMOS TUDO AGORA
      // if (!ignoreList.some(term => text.includes(term)))
      appendLog(text);
    };

    console.log = intercept;
    console.info = intercept;
    console.warn = intercept;
    console.error = intercept;

    try {
      const cj = window as any;
      await this.loadCompilerToMemory(cj, appendLog);

      const classNameMatch = code.match(/public\s+class\s+(\w+)/);
      if (!classNameMatch) return { stdout: "", stderr: "Erro: Classe pública não encontrada", exitCode: 1 };

      const simpleClassName = classNameMatch[1];
      const fileName = `${simpleClassName}.java`;

      // Escreve código fonte
      cj.cheerpOSAddStringFile(`/str/${fileName}`, code);

      appendLog("⏳ Compilando...");

      const compileExitCode = await cj.cheerpjRunMain(
          "com.sun.tools.javac.Main",
          "/str/compiler.jar:.",
          "-d",
          "/files/",
          `/str/${fileName}`
      );

      if (compileExitCode !== 0) {
        return { stdout: logs.join("\n"), stderr: "❌ Erro de Compilação", exitCode: compileExitCode };
      }

      appendLog("✅ Executando...");
      appendLog("------------------");

      // --- MUDANÇA 2: Usar o nome completo com pacote ---
      const fullClassName = this.deriveMainClass(code, simpleClassName);

      if (fullClassName !== simpleClassName) {
        appendLog(`ℹ️ Rodando classe com pacote: ${fullClassName}`);
      }

      // Executa
      const runExitCode = await cj.cheerpjRunMain(fullClassName, "/files/");

      return {
        stdout: logs.join("\n"),
        stderr: "",
        exitCode: runExitCode,
      };

    } catch (error: any) {
      return { stdout: logs.join("\n"), stderr: `Erro Crítico: ${error.toString()}`, exitCode: 1 };
    } finally {
      // Restaura console
      console.log = originalConsole.log;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
    }
  }
  isReady(): boolean { return this.ready; }
}
