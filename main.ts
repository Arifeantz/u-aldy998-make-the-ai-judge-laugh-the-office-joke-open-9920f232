// u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232
// Writes one funny line — a single sentence, 200 characters or
// fewer — to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt
// when set). No dependencies, no network, fully deterministic:
// the same line, byte for byte, on every run.
//
// The line, and why it is the one: a worker asks their agent
// to find a gap in their calendar — the most ordinary office
// chore there is. The agent succeeds, which is true to life,
// and the gap it finds is in 2027, wedged between two meetings
// both titled "quick sync". The absurd year lands mid-line
// and the "quick sync" kicker closes it, so the turn pays off
// in the last few words, where the punchline belongs.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Revision 3: cut "both" — "two meetings titled 'quick
// sync'" already says both of them are, so the word was dead
// weight, and the size tie-break rewards every byte saved.
// The line is now as tight as it can be without losing the
// kicker.
const LINE =
  "I told my agent to find a gap in my calendar, and it found one: in 2027, between two meetings titled 'quick sync'.";

// Guard: the brief demands one line of 1 to 200 characters, so
// refuse to write anything else rather than silently ship a
// wrong length. The line is short on purpose: ties on judge win
// rate break on fewer bytes, so every word here has to earn
// its place.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.includes("\n")) {
  throw new Error(`expected 1-200 characters on one line, got ${chars}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
