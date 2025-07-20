#!/usr/bin/env python3
"""
Algorithm Benchmark Analysis Script
Processes hyperfine JSON results and generates comprehensive analysis
"""

import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import os
import sys
from pathlib import Path


def load_benchmark_data(results_dir="benchmark_results"):
    """Load all benchmark JSON files from results directory"""
    data = {}
    results_path = Path(results_dir)

    if not results_path.exists():
        print(f"Results directory '{results_dir}' not found!")
        return None

    json_files = list(results_path.glob("*.json"))
    if not json_files:
        print(f"No JSON files found in '{results_dir}'!")
        return None

    for json_file in json_files:
        try:
            with open(json_file, "r") as f:
                benchmark_data = json.load(f)
                data[json_file.stem] = benchmark_data
                print(f"Loaded: {json_file.name}")
        except Exception as e:
            print(f"Error loading {json_file}: {e}")

    return data


def extract_metrics(benchmark_data):
    """Extract key metrics from hyperfine benchmark data"""
    metrics = []

    for file_name, data in benchmark_data.items():
        if "results" in data:
            for result in data["results"]:
                metrics.append(
                    {
                        "benchmark": file_name,
                        "command": result["command"],
                        "mean_time": result["mean"],
                        "stddev": result["stddev"],
                        "min_time": result["min"],
                        "max_time": result["max"],
                        "median_time": result["median"],
                        "user_time": result.get("user", 0),
                        "system_time": result.get("system", 0),
                    }
                )

    return pd.DataFrame(metrics)


def create_performance_analysis(df):
    """Create comprehensive performance analysis plots"""
    plt.style.use("seaborn-v0_8")
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    fig.suptitle(
        "Algorithm Performance Analysis from Hyperfine Benchmarks",
        fontsize=16,
        fontweight="bold",
    )

    # Plot 1: Mean execution times
    ax1 = axes[0, 0]
    complexity_order = ["constant", "logarithmic", "linear", "nlogn", "quadratic"]
    df_sorted = df.sort_values("mean_time")

    bars = ax1.bar(
        range(len(df_sorted)),
        df_sorted["mean_time"],
        color=plt.cm.viridis(np.linspace(0, 1, len(df_sorted))),
    )
    ax1.set_xlabel("Complexidade de algoritmos")
    ax1.set_ylabel("Tempo médio (segundos)")
    ax1.set_title("Tempo médio de execução por complexidade")
    ax1.set_xticks(range(len(df_sorted)))
    ax1.set_xticklabels([cmd.split()[-1] for cmd in df_sorted["command"]], rotation=45)

    # Add value labels on bars
    for bar, value in zip(bars, df_sorted["mean_time"]):
        ax1.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + max(df_sorted["mean_time"]) * 0.01,
            f"{value:.4f}s",
            ha="center",
            va="bottom",
            fontsize=9,
        )

    # Plot 2: Time variability (error bars)
    ax2 = axes[0, 1]
    x_pos = range(len(df))
    ax2.errorbar(
        x_pos,
        df["mean_time"],
        yerr=df["stddev"],
        fmt="o",
        capsize=5,
        capthick=2,
        markersize=8,
    )
    ax2.set_xlabel("Benchmark")
    ax2.set_ylabel("Time (seconds)")
    ax2.set_title("Execution Time Variability")
    ax2.set_xticks(x_pos)
    ax2.set_xticklabels([cmd.split()[-1] for cmd in df["command"]], rotation=45)
    ax2.grid(True, alpha=0.3)

    # Plot 3: Min vs Max times
    ax3 = axes[0, 2]
    width = 0.35
    x_pos = np.arange(len(df))
    ax3.bar(x_pos - width / 2, df["min_time"], width, label="Min Time", alpha=0.8)
    ax3.bar(x_pos + width / 2, df["max_time"], width, label="Max Time", alpha=0.8)
    ax3.set_xlabel("Benchmark")
    ax3.set_ylabel("Time (seconds)")
    ax3.set_title("Min vs Max Execution Times")
    ax3.set_xticks(x_pos)
    ax3.set_xticklabels([cmd.split()[-1] for cmd in df["command"]], rotation=45)
    ax3.legend()

    # Plot 4: Performance efficiency (inverse of time)
    ax4 = axes[1, 0]
    efficiency = 1 / df["mean_time"]  # Higher is better
    colors = plt.cm.RdYlGn(np.linspace(0.2, 0.8, len(df)))
    bars = ax4.bar(range(len(df)), efficiency, color=colors)
    ax4.set_xlabel("Algorithm Complexity")
    ax4.set_ylabel("Performance Efficiency (1/time)")
    ax4.set_title("Algorithm Performance Efficiency")
    ax4.set_xticks(range(len(df)))
    ax4.set_xticklabels([cmd.split()[-1] for cmd in df["command"]], rotation=45)

    # Plot 5: User vs System time
    ax5 = axes[1, 1]
    if "user_time" in df.columns and df["user_time"].sum() > 0:
        ax5.scatter(
            df["user_time"],
            df["system_time"],
            s=df["mean_time"] * 10000,
            alpha=0.6,
            c=range(len(df)),
            cmap="viridis",
        )
        ax5.set_xlabel("User Time (seconds)")
        ax5.set_ylabel("System Time (seconds)")
        ax5.set_title("User vs System Time Usage")

        # Add labels
        for i, cmd in enumerate(df["command"]):
            ax5.annotate(
                cmd.split()[-1],
                (df["user_time"].iloc[i], df["system_time"].iloc[i]),
                xytext=(5, 5),
                textcoords="offset points",
                fontsize=8,
            )
    else:
        ax5.text(
            0.5,
            0.5,
            "User/System time data\nnot available",
            ha="center",
            va="center",
            transform=ax5.transAxes,
            fontsize=12,
        )
        ax5.set_title("User vs System Time Usage")

    # Plot 6: Complexity comparison heatmap
    ax6 = axes[1, 2]
    if len(df) > 1:
        # Create a comparison matrix
        comparison_data = []
        algorithms = [cmd.split()[-1] for cmd in df["command"]]

        for i, alg1 in enumerate(algorithms):
            row = []
            for j, alg2 in enumerate(algorithms):
                if i == j:
                    row.append(1.0)  # Same algorithm
                else:
                    # Ratio of execution times
                    ratio = df["mean_time"].iloc[j] / df["mean_time"].iloc[i]
                    row.append(ratio)
            comparison_data.append(row)

        im = ax6.imshow(comparison_data, cmap="RdYlBu_r", aspect="auto")
        ax6.set_xticks(range(len(algorithms)))
        ax6.set_yticks(range(len(algorithms)))
        ax6.set_xticklabels(algorithms, rotation=45)
        ax6.set_yticklabels(algorithms)
        ax6.set_title("Performance Ratio Matrix")

        # Add colorbar
        cbar = plt.colorbar(im, ax=ax6)
        cbar.set_label("Time Ratio (slower/faster)")

        # Add text annotations
        for i in range(len(algorithms)):
            for j in range(len(algorithms)):
                text = ax6.text(
                    j,
                    i,
                    f"{comparison_data[i][j]:.2f}",
                    ha="center",
                    va="center",
                    color="white" if comparison_data[i][j] > 2 else "black",
                )
    else:
        ax6.text(
            0.5,
            0.5,
            "Need multiple benchmarks\nfor comparison",
            ha="center",
            va="center",
            transform=ax6.transAxes,
            fontsize=12,
        )
        ax6.set_title("Performance Ratio Matrix")

    plt.tight_layout()
    plt.savefig("algorithm_performance_analysis.png", dpi=300, bbox_inches="tight")
    plt.show()


