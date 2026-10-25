#!/usr/bin/env node
// Lesson 1 check: confirms notes.md exists and isn't empty.
// It doesn't judge the content — a reviewer does that.

const fs = require("fs");
const path = require("path");

const file = path.join(process.cwd(), "notes.md");

if (!fs.existsSync(file)) {
  console.error("FAIL  notes.md is missing. Add it with your prediction and Claude's summary, then push again.");
  process.exit(1);
}

// Counts whitespace-separated words, so the check can report how much was written.
function countWords(text) {
  const trimmed = text.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}

const content = fs.readFileSync(file, "utf8");
const words = countWords(content);

if (words === 0) {
  console.error("FAIL  notes.md is empty. Add your prediction and Claude's summary, then push again.");
  process.exit(1);
}

console.log(`PASS  notes.md is present and has content (${words} words).`);

// Advisory only: a very short file is probably missing the prediction or the summary.
const MIN_SUGGESTED_WORDS = 20;
if (words < MIN_SUGGESTED_WORDS) {
  console.warn(`WARN  notes.md has only ${words} words. Did you include both your prediction and Claude's summary?`);
}
