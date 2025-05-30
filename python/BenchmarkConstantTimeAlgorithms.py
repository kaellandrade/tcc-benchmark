import ConstantTimeAlgorithms


def repeatAlgorithm(count, algorithm, *args):
    for i in range(count):
        algorithm(*args)


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

    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.accessArray, 
        array, 
        6
    )
    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.pushElementToEndOfStack, 
        array, 
        777
    )
    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.popElementFromEndOfStack, 
        array
    )
    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.isEven, 
        4
    )
    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.swapValueXY, 
        1, 
        2
    )
    repeatAlgorithm(
        iterationCount, 
        ConstantTimeAlgorithms.searchInDict, 
        dictionary, 
        'c'
    )
    
    print('\nEnd of the test\n')
