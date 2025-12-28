// src/App.tsx
import React, { useState } from "react";
import PythonEditor from "./components/PythonEditor";
import JavaEditor from "./components/JavaEditor"; // Certifique-se de ter criado este arquivo

type Language = "python" | "java";

function App() {
  const [activeLang, setActiveLang] = useState<Language>("python");

  return (
    <div className="flex w-screen h-screen bg-neutral-900 text-white overflow-hidden">
      {/* --- Sidebar (Menu Lateral) --- */}
      <aside className="w-16 flex flex-col items-center py-4 gap-4 border-r border-neutral-700 bg-neutral-800">
        {/* Ícone/Botão Python */}
        <button
          onClick={() => setActiveLang("python")}
          className={`
            p-2 rounded-lg transition-all font-bold text-xl w-10 h-10 flex items-center justify-center
            ${
              activeLang === "python"
                ? "bg-blue-600 text-white shadow-lg scale-110"
                : "text-neutral-400 hover:bg-neutral-700 hover:text-white"
            }
          `}
          title="Editor Python"
        >
          Py
        </button>

        {/* Ícone/Botão Java */}
        <button
          onClick={() => setActiveLang("java")}
          className={`
            p-2 rounded-lg transition-all font-bold text-xl w-10 h-10 flex items-center justify-center
            ${
              activeLang === "java"
                ? "bg-red-600 text-white shadow-lg scale-110"
                : "text-neutral-400 hover:bg-neutral-700 hover:text-white"
            }
          `}
          title="Editor Java"
        >
          Jv
        </button>
      </aside>

      {/* --- Área Principal (Editors) --- */}
      <main className="flex-1 flex flex-col h-full relative p-4">
        {/* Header Simples */}
        <header className="mb-4 flex items-center justify-between border-b border-neutral-700 pb-2">
          <h1 className="text-lg font-semibold tracking-wide">
            {activeLang === "python"
              ? "🐍 Python Playground"
              : "☕ Java Playground"}
          </h1>
          <span className="text-xs text-neutral-500">
            {activeLang === "python"
              ? "Powered by Pyodide"
              : "Powered by CheerpJ"}
          </span>
        </header>

        {/* IMPORTANTE: Renderizamos AMBOS os editores, mas usamos CSS (hidden)
            para esconder o inativo. Isso evita que o Pyodide/CheerpJ reiniciem
            ao trocar de aba.
        */}

        <div
          className={`flex-1 flex flex-col ${
            activeLang === "python" ? "flex" : "hidden"
          }`}
        >
          <PythonEditor />
        </div>

        <div
          className={`flex-1 flex flex-col ${
            activeLang === "java" ? "flex" : "hidden"
          }`}
        >
          <JavaEditor />
        </div>
      </main>
    </div>
  );
}

export default App;
