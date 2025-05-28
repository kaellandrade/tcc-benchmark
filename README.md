<p align="center">
  <img src="https://th.bing.com/th/id/R.0063bd4673d6be8fac1c2a927b48626d?rik=XFXIBP3%2fzoDGeQ&riu=http%3a%2f%2finct.info%2fpt%2fimages%2finstituicao%2fufs.png&ehk=3z4Ja%2bMOAw1%2fqjSM4KknkiSaRCrQRcL%2bnHXe%2fQWMAEc%3d&risl=&pid=ImgRaw&r=0" alt="Universidade Federal de Sergipe" width="30%" title="Universidade federal de Sergipe">
  <img src="https://avatars0.githubusercontent.com/u/26286260?s=400&v=4" alt="PetIndica" width="30%" style="border-radius:50%;" title="Departamento de Computação">
</p>

----

# Complexidade de Algoritmos

Este projeto contém a implementação de diversos algoritmos clássicos da computação, com foco na análise e comparação de desempenho em diferentes plataformas, como dispositivos móveis e embarcados.

## Notação Big O

A **notação Big O** é utilizada para descrever o comportamento assintótico de algoritmos, ou seja, como eles se comportam em termos de desempenho à medida que o tamanho da entrada cresce.



Ela pode representar:

- **O(f(n)) — Notação Big O**:  
  Representa o **limite superior** do tempo de execução. Indica o pior caso possível (mais utilizado).  
  Exemplo: `O(n²)` significa que o algoritmo nunca será pior do que `n²` passos.

- **Ω(f(n)) — Notação Ômega**:  
  Representa o **limite inferior**. Indica o melhor caso possível.  
  Exemplo: `Ω(n)` significa que o algoritmo levará **pelo menos** `n` passos em algumas situações.

- **Θ(f(n)) — Notação Teta**:  
  Representa o **caso médio/exato**, ou seja, quando o limite superior e inferior são iguais.  
  Exemplo: `Θ(n log n)` indica que o algoritmo sempre roda em `n log n` passos, independentemente do caso.


## Complexidades clássicas

- `O(1)` → tempo constante, não importa o tamanho da entrada
- `O(n)` → cresce linearmente com a entrada
- `O(n²)` → cresce exponencialmente com o quadrado da entrada
- `O(log n)` → crescimento logarítmico, muito eficiente
- `O(n log n)` → crescimento intermediário, comum em algoritmos eficientes de ordenação

# 📊 Lista de Algoritmos e Complexidades

## 1. O(1) — Tempo Constante

> O tempo de execução **não cresce com o tamanho da entrada**.

| Algoritmo/Operação                        | Descrição                               |
|-------------------------------------------|-----------------------------------------|
| Acesso a elemento de um array `arr[i]`    | Acesso direto à posição                 |
| Inserção/remover do final de uma pilha    | Operações em estruturas tipo `stack`    |
| Verificar se número é par `n % 2 == 0`    | Operação aritmética simples             |
| Trocar dois valores de variáveis          | Operações fixas                         |
| Buscar em `dict` ou `hash map` (em média) | Acesso em tabelas hash bem distribuídas |


## 2. O(log n) — Logarítmica

> O tempo **cresce lentamente** conforme a entrada aumenta.

| Algoritmo                                              | Descrição                               |
|--------------------------------------------------------|-----------------------------------------|
| Busca Binária                                          | Divide a busca pela metade a cada passo |
| Inserção/remoção em árvore balanceada (AVL, Red-Black) | Estruturas auto-balanceadas             |
| Heapify em uma heap binária                            | Ajuste de árvore de prioridade          |
| Encontrar potência usando exponenciação rápida         | Divide problema recursivamente          |
| Contagem de bits em um número com técnicas de bitwise  | Divide bits com operações lógicas       |

## 3. O(n) Linear

> Cresce proporcionalmente ao tamanho da entrada.

| Algoritmo                           | Descrição                       |
|:------------------------------------|:--------------------------------|
| Busca Linear                        | Verifica cada elemento da lista |
| Soma de elementos de um array       | Percorre todos os elementos     |
| Verificação de palíndromo (simples) | Compara pares em uma string     |
| Contar frequência de elementos      | Uma passada pela lista          |
| Remoção de duplicatas com set       | Uma varredura simples           |

## 4. O(n log n) Quase linear 

> É melhor tempo possível para muitos algotimos de ordenação baseados em comparação.

| Algoritmo                                              | Descrição                    |
|:-------------------------------------------------------|:-----------------------------|
| Merge Sort                                             | Divide e conquista com fusão |
| Quick Sort (médio caso)                                | Particionamento recursivo    |
| Heap Sort                                              | Ordenação com heaps          |
| Algoritmos eficientes de transformada rápida (FFT)     | Sinais e imagens             |
| Algoritmos de construção de árvore de sufixo eficiente | Strings e bioinformática     |

## 5. O(n²) Quadrática

> Tempo crescer rapidamente com o tamanho da entrada. Comum em algoritimos simples de ordenação ou comparação de pares. (geralmente utilizado para didática)

| Algoritmo                           | Descrição                              |
|:------------------------------------|:---------------------------------------|
| Bubble Sort                         | Compara pares adjacentes               |
| Insertion Sort                      | Insere elementos em ordem crescente    |
| Selection Sort                      | Escolhe o menor elemento repetidamente |
| Verificar duplicatas com dois loops | Compara cada par                       |
| Multiplicação de matrizes (simples) | Combinação de linhas/colunas           |

# Extras

## O(2^n) Exponencial

| Algoritmo                        | Descrição                         |
|:---------------------------------|:----------------------------------|
| Força bruta para subconjuntos    | Problemas de conjuntos ou mochila |
| Torre de Hanoi                   | Problema clássico recursivo       |
| Fibonacci recursivo puro         | Sem memoização                    |
| Branch and Bound em alguns casos | Árvores de decisão                |
| Verificações de permutação       | Gerar todas as ordens possíveis   |

## O(n!) Fatorial

| Algoritmo                                  | Descrição                            |
|:-------------------------------------------|:-------------------------------------|
| Geração de todas as permutações            | Combinatória                         |
| Força bruta para o Caxeiro Viajante (TSP)  | Todas as ordens de cidades           |
| Backtracking sem poda em sudoku            | Todas as possibilidades              |
| Resolução de quebra-cabeças por permutação | Exploração total                     |
| Ordenações por força bruta                 | Testa todas as permutações possíveis | 