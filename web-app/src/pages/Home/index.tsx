import {useState} from "react";
import {LanguageEditor} from "@/components/LanguageEditor";
import {Header} from "@/components/Header";
import {LanguageSelector} from "@/components/LanguageSelector";
import {Sidebar} from "@/components/Sidebar";
import {cn} from "@/lib/utils.ts";

interface HomeProps {
    isSidebarOpen: boolean;
    onSidebarOpen: () => void;
    onSidebarClose: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

export function Home({
                         isSidebarOpen,
                         onSidebarOpen,
                         onSidebarClose,
                         onThemeToggle,
                         isDarkMode,
                     }: HomeProps) {
    const [language, setLanguage] = useState("python");
    const [isEditorFocused, setIsEditorFocused] = useState(false);

    return (
        <div
            className="w-screen h-[100dvh] flex flex-col bg-background overflow-hidden supports-[height:100cqh]:h-[100cqh]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={onSidebarClose}
                onThemeToggle={onThemeToggle}
                isDarkMode={isDarkMode}
            />

            <div
                className={cn(
                    "flex-none flex flex-col transition-all duration-300 ease-in-out overflow-hidden",
                    isEditorFocused
                        ? "max-h-0 opacity-0 margin-0"
                        : "max-h-[300px] opacity-100",
                    "md:max-h-[300px] md:opacity-100",
                    "[@media(pointer:coarse)_and_(orientation:landscape)]:hidden"
                )}
            >
                <Header
                    onMenuClick={onSidebarOpen}
                    onThemeToggle={onThemeToggle}
                    isDarkMode={isDarkMode}
                />

                <LanguageSelector value={language} onChange={setLanguage} />
            </div>

            <main className="flex-1 flex flex-col overflow-hidden">
                <LanguageEditor onFocusChange={setIsEditorFocused} languageId={language} isDarkMode={isDarkMode}/>
            </main>
        </div>
    );
}
