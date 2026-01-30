import {useState} from "react";
import {EditorView} from "@codemirror/view";
import {
    Copy,
    ClipboardPaste,
    ArrowRightToLine,
    CornerDownLeft,
    Braces,
    Parentheses,
    Slash,
    ChevronDown,
    Wrench,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {indentMore} from "@codemirror/commands";
import {cn} from "@/lib/utils";

interface QuickActionsToolbarProps {
    view: EditorView | null;
}

export function QuickActionsToolbar({view}: QuickActionsToolbarProps) {
    const [isOpen, setIsOpen] = useState(true);
    if (!view) return null;
    const insertText = (text: string, cursorOffset = 0) => {
        const state = view.state;
        const ranges = state.selection.ranges;
        const transaction = state.update({
            changes: ranges.map((range) => ({from: range.from, insert: text})),
            scrollIntoView: true,
            selection: {
                anchor: ranges[0].from + text.length + cursorOffset,
            },
        });
        view.dispatch(transaction);
        view.focus();
    };

    const handleCopy = () => {
        const selection = view.state.sliceDoc(
            view.state.selection.main.from,
            view.state.selection.main.to
        );
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

    const handleTab = () => {
        indentMore(view);
        view.focus();
    };

    return (
        <>

            <div
                className={cn(
                    "absolute bottom-6 right-4 z-50 transition-all duration-300 ease-in-out",
                    !isOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-0 pointer-events-none"
                )}
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    size="icon-sm"
                    className="h-10 w-10 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90"
                    title="Abrir ações rápidas"
                >
                    <Wrench className="size-5"/>
                </Button>
            </div>


            <div
                className={cn(
                    "fixed left-0 right-0 z-40 bg-secondary/95 backdrop-blur border-t border-border/50 transition-all duration-300 ease-in-out",

                    isOpen
                        ? "translate-y-0 opacity-100 relative"
                        : "translate-y-full opacity-0 absolute bottom-0 pointer-events-none"
                )}
            >
                <div className="flex items-center gap-2 px-2 py-1.5 overflow-x-auto no-scrollbar touch-pan-x">


                    <Button
                        variant="default"
                        size="icon-sm"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 shrink-0 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 mr-1"
                        title="Minimizar barra"
                    >
                        <ChevronDown className="size-5"/>
                    </Button>

                    <div className="w-px h-5 bg-border shrink-0 mr-1"/>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={handleTab}
                        className="h-8 w-8 shrink-0 rounded-md shadow-sm"
                    >
                        <ArrowRightToLine className="size-4"/>
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => insertText("{}", -1)}
                        className="h-8 w-8 shrink-0 font-mono text-lg rounded-md shadow-sm"
                    >
                        <Braces className="size-4"/>
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => insertText("()", -1)}
                        className="h-8 w-8 shrink-0 font-mono text-lg rounded-md shadow-sm"
                    >
                        <Parentheses className="size-4"/>
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => insertText("/")}
                        className="h-8 w-8 shrink-0 font-mono text-lg rounded-md shadow-sm"
                    >
                        <Slash className="size-4"/>
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => insertText("''", -1)}
                        className="h-8 w-8 shrink-0 font-mono text-lg rounded-md shadow-sm pb-1"
                    >
                        '
                    </Button>

                    <div className="w-px h-5 bg-border mx-1 shrink-0"/>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={handleCopy}
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                    >
                        <Copy className="size-4"/>
                    </Button>

                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={handlePaste}
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                    >
                        <ClipboardPaste className="size-4"/>
                    </Button>

                    <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => insertText("\n")}
                        className="h-10 w-10 shrink-0 ml-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm"
                    >
                        <CornerDownLeft className="size-4"/>
                    </Button>
                </div>
            </div>
        </>
    );
}