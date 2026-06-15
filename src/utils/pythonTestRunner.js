const MARKER = '__LF_TEST__';

/** Convert JSON value to a Python literal string (legacy helper). */
export function toPythonLiteral(value) {
  return JSON.stringify(value)
    .replace(/\btrue\b/g, 'True')
    .replace(/\bfalse\b/g, 'False')
    .replace(/\bnull\b/g, 'None');
}

function normalizeTestEntry(test, index) {
  if (typeof test === 'string') {
    return { type: 'script', label: `Test ${index + 1}`, script: test };
  }
  return test;
}

export function buildTestHarness(solutionCode, tests) {
  if (!tests?.length) return solutionCode;

  const blocks = tests.map((raw, i) => {
    const test = normalizeTestEntry(raw, i);
    if (test.type === 'expr') {
      return buildExprBlock(test, i);
    }
    return buildScriptBlock(test, i);
  });

  return `${solutionCode.trim()}

import json

${blocks.join('\n')}
`;
}

function buildExprBlock(test, index) {
  const payload = {
    index,
    label: test.label || `Test ${index + 1}`,
    input: test.input || '',
  };
  const expectedJson = JSON.stringify(test.expected);

  return `
try:
    _actual = eval(${JSON.stringify(test.call)})
    _expected = json.loads(${JSON.stringify(expectedJson)})
    _base = ${JSON.stringify(payload)}
    if _actual == _expected:
        _base["status"] = "passed"
        print(${JSON.stringify(MARKER)} + json.dumps(_base, default=str))
    else:
        _base["status"] = "failed"
        _base["expected"] = _expected
        _base["actual"] = _actual
        print(${JSON.stringify(MARKER)} + json.dumps(_base, default=str))
except Exception as _e:
    _fail = ${JSON.stringify(payload)}
    _fail["status"] = "failed"
    _fail["error"] = str(_e)
    print(${JSON.stringify(MARKER)} + json.dumps(_fail, default=str))
`;
}

function buildScriptBlock(test, index) {
  const payload = {
    index,
    label: test.label || `Test ${index + 1}`,
    script: test.script,
  };

  return `
try:
    exec(${JSON.stringify(test.script)})
    _base = ${JSON.stringify({ index, label: payload.label, input: 'See script' })}
    _base["status"] = "passed"
    print(${JSON.stringify(MARKER)} + json.dumps(_base, default=str))
except Exception as _e:
    _fail = ${JSON.stringify(payload)}
    _fail["status"] = "failed"
    _fail["error"] = str(_e)
    print(${JSON.stringify(MARKER)} + json.dumps(_fail, default=str))
`;
}

export function parseTestResults(stdout) {
  const results = [];

  for (const line of stdout.split('\n')) {
    const idx = line.indexOf(MARKER);
    if (idx === -1) continue;
    try {
      results.push(JSON.parse(line.slice(idx + MARKER.length)));
    } catch {
      /* skip malformed lines */
    }
  }

  results.sort((a, b) => a.index - b.index);
  const passed = results.filter((r) => r.status === 'passed').length;

  return {
    results,
    summary: { passed, total: results.length, failed: results.length - passed },
  };
}

export function getProblemPython(problem) {
  return problem.python ?? null;
}
