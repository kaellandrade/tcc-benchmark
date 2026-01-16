// src/components/JavaEditor.tsx
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { loadCheerpJInstance } from "../utils/cheerpjLoader";
// Reutilizando o CSS do PythonEditor ou crie um novo
import "./PythonEditor.css";

const JavaEditor: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [code, setCode] = useState<string>(`public class Main {
    public static void main(String[] args) {
        System.out.println("Olá do Java com CheerpJ!");
    }
}`);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        await loadCheerpJInstance();
        setIsReady(true);
      } catch (e) {
        console.log(e);
        setOutput("Erro ao carregar o motor Java.");
      }
    };
    init();
  }, []);

  const runCode = async () => {
    if (!isReady) return;
    setIsRunning(true);
    setOutput("");

    // --- Captura de Logs (Mantida igual) ---
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const capture = (...args: any[]) => {
      const text = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");

      // Filtros opcionais
      if (text.includes("CheerpJ runtime") || text.includes("dynamic update"))
        return;

      setOutput((prev) => prev + text + "\n");
    };

    console.log = capture;
    console.error = capture;
    console.warn = capture;

    try {
      const cj = window as any;

      // 1. INPUT
      cj.cheerpOSAddStringFile("/str/Main.java", code);

      setOutput("⏳ Compilando com JDK 17...\n");

      // 2. COMPILAÇÃO (Usando o novo JAR)
      // Certifique-se que o arquivo 'jdk.compiler_17.jar' está na pasta public!
      const compileExitCode = await cj.cheerpjRunMain(
        "com.sun.tools.javac.Main",
        "/app/jdk.compiler_17.jar:.", // <--- NOME NOVO DO JAR AQUI
        "-d",
        "/files/",
        "/str/Main.java"
      );

      if (compileExitCode !== 0) {
        setOutput((prev) => prev + "\n❌ Erro de Compilação.");
      } else {
        setOutput(
          (prev) =>
            prev +
            "✅ Compilado! Executando no Runtime Java 17:\n------------------\n"
        );

        // 3. EXECUÇÃO
        // O runtime agora é nativo 17 (graças ao seu loader), então ele aceita
        // o bytecode gerado pelo compilador 17 sem reclamar.
        await cj.cheerpjRunMain("Main", "/files/");
      }
    } catch (error: any) {
      setOutput(`\n[ERRO]: ${error.toString()}`);
      if (error.toString().includes("404")) {
        setOutput(
          (prev) =>
            prev +
            "\n\nDICA: Verifique se o arquivo 'jdk.compiler_17.jar' está na pasta public com esse nome exato."
        );
      }
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      setIsRunning(false);
    }
  };
  return (
    <div className="w-full grow flex flex-col gap-2">
      <h2>Editor Java com CheerpJ (WebAssembly)</h2>

      {!isReady ? (
        <p>Carregando Ambiente Java...</p>
      ) : (
        <>
          <CodeMirror
            value={code}
            extensions={[java()]}
            onChange={(value) => setCode(value)}
            className="grow flex flex-col text-black contrast-125"
          />

          <div className="flex items-center gap-2">
            <button disabled={isRunning} onClick={runCode}>
              {isRunning ? "Compilando/Executando..." : "Executar"}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <p>Saída:</p>
            <div className="min-h-[40px] bg-neutral-700 p-2 rounded-md font-mono whitespace-pre-wrap">
              {output}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JavaEditor;
