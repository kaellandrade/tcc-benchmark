import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { loadPyodideInstance } from "../utils/pyodideLoader";
import './PythonEditor.css';


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
    }
    catch (error: any) {
      setOutput("Erro ao executar:\n" + error.toString());
    }
  };

  return (
    <div className="w-full grow flex flex-col gap-2">
      <h2>Editor Python com Pyodide (React + TS)</h2>
      
      {
        isLoading
        ?
        <p>Carregando Editor...</p>
        :
        <>
          <CodeMirror
            value={code}
            extensions={[python()]}
            onChange={(value) => setCode(value)}
            className="grow flex flex-col text-black contrast-125"
          />

          <div className="flex items-center gap-2">
            <button>Salvar</button>
            <button onClick={runCode}>Executar</button>
          </div>

          <div className="flex flex-col gap-1">
            <p>Saída:</p>
            <div className="min-h-[40px] bg-neutral-700 p-2 rounded-md">
              {output}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default PythonEditor;
