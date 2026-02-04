/**
 * JSCPP Benchmark Runner
 * Runs the C benchmark using JSCPP (same as the browser IDE)
 */

import JSCPP from "JSCPP";
import { readFileSync } from "fs";
import { performance } from "perf_hooks";

const TEMPLATE_FILE = "./benchmark-template.c";

// Get iterations from command line or use default
const iterations = parseInt(process.argv[2]) || 1000;

console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║          JSCPP (Browser IDE) Benchmark Runner              ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log();

// Read and generate code
const template = readFileSync(TEMPLATE_FILE, "utf-8");
const code = template.replace(/__ITERATIONS__/g, iterations.toString());

console.log(`Template file: ${TEMPLATE_FILE}`);
console.log(`Code size: ${code.length} characters`);
console.log(`Iterations: ${iterations}`);
console.log();

// Capture output
let output = "";

const config = {
  stdio: {
    write: (content) => {
      output += content;
      process.stdout.write(content);
    },
  },
  unsigned_overflow: "ignore",
};

console.log("Starting JSCPP execution...");
console.log("─".repeat(60));

const startTime = performance.now();

try {
  const exitCode = JSCPP.run(code, "", config);
  const endTime = performance.now();
  const duration = (endTime - startTime) / 1000;

  console.log("─".repeat(60));
  console.log();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                    JSCPP Results                           ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║ Exit code:        ${exitCode.toString().padEnd(39)}║`);
  console.log(`║ Iterations:       ${iterations.toString().padEnd(39)}║`);
  console.log(`║ Total time:       ${duration.toFixed(3).padEnd(36)}sec ║`);
  console.log("╚════════════════════════════════════════════════════════════╝");

  // Output JSON for comparison script
  const result = {
    runtime: "JSCPP",
    iterations,
    exitCode,
    totalTimeSeconds: duration,
    timestamp: new Date().toISOString(),
  };

  console.log();
  console.log("JSON Result:");
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  const endTime = performance.now();
  const duration = (endTime - startTime) / 1000;

  console.log("─".repeat(60));
  console.log();
  console.log("ERROR:", error.message);
  console.log(`Time before error: ${duration.toFixed(3)} seconds`);
  process.exit(1);
}
