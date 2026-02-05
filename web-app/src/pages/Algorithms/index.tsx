import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Copy,
    Check,
    Clock,
    Zap,
    TrendingUp,
    AlertTriangle,
    Code2,
    Layers,
    Binary
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- 1. Definição de Tipos ---

type Language = "java" | "c" | "python";

type Algorithm = {
    name: string;
    description: string;
    snippets: {
        java: string;
        c: string;
        python: string;
    };
};

type ComplexityCategory = {
    id: string;
    notation: string;
    name: string;
    description: string;
    color: "green" | "lime" | "yellow" | "orange" | "red" | "purple";
    icon: any;
    algorithms: Algorithm[];
};

// --- 2. Base de Dados (Conteúdo) ---

const complexities: ComplexityCategory[] = [
    {
        id: "o-1",
        notation: "O(1)",
        name: "Tempo Constante",
        description: "O tempo de execução não cresce com o tamanho da entrada. É o cenário ideal.",
        color: "green",
        icon: Zap,
        algorithms: [
            {
                name: "Acesso a Array",
                description: "Acessar um elemento específico pelo índice (arr[i]).",
                snippets: {
                    java: `// Acesso direto em Java\nint[] numeros = {10, 20, 30};\nint x = numeros[1]; // O(1)`,
                    c: `// Acesso direto em C\nint numeros[] = {10, 20, 30};\nint x = numeros[1]; // O(1)`,
                    python: `# Acesso direto em Python\nnumeros = [10, 20, 30]\nx = numeros[1] # O(1)`
                }
            },
            {
                name: "Verificação Par/Ímpar",
                description: "Operação aritmética simples usando módulo.",
                snippets: {
                    java: `// TODO: Implementar verificação (n % 2 == 0) em Java`,
                    c: `// TODO: Implementar verificação (n % 2 == 0) em C`,
                    python: `# TODO: Implementar verificação (n % 2 == 0) em Python`
                }
            },
            {
                name: "Pilha (Stack) Push/Pop",
                description: "Inserir ou remover do topo de uma pilha.",
                snippets: {
                    java: `// TODO: Implementar Stack.push() em Java`,
                    c: `// TODO: Implementar Stack Push em C`,
                    python: `# TODO: Implementar list.append() e pop() em Python`
                }
            }
        ]
    },
    {
        id: "o-log-n",
        notation: "O(log n)",
        name: "Logarítmica",
        description: "O tempo cresce lentamente. Comum em algoritmos que dividem o problema pela metade a cada passo.",
        color: "lime",
        icon: Binary,
        algorithms: [
            {
                name: "Busca Binária",
                description: "Encontrar um item em uma lista ordenada dividindo o escopo.",
                snippets: {
                    java: `// TODO: Implementar Busca Binária (Binary Search) em Java`,
                    c: `// TODO: Implementar Busca Binária em C`,
                    python: `# TODO: Implementar Busca Binária em Python`
                }
            },
            {
                name: "Potenciação Rápida",
                description: "Calcular x^n dividindo o expoente.",
                snippets: {
                    java: `// TODO: Implementar Fast Power em Java`,
                    c: `// TODO: Implementar Fast Power em C`,
                    python: `# TODO: Implementar Fast Power em Python`
                }
            }
        ]
    },
    {
        id: "o-n",
        notation: "O(n)",
        name: "Linear",
        description: "O tempo cresce proporcionalmente à entrada. Percorre os dados uma vez.",
        color: "yellow",
        icon: TrendingUp,
        algorithms: [
            {
                name: "Busca Linear",
                description: "Verificar cada elemento da lista até encontrar o alvo.",
                snippets: {
                    java: `// TODO: Implementar Busca Linear (For Loop) em Java`,
                    c: `// TODO: Implementar Busca Linear em C`,
                    python: `# TODO: Implementar Busca Linear em Python`
                }
            },
            {
                name: "Soma de Array",
                description: "Acumular valores percorrendo todos os elementos.",
                snippets: {
                    java: `// TODO: Implementar Soma de Array em Java`,
                    c: `// TODO: Implementar Soma de Array em C`,
                    python: `# TODO: Implementar sum() manual em Python`
                }
            },
            {
                name: "Verificar Palíndromo",
                description: "Comparar caracteres de uma string.",
                snippets: {
                    java: `// TODO: Implementar Palíndromo em Java`,
                    c: `// TODO: Implementar Palíndromo em C`,
                    python: `# TODO: Implementar Palíndromo em Python`
                }
            }
        ]
    },
    {
        id: "o-n-log-n",
        notation: "O(n log n)",
        name: "Quase Linear",
        description: "Geralmente o melhor caso para ordenação baseada em comparação.",
        color: "orange",
        icon: Layers,
        algorithms: [
            {
                name: "Merge Sort",
                description: "Dividir para conquistar: divide a lista e funde ordenando.",
                snippets: {
                    java: `// TODO: Implementar Merge Sort em Java`,
                    c: `// TODO: Implementar Merge Sort em C`,
                    python: `# TODO: Implementar Merge Sort em Python`
                }
            },
            {
                name: "Quick Sort",
                description: "Particionamento recursivo (considerando caso médio).",
                snippets: {
                    java: `// TODO: Implementar Quick Sort em Java`,
                    c: `// TODO: Implementar Quick Sort em C`,
                    python: `# TODO: Implementar Quick Sort em Python`
                }
            }
        ]
    },
    {
        id: "o-n-2",
        notation: "O(n²)",
        name: "Quadrática",
        description: "O desempenho degrada rapidamente (loops aninhados). Evite para grandes volumes.",
        color: "red",
        icon: AlertTriangle,
        algorithms: [
            {
                name: "Bubble Sort",
                description: "Flutua o maior elemento para o topo repetidamente.",
                snippets: {
                    java: `// TODO: Implementar Bubble Sort em Java`,
                    c: `// TODO: Implementar Bubble Sort em C`,
                    python: `# TODO: Implementar Bubble Sort em Python`
                }
            },
            {
                name: "Insertion Sort",
                description: "Insere o elemento atual na posição correta da parte ordenada.",
                snippets: {
                    java: `// TODO: Implementar Insertion Sort em Java`,
                    c: `// TODO: Implementar Insertion Sort em C`,
                    python: `# TODO: Implementar Insertion Sort em Python`
                }
            },
            {
                name: "Multiplicação de Matrizes",
                description: "Algoritmo ingênuo com triplo loop aninhado.",
                snippets: {
                    java: `// TODO: Implementar Multiplicação de Matrizes em Java`,
                    c: `// TODO: Implementar Multiplicação de Matrizes em C`,
                    python: `# TODO: Implementar Multiplicação de Matrizes em Python`
                }
            }
        ]
    }
];

