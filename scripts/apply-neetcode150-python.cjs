#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { normalizeTests } = require('./normalize-python-tests.cjs');

const part1 = require('./neetcode150-python-part1.cjs');
const part2 = require('./neetcode150-python-part2.cjs');
const part3 = require('./neetcode150-python-part3.cjs');

const pythonData = { ...part1, ...part2, ...part3 };

const dataPath = path.join(__dirname, '../data/neetcode150.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const missing = [];
let exprCount = 0;
let scriptCount = 0;

for (const problem of data.problems) {
  const py = pythonData[problem.id];
  if (!py) {
    missing.push(`Problem ${problem.id}: ${problem.title}`);
    continue;
  }
  if (!py.solution?.trim()) {
    missing.push(`Problem ${problem.id} missing solution`);
    continue;
  }
  if (!py.tests?.length || py.tests.length < 2) {
    missing.push(`Problem ${problem.id} needs at least 2 tests`);
    continue;
  }

  const tests = normalizeTests(py.tests);
  for (const t of tests) {
    if (t.type === 'expr') exprCount++;
    else scriptCount++;
  }

  problem.python = {
    solution: py.solution.trim(),
    tests,
  };
}

if (missing.length > 0) {
  console.error('Missing python data for:');
  missing.forEach((m) => console.error('  -', m));
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');

let count = 0;
let testCount = 0;
for (const p of data.problems) {
  if (p.python) {
    count++;
    testCount += p.python.tests.length;
  }
}

console.log(
  `Applied python solutions: ${count}/150 problems, ${testCount} tests (${exprCount} expr, ${scriptCount} script)`
);

if (count !== 150) process.exit(1);
