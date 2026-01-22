import type { LanguageRuntime, ExecutionResult, ExecuteOptions } from "@/models/language";
import { loadCheerpJInstance } from "@/utils/cheerpjLoader";

export class JavaRuntime implements LanguageRuntime {
  private ready: boolean = false;

  async initialize(): Promise<void> {
    if (this.ready) return;

    try {
      await loadCheerpJInstance();
      this.ready = true;
    } catch (error) {
      console.error("Falha ao inicializar CheerpJ:", error);
      throw error;
    }
  }

  async execute(code: string, options?: ExecuteOptions): Promise<ExecutionResult> {
    const onOutput = options?.onOutput;

    if (!this.ready) {
      return {
        stdout: "",
        stderr: "Runtime não inicializado",
        exitCode: 1,
      };
    }

    const logs: string[] = [];
    const errors: string[] = [];

    const appendLog = (text: string) => {
      logs.push(text);
      onOutput?.(text + "\n");
    };

    // Intercept console to capture CheerpJ output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const captureLog = (...args: unknown[]) => {
      const text = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");

      // Filter internal CheerpJ logs
      if (text.includes("CheerpJ runtime") || text.includes("dynamic update")) {
        return;
      }

      appendLog(text);
    };

    const captureError = (...args: unknown[]) => {
      const text = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");

      errors.push(text);
      onOutput?.(text + "\n");
    };

    console.log = captureLog;
    console.error = captureError;
    console.warn = captureLog;

    try {
      const cj = window as any;

      // Extract class name from code (looks for "public class ClassName")
      const classNameMatch = code.match(/public\s+class\s+(\w+)/);
      if (!classNameMatch) {
        return {
          stdout: "",
          stderr: "Erro: Nenhuma classe pública encontrada. O código deve conter 'public class NomeDaClasse'.",
          exitCode: 1,
        };
      }

      const className = classNameMatch[1];
      const fileName = `${className}.java`;

      // Write the source file to CheerpJ's virtual filesystem
      cj.cheerpOSAddStringFile(`/str/${fileName}`, code);

      appendLog("⏳ Compilando...");

      // Compile the Java source file
      const compileExitCode = await cj.cheerpjRunMain(
        "com.sun.tools.javac.Main",
        "/app/jdk.compiler_17.jar:.",
        "-d",
        "/files/",
        `/str/${fileName}`
      );

      if (compileExitCode !== 0) {
        return {
          stdout: logs.join("\n"),
          stderr: "❌ Erro de Compilação. Verifique a sintaxe.",
          exitCode: compileExitCode,
        };
      }

      appendLog("✅ Compilado com sucesso!");
      appendLog("⏳ Executando...");
      appendLog("------------------");

      // Run the compiled class
      const runExitCode = await cj.cheerpjRunMain(className, "/files/");

      return {
        stdout: logs.join("\n"),
        stderr: errors.join("\n"),
        exitCode: runExitCode,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        stdout: logs.join("\n"),
        stderr: `[ERRO DO SISTEMA]: ${errorMessage}`,
        exitCode: 1,
      };
    } finally {
      // Restore original console functions
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }
  }

  isReady(): boolean {
    return this.ready;
  }
}
