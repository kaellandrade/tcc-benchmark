#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <math.h>
#include <stdbool.h>

#define MAX_SIZE 10000
#define HASHMAP_SIZE 1000
#define STACK_SIZE 1000

// Global variables
int hashmap[HASHMAP_SIZE] = {0};
int stack[STACK_SIZE];
int top = -1;

// ============================================================================
// O(1) - CONSTANT TIME ALGORITHMS
// ============================================================================

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
    volatile int x = arr[index];
}

// ============================================================================
// O(log n) - LOGARITHMIC TIME ALGORITHMS
// ============================================================================

// Binary Search
int binary_search(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// AVL Tree Node
typedef struct AVLNode {
    int data;
    struct AVLNode* left;
    struct AVLNode* right;
    int height;
} AVLNode;

int height(AVLNode* node) {
    return node ? node->height : 0;
}

int balance_factor(AVLNode* node) {
    return node ? height(node->left) - height(node->right) : 0;
}

AVLNode* rotate_right(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = 1 + fmax(height(y->left), height(y->right));
    x->height = 1 + fmax(height(x->left), height(x->right));
    return x;
}

AVLNode* rotate_left(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = 1 + fmax(height(x->left), height(x->right));
    y->height = 1 + fmax(height(y->left), height(y->right));
    return y;
}

AVLNode* create_node(int data) {
    AVLNode* node = (AVLNode*)malloc(sizeof(AVLNode));
    node->data = data;
    node->left = node->right = NULL;
    node->height = 1;
    return node;
}

AVLNode* avl_insert(AVLNode* node, int data) {
    if (!node) return create_node(data);

    if (data < node->data)
        node->left = avl_insert(node->left, data);
    else if (data > node->data)
        node->right = avl_insert(node->right, data);
    else
        return node;

    node->height = 1 + fmax(height(node->left), height(node->right));
    int balance = balance_factor(node);

    if (balance > 1 && data < node->left->data)
        return rotate_right(node);
    if (balance < -1 && data > node->right->data)
        return rotate_left(node);
    if (balance > 1 && data > node->left->data) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    if (balance < -1 && data < node->right->data) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }

    return node;
}

// Binary Heap operations
void heapify_down(int heap[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && heap[left] > heap[largest])
        largest = left;
    if (right < n && heap[right] > heap[largest])
        largest = right;

    if (largest != i) {
        swap(&heap[i], &heap[largest]);
        heapify_down(heap, n, largest);
    }
}

// Fast Exponentiation
long long fast_power(long long base, long long exp) {
    long long result = 1;
    while (exp > 0) {
        if (exp % 2 == 1)
            result *= base;
        base *= base;
        exp /= 2;
    }
    return result;
}

// Count bits using bitwise operations
int count_bits(int n) {
    int count = 0;
    while (n) {
        count++;
        n &= (n - 1); // Remove rightmost set bit
    }
    return count;
}

// ============================================================================
// O(n) - LINEAR TIME ALGORITHMS
// ============================================================================

// Linear Search
int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Sum of array elements
long long array_sum(int arr[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return sum;
}

// Simple palindrome check
bool is_palindrome(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

// Count frequency of elements
void count_frequency(int arr[], int n, int freq[]) {
    for (int i = 0; i < MAX_SIZE; i++) freq[i] = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] >= 0 && arr[i] < MAX_SIZE) {
            freq[arr[i]]++;
        }
    }
}

// Remove duplicates (simple approach)
int remove_duplicates(int arr[], int n) {
    if (n == 0) return 0;
    int unique_count = 1;
    for (int i = 1; i < n; i++) {
        bool is_duplicate = false;
        for (int j = 0; j < unique_count; j++) {
            if (arr[i] == arr[j]) {
                is_duplicate = true;
                break;
            }
        }
        if (!is_duplicate) {
            arr[unique_count++] = arr[i];
        }
    }
    return unique_count;
}

// ============================================================================
// O(n log n) - QUASI-LINEAR TIME ALGORITHMS
// ============================================================================

// Merge Sort
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

// Quick Sort
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

// Heap Sort
void heap_sort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify_down(arr, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify_down(arr, i, 0);
    }
}

// ============================================================================
// O(n²) - QUADRATIC TIME ALGORITHMS
// ============================================================================

// Bubble Sort
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

// Insertion Sort
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Selection Sort
void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(&arr[i], &arr[min_idx]);
    }
}

// Check duplicates with nested loops
bool has_duplicates_nested(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}

