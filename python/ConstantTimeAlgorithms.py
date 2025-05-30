def accessArray(array: list[int], idx: int):
    item = array[idx]
    print(f'Item: {item}')


def pushElementToEndOfStack(stack: list[int], element: int):
    print(f"Stack before: {stack}")
    stack.append(element)
    print(f"Stack after: {stack}")


def popElementFromEndOfStack(stack: list[int]):
    print(f"Stack before: {stack}")
    if(len(stack) > 0): stack.pop()
    print(f"Stack before: {stack}")


def isEven(n: int):
    isEven = n % 2 == 0
    if(isEven): print('Is Even')
    else: print('Is Odd')
    return isEven


def swapValueXY(x: int, y: int):
    print(f"Before: x = {x}, y = {y}")
    z = x
    x = y
    y = z
    print(f"After: x = {x}, y = {y}")


def searchInDict(dictionary: dict, key: str) -> any:
    if key in dictionary:
        value = dictionary[key]
        print(f'Value: {value}')