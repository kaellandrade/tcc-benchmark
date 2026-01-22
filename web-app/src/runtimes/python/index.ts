import type { LanguageRuntime, ExecutionResult } from "@/models/language";

export class PythonRuntime implements LanguageRuntime {
  private pyodide: any = null;
  private ready: boolean = false;

  async initialize(): Promise<void> {
    if (this.ready) return;

    if (!(window as any).loadPyodide) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;

      await new Promise<void>((resolve) => {
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    }

    this.pyodide = await (window as any).loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });

    this.ready = true;
  }

  async execute(code: string): Promise<ExecutionResult> {
    if (!this.pyodide) {
      return {
        stdout: "",
        stderr: "Runtime não inicializado",
        exitCode: 1,
      };
    }

    try {
      await this.pyodide.runPythonAsync(`
        import sys
        from io import StringIO

        sys.stdout = mystdout = StringIO()
        sys.stderr = mystderr = StringIO()
      `);

      await this.pyodide.runPythonAsync(code);

      const stdout = this.pyodide.runPython("mystdout.getvalue()");
      const stderr = this.pyodide.runPython("mystderr.getvalue()");

      return {
        stdout,
        stderr,
        exitCode: stderr ? 1 : 0,
      };
    } catch (error: any) {
      return {
        stdout: "",
        stderr: error.toString(),
        exitCode: 1,
      };
    }
  }

  isReady(): boolean {
    return this.ready;
  }
}
