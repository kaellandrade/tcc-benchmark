import { EditorView } from "@codemirror/view";
import {
    Copy,
    ClipboardPaste,
    ArrowRightToLine,
    CornerDownLeft,
    Braces,
    Parentheses,
    Divide
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { indentMore } from "@codemirror/commands";

interface QuickActionsToolbarProps {
    view: EditorView | null;
}

export function QuickActionsToolbar({ view }: QuickActionsToolbarProps) {
    if (!view) return null;

    // Função genérica para inserir texto
    const insertText = (text: string, cursorOffset = 0) => {
        const state = view.state;
        const ranges = state.selection.ranges;

        // Cria uma transação para inserir texto na posição do cursor
        const transaction = state.update({
            changes: ranges.map(range => ({ from: range.from, insert: text })),
            scrollIntoView: true,
            // Ajusta a seleção (cursor) após a inserção
            selection: {
                anchor: ranges[0].from + text.length + cursorOffset
            }
        });

        view.dispatch(transaction);
        view.focus();
    };

    const handleCopy = () => {
        const selection = view.state.sliceDoc(
            view.state.selection.main.from,
            view.state.selection.main.to
        );

        if (selection) {
            navigator.clipboard.writeText(selection);
        }
        view.focus();
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                insertText(text);
            }
        } catch (err) {
            console.error("Falha ao colar: ", err);
        }
    };

    const handleTab = () => {
        indentMore(view);
        view.focus();
    };

    return (
        <div className="w-full bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
            <div className="flex items-center gap-3 px-2 py-2 overflow-x-auto no-scrollbar touch-pan-x">

                <Button variant="secondary" size="icon-sm" onClick={handleTab} className="h-10 w-10 shrink-0 rounded-md shadow-sm">
                    <ArrowRightToLine className="size-5" />
                </Button>

                <Button variant="secondary" size="icon-sm" onClick={() => insertText("{}", -1)} className="h-10 w-10 shrink-0 font-mono text-lg rounded-md shadow-sm">
                    <Braces className="size-5" />
                </Button>

                <Button variant="secondary" size="icon-sm" onClick={() => insertText("()", -1)} className="h-10 w-10 shrink-0 font-mono text-lg rounded-md shadow-sm">
                    <Parentheses className="size-5" />
                </Button>

                <Button variant="secondary" size="icon-sm" onClick={() => insertText("/")} className="h-10 w-10 shrink-0 font-mono text-lg rounded-md shadow-sm">
                    <Divide className="size-5" />
                </Button>

                <Button variant="secondary" size="icon-sm" onClick={() => insertText("''", -1)} className="h-10 w-10 shrink-0 font-mono text-lg rounded-md shadow-sm pb-2">
                    '
                </Button>

                <div className="w-px h-6 bg-border mx-1 shrink-0" />

                <Button variant="ghost" size="icon-sm" onClick={handleCopy} className="h-10 w-10 shrink-0">
                    <Copy className="size-5" />
                </Button>

                <Button variant="ghost" size="icon-sm" onClick={handlePaste} className="h-10 w-10 shrink-0">
                    <ClipboardPaste className="size-5" />
                </Button>

                <Button
                    size="icon-sm"
                    onClick={() => insertText("\n")}
                    className="h-10 w-10 shrink-0 ml-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm"
                >
                    <CornerDownLeft className="size-5" />
                </Button>
            </div>
        </div>
    );
}