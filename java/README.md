## Executar benchmark

1. Vá para `/benchmark-algoritmos-tcc`;
2. Compile o projeto com maven `mvn clean install`;
3. Execute o benchmark especificando os params de metricas e saida no JSON. Ex:
` java -jar target/benchmarks.jar -prof gc -prof stack -rf json -rff results.json`;
4. Isso irá gerar um arquivo `benchmark-algoritmos-tcc/results.json`;
5. Utilize a platagorma https://jmh.morethan.io para analizar o `results.json` .


## TODOs JAVA

## 1. O(1) — Tempo Constante

- [X] Acesso a elemento de um array `arr[i]`
- [X] Inserção/remover do final de uma pilha
- [X] Verificar se número é par `n % 2 == 0` 
- [X] Trocar dois valores de variáveis
- [X] Buscar em `dict` ou `hash map`

## 2. O(log n) — Logarítimica

- [X] Busca Binária	
- [x] Heapify em uma heap binária
- [X] Contagem de bits em um número com técnicas de bitwise
- [X] Encontrar potência usando exponenciação rápida
- [ ] Inserção/remoção em árvore balanceada (AVL, Red-Black)	

## 3. O(n) — Linear

- [X] Busca Linear
- [x] Soma de elementos de um array
- [X] Verificação de palíndromo
- [ ] Contar frequência de elementos
- [ ] Remoção de duplicatas com set