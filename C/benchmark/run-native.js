/**
 * Native C Benchmark Runner
 * Runs the C benchmark with configurable iterations
 */

import { execSync } from "child_process";
import { performance } from "perf_hooks";
import { existsSync, unlinkSync, readFileSync, writeFileSync } from "fs";
import { platform } from "os";

const TEMPLATE_FILE = "./benchmark-template.c";
const TEMP_C_FILE = "./benchmark-temp.c";
const OUTPUT_FILE = platform() === "win32" ? "benchmark.exe" : "./benchmark";

// Get iterations from command line or use default
const iterations = parseInt(process.argv[2]) || 1000;

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║            Native C Benchmark Runner                       ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log();

// Detect compiler
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

const compiler = findCompiler();

if (!compiler) {
  console.error("ERROR: No C compiler found (tried gcc, clang, cc)");
  console.error("Please install GCC or Clang to run native benchmarks.");
  process.exit(1);
}

console.log(`Compiler: ${compiler}`);
console.log(`Platform: ${platform()}`);
console.log(`Iterations: ${iterations}`);
console.log();

// Generate code from template
const template = readFileSync(TEMPLATE_FILE, "utf-8");
const code = template.replace(/__ITERATIONS__/g, iterations.toString());
writeFileSync(TEMP_C_FILE, code);

// Compile the benchmark
console.log("Compiling benchmark...");
const compileStart = performance.now();

try {
  const compileCmd = `${compiler} -O0 -o ${OUTPUT_FILE} ${TEMP_C_FILE}`;
  console.log(`> ${compileCmd}`);
  execSync(compileCmd, { stdio: "inherit" });
} catch (error) {
  console.error("Compilation failed:", error.message);
  if (existsSync(TEMP_C_FILE)) unlinkSync(TEMP_C_FILE);
  process.exit(1);
}

const compileEnd = performance.now();
const compileTime = (compileEnd - compileStart) / 1000;
console.log(`Compilation time: ${compileTime.toFixed(3)} seconds`);
console.log();

// Run the benchmark
console.log("Running native benchmark...");
console.log("─".repeat(60));

const runStart = performance.now();

try {
  const result = execSync(OUTPUT_FILE, {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });

  const runEnd = performance.now();
  const runTime = (runEnd - runStart) / 1000;

  console.log(result);

  console.log("─".repeat(60));
  console.log();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                   Native C Results                         ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║ Compiler:         ${compiler.padEnd(39)}║`);
  console.log(`║ Iterations:       ${iterations.toString().padEnd(39)}║`);
  console.log(`║ Compile time:     ${compileTime.toFixed(3).padEnd(36)}sec ║`);
  console.log(`║ Execution time:   ${runTime.toFixed(3).padEnd(36)}sec ║`);
  console.log("╚════════════════════════════════════════════════════════════╝");

} catch (error) {
  console.error("Execution failed:", error.message);
  process.exit(1);
} finally {
  // Cleanup
  if (existsSync(OUTPUT_FILE)) unlinkSync(OUTPUT_FILE);
  if (existsSync(TEMP_C_FILE)) unlinkSync(TEMP_C_FILE);
}