// --- 3. Componentes de UI ---

const SnippetBlock = ({ snippets }: { snippets: { java: string, c: string, python: string } }) => {
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

    return (
        <div className="mt-3 border border-border/50 rounded-md overflow-hidden bg-[#0d1117] shadow-sm">
            {/* Barra de Título / Abas */}
            <div className="flex items-center justify-between bg-[#161b22] px-2 py-1.5 border-b border-white/5">

                {/* Abas de Linguagem */}
                <div className="flex gap-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setActiveLang(lang.id)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5",
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

                {/* Botão Copiar */}
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-6 w-6 text-slate-400 hover:text-white"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                </Button>
            </div>

            {/* Área de Código */}
            <div className="relative group">
                <pre className="p-4 text-xs font-mono overflow-x-auto text-slate-300 leading-relaxed min-h-[60px]">
                    <code className={`language-${activeLang}`}>
                        {snippets[activeLang]}
                    </code>
                </pre>
            </div>
        </div>
    );
};

const ComplexityCard = ({ data }: { data: ComplexityCategory }) => {
    const [isOpen, setIsOpen] = useState(false);

    const colorStyles = {
        green: "border-l-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
        lime: "border-l-lime-500 bg-lime-500/5 text-lime-600 dark:text-lime-400",
        yellow: "border-l-yellow-500 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
        orange: "border-l-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400",
        red: "border-l-red-500 bg-red-500/5 text-red-600 dark:text-red-400",
        purple: "border-l-purple-500 bg-purple-500/5 text-purple-600 dark:text-purple-400",
    };

    const Icon = data.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "rounded-lg border border-border bg-card shadow-sm overflow-hidden mb-4 transition-all hover:shadow-md",
                "border-l-4",
                colorStyles[data.color].split(" ")[0]
            )}
        >
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-full bg-background border shadow-sm", colorStyles[data.color].replace("border-l-", ""))}>
                        <Icon className="size-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                            {data.notation}
                            <span className="text-muted-foreground font-sans text-sm font-medium px-2 py-0.5 rounded-full bg-secondary/50">
                                {data.name}
                            </span>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{data.description}</p>
                    </div>
                </div>
                <div className="text-muted-foreground">
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="size-5" />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-6 pt-0 space-y-6">
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                            {data.algorithms.map((algo, idx) => (
                                <div key={idx} className="pl-2 border-l-2 border-border/40 ml-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Code2 className="size-4 text-primary/70"/>
                                        <h4 className="text-sm font-semibold text-foreground">{algo.name}</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                        {algo.description}
                                    </p>

                                    <SnippetBlock snippets={algo.snippets} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

interface AlgorithmsPageProps {
    isSidebarOpen: boolean;
    onSidebarOpen: () => void;
    onSidebarClose: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

export function Algorithms({
                               isSidebarOpen,
                               onSidebarOpen,
                               onSidebarClose,
                               onThemeToggle,
                               isDarkMode,
                           }: AlgorithmsPageProps) {
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

            <main className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-10">
                <div className="max-w-4xl mx-auto space-y-8 pb-20">

                    {/* Header da Página */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Clock className="size-6" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Algoritmos Clássicos
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Guia de referência para Análise de Complexidade e Estruturas de Dados.
                            Entenda como seus códigos se comportam à medida que os dados crescem.
                        </p>
                    </div>

                    {/* Cards Explicativos Big O (Versão Didática) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* 1. O Pior Caso (Big O) */}
                        <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:border-red-500/50 transition-colors group">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="size-5 text-red-500" />
                                <h3 className="font-bold text-foreground text-lg">O Pior Cenário (Big O)</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Imagine que você tem <strong>muito azar</strong>. O algoritmo vai ter que percorrer todos os dados?
                                <br/><br/>
                                Usamos o <strong>O(n)</strong> para nos preparar para o pior. É a métrica mais importante para evitar que seu programa trave com muitos usuários.
                            </p>
                        </div>

                        {/* 2. O Melhor Caso (Ômega) */}
                        <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:border-green-500/50 transition-colors opacity-90 hover:opacity-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="size-5 text-green-500" />
                                <h3 className="font-bold text-foreground text-lg">O Melhor Cenário (Ω)</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Imagine que você tem <strong>muita sorte</strong>. Você procurou um nome na lista e ele era logo o primeiro!
                                <br/><br/>
                                O <strong>Ômega</strong> mede esse tempo mínimo. É bom saber, mas não podemos contar com a sorte sempre.
                            </p>
                        </div>

                        {/* 3. Card de Incentivo / Estudo */}
                        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-2 relative z-10">
                                <TrendingUp className="size-5 text-primary" />
                                <h3 className="font-bold text-primary text-lg">Por que estudar isso?</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                                Saber calcular a complexidade é o que diferencia <strong>programadores seniores</strong>.
                                Grandes empresas (Big Techs) cobram isso em entrevistas.
                            </p>
                            <Button
                                variant="link"
                                className="px-0 text-primary mt-2 h-auto font-semibold group"
                                onClick={() => window.open("https://www.google.com/search?q=como+calcular+complexidade+de+algoritmo", "_blank")}
                            >
                                Pesquisar sobre o tema <ChevronDown className="-rotate-90 ml-1 size-3 transition-transform group-hover:translate-x-1" />
                            </Button>

                            {/* Efeito decorativo de fundo */}
                            <div className="absolute -right-4 -bottom-4 bg-primary/10 size-24 rounded-full blur-2xl" />
                        </div>
                    </div>

                    <div className="h-px bg-border/50" />

                    <div className="space-y-6">

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                Classificação por Complexidade
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-base">
                                Abaixo, selecionamos os algoritmos fundamentais para cada nível de eficiência.
                                Sinta-se à vontade para <strong>alternar as abas entre Java, C e Python</strong>,
                                copiar os <i>snippets</i> e levá-los para o editor principal para testar e modificar na prática.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {complexities.map((item) => (
                                <ComplexityCard key={item.id} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}