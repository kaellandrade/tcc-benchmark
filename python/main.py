from ConstantTime import BenchmarkConstantTimeAlgorithms
from LogarithmicTime import BenchmarkLogarithmicTimeAlgorithms
from LinearTime import BenchmarkLinearTimeAlgorithms
import threading
import time
import psutil
import os
import json

print("Running 'main.py':")
BENCHMARK_ITERATIONS = 5000000


# Gets the current process
process = psutil.Process(os.getpid())
done = False


# CPU Time START
cpuTimesBefore = process.cpu_times()
startWallTime = time.time()

# Memory Usage START
memUsages = []
def monitorMemory(): # captura o uso de memoria RAM a cada 0.1s
    while not done:
        mem = process.memory_info().rss / (1024 ** 2)
        memUsages.append(mem)
        time.sleep(0.1)
memoryMonitorThread = threading.Thread(target=monitorMemory)
memoryMonitorThread.start()

# CPU Usage START
cpuUsages = []
def monitorCpuUsage():
    while not done:
        cpuPercentPerCore = psutil.cpu_percent(interval=0.1, percpu=True)
        cpuUsages.append(cpuPercentPerCore)
        time.sleep(0.1)
monitorCpuUsageThread = threading.Thread(target=monitorCpuUsage)
monitorCpuUsageThread.start()


# Running the algorithm..
# BenchmarkLogarithmicTimeAlgorithms.runBenchmark(BENCHMARK_ITERATIONS)
# BenchmarkLinearTimeAlgorithms.runCheck()
BenchmarkLinearTimeAlgorithms.runBenchmark(BENCHMARK_ITERATIONS)
done = True
memoryMonitorThread.join()
monitorCpuUsageThread.join()


# CPU Time END
cpuTimesAfter = process.cpu_times()
endWallTime = time.time()

cpuUser = cpuTimesAfter.user - cpuTimesBefore.user
cpuSystem = cpuTimesAfter.system - cpuTimesBefore.system
cpuTotal = cpuUser + cpuSystem
totalWallTime = endWallTime - startWallTime

# Memory Usage END
maxMem = max(memUsages)
avgMem = sum(memUsages) / len(memUsages)

# CPU Usage END
flattenedCpuUsages = [usage for snapshot in cpuUsages for usage in snapshot]
cpuMaxUsage = max(flattenedCpuUsages)
cpuAvgUsage = sum(flattenedCpuUsages) / len(flattenedCpuUsages)


# CPU Time report
print(f"Tempo de CPU (modo usuário): {cpuUser:.4f} segundos")
print(f"Tempo de CPU (modo sistema): {cpuSystem:.4f} segundos")
print(f"Tempo total de CPU usado: {cpuTotal:.4f} segundos")
print(f"Tempo total percebido pelo usuário: {totalWallTime:.4f} segundos")
print("")

# Memory Usage report
print(f"Uso máximo de RAM: {maxMem:.2f} MB")
print(f"Uso médio de RAM: {avgMem:.2f} MB")
print("")

# CPU Usage report
idx = 0
for usage in cpuUsages:
    print(f"Uso de CPU por núcleo no instante {idx*0.1:.2f}s:", usage)
    idx += 1
print("")

CREATE_JSON_FILE = True
if(CREATE_JSON_FILE):
    result = {
        "algorithm": "QuickSort",
        "device": "Desktop",
        "cpu": "Intel Core i7-9700K",
        "cpuClockSpeed": 3600,
        "cpuThreadsCount": 8,
        "memory": "16GB DDR4",
        "memoryDdr": 4,
        "performance": {
            "cpuTime": round(cpuTotal, 2),
            "totalTime": round(totalWallTime, 2),
            "cpuMaxUsage": round(cpuMaxUsage, 2),
            "cpuAverageUsage": round(cpuAvgUsage, 2),
            "memoryMaxUsage": round(maxMem, 2),
            "memoryAverageUsage": round(avgMem, 2)
        }
    }

    output_dir = './ExecutedBenchmarks'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'benchmark_result.json')

    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)

    print(f"Arquivo JSON '{output_path}' criado.")
