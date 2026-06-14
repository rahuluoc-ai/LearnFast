# Interview Pattern Cheatsheet

> read the signal → reach for the tool · NeetCode 150 patterns

## 60-Second Triage

1. **Name the input.** Array/string? Tree? Graph/grid? Intervals? A number? Sorted? Duplicates?
2. **Name the verb.** Find / count ways / optimize (min·max) / generate all / order / check feasible — the verb names the family.
3. **Read the constraints.** n tells you the target Big-O (table below), which rules patterns in or out.
4. **State brute force out loud,** then cut repeated work: a hash map, a sort, two pointers, or caching (DP).
5. **Confirm before coding.** Restate approach + complexity to the interviewer, then write.

## Constraints → Target Complexity

| Input size n | Aim for | Likely |
|---|---|---|
| n ≤ 12 | permutations | O(n!) |
| n ≤ 20–25 | subset / bitmask | O(2ⁿ) |
| n ≤ 500 | DP, triple loop | O(n³) |
| n ≤ 5,000 | DP, nested loop | O(n²) |
| n ≤ 10⁵–10⁶ | sort / window / heap | O(n log n) |
| n > 10⁶ | single pass / math | O(n), O(log n) |

## Arrays & Strings

### Hashing — O(n)

**Signals:** "duplicate" · "frequency" · "seen before" · "count" · "lookup"

- **Do:** One pass, store counts / indices in a dict or set.
- **Use:** HashMap, HashSet
- **Gotcha:** Trading space for speed — confirm O(n) memory is OK.

### Two pointers — O(n)

**Signals:** "sorted array" · "pair / triplet sum" · "palindrome" · "in place"

- **Do:** Converge from both ends, or run two same-direction pointers.
- **Use:** Sorted array, lo/hi indices
- **Gotcha:** Skip equal neighbors to avoid duplicate triplets (3Sum).

### Sliding window — O(n)

**Signals:** "longest / shortest" · "contiguous" · "substring" · "min window"

- **Do:** Grow right; shrink left while the window breaks the constraint.
- **Use:** Two indices + a window count/map
- **Gotcha:** Decide fixed vs variable size, and the exact shrink condition.

### Stack — O(n)

**Signals:** "matching / valid" · "next greater / smaller" · "nested" · "histogram"

- **Do:** Push unresolved items; pop on match. Monotonic stack for next-greater.
- **Use:** Stack (often of indices)
- **Gotcha:** For next-greater, store indices, not values.

### Binary search — O(log n)

**Signals:** "sorted" · "minimize the max" · "smallest / largest x such that"

- **Do:** Halve the space; or binary-search the answer when feasibility is monotonic.
- **Use:** lo/hi bounds, mid check
- **Gotcha:** Pick one convention (lo≤hi vs lo<hi) and keep mid moves consistent.

### Intervals — O(n log n)

**Signals:** "overlap" · "merge ranges" · "meeting rooms" · "scheduling"

- **Do:** Sort by start (sometimes end), then sweep comparing to the previous.
- **Use:** Sort + sweep / min-heap of ends
- **Gotcha:** Overlap test is prev.end > curr.start (mind ≥ vs >).

## Data Structures

### Linked list — O(n)

**Signals:** "reverse" · "cycle" · "k-group" · "merge lists" · "nth from end"

- **Do:** Use dummy head, fast/slow pointers, or in-place reversal.
- **Use:** Dummy node, Floyd's cycle detection, prev/curr pointers
- **Gotcha:** Save next before reversing; handle odd-length lists for middle.

## Trees & Graphs

### DFS — O(V+E)

**Signals:** "explore all paths" · "subtree" · "connected" · "reachable"

- **Do:** Recurse / explicit stack. Decide what to return up vs pass down.
- **Use:** Recursion, visited set (graphs)
- **Gotcha:** Graphs need a visited set; trees usually don't.

### BFS — O(V+E)

**Signals:** "level order" · "shortest path (unweighted)" · "nearest / fewest steps"

