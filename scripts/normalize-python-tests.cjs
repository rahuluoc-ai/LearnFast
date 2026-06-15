/**
 * Normalize raw Python test strings into structured test objects.
 * @param {string[]} rawTests
 * @returns {object[]}
 */
function normalizeTests(rawTests) {
  return rawTests.map((raw, i) => normalizeOne(raw.trim(), i));
}

function normalizeOne(raw, index) {
  const label = `Test ${index + 1}`;

  if (raw.includes('\n') || raw.includes(';')) {
    return { type: 'script', label, script: raw };
  }

  const isNoneMatch = raw.match(/^assert\s+(.+?)\s+is\s+None\s*$/);
  if (isNoneMatch) {
    const call = isNoneMatch[1].trim();
    return {
      type: 'expr',
      label,
      input: deriveInput(call),
      call,
      expected: null,
    };
  }

  const eqMatch = raw.match(/^assert\s+(.+?)\s==\s+(.+)$/);
  if (eqMatch) {
    const call = eqMatch[1].trim();
    const expectedExpr = eqMatch[2].trim();
    return {
      type: 'expr',
      label,
      input: deriveInput(call),
      call,
      expected: parsePythonLiteral(expectedExpr),
      expectedExpr,
    };
  }

  return { type: 'script', label, script: raw };
}

function deriveInput(call) {
  const solutionCall = call.match(/^Solution\(\)\.(\w+)\((.*)\)$/s);
  if (solutionCall) {
    const [, method, args] = solutionCall;
    const trimmedArgs = args.trim();
    if (!trimmedArgs.includes(',')) {
      const param = guessSingleParam(method);
      if (param) return `${param} = ${trimmedArgs}`;
    }
    return `${method}(${trimmedArgs})`;
  }
  return call;
}

function guessSingleParam(method) {
  const lower = method.toLowerCase();
  if (
    lower.includes('anagram') ||
    lower.includes('palindrome') ||
    lower.includes('substring') ||
    lower.includes('decode') ||
    lower.includes('search') ||
    lower.includes('match')
  ) {
    return 's';
  }
  if (lower.includes('board') || lower.includes('grid') || lower.includes('matrix')) {
    return 'board';
  }
  if (lower.includes('tree') || lower.includes('root')) {
    return 'root';
  }
  if (lower.includes('list') || lower.includes('linked')) {
    return 'head';
  }
  return 'nums';
}

/** Best-effort parse of simple Python literals for JSON storage. */
function parsePythonLiteral(expr) {
  const trimmed = expr.trim();
  if (trimmed === 'True') return true;
  if (trimmed === 'False') return false;
  if (trimmed === 'None') return null;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith('[')) {
    try {
      const jsonish = trimmed
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null')
        .replace(/'/g, '"');
      return JSON.parse(jsonish);
    } catch {
      return trimmed;
    }
  }
  return trimmed;
}

module.exports = { normalizeTests, normalizeOne, parsePythonLiteral };
