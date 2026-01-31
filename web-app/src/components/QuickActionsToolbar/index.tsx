import { useState } from "react";
import { EditorView } from "@codemirror/view";
import {
    undo,
    redo,
    selectLine,
    deleteLine,
    toggleComment
} from "@codemirror/commands";
import {
    Copy,
    ClipboardPaste,
    ArrowRightToLine,
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
    MessageSquareCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { indentMore } from "@codemirror/commands";
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


    const ActionBtn = ({
                           icon: Icon,
                           label,
                           onClick,
                           className = ""
                       }: any) => (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => { onClick(e); view.focus(); }}
            onMouseDown={preventFocusSteal}
            className={cn(

                "h-9 w-9 shrink-0 font-mono text-base border border-transparent shadow-sm transition-colors",
                "bg-slate-100 hover:bg-slate-200",
                "dark:bg-secondary/30 dark:hover:bg-secondary/50",
                className
            )}
        >
            {Icon ? <Icon className="size-4" /> : <span className="font-bold">{label}</span>}
        </Button>
    );

    const Separator = () => <div className="w-px h-5 bg-border shrink-0 mx-1 opacity-50" />;

    return (
        <>

            <div className={cn(
                "fixed bottom-20 right-4 z-50 transition-all duration-300 ease-in-out",
                !isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-0 pointer-events-none"
            )}>
                <Button onClick={() => setIsOpen(true)} onMouseDown={preventFocusSteal} size="icon-sm" className="h-10 w-10 rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Wrench className="size-5" />
                </Button>
            </div>


            <div
                className={cn(

                    "fixed left-0 right-0 z-40 backdrop-blur border-t border-border shadow-lg transition-all duration-300 ease-in-out",
                    "bg-background/95 supports-[backdrop-filter]:bg-background/80",
                    isOpen ? "translate-y-0 opacity-100 relative" : "translate-y-full opacity-0 absolute bottom-0 pointer-events-none"
                )}
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar touch-pan-x">


                    <ActionBtn icon={ChevronDown} onClick={() => setIsOpen(false)} className="text-muted-foreground hover:bg-muted" />

                    <ActionBtn icon={Undo2} onClick={() => undo(view)} className="text-slate-600 dark:text-slate-300" />
                    <ActionBtn icon={Redo2} onClick={() => redo(view)} className="text-slate-600 dark:text-slate-300" />

                    <Separator />

                    <ActionBtn icon={Copy} onClick={handleCopy} className="text-slate-600 dark:text-slate-300" />
                    <ActionBtn icon={ClipboardPaste} onClick={handlePaste} className="text-slate-600 dark:text-slate-300" />

                    <Separator />

                    <ActionBtn
                        icon={TextSelect}
                        onClick={() => selectLine(view)}
                        className="text-teal-600 bg-teal-50 hover:bg-teal-100 dark:text-tertiary dark:bg-tertiary/10 dark:hover:bg-tertiary/20"
                    />
                    <ActionBtn
                        icon={MessageSquareCode}
                        onClick={() => toggleComment(view)}
                        className="text-teal-600 bg-teal-50 hover:bg-teal-100 dark:text-tertiary dark:bg-tertiary/10 dark:hover:bg-tertiary/20"
                    />
                    <ActionBtn
                        icon={Trash2}
                        onClick={() => deleteLine(view)}
                        className="text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:hover:bg-red-500/20"
                    />

                    <Separator />

                    <ActionBtn icon={MoveLeft} onClick={() => moveCursor(-1)} className="bg-slate-200/50 dark:bg-secondary/50 text-foreground" />
                    <ActionBtn icon={MoveRight} onClick={() => moveCursor(1)} className="bg-slate-200/50 dark:bg-secondary/50 text-foreground" />
                    <ActionBtn icon={ArrowRightToLine} onClick={() => indentMore(view)} className="text-muted-foreground" />

                    <Separator />

                    <ActionBtn icon={Parentheses} onClick={() => insertText("()", -1)} className="text-foreground font-medium" />
                    <ActionBtn icon={Braces} onClick={() => insertText("{}", -1)} className="text-foreground font-medium" />
                    <ActionBtn label='""' onClick={() => insertText('""', -1)} className="text-foreground font-medium" />
                    <ActionBtn label="''" onClick={() => insertText("''", -1)} className="text-foreground font-medium" />

                    <Separator />

                    <ActionBtn label=":" onClick={() => insertText(":")} className="text-indigo-600 dark:text-primary font-extrabold" />
                    <ActionBtn label=";" onClick={() => insertText(";")} className="text-indigo-600 dark:text-primary font-extrabold" />
                    <ActionBtn icon={Hash} onClick={() => insertText("# ")} className="text-indigo-600 dark:text-primary" />
                    <ActionBtn label="=" onClick={() => insertText(" = ")} className="text-indigo-600 dark:text-primary font-extrabold" />

                    <ActionBtn label="!" onClick={() => insertText("!")} className="text-indigo-600 dark:text-primary font-extrabold" />
                    <ActionBtn label="&" onClick={() => insertText(" & ")} className="text-indigo-600 dark:text-primary font-extrabold" />
                    <ActionBtn label="|" onClick={() => insertText(" | ")} className="text-indigo-600 dark:text-primary font-extrabold" />

                    <Separator />

                    <ActionBtn icon={Plus} onClick={() => insertText(" + ")} className="text-indigo-600 dark:text-primary" />
                    <ActionBtn icon={Minus} onClick={() => insertText(" - ")} className="text-indigo-600 dark:text-primary" />
                    <ActionBtn icon={MultiplyIcon} onClick={() => insertText(" * ")} className="text-indigo-600 dark:text-primary" />
                    <ActionBtn icon={Divide} onClick={() => insertText(" / ")} className="text-indigo-600 dark:text-primary" />

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