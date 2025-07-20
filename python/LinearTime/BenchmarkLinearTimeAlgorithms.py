from .LinearTimeAlgorithms import *
import Utils


def runCheck():
    print("\nRunning base algorithms...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 9]

    linearSearch(array, 3)

    sumArray(array)

    isPalindrome("abcdeedcba")

    countFrequency(array)

    removeDuplicates(array)
    
    print('\nEnd of the test\n')


def runBenchmark(iterationCount: int):
    print(f"\nRunning benchmark with N = {iterationCount}...\n")

    array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 9]

    Utils.repeatAlgorithm(
        iterationCount,
        linearSearch,
        array, 
        3
    )
    Utils.repeatAlgorithm(
        iterationCount,
        sumArray,
        array
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        isPalindrome,
        "abcdeedcba"
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        countFrequency,
        array
    )
    Utils.repeatAlgorithm(
        iterationCount, 
        removeDuplicates,
        array
    )
    
    print('\nEnd of the test\n')
