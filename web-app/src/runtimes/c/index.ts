import type { LanguageRuntime, ExecutionResult } from "@/models/language";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let JSCPP: any = null;

export class CRuntime implements LanguageRuntime {
  private ready: boolean = false;

  async initialize(): Promise<void> {
    if (this.ready) return;

    if (!JSCPP) {
      const module = await import("JSCPP");
      JSCPP = module.default || module;
    }

    this.ready = true;
  }

  async execute(code: string): Promise<ExecutionResult> {
    if (!this.ready || !JSCPP) {
      return {
        stdout: "",
        stderr: "Runtime não inicializado",
        exitCode: 1,
      };
    }

    try {
      let output = "";

      const config = {
        stdio: {
          write: (content: string) => {
            output += content;
          },
        },
        unsigned_overflow: "ignore",
      };

      const exitCode = JSCPP.run(code, "", config);

      console.log("Exit code", exitCode);

      return {
        stdout: output,
        stderr: "",
        exitCode: typeof exitCode === "number" ? exitCode : 0,
      };
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      return {
        stdout: "",
        stderr: errorMessage,
        exitCode: 1,
      };
    }
  }

  isReady(): boolean {
    return this.ready;
  }
}
