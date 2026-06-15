// Analogy data for problems 51-100 (keyed by approach name)
module.exports = {
  51: { "BST property walk": "Like a phone book — if both names are before or after the current page, go that direction; otherwise you found the split point." },
  52: { "BFS queue by level": "Like ripples in a pond — process one ring of nodes at a time, enqueue the next ring." },
  53: {
    "BFS last node per level": "Like watching a parade from the right — the last person in each row is what you see.",
    "DFS right-first preorder": "Like peeking around corners right-first — the first node you discover at each depth is the rightmost visible one.",
  },
  54: { "DFS track path max": "Like a hero's journey — a node is 'good' if no stronger enemy appeared on the path from the start." },
  55: { "In-order or min/max bounds": "Like a thermostat range — each node must stay strictly between its parent's lower and upper limits." },
  56: {
    "In-order traversal": "Like reading a BST like a sorted list — visit left, then node, then right; the kth visit is the answer.",
    "Iterative stack in-order": "Like reading a BST with bookmarks — push left spine, pop and visit, then dive into the right subtree.",
  },
  57: { "Recursive with hash map index": "Like assembling a tree from a preorder blueprint — the inorder index tells you where to split left and right." },
  58: { "Post-order max gain": "Like a toll road through a tree — the best path through a node combines the best gains from both subtrees." },
  59: {
    "Preorder with null markers": "Like dictating a tree over the phone — say each node, and 'null' for empty branches.",
    "BFS level serialization": "Like reading a tree row by row, including empty seats — rebuild level by level from the queue.",
  },
  60: { "Min-heap of size k": "Like keeping the k largest trophies on a shelf — evict the smallest whenever a bigger one arrives." },
  61: { "Max-heap smash simulation": "Like smashing the two heaviest rocks together — repeat until one or none remain." },
  62: {
    "Max-heap of size k": "Like keeping the k closest parking spots — evict the farthest whenever a closer one appears.",
    "Quickselect": "Like partitioning a crowd by height — narrow to the k shortest partition without fully sorting everyone.",
  },
  63: {
    "Min-heap of size k": "Like a leaderboard that only keeps the top k — the smallest in the heap is the kth largest overall.",
    "Quickselect": "Like finding the kth tallest person without ranking everyone — partition and recurse on the right group.",
  },
  64: { "Max-heap + idle slots formula": "Like scheduling the busiest task first with mandatory breaks — the most frequent task sets the minimum frame size." },
  65: { "Hash map feeds + heap merge": "Like merging Twitter timelines — collect recent posts from followed accounts and pick the top 10 by time." },
  66: { "Two heaps (max + min)": "Like splitting a class into upper and lower halves — the median sits at the boundary between two heaps." },
  67: { "Include/exclude recursion": "Like packing a suitcase — for each item, decide to take it or leave it, exploring both choices." },
  68: { "Backtrack with reuse": "Like making change with reusable coins — pick a coin, stay at the same index, backtrack when over target." },
  69: {
    "Swap-based backtracking": "Like arranging people in a line by swapping — fix position i, try every person for that spot, undo the swap.",
    "Used array backtracking": "Like seating guests one by one — try each unused person at the current chair, backtrack when all seats are filled.",
  },
  70: { "Sort + skip duplicates": "Like building subsets from sorted beads — skip identical beads at the same decision level to avoid duplicates." },
  71: { "Sort + no reuse backtrack": "Like picking coins once each from a sorted pile — include or skip, but never reuse the same coin." },
  72: { "DFS backtrack on board": "Like tracing a word in a word search — walk adjacent cells, mark visited, undo on dead ends." },
  73: { "Backtrack with palindrome check": "Like cutting a string into palindrome slices — try every cut point, backtrack if the piece isn't a palindrome." },
  74: { "Digit-to-letters backtrack": "Like dialing old phone keys — each digit opens a branch of possible letter combinations." },
  75: { "Column/diag set backtrack": "Like placing queens on a chessboard row by row — track attacked columns and diagonals, backtrack on conflict." },
  76: { "Open/close count backtrack": "Like balancing parentheses — add '(' when you can open more, add ')' only when you have unmatched opens." },
  77: { "Array/map children trie": "Like a prefix tree in a dictionary — each letter is a hallway; words end at marked rooms." },
  78: { "Trie + DFS for wildcards": "Like searching a dictionary with blank tiles — at '.', try every possible letter branch." },
  79: { "Trie + board DFS prune": "Like a word search guided by a dictionary — follow trie paths on the board and prune dead branches early." },
  80: {
    "DFS flood fill": "Like spilling paint on connected land — mark every reachable '1' from each unvisited starting cell.",
    "BFS flood fill": "Like a flood spreading level by level — enqueue neighbors and mark all connected land cells.",
  },
  81: {
    "DFS with hash map clone": "Like cloning a social network — map each friend to their copy, then wire up the copy's friend list.",
    "BFS clone": "Like cloning a social network breadth-first — create copies layer by layer, linking neighbors as you go.",
  },
  82: { "DFS area count": "Like measuring each island's landmass — flood fill and count cells in the largest connected region." },
  83: { "DFS from both oceans": "Like rain flowing downhill to the sea — start from both coasts inward and find cells reachable from both." },
  84: {
    "DFS from border O's": "Like marking safe zones from the edges — only interior O's not connected to the border get captured.",
    "BFS from borders": "Like marking safe zones from the edges — flood from border O's; remaining interior O's are surrounded.",
  },
  85: { "Multi-source BFS": "Like rot spreading from all rotten oranges at once — each minute infects adjacent fresh ones simultaneously." },
  86: { "Multi-source BFS from gates": "Like ripples from every door — distance to the nearest gate spreads outward in waves." },
  87: {
    "Kahn's topological sort": "Like taking courses with no prerequisites first — peel off zero-indegree nodes layer by layer.",
    "DFS cycle detection": "Like detecting circular prerequisites — a node still 'in progress' when revisited means a cycle.",
  },
  88: {
    "Kahn's BFS order": "Like scheduling tasks — finish courses with no remaining prerequisites first, in BFS order.",
    "DFS post-order": "Like finishing dependencies before the course itself — reverse post-order gives a valid schedule.",
  },
  89: { "Union-Find last redundant edge": "Like wiring a network — the first edge connecting already-connected nodes is redundant." },
  90: {
    "Union-Find count": "Like counting friend groups — merge connected people and count distinct group leaders.",
    "DFS count components": "Like counting isolated islands in a social graph — each unvisited node starts a new DFS group.",
  },
  91: {
    "Union-Find no cycle + connected": "Like checking if wires form a tree — n−1 connections with no cycles and everyone reachable.",
    "BFS/DFS connectivity": "Like checking if a road network is one connected tree — exactly n−1 roads and all nodes reachable.",
  },
  92: { "BFS shortest transformation": "Like word ladder rungs — BFS finds the shortest chain of one-letter changes to the target." },
  93: {
    "Hierholzer Eulerian path": "Like walking every flight route exactly once — consume edges in DFS post-order, then reverse for the itinerary.",
    "DFS post-order": "Like using every ticket exactly once — DFS eats edges and builds the route in reverse order.",
  },
  94: {
    "Prim's MST": "Like growing a cable network — always connect the cheapest outside point to the existing tree.",
    "Kruskal with Union-Find": "Like building roads cheapest-first — merge components with the smallest edges until all are connected.",
  },
  95: { "Dijkstra from source": "Like GPS routing — always relax the closest unvisited node to find shortest times to everyone." },
  96: {
    "Binary search on max height": "Like finding the lowest water level that still connects start to finish — binary search the max elevation on the path.",
    "Dijkstra on grid": "Like swimming through rising water — track the worst height on your path and always take the easiest next step.",
  },
  97: { "Build graph + topological sort": "Like deducing alphabet order from a dictionary — adjacent word pairs give letter precedence edges." },
  98: {
    "Bellman-Ford K iterations": "Like budgeted travel — relax all routes exactly k+1 times, copying distances each round.",
    "BFS with (node, stops, cost)": "Like finding the cheapest flight with a layover limit — BFS tracks stops used and prunes over-budget paths.",
  },
  99: { "Fibonacci DP": "Like climbing stairs two ways at a time — ways to reach step n = ways to (n−1) + ways to (n−2)." },
  100: { "Bottom-up min of prev two": "Like choosing the cheaper of the last two steps before paying for the current one — minimize total stair cost." },
};
