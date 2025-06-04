#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define STACK_SIZE 100
#define HASHMAP_SIZE 100
#define ARRAY_SIZE 100

int hashmap[HASHMAP_SIZE] = {0};
int stack[STACK_SIZE];
int top = -1;

void put_on_hash_map(int key, int value) {
    if (key >= 0 && key < HASHMAP_SIZE) {
        hashmap[key] = value;
    }
}

int get_from_hash_map(int key) {
    if (key >= 0 && key < HASHMAP_SIZE) {
        return hashmap[key];
    }
    return -1;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int is_even(int num) {
    return num % 2 == 0;
}

void push_to_stack(int value) {
    if (top < STACK_SIZE - 1) {
        stack[++top] = value;
    }
}

void array_access(int arr[], int index) {
    volatile int x = arr[index]; // volatile para evitar otimização
}

double benchmark_put_on_hash_map(int iterations) {
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        put_on_hash_map(i % HASHMAP_SIZE, i);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_get_from_hash_map(int iterations) {
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        get_from_hash_map(i % HASHMAP_SIZE);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_swap(int iterations) {
    int x = 0, y = 1;
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        swap(&x, &y);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_is_even(int iterations) {
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        is_even(i);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_push_to_stack(int iterations) {
    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        push_to_stack(i);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_array_access(int iterations) {
    int arr[HASHMAP_SIZE];
    for (int i = 0; i < HASHMAP_SIZE; i++) arr[i] = i;

    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        array_access(arr, i % HASHMAP_SIZE);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Uso: %s <numero_de_iteracoes>\n", argv[0]);
        return 1;
    }

    int iterations = atoi(argv[1]);
    if (iterations <= 0) {
        printf("Número de iterações inválido.\n");
        return 1;
    }

    double time_put = benchmark_put_on_hash_map(iterations);
    double time_get = benchmark_get_from_hash_map(iterations);
    double time_swap = benchmark_swap(iterations);
    double time_even = benchmark_is_even(iterations);
    double time_push = benchmark_push_to_stack(iterations);
    double time_array = benchmark_array_access(iterations);

    printf("Benchmark com %d iterações:\n", iterations);
    printf("Buscar em hash map:                            %f segundos\n", time_get);
    printf("Trocar dois valores de variáveis:              %f segundos\n", time_swap);
    printf("Verificar se número é par:                     %f segundos\n", time_even);
    printf("Inserção em pilha:                             %f segundos\n", time_push);
    printf("Acesso a elemento de um array:                 %f segundos\n", time_array);

    return 0;
}
