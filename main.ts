import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One-line joke about a meeting that should have been an email.
// Written from scratch for this entry: the output is the entire entry,
// so it must be a single line, 1-200 UTF-8 characters, with no
// trailing newline (a newline would count toward the gate).
const joke =
  "Twelve people, one hour, one decision: send the email this meeting was too important to become.";

const OUTPUT_PATH = "/output/entry.txt";

function validate(line: string): void {
  // The gate counts UTF-8 characters, so measure the encoded byte
  // length as well as the character count and reject anything off.
  const byteLength = new TextEncoder().encode(line).length;
  if (line.length === 0 || line.length > 200 || byteLength > 200) {
    throw new Error(
      `Joke must be 1-200 characters, got ${line.length} chars / ${byteLength} bytes`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Joke must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Joke must be a single line");
  }
}

function main(): void {
  validate(joke);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: write the joke exactly as-is.
  writeFileSync(OUTPUT_PATH, joke, "utf8");
}

main();
