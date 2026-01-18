import {useEffect, useState} from "react";
import {python} from "@codemirror/lang-python";

import {loadPyodideInstance} from "../utils/pyodideLoader";
import {CodeEditor} from "./CodeEditor";

interface FileTab {
    id: string;
    name: string;
    content: string;
}

const initialFiles: FileTab[] = [
    {id: "1", name: "hello.py", content: "print('Olá, mundo!')"},
    {id: "2", name: "hash.py", content: "# Hash implementation"},
    {id: "3", name: "busca_bin.py", content: "# Binary search"},
];

interface PythonEditorProps {
    isDarkMode?: boolean
}

const PythonEditor = ({isDarkMode}: PythonEditorProps) => {
    const [pyodide, setPyodide] = useState<any>(null);
    const [files, setFiles] = useState<FileTab[]>(initialFiles);
    const [activeFileId, setActiveFileId] = useState<string>("1");
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

    const handleCodeChange = (value: string) => {
        setFiles((prev) =>
            prev.map((file) =>
                file.id === activeFileId ? {...file, content: value} : file
            )
        );
    };

    const handleFileSelect = (id: string) => {
        setActiveFileId(id);
    };

    const handleFileClose = (id: string) => {
        if (files.length <= 1) return;

        const newFiles = files.filter((f) => f.id !== id);
        setFiles(newFiles);

        if (activeFileId === id) {
            setActiveFileId(newFiles[0].id);
        }
    };

    const handleFileCreate = (fileName: string) => {
        const newFile: FileTab = {
            id: crypto.randomUUID(),
            name: fileName,
            content: `# ${fileName}\n`,
        };

        setFiles((prev) => [...prev, newFile]);
        setActiveFileId(newFile.id);
    };

    const runCode = async () => {
        if (!pyodide) return;

        const activeFile = files.find((f) => f.id === activeFileId);
        if (!activeFile) return;

        try {
            await pyodide.runPythonAsync(`
        import sys
        from io import StringIO

        sys.stdout = mystdout = StringIO()
        sys.stderr = mystderr = StringIO()
      `);

            await pyodide.runPythonAsync(activeFile.content);

            const stdout = pyodide.runPython("mystdout.getvalue()");
            const stderr = pyodide.runPython("mystderr.getvalue()");

            const finalOutput = stdout + (stderr ? `\n[Erro]\n${stderr}` : "");
            setOutput(finalOutput.trim());
        } catch (error: any) {
            setOutput("Erro ao executar:\n" + error.toString());
        }
    };

    return (
        <CodeEditor
            isLoading={isLoading}
            language={python()}
            languageName="Python"
            fileExtension=".py"
            files={files}
            activeFileId={activeFileId}
            onFileSelect={handleFileSelect}
            onFileClose={handleFileClose}
            onFileCreate={handleFileCreate}
            onCodeChange={handleCodeChange}
            runCode={runCode}
            output={output}
            isDarkMode={isDarkMode}
        />
    );
};

export default PythonEditor;
