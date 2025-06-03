import ConstantTimeAlgorithms
import Utils


def runCheck():
    print("\nRunning base algorithms...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    ConstantTimeAlgorithms.accessArray(array, 5)
    ConstantTimeAlgorithms.pushElementToEndOfStack(array, 99)
    ConstantTimeAlgorithms.popElementFromEndOfStack(array)
    ConstantTimeAlgorithms.isEven(2)
    ConstantTimeAlgorithms.isEven(3)
    ConstantTimeAlgorithms.swapValueXY(1, 2)
    ConstantTimeAlgorithms.searchInDict(dictionary, 'c')

    print('\nEnd of the test\n')


def runBenchmark(iterationCount: int):
    print(f"\nRunning benchmark with N = {iterationCount}...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.accessArray, 
        array, 
        6
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.pushElementToEndOfStack, 
        array, 
        777
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.popElementFromEndOfStack, 
        array
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.isEven, 
        4
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.swapValueXY, 
        1, 
        2
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.searchInDict, 
        dictionary, 
        'c'
    )
    
    print('\nEnd of the test\n')
