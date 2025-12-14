import CodeMirror from "@uiw/react-codemirror";
import type { SUPPORTED_LANGUAGES } from "../../models/editor";

interface CodeEditorProps {
  languague: SUPPORTED_LANGUAGES;
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  runCode: () => Promise<void>;
  output?: string;
}

export function CodeEditor({
  languague,
  onChange,
  value,
  isLoading,
  runCode,
  output,
}: CodeEditorProps) {
  return (
    <div className="w-full grow flex flex-col gap-2">
      <h2>Editor</h2>

      {isLoading ? (
        <p>Carregando Editor...</p>
      ) : (
        <>
          <CodeMirror
            value={value}
            extensions={[languague]}
            onChange={onChange}
            lang=""
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
      )}
    </div>
  );
}
