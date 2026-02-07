import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    CheckCircle2,
    Circle,
    Filter,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import confetti from "canvas-confetti";
import {challenges, type Difficulty} from "../../../data/challenges-data.ts";
import {FabEditor} from "@/components/FABDcompLabEditor";

interface ChallengesPageProps {
    isSidebarOpen: boolean;
    onSidebarOpen: () => void;
    onSidebarClose: () => void;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

export function Challenges({
                               isSidebarOpen,
                               onSidebarOpen,
                               onSidebarClose,
                               onThemeToggle,
                               isDarkMode,
                           }: ChallengesPageProps) {
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<Difficulty | "Todos">("Todos");

    useEffect(() => {
        const saved = localStorage.getItem("dcomplab_challenges_progress");
        if (saved) {
            setCompletedIds(JSON.parse(saved));
        }
    }, []);

    const playSuccessSound = () => {
        const audio = new Audio("/sounds/success.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Áudio bloqueado pelo navegador", e));
    };

    const triggerSuccessEffects = () => {
        playSuccessSound();
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        const end = Date.now() + 1000;
        const colors = ['#A459D1', '#826FFF', '#15F5B9'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const toggleChallenge = (id: string) => {
        let newCompleted: string[];
        const isCurrentlyCompleted = completedIds.includes(id);

        if (isCurrentlyCompleted) {
            newCompleted = completedIds.filter(c => c !== id);
        } else {
            newCompleted = [...completedIds, id];
            triggerSuccessEffects();
        }

        setCompletedIds(newCompleted);
        localStorage.setItem("dcomplab_challenges_progress", JSON.stringify(newCompleted));
    };

    const filteredChallenges = activeFilter === "Todos"
        ? challenges
        : challenges.filter(c => c.difficulty === activeFilter);

    const totalPoints = challenges.reduce((acc, curr) => acc + curr.points, 0);
    const currentPoints = challenges
        .filter(c => completedIds.includes(c.id))
        .reduce((acc, curr) => acc + curr.points, 0);
    const progressPercent = Math.round((currentPoints / totalPoints) * 100);



    return (
        <div className="w-screen h-screen flex flex-col bg-background overflow-hidden relative">
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

            <main className="flex-1 overflow-y-auto p-4 md:p-8 md:pt-10 scroll-smooth pb-24">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Hero Section com Animação de Barra */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-primary/20 p-6 md:p-8">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left space-y-2">
                                <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3">
                                    <Trophy className="size-8 text-yellow-500 drop-shadow-sm" />
                                    Desafios de Código
                                </h1>
                                <p className="text-muted-foreground max-w-lg">
                                    Coloque seus conhecimentos em prática. Resolva os problemas no editor e marque-os como concluídos aqui.
                                </p>
                            </div>

                            <motion.div
                                key={progressPercent}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center bg-background/50 backdrop-blur rounded-xl p-4 border border-border shadow-sm min-w-[150px]"
                            >
                                <span className="text-4xl font-black text-primary">{progressPercent}%</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1">
                                    {progressPercent === 100 && <Sparkles className="size-3 text-yellow-500" />}
                                    Concluído
                                </span>
                            </motion.div>
                        </div>

                        <div className="mt-6 h-3 w-full bg-background/50 rounded-full overflow-hidden border border-primary/10">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-2 mr-2 text-muted-foreground text-sm font-medium">
                            <Filter className="size-4" />
                            Filtrar:
                        </div>
                        {["Todos", "Iniciante", "Intermediário", "Avançado"].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter as any)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all border select-none active:scale-95", // Adicionei active:scale-95
                                    activeFilter === filter
                                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredChallenges.map((challenge) => {
                                const isCompleted = completedIds.includes(challenge.id);
                                const Icon = challenge.icon;
                                const difficultyColors = {
                                    "Iniciante": "text-green-500 bg-green-500/10 border-green-500/20",
                                    "Intermediário": "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
                                    "Avançado": "text-red-500 bg-red-500/10 border-red-500/20",
                                };

                                return (
                                    <motion.div
                                        key={challenge.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={cn(
                                            "group relative flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-xl border transition-all hover:shadow-md",
                                            isCompleted
                                                ? "bg-card/50 border-border/50 opacity-75"
                                                : "bg-card border-border"
                                        )}
                                    >
                                        <div className="flex-1 space-y-2 w-full">
                                            <div className="flex items-center justify-between md:justify-start gap-3">
                                                <div className={cn("p-2 rounded-lg", difficultyColors[challenge.difficulty])}>
                                                    <Icon className="size-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className={cn(
                                                        "font-bold text-lg leading-none transition-colors",
                                                        isCompleted && "line-through text-muted-foreground"
                                                    )}>
                                                        {challenge.title}
                                                    </h3>
                                                    <div className="flex gap-2 mt-1">
                                                        <span className="text-[10px] uppercase font-bold text-muted-foreground border border-border px-1.5 rounded bg-muted/50">
                                                            {challenge.category}
                                                        </span>
                                                        <span className={cn("text-[10px] uppercase font-bold px-1.5 rounded", difficultyColors[challenge.difficulty])}>
                                                            {challenge.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground leading-relaxed pl-1">
                                                {challenge.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between w-full md:w-auto md:flex-col gap-4 pl-1 mt-2 md:mt-0 md:pl-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:ml-2">
                                            <div className="text-xs font-mono text-muted-foreground font-semibold">
                                                +{challenge.points} XP
                                            </div>

                                            <motion.div whileTap={{ scale: 0.9 }}>
                                                <Button
                                                    variant={isCompleted ? "secondary" : "default"}
                                                    size="sm"
                                                    onClick={() => toggleChallenge(challenge.id)}
                                                    className={cn(
                                                        "gap-2 transition-all min-w-[140px] shadow-sm cursor-pointer",
                                                        isCompleted
                                                            ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 border border-green-500/20"
                                                            : "hover:scale-105 active:scale-95 transition-transform"
                                                    )}
                                                >
                                                    {isCompleted ? (
                                                        <>
                                                            <CheckCircle2 className="size-4" />
                                                            Concluído!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Circle className="size-4" />
                                                            Marcar Feito
                                                        </>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredChallenges.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
                                <Filter className="size-8 opacity-20" />
                                <p>Nenhum desafio encontrado nesta categoria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <FabEditor />
        </div>
    );
}