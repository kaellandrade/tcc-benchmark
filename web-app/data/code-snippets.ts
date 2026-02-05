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
            System.out.println(n + " é par.");
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
        printf("%d é par.", n);
    }
    return 0;
}`,
        python: `# Verifica se n é par
# Complexidade: O(1)
def is_par(n):
    return n % 2 == 0

n = 1024
if is_par(n):
    print(f"{n} é par.")`
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