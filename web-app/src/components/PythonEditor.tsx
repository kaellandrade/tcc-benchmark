import React, { useEffect, useState } from "react";
import { python } from "@codemirror/lang-python";

import { loadPyodideInstance } from "../utils/pyodideLoader";
import "./PythonEditor.css";
import { CodeEditor } from "./CodeEditor";

const PythonEditor: React.FC = () => {
  const [pyodide, setPyodide] = useState<any>(null);
  const [code, setCode] = useState<string>("print('Olá Mundo!')");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const instance = await loadPyodideInstance();
      setPyodide(instance);
      setIsLoading(false);
    };
    init();
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    try {
      await pyodide.runPythonAsync(`
        import sys
        from io import StringIO

        sys.stdout = mystdout = StringIO()
        sys.stderr = mystderr = StringIO()
      `);

      await pyodide.runPythonAsync(code);

      const stdout = pyodide.runPython("mystdout.getvalue()");
      const stderr = pyodide.runPython("mystderr.getvalue()");

      const finalOutput = stdout + (stderr ? `\n[Erro]\n${stderr}` : "");
      setOutput(finalOutput);
    } catch (error: any) {
      setOutput("Erro ao executar:\n" + error.toString());
    }
  };

  return (
    <CodeEditor
      isLoading={isLoading}
      languague={python()}
      onChange={(value) => setCode(value)}
      runCode={runCode}
      value={code}
      output={output}
    />
  );
};

export default PythonEditor;
