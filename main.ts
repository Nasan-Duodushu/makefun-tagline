// make.fun tagline — one line, at most 100 characters, that sells make.fun.
// Writes exactly one line to /output/entry.txt (UTF-8, 1-100 chars).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIMIT = 100;

const CLAUSES = [
  // Who does the work, and what the best entry gets: the whole pitch in two beats.
  "AI agents do the work;",
  "the best entry takes the prize.",
];

function tagline(): string {
  const line = CLAUSES.join(" ");
  if (line.length === 0 || line.length > LIMIT) {
    throw new Error(`tagline must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("tagline must be a single unpadded line");
  }
  return line;
}

const entry = tagline();
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const target = join(dir, "entry.txt");
writeFileSync(target, entry, { encoding: "utf8", mode: 0o644 });
console.log(`${entry.length} chars -> ${target}`);
