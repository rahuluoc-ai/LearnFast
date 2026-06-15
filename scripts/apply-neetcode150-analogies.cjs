#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const part1 = require('./neetcode150-analogy-part1.cjs');
const part2 = require('./neetcode150-analogy-part2.cjs');
const part3 = require('./neetcode150-analogy-part3.cjs');

const analogies = { ...part1, ...part2, ...part3 };

const dataPath = path.join(__dirname, '../data/neetcode150.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const missing = [];

for (const problem of data.problems) {
  const a = analogies[problem.id];
  if (!a) {
    missing.push(`Problem ${problem.id}: ${problem.title}`);
    continue;
  }

  for (const approach of problem.approaches) {
    if (approach.optimal) {
      const analogy = a[approach.name];
      if (!analogy) {
        missing.push(`Problem ${problem.id} approach "${approach.name}"`);
      } else {
        approach.analogy = analogy;
      }
    } else if (approach.analogy) {
      delete approach.analogy;
    }
  }
}

if (missing.length > 0) {
  console.error('Missing analogy for:');
  missing.forEach((m) => console.error('  -', m));
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');

let optimalCount = 0;
let analogyCount = 0;

for (const p of data.problems) {
  for (const approach of p.approaches) {
    if (approach.optimal) {
      optimalCount++;
      if (approach.analogy && approach.analogy.trim()) analogyCount++;
    }
  }
}

console.log(`Applied analogies: ${analogyCount}/${optimalCount} optimal approaches`);

if (analogyCount !== optimalCount) {
  process.exit(1);
}
