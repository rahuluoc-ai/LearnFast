import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/neetcode150.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let errors = 0;

function validateTest(test, problemId, title, i) {
  const prefix = `#${problemId} ${title} test ${i + 1}`;

  if (typeof test === 'string') {
    console.error(`${prefix}: tests must be structured objects (re-run npm run apply:python)`);
    errors++;
    return;
  }

  if (!test.type || !['expr', 'script'].includes(test.type)) {
    console.error(`${prefix}: invalid type "${test.type}"`);
    errors++;
    return;
  }

  if (test.type === 'expr') {
    if (!test.call?.trim()) {
      console.error(`${prefix}: expr test missing call`);
      errors++;
    }
    if (test.expected === undefined && test.expectedExpr === undefined) {
      console.error(`${prefix}: expr test missing expected`);
      errors++;
    }
  }

  if (test.type === 'script') {
    if (!test.script?.trim()) {
      console.error(`${prefix}: script test missing script`);
      errors++;
    }
  }
}

if (data.problems.length !== 150) {
  console.error(`Expected 150 problems, got ${data.problems.length}`);
  errors++;
}

for (const p of data.problems) {
  if (!p.summary || !p.summary.trim()) {
    console.error(`Missing summary: #${p.id} ${p.title}`);
    errors++;
  }
  if (!p.python?.solution?.trim()) {
    console.error(`Missing python solution: #${p.id} ${p.title}`);
    errors++;
  }
  if (!p.python?.tests || p.python.tests.length < 2) {
    console.error(`Missing python tests (need ≥2): #${p.id} ${p.title}`);
    errors++;
  } else {
    p.python.tests.forEach((t, i) => validateTest(t, p.id, p.title, i));
  }
  for (const a of p.approaches) {
    if (a.optimal) {
      if (!a.steps || a.steps.length < 3 || a.steps.length > 6) {
        console.error(
          `Invalid steps (${a.steps?.length ?? 0}, want 3–6) for optimal "${a.name}" on #${p.id} ${p.title}`
        );
        errors++;
      }
      if (!a.analogy || !a.analogy.trim()) {
        console.error(`Missing analogy for optimal approach "${a.name}" on #${p.id} ${p.title}`);
        errors++;
      }
    } else {
      if (a.steps) {
        console.error(`Sub-optimal approach has steps: "${a.name}" on #${p.id} ${p.title}`);
        errors++;
      }
      if (a.analogy) {
        console.error(`Sub-optimal approach has analogy: "${a.name}" on #${p.id} ${p.title}`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  const optimalCount = data.problems.reduce(
    (n, p) => n + p.approaches.filter((a) => a.optimal).length,
    0
  );
  const pythonCount = data.problems.filter((p) => p.python?.solution).length;
  const testCount = data.problems.reduce((n, p) => n + (p.python?.tests?.length ?? 0), 0);
  console.log(
    `OK: 150 problems, ${optimalCount} optimal approaches, ${pythonCount} python solutions, ${testCount} structured tests`
  );
  process.exit(0);
} else {
  console.error(`${errors} validation error(s)`);
  process.exit(1);
}
