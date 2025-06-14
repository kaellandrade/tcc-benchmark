from ConstantTime import BenchmarkConstantTimeAlgorithms
from LogarithmicTime import BenchmarkLogarithmicTimeAlgorithms
import threading
import time
import psutil
import os


print("Running 'main.py':")
BENCHMARK_ITERATIONS = 5000000


# Gets the current process
process = psutil.Process(os.getpid())
done = False


# CPU Time START
cpuTimesBefore = process.cpu_times()

# Memory Usage START
memUsages = []

def monitorMemory():
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
        cpuPercentPerCore = psutil.cpu_percent(interval=0, percpu=True)
        cpuUsages.append(cpuPercentPerCore)
        time.sleep(0.1)

monitorCpuUsageThread = threading.Thread(target=monitorCpuUsage)
monitorCpuUsageThread.start()


# Running the algorithm..
BenchmarkLogarithmicTimeAlgorithms.runBenchmark(BENCHMARK_ITERATIONS)
done = True
memoryMonitorThread.join()
monitorCpuUsageThread.join()


# CPU Time END
cpuTimesAfter = process.cpu_times()
cpuUser = cpuTimesAfter.user - cpuTimesBefore.user
cpuSystem = cpuTimesAfter.system - cpuTimesBefore.system
cpuTotal = cpuUser + cpuSystem

# Memory Usage END
maxMem = max(memUsages)
avgMem = sum(memUsages) / len(memUsages)


# CPU Time report
print(f"Tempo de CPU (modo usuário): {cpuUser:.4f} segundos")
print(f"Tempo de CPU (modo sistema): {cpuSystem:.4f} segundos")
print(f"Tempo total de CPU usado: {cpuTotal:.4f} segundos")

# Memory Usage report
print(f"Uso máximo de RAM: {maxMem:.2f} MB")
print(f"Uso médio de RAM: {avgMem:.2f} MB")

# CPU Usage report
idx = 0
for usage in cpuUsages:
    print(f"Uso de CPU por núcleo no instante {idx*0.1:.2f}s:", usage)
    idx += 1