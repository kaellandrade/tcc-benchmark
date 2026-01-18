import { useState } from "react";
import PythonEditor from "@/components/PythonEditor";
import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Sidebar } from "@/components/Sidebar";
import JavaEditor from "@/components/JavaEditor";

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
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={onSidebarClose}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      />

      <Header
        onMenuClick={onSidebarOpen}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      />

      <LanguageSelector value={language} onChange={setLanguage} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {language === "python" && <PythonEditor />}

        {language === "java" && <JavaEditor />}

        {/*
           {language === "c" && <CEditor />} 
        */}
      </main>
    </div>
  );
}
