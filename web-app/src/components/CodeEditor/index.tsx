import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Play, MoreVertical } from "lucide-react";
import type { SUPPORTED_LANGUAGES } from "@/models/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileTabs } from "@/components/FileTabs";
import { OutputPanel } from "@/components/OutputPanel";
import { NewFileDialog } from "@/components/NewFileDialog";

interface FileTab {
  id: string;
  name: string;
  content: string;
}

interface CodeEditorProps {
  language: SUPPORTED_LANGUAGES;
  languageName: string;
  fileExtension: string;
  files: FileTab[];
  activeFileId: string;
  onFileSelect: (id: string) => void;
  onFileClose: (id: string) => void;
  onFileCreate: (fileName: string) => void;
  onCodeChange: (value: string) => void;
  isLoading: boolean;
  runCode: () => Promise<void>;
  output: string;
}

export function CodeEditor({
  language,
  languageName,
  fileExtension,
  files,
  activeFileId,
  onFileSelect,
  onFileClose,
  onFileCreate,
  onCodeChange,
  isLoading,
  runCode,
  output,
}: CodeEditorProps) {
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const activeFile = files.find((f) => f.id === activeFileId);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* New File Dialog */}
      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => setIsNewFileDialogOpen(false)}
        onCreateFile={onFileCreate}
        fileExtension={fileExtension}
      />

      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <span className="text-label font-medium text-foreground">
          Editor {languageName}
        </span>
        <div className="flex items-center gap-2">
          <Button
            onClick={runCode}
            disabled={isLoading}
            className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 gap-1 h-7 px-2.5 text-paragraph-small"
            size="sm"
          >
            <Play className="size-3" />
            Executar
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-foreground"
              >
                <MoreVertical className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsNewFileDialogOpen(true)}>
                Novo arquivo
              </DropdownMenuItem>
              <DropdownMenuItem>Salvar</DropdownMenuItem>
              <DropdownMenuItem>Exportar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* File Tabs */}
      <FileTabs
        tabs={files}
        activeTab={activeFileId}
        onTabClick={onFileSelect}
        onTabClose={onFileClose}
      />

      {/* Code Editor Area */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-background">
            <p className="text-muted-foreground">Carregando Editor...</p>
          </div>
        ) : (
          <CodeMirror
            value={activeFile?.content || ""}
            extensions={[language]}
            onChange={onCodeChange}
            theme="dark"
            className="h-full overflow-auto [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightActiveLine: true,
              foldGutter: false,
            }}
          />
        )}
      </div>

      {/* Output Panel */}
      <OutputPanel output={output} />
    </div>
  );
}
