import {
    Zap,
    Binary,
    TrendingUp,
    Layers,
    AlertTriangle
} from "lucide-react";
import type {ComplexityCategory} from "@/types/algorithms";

export const complexities: ComplexityCategory[] = [
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