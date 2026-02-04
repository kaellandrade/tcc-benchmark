/**
 * Benchmark Comparison Runner
 * Compares Native C vs JSCPP across different iteration levels
 * to show how the performance gap scales with input size
 */

import { execSync } from "child_process";
import { performance } from "perf_hooks";
import { existsSync, unlinkSync, readFileSync, writeFileSync } from "fs";
import { platform } from "os";
import JSCPP from "JSCPP";

const TEMPLATE_FILE = "./benchmark-template.c";
const TEMP_C_FILE = "./benchmark-temp.c";
const OUTPUT_FILE = platform() === "win32" ? "benchmark.exe" : "./benchmark";
const RESULTS_FILE = "./benchmark-results.json";

// Iteration levels to test (low to high)
const ITERATION_LEVELS = [100, 500, 1000, 2000, 5000];

// ===================================================
// Helper Functions
// ===================================================

function findCompiler() {
  const compilers = ["gcc", "clang", "cc"];
  for (const compiler of compilers) {
    try {
      execSync(`${compiler} --version`, { stdio: "pipe" });
      return compiler;
    } catch {
      continue;
    }
  }
  return null;
}

function printHeader(title) {
  const line = "═".repeat(66);
  console.log(`╔${line}╗`);
  console.log(`║${title.padStart(33 + title.length / 2).padEnd(66)}║`);
  console.log(`╚${line}╝`);
}

function printSection(title) {
  console.log();
  console.log(`┌${"─".repeat(64)}┐`);
  console.log(`│ ${title.padEnd(62)} │`);
  console.log(`└${"─".repeat(64)}┘`);
}

function generateCode(template, iterations) {
  return template.replace(/__ITERATIONS__/g, iterations.toString());
}

// ===================================================
// Native C Benchmark
// ===================================================

function runNativeBenchmark(compiler, code) {
  // Write temp C file
  writeFileSync(TEMP_C_FILE, code);

  // Compile
  try {
    execSync(`${compiler} -O0 -o ${OUTPUT_FILE} ${TEMP_C_FILE}`, {
      stdio: "pipe",
    });
  } catch (error) {
    return { time: 0, success: false, error: "Compilation failed" };
  }

  // Run
  const startTime = performance.now();

  try {
    const output = execSync(OUTPUT_FILE, {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });

    const runTime = (performance.now() - startTime) / 1000;
    return { time: runTime, output, success: true };
  } catch (error) {
    return { time: 0, success: false, error: error.message };
  }
}

// ===================================================
// JSCPP Benchmark
// ===================================================

function runJSCPPBenchmark(code) {
  let output = "";

  const config = {
    stdio: {
      write: (content) => {
        output += content;
      },
    },
    unsigned_overflow: "ignore",
  };

  const startTime = performance.now();

  try {
    JSCPP.run(code, "", config);
    const runTime = (performance.now() - startTime) / 1000;
    return { time: runTime, output, success: true };
  } catch (error) {
    const runTime = (performance.now() - startTime) / 1000;
    return { time: runTime, success: false, error: error.message };
  }
}

// ===================================================
// Results Formatting
// ===================================================

function printResultsTable(results) {
  printHeader("Performance Comparison: Native C vs JSCPP");
  console.log();

  // Table header
  console.log(
    "┌────────────┬─────────────────┬─────────────────┬─────────────────┐"
  );
  console.log(
    "│ Iterations │ Native C (sec)  │ JSCPP (sec)     │ Ratio (JSCPP/C) │"
  );
  console.log(
    "├────────────┼─────────────────┼─────────────────┼─────────────────┤"
  );

  for (const result of results) {
    const iters = result.iterations.toString().padStart(10);
    const nativeTime = result.native.success
      ? result.native.time.toFixed(4).padStart(15)
      : "FAILED".padStart(15);
    const jscppTime = result.jscpp.success
      ? result.jscpp.time.toFixed(4).padStart(15)
      : "FAILED".padStart(15);

    let ratio = "N/A".padStart(15);
    if (result.native.success && result.jscpp.success && result.native.time > 0) {
      ratio = (result.jscpp.time / result.native.time).toFixed(1).padStart(14) + "x";
    }

    console.log(`│ ${iters} │ ${nativeTime} │ ${jscppTime} │ ${ratio} │`);
  }

  console.log(
    "└────────────┴─────────────────┴─────────────────┴─────────────────┘"
  );
}

