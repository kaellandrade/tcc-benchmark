/*
 * Cross-platform Benchmark for Native C vs JSCPP (Browser IDE)
 * 
 * ITERATIONS is replaced at runtime with the actual value.
 * Compatible with both native C compilation and JSCPP interpreter.
 */

#include <stdio.h>

/* Configuration - ITERATIONS is replaced dynamically */
#define ITERATIONS __ITERATIONS__
#define HASHMAP_SIZE 100
#define STACK_SIZE 100
#define ARRAY_SIZE 1000

/* Global data structures */
int hashmap[HASHMAP_SIZE];
int stack[STACK_SIZE];
int stack_top;
int test_array[ARRAY_SIZE];

/* ============================================
 * O(1) - Constant Time Operations
 * ============================================ */

void hashmap_put(int key, int value) {
    int index = key % HASHMAP_SIZE;
    if (index < 0) index = -index;
    hashmap[index] = value;
}

int hashmap_get(int key) {
    int index = key % HASHMAP_SIZE;
    if (index < 0) index = -index;
    return hashmap[index];
}

void swap_values(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int is_even(int num) {
    return num % 2 == 0;
}

void stack_push(int value) {
    if (stack_top < STACK_SIZE - 1) {
        stack_top = stack_top + 1;
        stack[stack_top] = value;
    }
}

int stack_pop() {
    if (stack_top >= 0) {
        int value = stack[stack_top];
        stack_top = stack_top - 1;
        return value;
    }
    return -1;
}

int array_access(int index) {
    return test_array[index % ARRAY_SIZE];
}

/* ============================================
 * O(log n) - Logarithmic Time Operations  
 * ============================================ */

int binary_search(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

long power(int base, int exp) {
    long result = 1;
    long b = base;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = result * b;
        }
        b = b * b;
        exp = exp / 2;
    }
    return result;
}

int count_set_bits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count = count + 1;
    }
    return count;
}

/* ============================================
 * O(n) - Linear Time Operations
 * ============================================ */