def generate_report(df):
    """Generate a comprehensive text report"""
    print("\n" + "=" * 60)
    print("COMPREHENSIVE ALGORITHM BENCHMARK REPORT")
    print("=" * 60)

    print(f"\nTotal benchmarks analyzed: {len(df)}")
    print(
        f"Fastest algorithm: {df.loc[df['mean_time'].idxmin(), 'command'].split()[-1]} ({df['mean_time'].min():.6f}s)"
    )
    print(
        f"Slowest algorithm: {df.loc[df['mean_time'].idxmax(), 'command'].split()[-1]} ({df['mean_time'].max():.6f}s)"
    )
    print(
        f"Performance range: {df['mean_time'].max() / df['mean_time'].min():.2f}x difference"
    )

    print("\nDETAILED RESULTS:")
    print("-" * 40)

    for _, row in df.iterrows():
        algo_name = row["command"].split()[-1]
        print(f"\n{algo_name.upper()}:")
        print(f"  Mean time: {row['mean_time']:.6f} ± {row['stddev']:.6f} seconds")
        print(f"  Range: {row['min_time']:.6f} - {row['max_time']:.6f} seconds")
        print(f"  Median: {row['median_time']:.6f} seconds")
        if row["user_time"] > 0:
            print(f"  User time: {row['user_time']:.6f} seconds")
            print(f"  System time: {row['system_time']:.6f} seconds")

    print("\nPERFORMANCE RECOMMENDATIONS:")
    print("-" * 30)

    # Sort by performance
    df_sorted = df.sort_values("mean_time")

    print("\n🏆 BEST PERFORMERS:")
    for i, (_, row) in enumerate(df_sorted.head(3).iterrows()):
        algo_name = row["command"].split()[-1]
        print(f"  {i + 1}. {algo_name}: {row['mean_time']:.6f}s")

    if len(df) > 3:
        print("\n⚠️  SLOWEST PERFORMERS:")
        for i, (_, row) in enumerate(df_sorted.tail(2).iterrows()):
            algo_name = row["command"].split()[-1]
            print(f"  {i + 1}. {algo_name}: {row['mean_time']:.6f}s")

    print("\n📊 COMPLEXITY ANALYSIS:")
    complexity_map = {
        "constant": "O(1) - Excellent for frequent operations",
        "logarithmic": "O(log n) - Great for searching sorted data",
        "linear": "O(n) - Good for single-pass operations",
        "nlogn": "O(n log n) - Optimal for comparison-based sorting",
        "quadratic": "O(n²) - Use only for small datasets",
    }

    for _, row in df.iterrows():
        algo_type = row["command"].split()[-1]
        if algo_type in complexity_map:
            print(f"  • {algo_type}: {complexity_map[algo_type]}")


def main():
    """Main analysis function"""
    print("Algorithm Benchmark Analysis Tool")
    print("=" * 35)

    # Load benchmark data
    benchmark_data = load_benchmark_data()
    if not benchmark_data:
        print("No benchmark data found. Please run the benchmarks first.")
        return

    # Extract metrics
    df = extract_metrics(benchmark_data)
    if df.empty:
        print("No valid benchmark results found.")
        return

    print(f"\nAnalyzing {len(df)} benchmark results...")

    # Create visualizations
    create_performance_analysis(df)

    # Generate report
    generate_report(df)

    # Save detailed results to CSV
    df.to_csv("detailed_benchmark_results.csv", index=False)
    print(f"\nDetailed results saved to: detailed_benchmark_results.csv")
    print(f"Performance analysis chart saved to: algorithm_performance_analysis.png")


if __name__ == "__main__":
    main()
