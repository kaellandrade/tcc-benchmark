from .ConstantTimeAlgorithms import *
import Utils


def runCheck():
    print("\nRunning base algorithms...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    accessArray(array, 5)
    pushElementToEndOfStack(array, 99)
    popElementFromEndOfStack(array)
    isEven(2)
    isEven(3)
    swapValueXY(1, 2)
    searchInDict(dictionary, 'c')

    print('\nEnd of the test\n')


def runBenchmark(iterationCount: int):
    print(f"\nRunning benchmark with N = {iterationCount}...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    Utils.repeatAlgorithm(
        iterationCount, 
        accessArray, 
        array, 
        6
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        pushElementToEndOfStack, 
        array, 
        777
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        popElementFromEndOfStack, 
        array
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        isEven, 
        4
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        swapValueXY, 
        1, 
        2
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        searchInDict, 
        dictionary, 
        'c'
    )
    
    print('\nEnd of the test\n')
