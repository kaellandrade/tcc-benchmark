# Algorithm Complexity Benchmark Suite Makefile

CC = gcc
CFLAGS = -O2 -Wall -Wextra
LDFLAGS = -lm
TARGET = enhanced_main
SOURCE = enhanced_main.c
PYTHON = python3

.PHONY: all clean compile benchmark analyze help

# Default target
all: compile benchmark analyze

# Help target
help:
	@echo "Algorithm Complexity Benchmark Suite"
	@echo "===================================="
	@echo ""
	@echo "Available targets:"
	@echo "  all                 - Compile, benchmark, and analyze"
	@echo "  compile            - Compile the C program"
	@echo "  benchmark          - Run all benchmarks"
	@echo "  benchmark-constant - Run O(1) benchmarks"
	@echo "  benchmark-log      - Run O(log n) benchmarks"
	@echo "  benchmark-linear   - Run O(n) benchmarks"
	@echo "  benchmark-nlogn    - Run O(n log n) benchmarks"
	@echo "  benchmark-quadratic- Run O(n²) benchmarks"
	@echo "  analyze            - Generate analysis and charts"
	@echo "  test               - Run quick functionality tests"
	@echo "  clean              - Clean generated files"
	@echo "  install-deps       - Install required dependencies"

# Compile the C program
compile: $(TARGET)

$(TARGET): $(SOURCE)
	@echo "Compiling $(SOURCE)..."
	$(CC) $(CFLAGS) -o $(TARGET) $(SOURCE) $(LDFLAGS)
	@echo "Compilation successful!"

# Install dependencies
install-deps:
	@echo "Installing dependencies..."
	@command -v hyperfine >/dev/null 2>&1 || { \
		echo "Installing hyperfine..."; \
		if command -v apt >/dev/null 2>&1; then \
			sudo apt update && sudo apt install -y hyperfine; \
		elif command -v brew >/dev/null 2>&1; then \
			brew install hyperfine; \
		else \
			echo "Please install hyperfine manually"; \
			exit 1; \
		fi; \
	}
	@$(PYTHON) -c "import matplotlib, pandas, seaborn, numpy" 2>/dev/null || { \
		echo "Installing Python dependencies..."; \
		pip3 install matplotlib pandas seaborn numpy; \
	}
	@echo "Dependencies installed successfully!"

# Run all benchmarks
benchmark: $(TARGET)
	@echo "Running comprehensive benchmarks..."
	@mkdir -p benchmark_results
	@chmod +x run_benchmarks.sh
	./run_benchmarks.sh

# Individual benchmark targets
benchmark-constant: $(TARGET)
	@echo "Running O(1) constant time benchmarks..."
	@mkdir -p benchmark_results
	hyperfine --export-json benchmark_results/constant.json \
	          --warmup 3 --min-runs 10 --max-runs 50 \
	          "./$(TARGET) constant"

benchmark-log: $(TARGET)
	@echo "Running O(log n) logarithmic time benchmarks..."
	@mkdir -p benchmark_results
	hyperfine --export-json benchmark_results/logarithmic.json \
	          --warmup 3 --min-runs 10 --max-runs 50 \
	          "./$(TARGET) logarithmic"

benchmark-linear: $(TARGET)
	@echo "Running O(n) linear time benchmarks..."
	@mkdir -p benchmark_results
	hyperfine --export-json benchmark_results/linear.json \
	          --warmup 3 --min-runs 10 --max-runs 50 \
	          "./$(TARGET) linear"

benchmark-nlogn: $(TARGET)
	@echo "Running O(n log n) quasi-linear time benchmarks..."
	@mkdir -p benchmark_results
	hyperfine --export-json benchmark_results/nlogn.json \
	          --warmup 3 --min-runs 10 --max-runs 50 \
	          "./$(TARGET) nlogn"

benchmark-quadratic: $(TARGET)
	@echo "Running O(n²) quadratic time benchmarks..."
	@mkdir -p benchmark_results
	hyperfine --export-json benchmark_results/quadratic.json \
	          --warmup 3 --min-runs 10 --max-runs 50 \
	          "./$(TARGET) quadratic"

# Quick functionality test
test: $(TARGET)
	@echo "Running quick functionality tests..."
	@echo "Testing O(1) algorithms:"
	./$(TARGET) constant
	@echo ""
	@echo "Testing O(log n) algorithms:"
	./$(TARGET) logarithmic
	@echo ""
	@echo "Testing O(n) algorithms:"
	./$(TARGET) linear
	@echo ""
	@echo "All tests completed successfully!"

# Generate analysis
analyze:
	@echo "Generating performance analysis..."
	@if [ -d "benchmark_results" ] && [ -n "$$(ls -A benchmark_results/*.json 2>/dev/null)" ]; then \
		$(PYTHON) analyze_benchmarks.py; \
	else \
		echo "No benchmark results found. Run 'make benchmark' first."; \
		exit 1; \
	fi

# Clean generated files
clean:
	@echo "Cleaning generated files..."
	rm -f $(TARGET)
	rm -rf benchmark_results/
	rm -f algorithm_performance_analysis.png
	rm -f detailed_benchmark_results.csv
	@echo "Clean completed!"

# Show benchmark results
show-results:
	@if [ -f "detailed_benchmark_results.csv" ]; then \
		echo "Latest benchmark results:"; \
		cat detailed_benchmark_results.csv; \
	else \
		echo "No results found. Run 'make analyze' first."; \
	fi

# Development targets
dev-compile: 
	$(CC) $(CFLAGS) -g -DDEBUG -o $(TARGET) $(SOURCE) $(LDFLAGS)

# Check for memory leaks (requires valgrind)
memcheck: $(TARGET)
	@command -v valgrind >/dev/null 2>&1 || { \
		echo "valgrind not found. Install with: sudo apt install valgrind"; \
		exit 1; \
	}
	valgrind --leak-check=full --show-leak-kinds=all ./$(TARGET) all

# Performance profiling (requires perf)
profile: $(TARGET)
	@command -v perf >/dev/null 2>&1 || { \
		echo "perf not found. Install with: sudo apt install linux-tools-generic"; \
		exit 1; \
	}
	perf record -g ./$(TARGET) all
	perf report
