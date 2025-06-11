from .LogarithmicTimeAlgorithms import *
import Utils


def runCheck():
    print("\nRunning base algorithms...\n")

    array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    # binarySearch(array, 7)

    arr = [4, 10, 3, 5, 1]
    buildMaxHeap(arr)
    fastExponentiation(2, 5)
    countBits(3)

    print('\nEnd of the test\n')


def runBenchmark(iterationCount: int):
    print(f"\nRunning benchmark with N = {iterationCount}...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    dictionary = {'a': 'aaa', 'b': 'bbb', 'c': 'ccc', 'd': 'ddd', 'e': 'eee'}

    Utils.repeatAlgorithm(
        iterationCount, 
        binarySearch, 
        array, 
        7
    )

    print('\nEnd of the test\n')


