# Algorithm Complexity Benchmark Suite

A comprehensive benchmarking suite that implements and analyzes algorithms across different time complexity classes using hyperfine for precise measurements.

## 📋 Overview

This project implements algorithms from all major complexity classes:

- **O(1)** - Constant Time: Hash map operations, array access, stack operations
- **O(log n)** - Logarithmic: Binary search, AVL tree operations, fast exponentiation
- **O(n)** - Linear: Linear search, array sum, palindrome check
- **O(n log n)** - Quasi-linear: Merge sort, quick sort, heap sort
- **O(n²)** - Quadratic: Bubble sort, insertion sort, matrix multiplication

## 🚀 Quick Start

### Prerequisites

```bash
# Install required tools
sudo apt update
sudo apt install -y gcc hyperfine python3 python3-pip

# Install Python dependencies
pip3 install matplotlib pandas seaborn numpy
```

### Running Benchmarks

1. **Compile and run all benchmarks:**
   ```bash
   make all
   ```

2. **Run specific complexity class:**
   ```bash
   make benchmark-constant    # O(1) algorithms
   make benchmark-log         # O(log n) algorithms
   make benchmark-linear      # O(n) algorithms
   make benchmark-nlogn       # O(n log n) algorithms
   make benchmark-quadratic   # O(n²) algorithms
   ```

3. **Generate analysis and charts:**
   ```bash
   make analyze
   ```

## 📊 Files Generated

- `enhanced_main.c` - Complete algorithm implementations
- `benchmark_results/` - JSON and CSV results from hyperfine
- `algorithm_performance_analysis.png` - Comprehensive performance charts
- `detailed_benchmark_results.csv` - Detailed metrics

## 🔧 Manual Usage

### Compile the program:
```bash
gcc -O2 -o enhanced_main enhanced_main.c -lm
```

### Run individual tests:
```bash
./enhanced_main constant     # Test O(1) algorithms
./enhanced_main logarithmic  # Test O(log n) algorithms
./enhanced_main linear       # Test O(n) algorithms
./enhanced_main nlogn        # Test O(n log n) algorithms
./enhanced_main quadratic    # Test O(n²) algorithms
./enhanced_main all          # Test all complexity classes
```

### Run hyperfine benchmarks:
```bash
chmod +x run_benchmarks.sh
./run_benchmarks.sh
```

### Analyze results:
```bash
python3 analyze_benchmarks.py
```

## 📈 Algorithm Details

### O(1) - Constant Time
- **Hash Map Access**: Direct key-value retrieval
- **Array Indexing**: Direct memory access
- **Stack Operations**: Push/pop operations
- **Variable Swap**: Memory exchange
- **Even Number Check**: Modulo operation

### O(log n) - Logarithmic Time
- **Binary Search**: Divide and conquer search
- **AVL Tree Operations**: Self-balancing tree insertions
- **Heap Operations**: Binary heap maintenance
- **Fast Exponentiation**: Recursive power calculation
- **Bit Counting**: Bitwise operations

### O(n) - Linear Time
- **Linear Search**: Sequential element search
- **Array Sum**: Single-pass summation
- **Palindrome Check**: String comparison
- **Frequency Counting**: Element occurrence counting
- **Duplicate Removal**: Simple deduplication

### O(n log n) - Quasi-linear Time
- **Merge Sort**: Divide and conquer sorting
- **Quick Sort**: Partition-based sorting
- **Heap Sort**: Heap-based sorting
- **Efficient Tree Construction**: Balanced tree building

### O(n²) - Quadratic Time
- **Bubble Sort**: Adjacent element comparison
- **Insertion Sort**: Incremental sorting
- **Selection Sort**: Minimum element selection
- **Nested Loop Duplicate Check**: Pairwise comparison
- **Matrix Multiplication**: Triple nested loops

## 📊 Performance Analysis

The analysis script generates:

1. **Mean Execution Times**: Bar chart comparing algorithm performance
2. **Time Variability**: Error bars showing consistency
3. **Min vs Max Times**: Range analysis
4. **Performance Efficiency**: Inverse time measurements
5. **User vs System Time**: Resource usage analysis
6. **Performance Ratio Matrix**: Algorithm comparison heatmap

## 🎯 Best Practices

- **Use O(1) algorithms** for frequent operations
- **O(log n) algorithms** excel for searching sorted data
- **O(n) algorithms** are acceptable for single-pass operations
- **O(n log n)** is optimal for comparison-based sorting
- **Avoid O(n²) algorithms** for large datasets (n > 1000)

## 🔍 Interpreting Results

### Hyperfine Metrics:
- **Mean**: Average execution time
- **Stddev**: Standard deviation (consistency measure)
- **Min/Max**: Performance range
- **Median**: Middle value (less affected by outliers)

### Performance Indicators:
- Lower mean time = Better performance
- Lower standard deviation = More consistent
- Smaller min-max range = More predictable

## 🛠️ Customization

### Adding New Algorithms:
1. Implement the algorithm in `enhanced_main.c`
2. Add benchmark function
3. Update the main function with new test mode
4. Recompile and test

### Modifying Test Parameters:
- Adjust array sizes in benchmark functions
- Change iteration counts for different complexity classes
- Modify hyperfine parameters in `run_benchmarks.sh`

## 📝 Output Examples

### Console Output:
```
O(1) - Constant Time Algorithms
================================
Iterations: 1000, Time: 0.000123 seconds
Iterations: 10000, Time: 0.001234 seconds
```

### Analysis Report:
```
COMPREHENSIVE ALGORITHM BENCHMARK REPORT
========================================
Total benchmarks analyzed: 5
Fastest algorithm: constant (0.000123s)
Slowest algorithm: quadratic (0.045678s)
Performance range: 371.45x difference
```

## 🤝 Contributing

1. Fork the repository
2. Add new algorithms or improvements
3. Test thoroughly with different input sizes
4. Submit pull request with benchmark results

## 📄 License

This project is open source and available under the MIT License.
