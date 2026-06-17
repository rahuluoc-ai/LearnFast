import { getPatternAnimation } from './patternAnimationDefs';

const PATTERN_TO_VISUAL = {
  hashing: 'array-hash',
  'two-pointers': 'two-pointers',
  'sliding-window': 'sliding-window',
  stack: 'stack',
  bfs: 'tree-bfs',
  dfs: 'tree-bfs',
  '1d-dp': 'dp-1d',
  '2d-dp': 'dp-1d',
};

/** Flagship problems with hand-tuned sample data */
const PROBLEM_OVERRIDES = {
  1: {
    title: 'Contains Duplicate',
    frames: [
      {
        id: 'p1-0',
        caption: 'Create an empty hash set.',
        durationMs: 900,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: -1, hashSet: [], highlight: [] },
      },
      {
        id: 'p1-1',
        caption: 'For each num: if num is already in set, return true.',
        durationMs: 1000,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: 3, hashSet: [1, 2, 3], highlight: [3], flash: [3] },
      },
      {
        id: 'p1-2',
        caption: 'Add num to the set.',
        durationMs: 900,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: 1, hashSet: [1], highlight: [1] },
      },
      {
        id: 'p1-3',
        caption: 'Return false after processing all elements.',
        durationMs: 900,
        visuals: { type: 'array-hash', array: [1, 2, 3, 4], pointer: 3, hashSet: [1, 2, 3, 4], highlight: [] },
      },
    ],
  },
  3: {
    title: 'Two Sum',
    frames: [
      {
        id: 'p3-0',
        caption: 'Create a map from value to index.',
        durationMs: 900,
        visuals: { type: 'array-hash', array: [2, 7, 11, 15], pointer: -1, hashSet: [], highlight: [] },
      },
      {
        id: 'p3-1',
        caption: 'For each num, compute complement = target - num.',
        durationMs: 1000,
        visuals: { type: 'two-pointers', array: [2, 7, 11, 15], lo: 0, hi: 0, sum: 2, target: 9 },
      },
      {
        id: 'p3-2',
        caption: 'If complement exists in map, return [map[complement], i].',
        durationMs: 1100,
        visuals: {
          type: 'two-pointers',
          array: [2, 7, 11, 15],
          lo: 0,
          hi: 1,
          sum: 9,
          target: 9,
          highlight: [0, 1],
        },
      },
    ],
  },
  16: {
    title: 'Longest Substring Without Repeating Characters',
    frames: [
      {
        id: 'p16-0',
        caption: 'Expand window by moving right pointer.',
        durationMs: 900,
        visuals: { type: 'sliding-window', array: ['a', 'b', 'c', 'a'], window: [0, 2], invalid: false },
      },
      {
        id: 'p16-1',
        caption: 'If duplicate in window, jump left past last repeat.',
        durationMs: 1100,
        visuals: { type: 'sliding-window', array: ['a', 'b', 'c', 'a'], window: [0, 3], invalid: true },
      },
      {
        id: 'p16-2',
        caption: 'Track maximum window length seen.',
        durationMs: 900,
        visuals: { type: 'sliding-window', array: ['a', 'b', 'c', 'a'], window: [1, 3], invalid: false, highlight: [1, 3] },
      },
    ],
  },
  21: {
    title: 'Valid Parentheses',
    frames: [
      {
        id: 'p21-0',
        caption: 'Push opening brackets onto stack.',
        durationMs: 900,
        visuals: { type: 'stack', input: ['(', ')', '{', '}'], index: 0, stack: ['('] },
      },
      {
        id: 'p21-1',
        caption: 'On closing bracket, pop and match type.',
        durationMs: 1000,
        visuals: { type: 'stack', input: ['(', ')', '{', '}'], index: 1, stack: [] },
      },
      {
        id: 'p21-2',
        caption: 'Return true if stack empty at end.',
        durationMs: 900,
        visuals: { type: 'stack', input: ['(', ')', '{', '}'], index: 3, stack: [] },
      },
    ],
  },
  99: {
    title: 'Climbing Stairs',
    frames: [
      {
        id: 'p99-0',
        caption: 'dp[1]=1 and dp[2]=2.',
        durationMs: 900,
        visuals: { type: 'dp-1d', cells: [1, 2, null, null, null], active: 1, labels: ['1', '2', '3', '4', '5'] },
      },
      {
        id: 'p99-1',
        caption: 'For i from 3 to n: dp[i] = dp[i-1] + dp[i-2].',
        durationMs: 1000,
        visuals: { type: 'dp-1d', cells: [1, 2, 3, null, null], active: 2, highlight: [0, 1] },
      },
      {
        id: 'p99-2',
        caption: 'Return dp[n].',
        durationMs: 900,
        visuals: { type: 'dp-1d', cells: [1, 2, 3, 5, 8], active: 4, highlight: [4] },
      },
    ],
  },
};

function parseArrayFromInput(inputStr) {
  if (!inputStr) return [];
  const match = inputStr.match(/=\s*(\[[^\]]*\])/);
  if (match) {
    try {
      return JSON.parse(match[1].replace(/'/g, '"'));
    } catch {
      return [];
    }
  }
  return [];
}

function buildGenericFrames(problem, approach, patternId) {
  const visualType = PATTERN_TO_VISUAL[patternId] || 'generic';
  const steps = approach?.steps ?? [];
  const primaryPatternAnim = getPatternAnimation(patternId);
  const sampleVisuals = primaryPatternAnim?.frames?.[0]?.visuals;

  return steps.map((caption, i) => ({
    id: `auto-${problem.id}-${i}`,
    caption,
    durationMs: 900,
    visuals: sampleVisuals
      ? { ...sampleVisuals, type: visualType }
      : { type: 'generic' },
  }));
}

export function buildProblemFlow(problem, approach, scenarioIndex = 0) {
  const override = PROBLEM_OVERRIDES[problem.id];
  if (override) {
    return {
      title: override.title || problem.title,
      subtitle: approach?.name,
      frames: override.frames,
    };
  }

  const patternId = problem.patterns?.[0];
  const patternAnim = getPatternAnimation(patternId);
  if (patternAnim) {
    return {
      title: problem.title,
      subtitle: approach?.name,
      frames: patternAnim.frames.map((f, i) => ({
        ...f,
        id: `prob-${problem.id}-${f.id}`,
        caption: approach?.steps?.[i] ?? f.caption,
      })),
    };
  }

  const test = problem.python?.tests?.[scenarioIndex];
  const inputArr = test?.input ? parseArrayFromInput(test.input) : [];

  const frames = buildGenericFrames(problem, approach, patternId);
  if (inputArr.length && frames[0]?.visuals?.array) {
    frames.forEach((f) => {
      if (f.visuals.array) f.visuals = { ...f.visuals, array: inputArr };
    });
  }

  return {
    title: problem.title,
    subtitle: approach?.name,
    frames,
  };
}

export function getProblemScenarioCount(problem) {
  return problem.python?.tests?.length ?? 0;
}

export function hasProblemFlow(problem) {
  if (PROBLEM_OVERRIDES[problem.id]) return true;
  const patternId = problem.patterns?.[0];
  if (getPatternAnimation(patternId)) return true;
  return (problem.approaches?.find((a) => a.optimal)?.steps?.length ?? 0) > 0;
}
