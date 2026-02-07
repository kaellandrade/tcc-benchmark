import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SnippetBlock } from "./SnippetBlock";
import type {ComplexityCategory} from "@/types/algorithms";

interface ComplexityCardProps {
    data: ComplexityCategory;
}

export const ComplexityCard = ({ data }: ComplexityCardProps) => {
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