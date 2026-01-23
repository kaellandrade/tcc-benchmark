import { useState,useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
  Play,
  MoreVertical,
  Save,
  Download,
  FileCode,
  FilePlus,
} from "lucide-react";
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
import { EditorView } from "@codemirror/view";
import { QuickActionsToolbar } from "@/components/QuickActionsToolbar";
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
  isDarkMode?: undefined | boolean;
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
                             isDarkMode,
                           }: CodeEditorProps) {
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const activeFile = files.find((f) => f.id === activeFileId);

  const [editorView, setEditorView] = useState<EditorView | null>(null);
// Efeito para focar no editor quando mudar de arquivo (opcional, melhora UX)
  useEffect(() => {
    if (editorView) {
      editorView.focus();
    }
  }, [activeFileId, editorView]);
  return (
      <div
          className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
              isDarkMode
                  ? "bg-gradient-to-r from-secondary/90 to-background"
                  : "bg-gradient-to-r from-secondary/30 to-background"
          }`}
      >
        <NewFileDialog
            isOpen={isNewFileDialogOpen}
            onClose={() => setIsNewFileDialogOpen(false)}
            onCreateFile={onFileCreate}
            fileExtension={fileExtension}
        />

          <div className="flex-none flex items-center justify-between px-4 py-2 landscape:py-1 border-b border-border/50">
         <span className="text-label font-medium text-foreground landscape:hidden">
          Editor {languageName}
        </span>
          <div className="flex items-center gap-2">
            <Button
                onClick={runCode}
                disabled={isLoading}
                size="sm"
                className="gap-1 h-7 px-2.5 text-paragraph-small cursor-pointer transition-colors border
              bg-primary/0 border-primary/50 text-primary hover:bg-primary/20
              dark:bg-transparent dark:border-tertiary dark:text-tertiary
              dark:hover:bg-tertiary dark:hover:text-tertiary-foreground"
            >
              <Play className="size-3" />
              Executar
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-foreground hover:bg-background/20"
                >
                  <MoreVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                  align="end"
                  className="w-56 p-0 overflow-hidden border-secondary/50 bg-background text-foreground shadow-md dark:border-secondary/30 dark:bg-[#0b0b14]"
              >
                <div className="bg-secondary/20 px-3 py-2 border-b border-secondary/20">
                <span className="text-sm font-semibold text-foreground dark:text-gray-200">
                  Ações
                </span>
                </div>

                <div className="p-1">
                  <DropdownMenuItem
                      onClick={() => setIsNewFileDialogOpen(true)}
                      className="cursor-pointer gap-2 py-2.5 focus:bg-secondary/20 focus:text-foreground dark:focus:bg-secondary/20 dark:focus:text-white"
                  >
                    <FilePlus className="size-4" />
                    <span>Novo arquivo</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer gap-2 py-2.5 focus:bg-secondary/20 focus:text-foreground dark:focus:bg-secondary/20 dark:focus:text-white">
                    <Save className="size-4" />
                    <span>Salvar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer gap-2 py-2.5 focus:bg-secondary/20 focus:text-foreground dark:focus:bg-secondary/20 dark:focus:text-white">
                    <Download className="size-4" />
                    <span>Importar arquivo</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer gap-2 py-2.5 items-start focus:bg-secondary/20 focus:text-foreground dark:focus:bg-secondary/20 dark:focus:text-white">
                    <FileCode className="size-4 mt-0.5" />
                    <div className="flex flex-col">
                      <span>Carregar códigos</span>
                      <span className="text-xs text-muted-foreground group-focus:text-foreground/80 dark:group-focus:text-gray-300">
                      locais
                    </span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <FileTabs
            tabs={files}
            activeTab={activeFileId}
            onTabClick={onFileSelect}
            onTabClose={onFileClose}
        />

        <div className="flex-1 overflow-hidden relative min-h-0">
          {isLoading ? (
              <div className="flex items-center justify-center h-full bg-transparent">
                <p className="text-muted-foreground">Carregando Editor...</p>
              </div>
          ) : (
              <CodeMirror
                  value={activeFile?.content || ""}
                  extensions={[language]}
                  onChange={onCodeChange}
                  theme={`${isDarkMode ? "dark" : "light"}`}
                  className="h-full w-full [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto text-base"
                  onCreateEditor={(view) => setEditorView(view)}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightActiveLine: true,
                    foldGutter: false,
                    autocompletion:true
                  }}
              />
          )}
        </div>
        {!isLoading && (
            <div className="flex-none z-20 border-t border-border/50 bg-background hidden [@media(pointer:coarse)]:block">
              <QuickActionsToolbar view={editorView} />
            </div>
        )}

        {/* 2. BARRA DESKTOP (Mouse) - Só aparece se for pointer: fine */}
        {!isLoading && (
            <div className="flex-none z-20 h-8 border-t border-border/50 bg-secondary/10 hidden [@media(pointer:fine)]:flex items-center justify-end px-4 gap-6 select-none">

              {/* Dica Executar */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Executar:</span>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">Enter</kbd>
                </div>
              </div>

              {/* Dica Salvar */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Salvar:</span>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">S</kbd>
                </div>
              </div>

              {/* Dica Comentar (Opcional) */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Comentar:</span>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="bg-background border border-border rounded px-1.5 py-0.5 shadow-sm">/</kbd>
                </div>
              </div>

            </div>
        )}

        <div className="flex-none z-30">
          <OutputPanel output={output} />
        </div>
      </div>
  );
}
