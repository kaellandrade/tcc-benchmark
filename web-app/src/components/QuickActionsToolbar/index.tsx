import { useState } from "react";
import { EditorView } from "@codemirror/view";
import {
    undo,
    redo,
    selectLine,
    deleteLine,
    toggleComment,
    indentSelection,
    selectAll,
    indentMore,
    indentLess
} from "@codemirror/commands";
import {
    Copy,
    ClipboardPaste,
    ArrowRightToLine,
    ArrowLeftToLine,
    CornerDownLeft,
    Braces,
    Parentheses,
    ChevronDown,
    Wrench,
    Undo2,
    Redo2,
    MoveLeft,
    MoveRight,
    Divide,
    Plus,
    Minus,
    Hash,
    X as MultiplyIcon,
    TextSelect,
    Trash2,
    MessageSquareCode,
    Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionsToolbarProps {
    view: EditorView | null;
}

export function QuickActionsToolbar({ view }: QuickActionsToolbarProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!view) return null;

    const insertText = (text: string, cursorOffset = 0) => {
        const state = view.state;
        const ranges = state.selection.ranges;
        const transaction = state.update({
            changes: ranges.map((range) => ({ from: range.from, insert: text })),
            scrollIntoView: true,
            selection: { anchor: ranges[0].from + text.length + cursorOffset },
        });
        view.dispatch(transaction);
        view.focus();
    };

    const moveCursor = (offset: number) => {
        const currentPos = view.state.selection.main.head;
        const newPos = currentPos + offset;
        if (newPos >= 0 && newPos <= view.state.doc.length) {
            view.dispatch({ selection: { anchor: newPos } });
            view.focus();
        }
    };

    const handleCopy = () => {
        const selection = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to);
        if (selection) navigator.clipboard.writeText(selection);
        view.focus();
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) insertText(text);
        } catch (err) {
            console.error("Falha ao colar: ", err);
        }
    };

    const preventFocusSteal = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
    };

    const handleAutoIndent = () => {
        const originalPos = view.state.selection.main.head;
        selectAll(view);
        indentSelection(view);
        const newDocLength = view.state.doc.length;
        const safePos = Math.min(originalPos, newDocLength);
        view.dispatch({
            selection: { anchor: safePos, head: safePos },
            scrollIntoView: false
        });
        view.focus();
    };

    // --- Componente de Botão com Cores de Grupo ---
    type GroupColor = "neutral" | "power" | "nav" | "structure" | "logic" | "danger";

    const ActionBtn = ({
                           icon: Icon,
                           label,
                           onClick,
                           group = "neutral",
                           className = ""
                       }: {
        icon?: any,
        label?: string,
        onClick: (e: any) => void,
        group?: GroupColor,
        className?: string
    }) => {

        const groupStyles = {
            neutral: "text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800/50 dark:hover:bg-slate-700/50",
            power: "text-amber-600 bg-amber-50 hover:bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20 dark:hover:bg-amber-900/40",
            nav: "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
            structure: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40",
            logic: "text-teal-700 bg-teal-50 hover:bg-teal-100 dark:text-teal-300 dark:bg-teal-900/20 dark:hover:bg-teal-900/40",
            danger: "text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
        };

        return (
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={(e) => { onClick(e); view.focus(); }}
                onMouseDown={preventFocusSteal}
                className={cn(
                    "h-9 w-9 shrink-0 font-mono text-base border border-transparent/50 shadow-sm transition-all",
                    groupStyles[group],
                    className
                )}
            >
                {Icon ? <Icon className="size-4" /> : <span className="font-bold">{label}</span>}
            </Button>
        );
    };

    const Separator = () => <div className="w-px h-5 bg-border shrink-0 mx-1 opacity-50" />;

    return (
        <>
            {/* Botão Flutuante */}
            <div className={cn(
                "fixed bottom-2 right-4 z-50 transition-all duration-300 ease-in-out",
                !isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-0 pointer-events-none"
            )}>
                <Button onClick={() => setIsOpen(true)} onMouseDown={preventFocusSteal} size="icon-sm" className="h-10 w-10 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Wrench className="size-5" />
                </Button>
            </div>

            {/* Barra de Ferramentas */}
            <div
                className={cn(
                    "fixed left-0 right-0 z-40 backdrop-blur border-t border-border shadow-lg transition-all duration-300 ease-in-out",
                    "bg-background/95 supports-[backdrop-filter]:bg-background/80",
                    isOpen ? "translate-y-0 opacity-100 relative" : "translate-y-full opacity-0 absolute bottom-0 pointer-events-none"
                )}
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar touch-pan-x">

                    {/* ZONA 1: ADMIN (Cinza) */}
                    <ActionBtn icon={ChevronDown} onClick={() => setIsOpen(false)} group="neutral" className="text-muted-foreground bg-transparent border-none shadow-none" />
                    <ActionBtn icon={Undo2} onClick={() => undo(view)} group="neutral" />
                    <ActionBtn icon={Redo2} onClick={() => redo(view)} group="neutral" />

                    <Separator />

                    <ActionBtn icon={Copy} onClick={handleCopy} group="neutral" />
                    <ActionBtn icon={ClipboardPaste} onClick={handlePaste} group="neutral" />

                    <Separator />

                    {/* ZONA 2: PODERES (Laranja) */}
                    <ActionBtn icon={Wand2} onClick={handleAutoIndent} group="power" />
                    <ActionBtn icon={TextSelect} onClick={() => selectLine(view)} group="power" />
                    <ActionBtn icon={MessageSquareCode} onClick={() => toggleComment(view)} group="power" />
                    <ActionBtn icon={Trash2} onClick={() => deleteLine(view)} group="danger" />

                    <Separator />

                    {/* ZONA 3: NAVEGAÇÃO (Azul) */}
                    <ActionBtn icon={MoveLeft} onClick={() => moveCursor(-1)} group="nav" />
                    <ActionBtn icon={MoveRight} onClick={() => moveCursor(1)} group="nav" />
                    <ActionBtn icon={ArrowLeftToLine} onClick={() => indentLess(view)} group="nav" />
                    <ActionBtn icon={ArrowRightToLine} onClick={() => indentMore(view)} group="nav" />

                    <Separator />

                    {/* ZONA 4: ESTRUTURA (Roxo) */}
                    <ActionBtn icon={Parentheses} onClick={() => insertText("()", -1)} group="structure" />
                    <ActionBtn icon={Braces} onClick={() => insertText("{}", -1)} group="structure" />
                    <ActionBtn label='""' onClick={() => insertText('""', -1)} group="structure" />
                    <ActionBtn label="''" onClick={() => insertText("''", -1)} group="structure" />

                    <Separator />

                    {/* ZONA 5: LÓGICA E MATEMÁTICA (Verde/Teal) */}

                    {/* Subgrupo: Sintaxe */}
                    <ActionBtn label=":" onClick={() => insertText(":")} group="logic" className="font-extrabold" />
                    <ActionBtn label=";" onClick={() => insertText(";")} group="logic" className="font-extrabold" />
                    <ActionBtn icon={Hash} onClick={() => insertText("# ")} group="logic" />

                    <Separator />

                    {/* Subgrupo: Comparação (Relacionais) */}
                    <ActionBtn label="<" onClick={() => insertText(" < ")} group="logic" className="font-extrabold" />
                    <ActionBtn label=">" onClick={() => insertText(" > ")} group="logic" className="font-extrabold" />
                    <ActionBtn label="==" onClick={() => insertText(" == ")} group="logic" className="font-extrabold" />
                    <ActionBtn label="<=" onClick={() => insertText(" <= ")} group="logic" className="font-extrabold" />
                    <ActionBtn label=">=" onClick={() => insertText(" >= ")} group="logic" className="font-extrabold" />

                    <Separator />

                    {/* Subgrupo: Lógica Booleana e Atribuição */}
                    <ActionBtn label="=" onClick={() => insertText(" = ")} group="logic" className="font-extrabold" />
                    <ActionBtn label="!" onClick={() => insertText("!")} group="logic" className="font-extrabold" />
                    <ActionBtn label="&" onClick={() => insertText(" & ")} group="logic" className="font-extrabold" />
                    <ActionBtn label="|" onClick={() => insertText(" | ")} group="logic" className="font-extrabold" />

                    <Separator />

                    {/* Subgrupo: Matemática */}
                    <ActionBtn icon={Plus} onClick={() => insertText(" + ")} group="logic" />
                    <ActionBtn icon={Minus} onClick={() => insertText(" - ")} group="logic" />
                    <ActionBtn icon={MultiplyIcon} onClick={() => insertText(" * ")} group="logic" />
                    <ActionBtn icon={Divide} onClick={() => insertText(" / ")} group="logic" />

                    {/* Botão Enter (Destaque final) */}
                    <Button
                        size="icon-sm"
                        onClick={() => insertText("\n")}
                        onMouseDown={preventFocusSteal}
                        className="h-9 w-12 shrink-0 ml-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    >
                        <CornerDownLeft className="size-4" />
                    </Button>

                </div>
            </div>
        </>
    );
}