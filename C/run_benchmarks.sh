#!/bin/bash

# Compile the enhanced C program
echo "Compiling enhanced_main.c..."
gcc -O2 -o enhanced_main enhanced_main.c -lm

if [ $? -ne 0 ]; then
    echo "Compilation failed!"
    exit 1
fi

echo "Compilation successful!"

# Create results directory
mkdir -p benchmark_results

# Function to run hyperfine benchmarks
run_benchmark() {
    local mode=$1
    local output_file=$2
    echo "Running benchmark for $mode..."

    hyperfine --export-json "benchmark_results/${output_file}.json" \
              --export-csv "benchmark_results/${output_file}.csv" \
              --warmup 3 \
              --min-runs 10 \
              --max-runs 50 \
              "./enhanced_main $mode"
}

# Check if hyperfine is installed
if ! command -v hyperfine &> /dev/null; then
    echo "hyperfine is not installed. Installing..."
    # For Ubuntu/Debian
    if command -v apt &> /dev/null; then
        sudo apt update && sudo apt install -y hyperfine
    # For macOS
    elif command -v brew &> /dev/null; then
        brew install hyperfine
    # For other systems, provide instructions
    else
        echo "Please install hyperfine manually:"
        echo "- Ubuntu/Debian: sudo apt install hyperfine"
        echo "- macOS: brew install hyperfine"
        echo "- Or download from: https://github.com/sharkdp/hyperfine"
        exit 1
    fi
fi

echo "Starting comprehensive algorithm benchmarks..."
echo "=============================================="

# Run benchmarks for each complexity class
run_benchmark "constant" "constant_time"
run_benchmark "logarithmic" "logarithmic_time"
run_benchmark "linear" "linear_time"
run_benchmark "nlogn" "nlogn_time"
run_benchmark "quadratic" "quadratic_time"

# Run a comprehensive benchmark
echo "Running comprehensive benchmark..."
hyperfine --export-json "benchmark_results/comprehensive.json" \
          --export-csv "benchmark_results/comprehensive.csv" \
          --warmup 2 \
          --min-runs 5 \
          --max-runs 20 \
          "./enhanced_main constant" \
          "./enhanced_main logarithmic" \
          "./enhanced_main linear" \
          "./enhanced_main nlogn" \
          "./enhanced_main quadratic"

echo "Benchmarking completed! Results saved in benchmark_results/"
echo "JSON and CSV files are available for analysis."

# Clean up
echo "Cleaning up..."
# rm -f enhanced_main

echo "Benchmark script completed successfully!"
