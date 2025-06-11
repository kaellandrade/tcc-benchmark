def binarySearch(array: list[int], target: int):
    startIdx = 0
    endIdx = len(array) - 1

    while(startIdx <= endIdx):
        middleIdx = (startIdx + endIdx) // 2
        
        if(array[middleIdx] == target):
            print(f'Elemento {target} encontrado no índice {middleIdx}')
            return
        elif(array[middleIdx] < target):
            startIdx = middleIdx + 1
        else:
            endIdx = middleIdx - 1

    print(f'Elemento {target} não encontrado')


def heapify(arr, n, i):
    largest = i           # Inicializa o maior como a raiz
    left = 2 * i + 1       # Filho à esquerda
    right = 2 * i + 2      # Filho à direita

    # Verifica se o filho à esquerda é maior que o pai
    if left < n and arr[left] > arr[largest]:
        largest = left

    # Verifica se o filho à direita é maior que o maior até agora
    if right < n and arr[right] > arr[largest]:
        largest = right

    # Se o maior não for o pai
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # Troca
        heapify(arr, n, largest)  # Recursivamente aplica o heapify no filho afetado

def buildMaxHeap(arr):
    n = len(arr)
    # Começa do último nó não-folha até a raiz
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    print(f'Max Heap: {arr}')


def fastExponentiation(base: int, exponent: int):
    result = 1

    while exponent > 0:
        if exponent % 2 == 1:
            result *= base
        base *= base
        exponent //= 2
    
    print(f'Resultado: {result}')


def countBits(n: int):
    count = 0
    
    while n:
        n &= n - 1  # Limpa o bit menos significativo que está em 1
        count += 1
    
    print(f'Bits: {count}')

