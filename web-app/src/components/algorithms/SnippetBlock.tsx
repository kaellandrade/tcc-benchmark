import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/algorithms";

import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import {dcompLabEditorTema} from "@/config/editorTheme.ts";

interface SnippetBlockProps {
    snippets: {
        java: string;
        c: string;
        python: string;
    };
}

export const SnippetBlock = ({ snippets }: SnippetBlockProps) => {
    const [activeLang, setActiveLang] = useState<Language>("java");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const languages: { id: Language; label: string; color: string }[] = [
        { id: "java", label: "Java", color: "text-orange-400" },
        { id: "c", label: "C", color: "text-blue-400" },
        { id: "python", label: "Python", color: "text-yellow-400" },
    ];


    const getExtension = (lang: Language) => {
        switch (lang) {
            case "java": return java();
            case "c": return cpp();
            case "python": return python();
            default: return [];
        }
    };

    return (
        <div className="mt-3 border border-border/50 rounded-md overflow-hidden bg-[#0d1117] shadow-sm">
            <div className="flex items-center justify-between bg-[#161b22] px-2 py-1.5 border-b border-white/5">

                <div className="flex gap-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setActiveLang(lang.id)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer",
                                activeLang === lang.id
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            )}
                        >
                            <span className={cn("size-2 rounded-full bg-current opacity-70", lang.color)} />
                            {lang.label}
                        </button>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                </Button>
            </div>

            <div className="relative group text-sm">
                <CodeMirror
                    value={snippets[activeLang]}
                    height="auto"
                    theme="dark"
                    extensions={[getExtension(activeLang), dcompLabEditorTema]}
                    editable={false}
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        highlightActiveLine: false,
                        highlightActiveLineGutter: false
                    }}
                    className="bg-transparent"
                />
            </div>
        </div>
    );
};