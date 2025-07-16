def linearSearch(array: list[int], target: int):
    for element in array:
        if element == target:
            # print(f"O elemento {target} existe na lista passada.")
            return
    
    # print(f"O elemento {target} não existe na lista passada.")
    return


def sumArray(array: list[int]):
    total = 0
    for element in array:
        total += element

    # print(f"Total: {total}")
    return


def isPalindrome(text: str):
    size = len(text)
    for i in range(size // 2):
        if text[i] != text[size - 1 - i]:
            # print("A palavra não é um palíndromo")
            return
    
    # print("A palavra é um palíndromo")
    return


def countFrequency(array: list[int]):
    frequency = {}
    for element in array:
        frequency[element] = frequency.get(element, 0) + 1
    
    # print(f"Frequencia: {frequency}")
    return


def removeDuplicates(array: list[int]):
    seen = set()
    result = []
    for num in array:
        if num not in seen:
            seen.add(num)
            result.append(num)

    # print(f"Lista sem duplicatas: {result}")
    return




# def removeDuplicates(array: list[int]):
#     return list(set(array))