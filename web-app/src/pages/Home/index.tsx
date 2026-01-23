import {useState} from "react";
import {LanguageEditor} from "@/components/LanguageEditor";
import {Header} from "@/components/Header";
import {LanguageSelector} from "@/components/LanguageSelector";
import {Sidebar} from "@/components/Sidebar";

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

    return (
        <div
            className="w-screen h-[100dvh] flex flex-col bg-background overflow-hidden supports-[height:100cqh]:h-[100cqh]">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={onSidebarClose}
                onThemeToggle={onThemeToggle}
                isDarkMode={isDarkMode}
            />

            <div className="flex-none [@media(pointer:coarse)_and_(orientation:landscape)]:hidden">
                <Header
                    onMenuClick={onSidebarOpen}
                    onThemeToggle={onThemeToggle}
                    isDarkMode={isDarkMode}
                />

                <LanguageSelector value={language} onChange={setLanguage} />
            </div>

            <main className="flex-1 flex flex-col overflow-hidden">
                <LanguageEditor languageId={language} isDarkMode={isDarkMode}/>
            </main>
        </div>
    );
}
