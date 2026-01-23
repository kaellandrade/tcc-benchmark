import type { LanguageRuntime, ExecutionResult } from "@/models/language";
import { warmupCheerpJ} from "@/utils/cheerpjLoader";

// Declaração de tipos para as globais do CheerpJ
declare global {
  function cheerpjRunMain(mainClass: string, classPath: string, ...args: string[]): Promise<number>;
  function cheerpOSAddStringFile(path: string, content: string): void;
}

export class JavaRuntime implements LanguageRuntime {
  private compilerPath = "/app/jdk.compiler_17.jar"; // Caminho onde você colocou o jar na pasta 'public'

  async initialize(): Promise<void> {
    // Reutiliza seu loader existente
    await warmupCheerpJ();
  }

  async execute(code: string): Promise<ExecutionResult> {
    // Garante que o CheerpJ está carregado
    await this.initialize();

    let output = "";
    let errorOutput = "";

    // === 1. Interceptação do Console ===
    // O CheerpJ envia System.out para console.log e System.err para console.error.
    // Precisamos capturar isso para exibir na sua IDE.
    const originalLog = console.log;
    const originalError = console.error;

    const restoreConsole = () => {
      console.log = originalLog;
      console.error = originalError;
    };

    try {
      console.log = (...args: any[]) => {
        output += args.join(" ") + "\n";
        // Descomente abaixo se quiser ver no devtools também
        // originalLog(...args);
      };

      console.error = (...args: any[]) => {
        errorOutput += args.join(" ") + "\n";
        // originalError(...args);
      };

      // === 2. Preparação do Arquivo Fonte ===
      // Salvamos o código do usuário em /str/ (memória rápida)
      const sourcePath = "/str/Main.java";
      cheerpOSAddStringFile(sourcePath, code);

      // === 3. Compilação ===
      // Executa o compilador Java (javac)
      // -d /files/ : Salva o .class compilado no sistema de arquivos persistente (IndexedDB)
      //              Isso é necessário porque /str/ é somente leitura para escrita de arquivos binários
      const compileExitCode = await cheerpjRunMain(
          "com.sun.tools.javac.Main", // Entry point do compilador
          this.compilerPath,          // Classpath do compilador
          "-d", "/files/",            // Argumento: Onde salvar o .class
          sourcePath                  // Argumento: Arquivo fonte
      );

      // Se houver erro de compilação, retornamos imediatamente
      if (compileExitCode !== 0) {
        restoreConsole(); // Restaura antes de retornar
        return {
          stdout: output,
          stderr: errorOutput || "Erro de compilação desconhecido.",
          exitCode: compileExitCode
        };
      }

      // Limpa os logs da compilação para não misturar com a execução do programa
      output = "";
      errorOutput = "";

      // === 4. Execução ===
      // Executa a classe compilada (Main)
      // Classpath agora aponta para /files/ onde o Main.class foi gerado
      const runExitCode = await cheerpjRunMain(
          "Main",     // Nome da classe
          "/files/",  // Classpath (onde está o .class)
          ""          // Argumentos (args[])
      );

      restoreConsole();

      return {
        stdout: output,
        stderr: errorOutput,
        exitCode: runExitCode
      };

    } catch (error: any) {
      restoreConsole();
      return {
        stdout: output,
        stderr: `Erro interno da Runtime: ${error.message || error.toString()}`,
        exitCode: 1
      };
    }
  }

  isReady(): boolean {
    // Podemos considerar pronto se a promise do loader já resolveu,
    // mas como chamamos initialize() no execute, isso é seguro.
    return true;
  }
}