function printScalingSummary(results) {
  console.log();
  printSection("Scaling Analysis");
  console.log();

  const validResults = results.filter(
    (r) => r.native.success && r.jscpp.success && r.native.time > 0
  );

  if (validResults.length < 2) {
    console.log("Not enough valid results for scaling analysis.");
    return;
  }

  const firstResult = validResults[0];
  const lastResult = validResults[validResults.length - 1];

  const iterScale = lastResult.iterations / firstResult.iterations;
  const nativeScale = lastResult.native.time / firstResult.native.time;
  const jscppScale = lastResult.jscpp.time / firstResult.jscpp.time;

  const firstRatio = firstResult.jscpp.time / firstResult.native.time;
  const lastRatio = lastResult.jscpp.time / lastResult.native.time;

  console.log(`Input scaling: ${firstResult.iterations} -> ${lastResult.iterations} (${iterScale}x increase)`);
  console.log();
  console.log("Time scaling:");
  console.log(`  Native C:  ${firstResult.native.time.toFixed(4)}s -> ${lastResult.native.time.toFixed(4)}s (${nativeScale.toFixed(1)}x increase)`);
  console.log(`  JSCPP:     ${firstResult.jscpp.time.toFixed(4)}s -> ${lastResult.jscpp.time.toFixed(4)}s (${jscppScale.toFixed(1)}x increase)`);
  console.log();
  console.log("Performance gap (JSCPP / Native):");
  console.log(`  At ${firstResult.iterations.toString().padStart(5)} iterations: ${firstRatio.toFixed(1)}x slower`);
  console.log(`  At ${lastResult.iterations.toString().padStart(5)} iterations: ${lastRatio.toFixed(1)}x slower`);
  console.log();

  const gapChange = ((lastRatio / firstRatio) - 1) * 100;
  if (gapChange > 10) {
    console.log(`Trend: Performance gap INCREASES by ${gapChange.toFixed(0)}% as input grows`);
  } else if (gapChange < -10) {
    console.log(`Trend: Performance gap DECREASES by ${Math.abs(gapChange).toFixed(0)}% as input grows`);
  } else {
    console.log("Trend: Performance gap remains relatively CONSTANT across input sizes");
  }
}

// ===================================================
// Main
// ===================================================

async function main() {
  console.log();
  printHeader("C Benchmark: Native vs Browser IDE (JSCPP)");
  console.log();
  console.log(`Platform: ${platform()}`);
  console.log(`Template file: ${TEMPLATE_FILE}`);
  console.log(`Iteration levels: ${ITERATION_LEVELS.join(", ")}`);
  console.log(`Date: ${new Date().toISOString()}`);

  // Check for compiler
  const compiler = findCompiler();
  if (!compiler) {
    console.error("\nERROR: No C compiler found (tried gcc, clang, cc)");
    process.exit(1);
  }
  console.log(`Compiler: ${compiler}`);

  // Read template
  const template = readFileSync(TEMPLATE_FILE, "utf-8");

  // Run benchmarks for each iteration level
  const results = [];

  for (const iterations of ITERATION_LEVELS) {
    printSection(`Benchmark: ${iterations} iterations`);

    // Generate code with this iteration count
    const code = generateCode(template, iterations);

    // Native benchmark
    process.stdout.write(`  Native C:  `);
    const nativeResult = runNativeBenchmark(compiler, code);
    if (nativeResult.success) {
      console.log(`${nativeResult.time.toFixed(4)}s`);
    } else {
      console.log(`FAILED - ${nativeResult.error}`);
    }

    // JSCPP benchmark
    process.stdout.write(`  JSCPP:     `);
    const jscppResult = runJSCPPBenchmark(code);
    if (jscppResult.success) {
      console.log(`${jscppResult.time.toFixed(4)}s`);
    } else {
      console.log(`FAILED - ${jscppResult.error}`);
    }

    // Calculate ratio
    if (nativeResult.success && jscppResult.success && nativeResult.time > 0) {
      const ratio = jscppResult.time / nativeResult.time;
      console.log(`  Ratio:     ${ratio.toFixed(1)}x slower`);
    }

    results.push({
      iterations,
      native: nativeResult,
      jscpp: jscppResult,
    });
  }

  // Cleanup
  if (existsSync(OUTPUT_FILE)) unlinkSync(OUTPUT_FILE);
  if (existsSync(TEMP_C_FILE)) unlinkSync(TEMP_C_FILE);

  // Print results table
  console.log();
  printResultsTable(results);

  // Print scaling analysis
  printScalingSummary(results);

  // Save results to JSON
  const jsonResults = {
    timestamp: new Date().toISOString(),
    platform: platform(),
    compiler,
    iterationLevels: ITERATION_LEVELS,
    results: results.map((r) => ({
      iterations: r.iterations,
      nativeTimeSeconds: r.native.success ? r.native.time : null,
      jscppTimeSeconds: r.jscpp.success ? r.jscpp.time : null,
      ratio:
        r.native.success && r.jscpp.success && r.native.time > 0
          ? r.jscpp.time / r.native.time
          : null,
    })),
  };

  writeFileSync(RESULTS_FILE, JSON.stringify(jsonResults, null, 2));
  console.log();
  console.log(`Results saved to: ${RESULTS_FILE}`);
}

main().catch(console.error);
