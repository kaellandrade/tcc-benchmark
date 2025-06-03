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


