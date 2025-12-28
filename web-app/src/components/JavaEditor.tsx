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
    setOutput(""); // Limpa a saída anterior

    const originalLog = console.log;
    const originalError = console.error;

    const capture = (...args: any[]) => {
      const text = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");

      if (text.includes("CheerpJ runtime") || text.includes("dynamic update")) {
        return;
      }

      // Atualiza o estado visual
      setOutput((prev) => prev + text + "\n");
    };

    console.log = capture;
    console.error = capture;
    // Alguns navegadores usam info/warn também
    const originalWarn = console.warn;
    console.warn = capture;

    try {
      const cj = window as any;

      // 1. Escreve o código
      cj.cheerpOSAddStringFile("/str/Main.java", code);

      setOutput("⏳ Compilando...\n");

      // 2. Compila
      const compileExitCode = await cj.cheerpjRunMain(
        "com.sun.tools.javac.Main",
        "/app/tools.jar:.",
        "-d",
        "/files/",
        "/str/Main.java"
      );

      if (compileExitCode !== 0) {
        setOutput((prev) => prev + "\n❌ Erro de Compilação.");
      } else {
        setOutput(
          (prev) => prev + "✅ Compilado! Executando:\n------------------\n"
        );

        // 3. Executa
        await cj.cheerpjRunMain("Main", "/files/");
      }
    } catch (error: any) {
      setOutput(`\n[ERRO]: ${error.toString()}`);
    } finally {
      // Restaura todos os consoles
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
