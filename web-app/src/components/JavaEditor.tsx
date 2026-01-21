import {useEffect, useState} from "react";
import {java} from "@codemirror/lang-java";
import {loadCheerpJInstance} from "../utils/cheerpjLoader";
import {CodeEditor} from "./CodeEditor";

interface FileTab {
    id: string;
    name: string;
    content: string;
}

// Arquivos iniciais para Java
const initialFiles: FileTab[] = [
    {
        id: "1",
        name: "Main.java",
        content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Olá do Java com CheerpJ!");
    }
}`,
    },
    {
        id: "2",
        name: "Helper.java",
        content: `public class Helper {
    public static void greet() {
        System.out.println("Hello from Helper!");
    }
}`,
    },
];

interface JavaEditorProps {
    isDarkMode?: boolean
}


const JavaEditor = ({isDarkMode}: JavaEditorProps) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [files, setFiles] = useState<FileTab[]>(initialFiles);
    const [activeFileId, setActiveFileId] = useState<string>("1");
    const [output, setOutput] = useState<string>("");

    // Inicialização do CheerpJ (apenas uma vez)
    useEffect(() => {
        const init = async () => {
            try {
                await loadCheerpJInstance();
                setIsReady(true);
            } catch (e) {
                console.error(e);
                setOutput(
                    "Erro crítico: Falha ao carregar o motor Java (WebAssembly).",
                );
            }
        };
        init();
    }, []);

    // --- Gerenciamento de Abas e Arquivos (Idêntico ao Python) ---

    const handleCodeChange = (value: string) => {
        setFiles((prev) =>
            prev.map((file) =>
                file.id === activeFileId ? {...file, content: value} : file,
            ),
        );
    };

    const handleFileSelect = (id: string) => {
        setActiveFileId(id);
    };

    const handleFileClose = (id: string) => {
        if (files.length <= 1) return;
        const newFiles = files.filter((f) => f.id !== id);
        setFiles(newFiles);
        if (activeFileId === id) {
            setActiveFileId(newFiles[0].id);
        }
    };

    const handleFileCreate = (fileName: string) => {
        // Garante extensão .java se o usuário não digitar
        const name = fileName.endsWith(".java") ? fileName : `${fileName}.java`;
        const newFile: FileTab = {
            id: crypto.randomUUID(),
            name: name,
            content: `public class ${name.replace(".java", "")} {\n\n}`,
        };
        setFiles((prev) => [...prev, newFile]);
        setActiveFileId(newFile.id);
    };

    // --- Lógica de Execução (Específica do CheerpJ) ---

    const runCode = async () => {
        if (!isReady) return;

        const activeFile = files.find((f) => f.id === activeFileId);
        if (!activeFile) return;

        setOutput(""); // Limpa terminal anterior

        // Interceptação do Console (Necessário pois o CheerpJ joga o stdout no console do navegador)
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        const capture = (...args: any[]) => {
            const text = args
                .map((arg) =>
                    typeof arg === "object" ? JSON.stringify(arg) : String(arg),
                )
                .join(" ");

            // Filtra logs internos do CheerpJ para não sujar o terminal do usuário
            if (text.includes("CheerpJ runtime") || text.includes("dynamic update"))
                return;

            setOutput((prev) => prev + text + "\n");
        };

        console.log = capture;
        console.error = capture;
        console.warn = capture;

        try {
            const cj = window as any;
            const fileName = activeFile.name;
            const className = fileName.replace(".java", ""); // Ex: Main.java -> Main

            // 1. INPUT: Grava o arquivo atual no Sistema de Arquivos Virtual (/str/)
            // Nota: Idealmente gravaríamos todos os arquivos abertos, mas focaremos no ativo por enquanto.
            cj.cheerpOSAddStringFile(`/str/${fileName}`, activeFile.content);

            setOutput("⏳ Compilando...\n");

            // 2. COMPILAÇÃO: Executa o javac (asset .jar)
            const compileExitCode = await cj.cheerpjRunMain(
                "com.sun.tools.javac.Main",
                "/app/jdk.compiler_17.jar:.", // Classpath incluindo o compilador
                "-d",
                "/files/", // Pasta de destino dos .class
                `/str/${fileName}`, // Arquivo fonte
            );

            if (compileExitCode !== 0) {
                setOutput(
                    (prev) => prev + "\n❌ Erro de Compilação. Verifique a sintaxe.",
                );
            } else {
                setOutput((prev) => prev + "✅ Executando...\n------------------\n");

                // 3. EXECUÇÃO: Roda a classe compilada
                // O classpath agora aponta para /files/ onde o .class foi gerado
                await cj.cheerpjRunMain(className, "/files/");
            }
        } catch (error: any) {
            setOutput(`\n[ERRO DO SISTEMA]: ${error.toString()}`);
        } finally {
            // Restaura o console original e para o loading
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
        }
    };

    return (
        <CodeEditor
            isLoading={!isReady} // Mostra loading enquanto o CheerpJ não carrega
            language={java()}
            languageName="Java (OpenJDK 17)"
            fileExtension=".java"
            files={files}
            activeFileId={activeFileId}
            onFileSelect={handleFileSelect}
            onFileClose={handleFileClose}
            onFileCreate={handleFileCreate}
            onCodeChange={handleCodeChange}
            runCode={runCode}
            output={output}
            isDarkMode={isDarkMode}
        />
    );
};

export default JavaEditor;
