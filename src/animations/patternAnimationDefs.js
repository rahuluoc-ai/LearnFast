/** Hand-tuned concept flows for core patterns. */

export const PATTERN_ANIMATIONS = {
  hashing: {
    title: 'Hashing',
    subtitle: 'One pass — store what you have seen',
    frames: [
      {
        id: 'h0',
        caption: 'Start with an empty hash set.',
        durationMs: 900,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: -1, hashSet: [], highlight: [] },
      },
      {
        id: 'h1',
        caption: 'Read nums[0] = 1. Not in set — add it.',
        durationMs: 1000,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: 0, hashSet: [1], highlight: [0] },
      },
      {
        id: 'h2',
        caption: 'Read nums[1] = 2. Not in set — add it.',
        durationMs: 1000,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: 1, hashSet: [1, 2], highlight: [1] },
      },
      {
        id: 'h3',
        caption: 'Read nums[2] = 3. Not in set — add it.',
        durationMs: 1000,
        visuals: { type: 'array-hash', array: [1, 2, 3, 1], pointer: 2, hashSet: [1, 2, 3], highlight: [2] },
      },
      {
        id: 'h4',
        caption: 'Read nums[3] = 1. Already in set — duplicate found!',
        durationMs: 1200,
        visuals: {
          type: 'array-hash',
          array: [1, 2, 3, 1],
          pointer: 3,
          hashSet: [1, 2, 3],
          highlight: [3],
          flash: [3],
        },
      },
    ],
  },

  'two-pointers': {
    title: 'Two pointers',
    subtitle: 'Converge from both ends on a sorted array',
    frames: [
      {
        id: 'tp0',
        caption: 'Sorted array. lo at start, hi at end.',
        durationMs: 900,
        visuals: { type: 'two-pointers', array: [1, 2, 4, 6, 8, 9], lo: 0, hi: 5, sum: null, target: 10 },
      },
      {
        id: 'tp1',
        caption: 'sum = 1 + 9 = 10. Found target pair!',
        durationMs: 1100,
        visuals: {
          type: 'two-pointers',
          array: [1, 2, 4, 6, 8, 9],
          lo: 0,
          hi: 5,
          sum: 10,
          target: 10,
          highlight: [0, 5],
        },
      },
      {
        id: 'tp2',
        caption: 'If sum too small → move lo right. Too large → move hi left.',
        durationMs: 1100,
        visuals: { type: 'two-pointers', array: [1, 2, 4, 6, 8, 9], lo: 1, hi: 4, sum: 6, target: 10 },
      },
    ],
  },

  'sliding-window': {
    title: 'Sliding window',
    subtitle: 'Grow right, shrink left when invalid',
    frames: [
      {
        id: 'sw0',
        caption: 'Expand window by moving right pointer.',
        durationMs: 900,
        visuals: {
          type: 'sliding-window',
          array: ['a', 'b', 'c', 'a', 'b'],
          window: [0, 2],
          invalid: false,
        },
      },
      {
        id: 'sw1',
        caption: 'Window [0..3] contains duplicate "a" — shrink from left.',
        durationMs: 1100,
        visuals: {
          type: 'sliding-window',
          array: ['a', 'b', 'c', 'a', 'b'],
          window: [0, 3],
          invalid: true,
        },
      },
      {
        id: 'sw2',
        caption: 'After shrink: window [1..3] is valid again.',
        durationMs: 1000,
        visuals: {
          type: 'sliding-window',
          array: ['a', 'b', 'c', 'a', 'b'],
          window: [1, 3],
          invalid: false,
        },
      },
      {
        id: 'sw3',
        caption: 'Keep best window length seen so far.',
        durationMs: 900,
        visuals: {
          type: 'sliding-window',
          array: ['a', 'b', 'c', 'a', 'b'],
          window: [1, 4],
          invalid: false,
          highlight: [1, 4],
        },
      },
    ],
  },

  stack: {
    title: 'Stack',
    subtitle: 'Push opens, pop on match',
    frames: [
      {
        id: 'st0',
        caption: 'Scan "(" — push onto stack.',
        durationMs: 900,
        visuals: { type: 'stack', input: ['(', ')', '{', '}', '[', ']'], index: 0, stack: ['('] },
      },
      {
        id: 'st1',
        caption: 'Scan ")" — top is "(" → pop, valid match.',
        durationMs: 1000,
        visuals: { type: 'stack', input: ['(', ')', '{', '}', '[', ']'], index: 1, stack: [] },
      },
      {
        id: 'st2',
        caption: 'Scan "{" — push. Scan "}" — pop match.',
        durationMs: 1000,
        visuals: { type: 'stack', input: ['(', ')', '{', '}', '[', ']'], index: 3, stack: [] },
      },
      {
        id: 'st3',
        caption: 'Mismatch or leftover opens → invalid.',
        durationMs: 900,
        visuals: { type: 'stack', input: ['(', ')'], index: 1, stack: [], invalid: false },
      },
    ],
  },

  bfs: {
    title: 'BFS',
    subtitle: 'Queue processes level by level',
    frames: [
      {
        id: 'b0',
        caption: 'Enqueue start node. Mark visited.',
        durationMs: 900,
        visuals: {
          type: 'tree-bfs',
          levels: [['A'], ['B', 'C'], ['D', 'E', 'F']],
          visited: ['A'],
          queue: ['B', 'C'],
          current: 'A',
        },
      },
      {
        id: 'b1',
        caption: 'Dequeue B, enqueue its children.',
        durationMs: 1000,
        visuals: {
          type: 'tree-bfs',
          levels: [['A'], ['B', 'C'], ['D', 'E', 'F']],
          visited: ['A', 'B'],
          queue: ['C', 'D', 'E'],
          current: 'B',
        },
      },
      {
        id: 'b2',
        caption: 'First visit at each depth = shortest path (unweighted).',
        durationMs: 1000,
        visuals: {
          type: 'tree-bfs',
          levels: [['A'], ['B', 'C'], ['D', 'E', 'F']],
          visited: ['A', 'B', 'C', 'D', 'E', 'F'],
          queue: [],
          current: 'F',
        },
      },
    ],
  },

  '1d-dp': {
    title: '1-D DP',
    subtitle: 'Each state builds on previous subproblems',
    frames: [
      {
        id: 'd0',
        caption: 'Climbing stairs: ways(1)=1, ways(2)=2.',
        durationMs: 900,
        visuals: { type: 'dp-1d', cells: [1, 2, null, null, null], active: 1, labels: ['i=1', 'i=2', 'i=3', 'i=4', 'i=5'] },
      },
      {
        id: 'd1',
        caption: 'ways(3) = ways(2) + ways(1) = 3',
        durationMs: 1000,
        visuals: { type: 'dp-1d', cells: [1, 2, 3, null, null], active: 2, highlight: [1, 2] },
      },
      {
        id: 'd2',
        caption: 'ways(4) = ways(3) + ways(2) = 5',
        durationMs: 1000,
        visuals: { type: 'dp-1d', cells: [1, 2, 3, 5, null], active: 3, highlight: [2, 3] },
      },
      {
        id: 'd3',
        caption: 'Fill table left-to-right. Answer at dp[n].',
        durationMs: 900,
        visuals: { type: 'dp-1d', cells: [1, 2, 3, 5, 8], active: 4, highlight: [4] },
      },
    ],
  },
};

export function getPatternAnimation(patternId) {
  return PATTERN_ANIMATIONS[patternId] ?? null;
}

export function hasPatternAnimation(patternId) {
  return Boolean(PATTERN_ANIMATIONS[patternId]);
}
