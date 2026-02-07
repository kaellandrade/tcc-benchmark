export const constantTimeSnippets = {
    arrayAccess: {
        java: `public class Main {
    public static void main(String[] args) {
        int[] numeros = {10, 20, 30, 40, 50};
        
        // Acesso direto ao índice 2
        // Complexidade: O(1)
        int x = numeros[2]; 
        
        System.out.println("Valor: " + x);
    }
}`,
        c: `#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    
    // Acesso direto ao índice 2
    // Complexidade: O(1)
    int x = numeros[2];
    
    printf("Valor: %d", x);
    return 0;
}`,
        python: `numeros = [10, 20, 30, 40, 50]

# Acesso direto ao índice 2
# Complexidade: O(1)
x = numeros[2]

print(f"Valor: {x}")`
    },

    checkParity: {
        java: `public class Main {
    // Verifica se n é par
    // Complexidade: O(1)
    public static boolean isPar(int n) {
        return n % 2 == 0;
    }

    public static void main(String[] args) {
        int n = 1024;
        if (isPar(n)) {
            System.out.println(n + " e par.");
        }
    }
}`,
        c: `#include <stdio.h>

// Verifica se n é par (retorna 1 se sim, 0 se não)
// Complexidade: O(1)
int isPar(int n) {
    return n % 2 == 0;
}

int main() {
    int n = 1024;
    if (isPar(n)) {
        printf("%d e par.", n);
    }
    return 0;
}`,
        python: `# Verifica se n é par
# Complexidade: O(1)
def is_par(n):
    return n % 2 == 0

n = 1024
if is_par(n):
    print(f"{n} e par.")`
    },

    stackOperations: {
        java: `import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> pilha = new Stack<>();
        
        // Push: Adiciona ao topo - O(1)
        pilha.push(10);
        pilha.push(20);
        
        // Pop: Remove do topo - O(1)
        int topo = pilha.pop();
        
        System.out.println("Removeu: " + topo);
    }
}`,
        c: `#include <stdio.h>
#define MAX 10

// Estrutura simples de Pilha
int stack[MAX];
int top = -1;

void push(int val) {
    if (top < MAX - 1) {
        stack[++top] = val; // O(1)
    }
}

int pop() {
    if (top >= 0) {
        return stack[top--]; // O(1)
    }
    return -1;
}

int main() {
    push(10);
    push(20);
    printf("Removeu: %d", pop());
    return 0;
}`,
        python: `# Em Python, listas funcionam como pilhas
pilha = []

# Push: Adiciona ao final - O(1)
pilha.append(10)
pilha.append(20)

# Pop: Remove do final - O(1)
topo = pilha.pop()

print(f"Removeu: {topo}")`
    }
};

