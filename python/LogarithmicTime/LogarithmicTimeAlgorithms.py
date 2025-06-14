def binarySearch(array: list[int], target: int):
    startIdx = 0
    endIdx = len(array) - 1

    while(startIdx <= endIdx):
        middleIdx = (startIdx + endIdx) // 2
        
        if(array[middleIdx] == target):
            # print(f'Elemento {target} encontrado no índice {middleIdx}')
            return
        elif(array[middleIdx] < target):
            startIdx = middleIdx + 1
        else:
            endIdx = middleIdx - 1

    # print(f'Elemento {target} não encontrado')
    return


def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # Troca
        heapify(arr, n, largest)  # Recursivamente aplica o heapify no filho afetado

def buildMaxHeap(arr):
    n = len(arr)
    # Começa do último nó não-folha até a raiz
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # print(f'Max Heap: {arr}')
    return


def fastExponentiation(base: int, exponent: int):
    result = 1

    while exponent > 0:
        if exponent % 2 == 1:
            result *= base
        base *= base
        exponent //= 2
    
    # print(f'Resultado: {result}')
    return


def countBits(n: int):
    count = 0
    
    while n:
        n &= n - 1  # Limpa o bit menos significativo que está em 1
        count += 1
    
    # print(f'Bits: {count}')
    return