// Simple matrix multiplication
void matrix_multiply(int A[][100], int B[][100], int C[][100], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = 0;
            for (int k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

// ============================================================================
// BENCHMARK FUNCTIONS
// ============================================================================

double benchmark_constant_time(int iterations) {
    int arr[1000];
    for (int i = 0; i < 1000; i++) arr[i] = i;

    clock_t start = clock();
    for (int i = 0; i < iterations; i++) {
        array_access(arr, i % 1000);
        put_on_hash_map(i % HASHMAP_SIZE, i);
        get_from_hash_map(i % HASHMAP_SIZE);
    }
    clock_t end = clock();
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_logarithmic_time(int size) {
    int* arr = (int*)malloc(size * sizeof(int));
    for (int i = 0; i < size; i++) arr[i] = i;

    clock_t start = clock();
    for (int i = 0; i < 1000; i++) {
        binary_search(arr, size, i % size);
        fast_power(2, i % 20);
        count_bits(i);
    }
    clock_t end = clock();

    free(arr);
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_linear_time(int size) {
    int* arr = (int*)malloc(size * sizeof(int));
    int* freq = (int*)malloc(MAX_SIZE * sizeof(int));
    for (int i = 0; i < size; i++) arr[i] = rand() % 1000;

    clock_t start = clock();
    linear_search(arr, size, arr[size/2]);
    array_sum(arr, size);
    count_frequency(arr, size, freq);
    clock_t end = clock();

    free(arr);
    free(freq);
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_nlogn_time(int size) {
    int* arr1 = (int*)malloc(size * sizeof(int));
    int* arr2 = (int*)malloc(size * sizeof(int));
    int* arr3 = (int*)malloc(size * sizeof(int));

    for (int i = 0; i < size; i++) {
        arr1[i] = arr2[i] = arr3[i] = rand() % 1000;
    }

    clock_t start = clock();
    merge_sort(arr1, 0, size - 1);
    quick_sort(arr2, 0, size - 1);
    heap_sort(arr3, size);
    clock_t end = clock();

    free(arr1);
    free(arr2);
    free(arr3);
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

double benchmark_quadratic_time(int size) {
    int* arr1 = (int*)malloc(size * sizeof(int));
    int* arr2 = (int*)malloc(size * sizeof(int));
    int* arr3 = (int*)malloc(size * sizeof(int));

    for (int i = 0; i < size; i++) {
        arr1[i] = arr2[i] = arr3[i] = rand() % 1000;
    }

    clock_t start = clock();
    bubble_sort(arr1, size);
    insertion_sort(arr2, size);
    selection_sort(arr3, size);
    has_duplicates_nested(arr1, size);
    clock_t end = clock();

    free(arr1);
    free(arr2);
    free(arr3);
    return ((double)(end - start)) / CLOCKS_PER_SEC;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <test_mode>\n", argv[0]);
        printf("Test modes: constant, logarithmic, linear, nlogn, quadratic, all\n");
        return 1;
    }

    srand(time(NULL));
    char* mode = argv[1];

    if (strcmp(mode, "constant") == 0) {
        printf("O(1) - Constant Time Algorithms\n");
        printf("================================\n");
        for (int iter = 1000; iter <= 100000; iter *= 10) {
            double time = benchmark_constant_time(iter);
            printf("Iterations: %d, Time: %f seconds\n", iter, time);
        }
    }
    else if (strcmp(mode, "logarithmic") == 0) {
        printf("O(log n) - Logarithmic Time Algorithms\n");
        printf("======================================\n");
        for (int size = 100; size <= 10000; size *= 10) {
            double time = benchmark_logarithmic_time(size);
            printf("Size: %d, Time: %f seconds\n", size, time);
        }
    }
    else if (strcmp(mode, "linear") == 0) {
        printf("O(n) - Linear Time Algorithms\n");
        printf("=============================\n");
        for (int size = 100; size <= 10000; size *= 10) {
            double time = benchmark_linear_time(size);
            printf("Size: %d, Time: %f seconds\n", size, time);
        }
    }
    else if (strcmp(mode, "nlogn") == 0) {
        printf("O(n log n) - Quasi-linear Time Algorithms\n");
        printf("=========================================\n");
        for (int size = 100; size <= 1000; size *= 2) {
            double time = benchmark_nlogn_time(size);
            printf("Size: %d, Time: %f seconds\n", size, time);
        }
    }
    else if (strcmp(mode, "quadratic") == 0) {
        printf("O(n²) - Quadratic Time Algorithms\n");
        printf("=================================\n");
        for (int size = 10; size <= 100; size += 10) {
            double time = benchmark_quadratic_time(size);
            printf("Size: %d, Time: %f seconds\n", size, time);
        }
    }
    else if (strcmp(mode, "all") == 0) {
        printf("Complete Algorithm Complexity Analysis\n");
        printf("=====================================\n\n");

        printf("O(1) - Constant Time:\n");
        double const_time = benchmark_constant_time(10000);
        printf("Time: %f seconds\n\n", const_time);

        printf("O(log n) - Logarithmic Time:\n");
        double log_time = benchmark_logarithmic_time(1000);
        printf("Time: %f seconds\n\n", log_time);

        printf("O(n) - Linear Time:\n");
        double linear_time = benchmark_linear_time(1000);
        printf("Time: %f seconds\n\n", linear_time);

        printf("O(n log n) - Quasi-linear Time:\n");
        double nlogn_time = benchmark_nlogn_time(500);
        printf("Time: %f seconds\n\n", nlogn_time);

        printf("O(n²) - Quadratic Time:\n");
        double quad_time = benchmark_quadratic_time(50);
        printf("Time: %f seconds\n\n", quad_time);
    }
    else {
        printf("Invalid test mode. Use: constant, logarithmic, linear, nlogn, quadratic, or all\n");
        return 1;
    }

    return 0;
}