export const logarithmicTimeSnippets = {
    binarySearch: {
        java: `public class Main {
    // Busca Binária
    // Complexidade: O(log n)
    public static int binarySearch(int[] arr, int alvo) {
        int inicio = 0;
        int fim = arr.length - 1;

        while (inicio <= fim) {
            // Calcula o meio evitando overflow
            int meio = inicio + (fim - inicio) / 2;

            // Se achou o elemento
            if (arr[meio] == alvo)
                return meio;

            // Se o alvo é maior, ignora a metade esquerda
            if (arr[meio] < alvo)
                inicio = meio + 1;
            // Se o alvo é menor, ignora a metade direita
            else
                fim = meio - 1;
        }
        return -1; // Não encontrado
    }

    public static void main(String[] args) {
        // O array DEVE estar ordenado para funcionar
        int[] numeros = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int alvo = 23;
        
        int resultado = binarySearch(numeros, alvo);
        
        if (resultado != -1)
            System.out.println("Elemento encontrado no indice: " + resultado);
        else
            System.out.println("Elemento nao encontrado.");
    }
}`,
        c: `#include <stdio.h>

// Busca Binária
// Complexidade: O(log n)
int binarySearch(int arr[], int tamanho, int alvo) {
    int inicio = 0;
    int fim = tamanho - 1;

    while (inicio <= fim) {
        int meio = inicio + (fim - inicio) / 2;

        // Verifica se o alvo está no meio
        if (arr[meio] == alvo)
            return meio;

        // Se alvo é maior, ignora metade esquerda
        if (arr[meio] < alvo)
            inicio = meio + 1;
        // Se alvo é menor, ignora metade direita
        else
            fim = meio - 1;
    }
    return -1; // Não encontrado
}

int main() {
    int numeros[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(numeros) / sizeof(numeros[0]);
    int alvo = 23;
    
    int resultado = binarySearch(numeros, n, alvo);
    
    if (resultado != -1)
        printf("Elemento encontrado no indice: %d", resultado);
    else
        printf("Elemento nao encontrado.");
        
    return 0;
}`,
        python: `# Busca Binária
# Complexidade: O(log n)
def binary_search(arr, alvo):
    inicio = 0
    fim = len(arr) - 1

    while inicio <= fim:
        meio = (inicio + fim) // 2

        # Verifica se o alvo está no meio
        if arr[meio] == alvo:
            return meio

        # Se alvo é maior, ignora metade esquerda
        elif arr[meio] < alvo:
            inicio = meio + 1
        # Se alvo é menor, ignora metade direita
        else:
            fim = meio - 1

    return -1

numeros = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
alvo = 23

resultado = binary_search(numeros, alvo)

if resultado != -1:
    print(f"Elemento encontrado no indice: {resultado}")
else:
    print("Elemento nao encontrado.")`
    },

    fastPower: {
        java: `public class Main {
    // Potenciação Rápida (Exponenciação por Quadrados)
    // Calcula x^n em O(log n) em vez de O(n)
    public static long fastPower(long base, long exp) {
        long res = 1;
        while (exp > 0) {
            // Se expoente é ímpar, multiplica o resultado pela base atual
            if ((exp % 2) == 1) 
                res = res * base;
            
            // Base é elevada ao quadrado a cada passo
            base = base * base;
            
            // Divide o expoente pela metade
            exp = exp / 2;
        }
        return res;
    }

    public static void main(String[] args) {
        long base = 2;
        long expoente = 10; // 2^10 = 1024
        
        System.out.println("Resultado: " + fastPower(base, expoente));
    }
}`,
        c: `#include <stdio.h>

// Potenciação Rápida
// Complexidade: O(log n)
long long fastPower(long long base, long long exp) {
    long long res = 1;
    while (exp > 0) {
        // Se ímpar, multiplica no resultado
        if (exp % 2 == 1) 
            res = res * base;
        
        // Base dobra de potência (x^2, x^4, x^8...)
        base = base * base;
        
        // Divide expoente por 2
        exp = exp / 2;
    }
    return res;
}

int main() {
    long long base = 2;
    long long expoente = 10;
    
    printf("Resultado: %d", fastPower(base, expoente));
    return 0;
}`,
        python: `# Potenciação Rápida
# Complexidade: O(log n)
def fast_power(base, exp):
    res = 1
    while exp > 0:
        # Se o bit menos significativo for 1 (ímpar)
        if exp % 2 == 1:
            res = res * base
        
        # Base ao quadrado
        base = base * base
        
        # Divide expoente por 2 (shift right)
        exp = exp // 2
    
    return res

base = 2
expoente = 10

print(f"Resultado: {fast_power(base, expoente)}")`
    }
};

export const linearTimeSnippets = {
    linearSearch: {
        java: `public class Main {
    // Busca Linear
    // Complexidade: O(n) - No pior caso, percorre tudo.
    public static int buscaLinear(int[] arr, int alvo) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == alvo) {
                return i; // Encontrou
            }
        }
        return -1; // Não encontrou
    }

    public static void main(String[] args) {
        int[] numeros = {10, 50, 30, 70, 80, 20};
        int alvo = 30;
        
        int idx = buscaLinear(numeros, alvo);
        System.out.println("Indice encontrado: " + idx);
    }
}`,
        c: `#include <stdio.h>

// Busca Linear
// Complexidade: O(n)
int buscaLinear(int arr[], int tamanho, int alvo) {
    for (int i = 0; i < tamanho; i++) {
        if (arr[i] == alvo) {
            return i; // Encontrou
        }
    }
    return -1; // Não encontrou
}

int main() {
    int numeros[] = {10, 50, 30, 70, 80, 20};
    int n = sizeof(numeros) / sizeof(numeros[0]);
    int alvo = 30;
    
    int idx = buscaLinear(numeros, n, alvo);
    printf("Indice encontrado: %d", idx);
    return 0;
}`,
        python: `# Busca Linear
# Complexidade: O(n)
def busca_linear(lista, alvo):
    for i in range(len(lista)):
        if lista[i] == alvo:
            return i
    return -1

numeros = [10, 50, 30, 70, 80, 20]
alvo = 30

idx = busca_linear(numeros, alvo)
print(f"Indice encontrado: {idx}")`
    },

    arraySum: {
        java: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int soma = 0;
        
        // Percorre cada elemento uma vez
        // Complexidade: O(n)
        for (int num : arr) {
            soma += num;
        }
        
        System.out.println("Soma total: " + soma);
    }
}`,
        c: `#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int soma = 0;
    
    // Complexidade: O(n)
    for (int i = 0; i < n; i++) {
        soma += arr[i];
    }
    
    printf("Soma total: %d", soma);
    return 0;
}`,
        python: `arr = [1, 2, 3, 4, 5]
