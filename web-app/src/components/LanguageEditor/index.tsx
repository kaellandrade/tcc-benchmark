import { useEffect, useState, useRef, useCallback } from "react";
import type { Extension } from "@uiw/react-codemirror";

import { getLanguage } from "@/lib/languageRegistry";
import type { LanguageRuntime, FileTab } from "@/models/language";
import { CodeEditor } from "@/components/CodeEditor";
import {
  getLanguageData,
  updateLanguageFiles,
} from "@/lib/codeStorage";

interface LanguageEditorProps {
  languageId: string;
  isDarkMode?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export function LanguageEditor({ languageId, isDarkMode, onFocusChange }: LanguageEditorProps) {
  const config = getLanguage(languageId);
  const [runtime, setRuntime] = useState<LanguageRuntime | null>(null);
  const [extension, setExtension] = useState<Extension | null>(null);
  const [files, setFiles] = useState<FileTab[]>([]);
  const [activeFileId, setActiveFileId] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const previousLanguageId = useRef<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyLanguageRef = useRef<string | null>(null);

  // Limpa timer ao desmontar
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const saveNow = useCallback((langId: string, f: FileTab[], activeId: string) => {
    updateLanguageFiles(langId, f, activeId).catch(console.error);
  }, []);

  const scheduleSave = useCallback((langId: string, f: FileTab[], activeId: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveNow(langId, f, activeId);
    }, 1000);
  }, [saveNow]);

  // Auto-save: só salva quando a linguagem já foi carregada
  useEffect(() => {
    if (
      files.length > 0 &&
      activeFileId &&
      readyLanguageRef.current === languageId
    ) {
      scheduleSave(languageId, files, activeFileId);
    }
  }, [files, activeFileId, languageId, scheduleSave]);

  // Salva antes de fechar a aba/janela
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (files.length > 0 && activeFileId && readyLanguageRef.current) {
        saveNow(readyLanguageRef.current, files, activeFileId);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [files, activeFileId, saveNow]);

  // Effect principal: inicializa runtime + restaura/cria arquivos
  // Estrutura idêntica ao original, com adição de restauração do IndexedDB
  useEffect(() => {
    if (!config) return;

    const languageChanged = previousLanguageId.current !== languageId;
    previousLanguageId.current = languageId;

    if (languageChanged) {
      // Cancela save pendente da linguagem anterior
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      readyLanguageRef.current = null;
    }

    const init = async () => {
      setIsLoading(true);
      setOutput("");

      const newRuntime = config.createRuntime();
      await newRuntime.initialize();
      setRuntime(newRuntime);

      const ext = await config.getCodemirrorExtension();
      setExtension(ext);

      if (languageChanged) {
        // Tenta restaurar arquivos salvos do IndexedDB
        const saved = await getLanguageData(languageId);

        if (saved && saved.files.length > 0) {
          setFiles(saved.files);
          setActiveFileId(saved.activeFileId);
        } else {
          const initialFile: FileTab = {
            id: crypto.randomUUID(),
            name: `main${config.fileExtension}`,
            content: config.defaultCode,
          };
          setFiles([initialFile]);
          setActiveFileId(initialFile.id);
        }

        // Libera auto-save
        readyLanguageRef.current = languageId;
      }

      setIsLoading(false);
    };

    init();
  }, [languageId, config]);

  const handleCodeChange = (value: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === activeFileId ? { ...file, content: value } : file
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
    if (!config) return;

    const newFile: FileTab = {
      id: crypto.randomUUID(),
      name: fileName,
      content: `// ${fileName}\n`,
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const runCode = async () => {
    if (!runtime) return;

    const activeFile = files.find((f) => f.id === activeFileId);
    if (!activeFile) return;

    // Clear output before execution
    setOutput("");

    let hasStreamedOutput = false;

    const result = await runtime.execute(activeFile.content, {
      onOutput: (text) => {
        hasStreamedOutput = true;
        setOutput((prev) => prev + text);
      },
    });

    // Build final output
    const outputParts: string[] = [];

    // If no streaming happened, use stdout from result
    if (!hasStreamedOutput && result.stdout) {
      outputParts.push(result.stdout);
    }

    if (result.stderr) {
      outputParts.push(`[Erro]\n${result.stderr}`);
    }

    // For non-streaming runtimes, set the full output
    // For streaming runtimes, only append stderr if present
    if (!hasStreamedOutput) {
      setOutput(outputParts.join("\n").trim() || "(sem saída)");
    } else if (result.stderr) {
      setOutput((prev) => {
        const current = prev.trim();
        return current ? `${current}\n[Erro]\n${result.stderr}` : `[Erro]\n${result.stderr}`;
      });
    } else {
      // Ensure we have some output for streaming case
      setOutput((prev) => prev.trim() || "(sem saída)");
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <p className="text-muted-foreground">
          Linguagem não suportada: {languageId}
        </p>
      </div>
    );
  }

  if (!extension) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <p className="text-muted-foreground">Carregando Editor...</p>
      </div>
    );
  }

  return (
    <CodeEditor
      isLoading={isLoading}
      language={extension}
      languageName={config.name}
      fileExtension={config.fileExtension}
      files={files}
      activeFileId={activeFileId}
      onFileSelect={handleFileSelect}
      onFileClose={handleFileClose}
      onFileCreate={handleFileCreate}
      onCodeChange={handleCodeChange}
      runCode={runCode}
      output={output}
      isDarkMode={isDarkMode}
      onFocusChange={onFocusChange}
    />
  );
}