- **Do:** Queue, process layer by layer; first time you reach a node is shortest.
- **Use:** Queue, visited set
- **Gotcha:** Mark visited when enqueuing, not when dequeuing.

### Topological sort — O(V+E)

**Signals:** "prerequisites" · "build / course order" · "dependency" · "DAG"

- **Do:** Kahn's: repeatedly remove zero-indegree nodes; or DFS post-order.
- **Use:** Indegree array + queue
- **Gotcha:** If not all nodes get ordered, there's a cycle → impossible.

### Union-Find — ~O(α n)

**Signals:** "connectivity" · "components" · "detect cycle" · "merge groups"

- **Do:** parent[] with union-by-rank + path compression.
- **Use:** Disjoint Set Union
- **Gotcha:** Cycle found when union of two already-joined nodes fails.

### Weighted shortest path — O(E log V)

**Signals:** "shortest / cheapest path" · "weights" · "min cost to reach"

- **Do:** Dijkstra (non-negative). Bellman-Ford if negative edges / K-stops limit.
- **Use:** Min-heap of (dist, node)
- **Gotcha:** Dijkstra breaks with negative weights — switch algorithm.

### Trie — O(L)

**Signals:** "prefix" · "autocomplete" · "dictionary of words" · "starts with"

- **Do:** Character tree, end-of-word flag on terminal nodes.
- **Use:** Nested maps / children array
- **Gotcha:** Board search (Word Search II) = Trie + DFS together.

## Optimization: Search, Greedy, DP

### Backtracking — O(2ⁿ)/O(n!)

**Signals:** "all subsets / permutations / combinations" · "generate every"

- **Do:** Choose → recurse → undo. Prune branches that can't succeed.
- **Use:** Recursion + path list
- **Gotcha:** Append a *copy* of the path to results, not the live list.

### Heap / priority queue — O(n log k)

**Signals:** "top K" · "Kth largest" · "stream" · "median" · "merge K"

- **Do:** Keep a size-K heap; two heaps (max+min) for a running median.
- **Use:** Min-heap / max-heap
- **Gotcha:** For K *largest*, keep a *min*-heap of size K.

### Greedy — O(n log n)

**Signals:** "take best option now" · "maximize / minimize" + sortable

- **Do:** Sort, then commit to the locally best choice each step.
- **Use:** Sort + running state
- **Gotcha:** If you can't argue the local choice is safe, it's probably DP.

### 1-D DP — O(n)

**Signals:** "count ways" · "min / max" · "can reach" · overlapping subproblems

- **Do:** Define dp[i] from earlier states; memoize, then go bottom-up.
- **Use:** 1-D array / two variables
- **Gotcha:** Get the state definition + base case right before the recurrence.

### 2-D DP — O(m·n)

**Signals:** "two strings" · "grid paths" · state needs two indices

- **Do:** Fill a dp[i][j] table from its neighbors (often i-1, j-1).
- **Use:** 2-D table
- **Gotcha:** Seed the base row/column; watch off-by-one on string lengths.

### Math & geometry — O(n)–O(n²)

**Signals:** "matrix" · "spiral" · "rotate" · "pow" · "geometry" · "simulate"

- **Do:** Use math identities, layer-by-layer traversal, or coordinate hashing.
- **Use:** Matrix indices, fast exponentiation, hash map of points
- **Gotcha:** Watch overflow on pow/reverse integer; in-place matrix needs cycle tracking.

### Bit manipulation — O(1)/O(b)

**Signals:** "without +/-" · "single number" · "count bits" · "power of two"

- **Do:** XOR, AND/OR masks, shifts.
- **Use:** Bit ops
- **Gotcha:** XOR cancels pairs; `n & (n-1)` clears the lowest set bit.

## If You Freeze — Run Through These

- Can I sort it?
- Would a hash map kill the nested loop?
- Two pointers after sorting?
- What subresult could I cache?
- Is it secretly a graph?
- Draw it on 3 small inputs.
- Solve brute force, then optimize.
- What does the constraint size hint at?

---

Spot the signal first, pick the structure second, then code. Same drill every time.