int linear_search(int arr[], int size, int target) {
    int i;
    for (i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

long sum_array(int arr[], int size) {
    long sum = 0;
    int i;
    for (i = 0; i < size; i++) {
        sum = sum + arr[i];
    }
    return sum;
}

int find_max(int arr[], int size) {
    int max = arr[0];
    int i;
    for (i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

void reverse_array(int arr[], int size) {
    int i = 0;
    int j = size - 1;
    while (i < j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i = i + 1;
        j = j - 1;
    }
}

/* ============================================
 * O(n log n) - Linearithmic Time Operations
 * ============================================ */

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[500];
    int R[500];
    int i, j, k;
    
    for (i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    i = 0;
    j = 0;
    k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i = i + 1;
        } else {
            arr[k] = R[j];
            j = j + 1;
        }
        k = k + 1;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i = i + 1;
        k = k + 1;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j = j + 1;
        k = k + 1;
    }
}

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    int j;
    
    for (j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i = i + 1;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

/* ============================================
 * O(n^2) - Quadratic Time Operations
 * ============================================ */

void bubble_sort(int arr[], int size) {
    int i, j;
    for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

/* ============================================
 * Helper Functions
 * ============================================ */

void init_array() {
    int i;
    for (i = 0; i < ARRAY_SIZE; i++) {
        test_array[i] = i;
    }
}

void init_reverse_array(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        arr[i] = size - i;
    }
}

/* ============================================
 * Benchmark Runner
 * ============================================ */

int main() {
    int i;
    int result;
    long lresult;
    int x, y;
    int sort_array[100];
    int iterations = ITERATIONS;
    int iter_div_10 = ITERATIONS / 10;
    int iter_div_100 = ITERATIONS / 100;
    int iter_div_1000 = ITERATIONS / 1000;
    
    /* Ensure minimum iterations for scaled tests */
    if (iter_div_10 < 1) iter_div_10 = 1;
    if (iter_div_100 < 1) iter_div_100 = 1;
    if (iter_div_1000 < 1) iter_div_1000 = 1;
    
    /* Initialize data */
    init_array();
    stack_top = -1;
    
    printf("BENCHMARK_START\n");
    printf("ITERATIONS=%d\n", iterations);
    
    /* --- O(1) Benchmarks --- */
    printf("SECTION=O(1)\n");
    
    printf("TEST=hashmap_put:");
    for (i = 0; i < iterations; i++) {
        hashmap_put(i, i * 2);
    }
    printf("DONE\n");
    
    printf("TEST=hashmap_get:");
    for (i = 0; i < iterations; i++) {
        result = hashmap_get(i);
    }
    printf("DONE\n");
    
    printf("TEST=swap:");
    x = 1;
    y = 2;
    for (i = 0; i < iterations; i++) {
        swap_values(&x, &y);
    }
    printf("DONE\n");
    
    printf("TEST=is_even:");
    for (i = 0; i < iterations; i++) {
        result = is_even(i);
    }
    printf("DONE\n");
    
    printf("TEST=stack_ops:");
    for (i = 0; i < iterations; i++) {
        stack_top = -1;
        stack_push(i);
        result = stack_pop();
    }
    printf("DONE\n");
    
    printf("TEST=array_access:");
    for (i = 0; i < iterations; i++) {
        result = array_access(i);
    }
    printf("DONE\n");
    
    /* --- O(log n) Benchmarks --- */
    printf("SECTION=O(log n)\n");
    
    printf("TEST=binary_search:");
    for (i = 0; i < iterations; i++) {
        result = binary_search(test_array, ARRAY_SIZE, i % ARRAY_SIZE);
    }
    printf("DONE\n");
    
    printf("TEST=power:");
    for (i = 0; i < iterations; i++) {
        lresult = power(2, i % 15);
    }
    printf("DONE\n");
    
    printf("TEST=count_bits:");
    for (i = 0; i < iterations; i++) {
        result = count_set_bits(i);
    }
    printf("DONE\n");
    
    /* --- O(n) Benchmarks --- */
    printf("SECTION=O(n)\n");
    
    printf("TEST=linear_search:");
    for (i = 0; i < iter_div_10; i++) {
        result = linear_search(test_array, ARRAY_SIZE, i % ARRAY_SIZE);
    }
    printf("DONE\n");
    
    printf("TEST=sum_array:");
    for (i = 0; i < iter_div_10; i++) {
        lresult = sum_array(test_array, ARRAY_SIZE);
    }
    printf("DONE\n");
    
    printf("TEST=find_max:");
    for (i = 0; i < iter_div_10; i++) {
        result = find_max(test_array, ARRAY_SIZE);
    }
    printf("DONE\n");
    
    printf("TEST=reverse_array:");
    for (i = 0; i < iter_div_10; i++) {
        reverse_array(test_array, ARRAY_SIZE);
    }
    printf("DONE\n");
    
    /* --- O(n log n) Benchmarks --- */
    printf("SECTION=O(n log n)\n");
    
    printf("TEST=merge_sort:");
    for (i = 0; i < iter_div_100; i++) {
        init_reverse_array(sort_array, 100);
        merge_sort(sort_array, 0, 99);
    }
    printf("DONE\n");
    
    printf("TEST=quick_sort:");
    for (i = 0; i < iter_div_100; i++) {
        init_reverse_array(sort_array, 100);
        quick_sort(sort_array, 0, 99);
    }
    printf("DONE\n");
    
    /* --- O(n^2) Benchmarks --- */
    printf("SECTION=O(n^2)\n");
    
    printf("TEST=bubble_sort:");
    for (i = 0; i < iter_div_1000; i++) {
        init_reverse_array(sort_array, 100);
        bubble_sort(sort_array, 100);
    }
    printf("DONE\n");
    
    printf("BENCHMARK_END\n");
    
    return 0;
}
