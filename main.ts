import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "WARNING: Do not meet your earlier self. He has been waiting for this conversation and he is not happy with you.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
// Fail fast: the gate requires 1-120 UTF-8 characters, not only whitespace.
if (LINE.trim().length === 0 || [...LINE].length > 120) {
  throw new Error("entry line must be 1-120 characters, not only whitespace");
}
mkdirSync(outDir, { recursive: true });
// Empty the output directory's contents only; never remove the directory itself.
for (const entry of readdirSync(outDir)) {
  rmSync(`${outDir}/${entry}`, { recursive: true, force: true });
}
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
