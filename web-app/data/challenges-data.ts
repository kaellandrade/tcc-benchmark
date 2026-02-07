import {
    Brain,
    Calculator,
    Type,
    ListTree,
    Search
} from "lucide-react";

export type Difficulty = "Iniciante" | "Intermediário" | "Avançado";

export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    category: string;
    icon: any;
    points: number;
}

export const challenges: Challenge[] = [
    // --- INICIANTE ---
    {
        id: "c-01",
        title: "Olá Mundo",
        description: "Crie um programa que imprima a mensagem 'Olá, Mundo!' (ou 'Hello World') na saída do console.",
        difficulty: "Iniciante",
        category: "Lógica Básica",
        icon: Type,
        points: 10
    },
    {
        id: "c-02",
        title: "Soma Simples",
        description: "Declare duas variáveis inteiras, atribua valores a elas e exiba a soma das duas.",
        difficulty: "Iniciante",
        category: "Matemática",
        icon: Calculator,
        points: 15
    },
    {
        id: "c-03",
        title: "Par ou Ímpar",
        description: "Escreva um código que verifique se um número (definido numa variável) é par ou ímpar e imprima o resultado.",
        difficulty: "Iniciante",
        category: "Lógica Condicional",
        icon: Brain,
        points: 20
    },

    // --- INTERMEDIÁRIO ---
    {
        id: "c-04",
        title: "Tabuada",
        description: "Utilizando um loop (for ou while), exiba a tabuada do 7 (de 1 a 10).",
        difficulty: "Intermediário",
        category: "Loops",
        icon: Calculator,
        points: 30
    },
    {
        id: "c-05",
        title: "Maior da Lista",
        description: "Dado um array/lista de números [10, 5, 20, 8, 15], encontre e exiba o maior valor sem usar funções prontas de máximo.",
        difficulty: "Intermediário",
        category: "Arrays",
        icon: ListTree,
        points: 40
    },
    {
        id: "c-06",
        title: "Inverter String",
        description: "Crie uma função que receba uma palavra e retorne ela invertida (ex: 'Java' -> 'avaJ').",
        difficulty: "Intermediário",
        category: "Strings",
        icon: Type,
        points: 45
    },

    // --- AVANÇADO ---
    {
        id: "c-07",
        title: "Fatorial Recursivo",
        description: "Implemente uma função recursiva para calcular o fatorial de um número N.",
        difficulty: "Avançado",
        category: "Recursão",
        icon: Brain,
        points: 60
    },
    {
        id: "c-08",
        title: "Busca Binária",
        description: "Implemente o algoritmo de Busca Binária para encontrar o número 42 em uma lista ordenada de 0 a 100.",
        difficulty: "Avançado",
        category: "Algoritmos",
        icon: Search,
        points: 80
    }
];