soma = 0

# Percorre a lista acumulando
# Complexidade: O(n)
for num in arr:
    soma += num

print(f"Soma total: {soma}")`
    },

    palindromeCheck: {
        java: `public class Main {
    // Verifica Palíndromo (Dois Ponteiros)
    // Complexidade: O(n) - Percorre a string até o meio
    public static boolean isPalindrome(String str) {
        int inicio = 0;
        int fim = str.length() - 1;
        
        while (inicio < fim) {
            if (str.charAt(inicio) != str.charAt(fim)) {
                return false;
            }
            inicio++;
            fim--;
        }
        return true;
    }

    public static void main(String[] args) {
        String palavra = "arara";
        System.out.println(palavra + " e palindromo? " + isPalindrome(palavra));
    }
}`,
        c: `#include <stdio.h>
#include <string.h>

// Verifica Palíndromo
// Complexidade: O(n)
int isPalindrome(char str[]) {
    int inicio = 0;
    int fim = strlen(str) - 1;
    
    while (inicio < fim) {
        if (str[inicio] != str[fim]) {
            return 0; // Falso
        }
        inicio++;
        fim--;
    }
    return 1; // Verdadeiro
}

int main() {
    char palavra[] = "arara";
    if (isPalindrome(palavra))
        printf("%s e palindromo.", palavra);
    else
        printf("%s nao e palindromo.", palavra);
        
    return 0;
}`,
        python: `# Verifica Palíndromo (Dois Ponteiros)
# Complexidade: O(n)
def is_palindrome(s):
    inicio = 0
    fim = len(s) - 1
    
    while inicio < fim:
        if s[inicio] != s[fim]:
            return False
        inicio += 1
        fim -= 1
    return True

palavra = "arara"
print(f"{palavra} e palindromo? {is_palindrome(palavra)}")`
    }
};

export const quasilinearTimeSnippets = {
    mergeSort: {
        java: `import java.util.Arrays;

public class Main {
    // Merge Sort
    // Complexidade: O(n log n) sempre
    public static void mergeSort(int[] arr, int n) {
        if (n < 2) return; // Caso base
        
        int meio = n / 2;
        int[] esquerda = new int[meio];
        int[] direita = new int[n - meio];

        // Divide o array em dois
        for (int i = 0; i < meio; i++) 
            esquerda[i] = arr[i];
        for (int i = meio; i < n; i++) 
            direita[i - meio] = arr[i];

        // Recursão: ordena as metades
        mergeSort(esquerda, meio);
        mergeSort(direita, n - meio);

        // Funde (Merge) as partes ordenadas
        merge(arr, esquerda, direita, meio, n - meio);
    }

    public static void merge(int[] arr, int[] esq, int[] dir, int left, int right) {
        int i = 0, j = 0, k = 0;
        
        while (i < left && j < right) {
            if (esq[i] <= dir[j]) 
                arr[k++] = esq[i++];
            else 
                arr[k++] = dir[j++];
        }
        while (i < left) arr[k++] = esq[i++];
        while (j < right) arr[k++] = dir[j++];
    }

    public static void main(String[] args) {
        int[] numeros = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(numeros, numeros.length);
        System.out.println(Arrays.toString(numeros));
    }
}`,
        c: `#include <stdio.h>

// Função auxiliar para fundir dois subarrays
void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    // Arrays temporários
    int L[n1], R[n2];

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Merge Sort: O(n log n)
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;

        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int arr_size = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, arr_size - 1);

    printf("Array Ordenado: ");
    for (int i = 0; i < arr_size; i++) printf("%d ", arr[i]);
    return 0;
}`,
        python: `# Merge Sort
# Complexidade: O(n log n)
def merge_sort(arr):
    if len(arr) > 1:
        meio = len(arr) // 2
        esquerda = arr[:meio]
        direita = arr[meio:]

        # Recursão
        merge_sort(esquerda)
        merge_sort(direita)

        # Merge (Fusão)
        i = j = k = 0

        while i < len(esquerda) and j < len(direita):
            if esquerda[i] < direita[j]:
                arr[k] = esquerda[i]
                i += 1
            else:
                arr[k] = direita[j]
                j += 1
            k += 1

        while i < len(esquerda):
            arr[k] = esquerda[i]
            i += 1
            k += 1

        while j < len(direita):
            arr[k] = direita[j]
            j += 1
            k += 1

