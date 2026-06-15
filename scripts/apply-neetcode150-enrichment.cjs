#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const part1 = require('./neetcode150-enrichment-part1.cjs');
const part2 = require('./neetcode150-enrichment-part2.cjs');
const part3 = require('./neetcode150-enrichment-part3.cjs');
const analogy1 = require('./neetcode150-analogy-part1.cjs');
const analogy2 = require('./neetcode150-analogy-part2.cjs');
const analogy3 = require('./neetcode150-analogy-part3.cjs');

const enrichment = { ...part1, ...part2, ...part3 };
const analogies = { ...analogy1, ...analogy2, ...analogy3 };

const dataPath = path.join(__dirname, '../data/neetcode150.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const missing = [];

for (const problem of data.problems) {
  const e = enrichment[problem.id];
  const a = analogies[problem.id];
  if (!e) {
    missing.push(`Problem ${problem.id}: ${problem.title}`);
    continue;
  }
  if (!a) {
    missing.push(`Problem ${problem.id} analogies: ${problem.title}`);
    continue;
  }

  problem.summary = e.summary;

  for (const approach of problem.approaches) {
    if (approach.optimal) {
      const steps = e.steps[approach.name];
      const analogy = a[approach.name];
      if (!steps) {
        missing.push(`Problem ${problem.id} approach "${approach.name}"`);
      } else {
        approach.steps = steps;
      }
      if (!analogy) {
        missing.push(`Problem ${problem.id} analogy "${approach.name}"`);
      } else {
        approach.analogy = analogy;
      }
    }
  }

  // Reorder: summary before approaches
  const reordered = {
    id: problem.id,
    title: problem.title,
    slug: problem.slug,
    leetcodeId: problem.leetcodeId,
    difficulty: problem.difficulty,
    category: problem.category,
    patterns: problem.patterns,
    summary: problem.summary,
    approaches: problem.approaches,
  };
  const idx = data.problems.indexOf(problem);
  data.problems[idx] = reordered;
}

if (missing.length > 0) {
  console.error('Missing enrichment for:');
  missing.forEach((m) => console.error('  -', m));
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');

// Verify
let summaryCount = 0;
let optimalCount = 0;
let stepsCount = 0;
let missingSummary = [];
let missingSteps = [];

for (const p of data.problems) {
  if (p.summary) summaryCount++;
  else missingSummary.push(p.id);

  for (const a of p.approaches) {
    if (a.optimal) {
      optimalCount++;
      if (a.steps && a.steps.length >= 3 && a.steps.length <= 6) stepsCount++;
      else missingSteps.push(`${p.id}:${a.name}`);
    }
  }
}

console.log('=== Verification ===');
console.log('Problems:', data.problems.length);
console.log('With summary:', summaryCount);
console.log('Optimal approaches:', optimalCount);
console.log('Optimal with valid steps (3-6):', stepsCount);

if (data.problems.length !== 150) {
  console.error('FAIL: expected 150 problems');
  process.exit(1);
}
if (summaryCount !== 150) {
  console.error('FAIL: missing summaries for:', missingSummary);
  process.exit(1);
}
if (stepsCount !== optimalCount) {
  console.error('FAIL: missing/invalid steps for:', missingSteps);
  process.exit(1);
}

console.log('PASS: All requirements met.');
