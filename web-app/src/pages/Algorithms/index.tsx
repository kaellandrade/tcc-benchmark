import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Clock, TrendingUp, AlertTriangle, Zap, ChevronDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ComplexityCard } from "@/components/algorithms/ComplexityCard";
import {complexities} from "../../../data/algorithms-data.ts";
import {FabEditor} from "@/components/FABDcompLabEditor";

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
                <div className="max-w-4xl mx-auto space-y-8 pb-10">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
                                className="px-0 text-primary mt-2 h-auto font-semibold group cursor-pointer"
                                onClick={() => window.open("https://www.google.com/search?q=como+calcular+complexidade+de+algoritmo", "_blank")}
                            >
                                Pesquisar sobre o tema <ChevronDown className="-rotate-90 ml-1 size-3 transition-transform group-hover:translate-x-1" />
                            </Button>

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

                    <div className="mt-12 py-6 border-t border-dashed border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left  mb-15 lg:mb-0">
                        <div className="space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-foreground/80 font-medium text-sm">
                                <Github className="size-4" />
                                <span>Encontrou alguma inconsistência?</span>
                            </div>
                            <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                                Este projeto é Open Source e construído pela comunidade acadêmica.
                                Se você notar algum erro nos códigos ou explicações, sinta-se à vontade para contribuir.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-xs h-8 bg-background/50 hover:text-primary cursor-pointer"
                            onClick={() => window.open("https://github.com/kaellandrade/tcc-benchmark", "_blank")}
                        >
                            <Github className="size-3.5" />
                            Reportar Issue
                        </Button>
                    </div>

                </div>
                <FabEditor />
            </main>
        </div>
    )
}