numeros = [38, 27, 43, 3, 9, 82, 10]
merge_sort(numeros)
print(f"Ordenado: {numeros}")`
    },

    quickSort: {
        java: `import java.util.Arrays;

public class Main {
    // Partition: Coloca o pivô na posição certa
    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Troca arr[i] e arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // Troca arr[i+1] e arr[high] (pivô)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    // Quick Sort: O(n log n) no caso médio
    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,
        c: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

// Partition: Encontra a posição do pivô
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// Quick Sort: O(n log n) médio
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    quickSort(arr, 0, n - 1);
    
    printf("Ordenado: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        python: `# Quick Sort
# Complexidade: O(n log n) médio
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i] # Troca
            
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

numeros = [10, 7, 8, 9, 1, 5]
quick_sort(numeros, 0, len(numeros) - 1)
print(f"Ordenado: {numeros}")`
    }
};

export const quadraticTimeSnippets = {
    bubbleSort: {
        java: `import java.util.Arrays;

public class Main {
    // Bubble Sort
    // Complexidade: O(n²) - Dois loops aninhados
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            // O loop interno diminui a cada iteração
            for (int j = 0; j < n - i - 1; j++) {
                // Troca se o elemento atual for maior que o próximo
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] numeros = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(numeros);
        System.out.println("Ordenado: " + Arrays.toString(numeros));
    }
}`,
        c: `#include <stdio.h>

void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

// Bubble Sort: O(n²)
void bubbleSort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++) {
        // Last i elements are already in place
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    bubbleSort(arr, n);
    
    printf("Ordenado: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        python: `# Bubble Sort
# Complexidade: O(n²)
def bubble_sort(arr):
    n = len(arr)
    # Percorre todos os elementos do array
    for i in range(n):
        # Os últimos i elementos já estão no lugar
        for j in range(0, n - i - 1):
            # Troca se o elemento for maior que o próximo
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

numeros = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(numeros)
print(f"Ordenado: {numeros}")`
    },

    insertionSort: {
        java: `import java.util.Arrays;

public class Main {
    // Insertion Sort
    // Complexidade: O(n²) - Pior caso (array invertido)
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;

            // Move os elementos maiores que a key para frente
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        insertionSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}`,
        c: `#include <stdio.h>

// Insertion Sort: O(n²)
void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        // Move elementos maiores que a key uma posição à frente
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    insertionSort(arr, n);
    
    printf("Ordenado: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}`,
        python: `# Insertion Sort
# Complexidade: O(n²)
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move os elementos maiores que a key para a direita
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print(f"Ordenado: {arr}")`
    },

    matrixMultiplication: {
        java: `public class Main {
    public static void main(String[] args) {
        // Matrizes 2x2 para exemplo simples
        int[][] A = { {1, 2}, {3, 4} };
        int[][] B = { {5, 6}, {7, 8} };
        int[][] C = new int[2][2]; // Resultado

        // Multiplicação de Matrizes (Ingênua)
        // Complexidade: O(n³) tecnicamente, mas ilustra múltiplos loops
        for (int i = 0; i < 2; i++) {       // Linha de A
            for (int j = 0; j < 2; j++) {   // Coluna de B
                for (int k = 0; k < 2; k++) { // Produto escalar
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }

        System.out.println("Resultado C[0][0]: " + C[0][0]); // 1*5 + 2*7 = 19
        System.out.println("Resultado C[0][1]: " + C[0][1]); // 1*6 + 2*8 = 22
    }
}`,
        c: `#include <stdio.h>

int main() {
    int A[2][2] = { {1, 2}, {3, 4} };
    int B[2][2] = { {5, 6}, {7, 8} };
    int C[2][2] = {0}; // Inicializa com zeros

    // 3 Loops aninhados
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("Matriz Resultante:\\n");
    printf("%d %d\\n", C[0][0], C[0][1]);
    printf("%d %d\\n", C[1][0], C[1][1]);
    return 0;
}`,
        python: `# Multiplicação de Matrizes
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
# Inicializa matriz resultado 2x2 com zeros
C = [[0, 0], [0, 0]]

# Loop triplo aninhado
for i in range(len(A)):
    for j in range(len(B[0])):
        for k in range(len(B)):
            C[i][j] += A[i][k] * B[k][j]

for row in C:
    print(row)`
    }
};