import { LucideIcon } from "lucide-react";

export type Language = "java" | "c" | "python";

export type Algorithm = {
    name: string;
    description: string;
    snippets: {
        java: string;
        c: string;
        python: string;
    };
};

export type ComplexityCategory = {
    id: string;
    notation: string;
    name: string;
    description: string;
    color: "green" | "lime" | "yellow" | "orange" | "red" | "purple";
    icon: LucideIcon;
    algorithms: Algorithm[];
};