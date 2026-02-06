import {
    Zap,
    Binary,
    TrendingUp,
    Layers,
    AlertTriangle
} from "lucide-react";
import type {ComplexityCategory} from "@/types/algorithms";
import {
    constantTimeSnippets,
    linearTimeSnippets,
    logarithmicTimeSnippets, quadraticTimeSnippets,
    quasilinearTimeSnippets
} from "./code-snippets.ts";

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
                description: "Acessar um elemento específico pelo índice é instantâneo pois o endereço de memória é calculado diretamente.",
                snippets: constantTimeSnippets.arrayAccess
            },
            {
                name: "Verificação Par/Ímpar",
                description: "Determinar se um número é par ou ímpar requer apenas uma operação aritmética simples.",
                snippets: constantTimeSnippets.checkParity
            },
            {
                name: "Pilha (Stack) Push/Pop",
                description: "Inserir ou remover do topo de uma pilha é constante.",
                snippets: constantTimeSnippets.stackOperations
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
                snippets: logarithmicTimeSnippets.binarySearch
            },
            {
                name: "Potenciação Rápida",
                description: "Calcular x^n dividindo o expoente.",
                snippets: logarithmicTimeSnippets.fastPower
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
                description: "Verificar cada elemento da lista sequencialmente até encontrar o alvo.",
                snippets: linearTimeSnippets.linearSearch
            },
            {
                name: "Soma de Array",
                description: "Acumular valores percorrendo todos os elementos da lista.",
                snippets: linearTimeSnippets.arraySum
            },
            {
                name: "Verificar Palíndromo",
                description: "Comparar caracteres das extremidades em direção ao centro (Abordagem Two Pointers).",
                snippets: linearTimeSnippets.palindromeCheck
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
                snippets: quasilinearTimeSnippets.mergeSort
            },
            {
                name: "Quick Sort",
                description: "Particionamento recursivo (considerando caso médio).",
                snippets: quasilinearTimeSnippets.quickSort
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
                description: "Flutua o maior elemento para o topo repetidamente através de trocas adjacentes.",
                snippets: quadraticTimeSnippets.bubbleSort
            },
            {
                name: "Insertion Sort",
                description: "Constrói a lista ordenada um item de cada vez, inserindo o elemento atual na posição correta.",
                snippets: quadraticTimeSnippets.insertionSort
            },
            {
                name: "Multiplicação de Matrizes",
                description: "Algoritmo clássico com triplo loop aninhado. O custo cresce cubicamente ou quadraticamente dependendo das dimensões.",
                snippets: quadraticTimeSnippets.matrixMultiplication
            }
        ]
    }
];