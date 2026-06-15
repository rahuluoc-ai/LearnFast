// Enrichment data for problems 51-100
module.exports = {
  51: {
    summary: "Find the lowest common ancestor of two nodes in a BST.",
    steps: {
      "BST property walk": [
        "Start at root.",
        "If both values < root.val, go left.",
        "If both values > root.val, go right.",
        "Otherwise root is the LCA; return it."
      ]
    }
  },
  52: {
    summary: "Return level-order traversal of a binary tree (BFS by level).",
    steps: {
      "BFS queue by level": [
        "Initialize queue with root.",
        "While queue not empty, process all nodes at current level.",
        "Collect values into a level list, append to result.",
        "Enqueue children of current level nodes."
      ]
    }
  },
  53: {
    summary: "Return the values visible from the right side of a binary tree.",
    steps: {
      "BFS last node per level": [
        "BFS level by level with a queue.",
        "For each level, record every node value.",
        "Keep only the last value of each level.",
        "Return the collected right-side values."
      ],
      "DFS right-first preorder": [
        "DFS visiting right child before left.",
        "Track current depth; first visit at each depth is visible.",
        "Record node value when depth exceeds max depth seen.",
        "Return recorded values in order."
      ]
    }
  },
  54: {
    summary: "Count nodes where the path from root has no value greater than the node.",
    steps: {
      "DFS track path max": [
        "DFS with current path maximum.",
        "If node.val >= pathMax, increment good count.",
        "Recurse to children with updated max(pathMax, node.val).",
        "Return total good nodes."
      ]
    }
  },
  55: {
    summary: "Return true if a binary tree is a valid BST.",
    steps: {
      "In-order or min/max bounds": [
        "Pass down (min, max) bounds for each node.",
        "Return false if node.val <= min or >= max.",
        "Recurse left with (min, node.val) and right with (node.val, max).",
        "Return true if all nodes satisfy bounds."
      ]
    }
  },
  56: {
    summary: "Return the kth smallest value in a BST.",
    steps: {
      "In-order traversal": [
        "Perform in-order DFS (left, node, right).",
        "Increment counter on each node visit.",
        "Return node value when counter reaches k."
      ],
      "Iterative stack in-order": [
        "Push left spine onto stack from root.",
        "Pop, visit, then push left spine of right child.",
        "Return value on kth visit."
      ]
    }
  },
  57: {
    summary: "Build a binary tree from preorder and inorder traversal arrays.",
    steps: {
      "Recursive with hash map index": [
        "Map each inorder value to its index.",
        "Preorder root is first element; find its inorder index.",
        "Recursively build left subtree from left inorder segment.",
        "Recursively build right subtree from right inorder segment."
      ]
    }
  },
  58: {
    summary: "Return the maximum path sum between any two nodes in a binary tree.",
    steps: {
      "Post-order max gain": [
        "Post-order DFS returns max gain from node downward.",
        "At each node, compute path through node = leftGain + rightGain + val.",
        "Update global max with this path sum.",
        "Return node.val + max(leftGain, rightGain, 0) to parent."
      ]
    }
  },
  59: {
    summary: "Serialize and deserialize a binary tree to/from a string.",
    steps: {
      "Preorder with null markers": [
        "Serialize: preorder DFS, write 'null' for empty nodes.",
        "Deserialize: read tokens, build node or return null.",
        "Recurse left then right for each node.",
        "Return root of reconstructed tree."
      ],
      "BFS level serialization": [
        "Serialize: BFS queue, output values including nulls.",
        "Deserialize: read queue tokens level by level.",
        "Attach left and right children from queue.",
        "Return root when tree is built."
      ]
    }
  },
  60: {
    summary: "Design a class that returns the kth largest element in a stream.",
    steps: {
      "Min-heap of size k": [
        "Maintain a min-heap of the k largest elements seen.",
        "On add: push val; if size > k, pop smallest.",
        "Return heap top as kth largest.",
        "Heap always holds the k largest values."
      ]
    }
  },
  61: {
    summary: "Repeatedly smash the two heaviest stones; return the last stone weight.",
    steps: {
      "Max-heap smash simulation": [
        "Push all stone weights into a max-heap.",
        "While more than one stone, pop two largest y and x.",
        "If x != y, push y - x back.",
        "Return remaining stone or 0."
      ]
    }
  },
  62: {
    summary: "Return the k points closest to the origin (0, 0).",
    steps: {
      "Max-heap of size k": [
        "Compute squared distance for each point.",
        "Maintain max-heap of size k by distance.",
        "Pop and replace when a closer point is found.",
        "Return all points in the heap."
      ],
      "Quickselect": [
        "Partition points by distance around a pivot.",
        "Recursively narrow to the k smallest partition.",
        "Return first k points after partitioning.",
        "Average O(n) selection of k closest."
      ]
    }
  },
  63: {
    summary: "Find the kth largest element in an unsorted array.",
    steps: {
      "Min-heap of size k": [
        "Push elements into min-heap of size k.",
        "If heap exceeds k, pop smallest.",
        "Heap top is the kth largest element.",
        "Return heap top."
      ],
      "Quickselect": [
        "Choose pivot and partition array around it.",
        "Recurse on side containing the kth position.",
        "Return element at index k-1 when partition size is 1.",
        "Average O(n) time selection."
      ]
    }
  },
  64: {
    summary: "Find minimum intervals needed to complete all tasks with cooldown n.",
    steps: {
      "Max-heap + idle slots formula": [
        "Count task frequencies.",
        "Most frequent task determines frame: (maxFreq-1)*(n+1) + countAtMax.",
        "Answer is max of that formula and total tasks.",
        "Return computed minimum intervals."
      ]
    }
  },
  65: {
    summary: "Design Twitter with postTweet, getNewsFeed, follow, and unfollow.",
    steps: {
      "Hash map feeds + heap merge": [
        "Store user tweets (id, time) and follow graph in hash maps.",
        "On getNewsFeed, collect recent tweets from user + followees.",
        "Merge top 10 by time using a min-heap or sorting.",
        "Return the 10 most recent tweet ids."
      ]
    }
  },
  66: {
    summary: "Support addNum and findMedian for a stream of integers.",
    steps: {
      "Two heaps (max + min)": [
        "Maintain max-heap for lower half and min-heap for upper half.",
        "On addNum, push to appropriate heap and rebalance sizes.",
        "Keep sizes differing by at most 1.",
        "Median is top of max-heap or average of both tops."
      ]
    }
  },
  67: {
    summary: "Return all possible subsets (power set) of nums.",
    steps: {
      "Include/exclude recursion": [
        "Start with empty current subset.",
        "At each index, choose to include or exclude nums[i].",
        "On reaching end, append copy of current to result.",
        "Return all collected subsets."
      ]
    }
  },
  68: {
    summary: "Return all unique combinations where candidates sum to target (reuse allowed).",
    steps: {
      "Backtrack with reuse": [
        "Sort candidates (optional) and backtrack from index.",
        "Include candidate, recurse with same index (reuse).",
        "Exclude candidate, recurse with index+1.",
        "Record combination when sum equals target."
      ]
    }
  },
  69: {
    summary: "Return all permutations of nums.",
    steps: {
      "Swap-based backtracking": [
        "Fix position i and swap with each j >= i.",
        "Recurse on i+1 to build rest of permutation.",
        "Undo swap (backtrack) after recursion.",
        "Collect permutation when i reaches end."
      ],
      "Used array backtracking": [
        "Track which indices are used in current permutation.",
        "Try each unused element at current position.",
        "Recurse to fill next position.",
        "Backtrack by unmarking used on return."
      ]
    }
  },
  70: {
    summary: "Return all unique subsets of nums that may contain duplicates.",
    steps: {
      "Sort + skip duplicates": [
        "Sort nums to group duplicates.",
        "Backtrack: include or skip each element.",
        "When skipping, skip all equal elements at same level.",
        "Collect subset at each recursion leaf."
      ]
    }
  },
  71: {
    summary: "Return combinations summing to target using each candidate at most once.",
    steps: {
      "Sort + no reuse backtrack": [
        "Sort candidates and backtrack from start index.",
        "Include candidate and recurse from i+1.",
        "Skip candidate and recurse from i+1.",
        "Record when running sum equals target."
      ]
    }
  },
  72: {
    summary: "Return true if word exists in the board (adjacent cell path).",
    steps: {
      "DFS backtrack on board": [
        "For each cell matching first letter, start DFS.",
        "Mark cell visited, explore 4 neighbors for next char.",
        "Unmark on backtrack.",
        "Return true on full word match."
      ]
    }
  },
  73: {
    summary: "Return all ways to partition s such that every part is a palindrome.",
    steps: {
      "Backtrack with palindrome check": [
        "Try every end index for next partition from start.",
        "If substring is palindrome, add to path and recurse.",
        "Remove from path on backtrack.",
        "Collect path when start reaches end of s."
      ]
    }
  },
  74: {
    summary: "Return all letter combinations from a phone digit string.",
    steps: {
      "Digit-to-letters backtrack": [
        "Map each digit to its phone letters.",
        "Build current string character by character.",
        "Recurse to next digit index.",
        "Add completed string to result."
      ]
    }
  },
  75: {
    summary: "Return all distinct solutions to the n-queens puzzle.",
    steps: {
      "Column/diag set backtrack": [
        "Place queen row by row in valid columns.",
        "Track used columns and diagonals (row±col).",
        "Backtrack by removing queen from current row.",
        "Record board when all rows are placed."
      ]
    }
  },
  76: {
    summary: "Generate all combinations of n pairs of well-formed parentheses.",
    steps: {
      "Open/close count backtrack": [
        "Track open and close counts used so far.",
        "Add '(' if open < n.",
        "Add ')' if close < open.",
        "Record string when length is 2*n."
      ]
    }
  },
  77: {
    summary: "Implement a trie with insert, search, and startsWith operations.",
    steps: {
      "Array/map children trie": [
        "Each node stores children map and isEnd flag.",
        "Insert: walk/create nodes per character, mark end.",
        "Search: walk nodes; return false if missing or not end.",
        "startsWith: walk nodes; return false only if path missing."
      ]
    }
  },
  78: {
    summary: "Design a dictionary supporting addWord and search with '.' wildcards.",
    steps: {
      "Trie + DFS for wildcards": [
        "Store words in a trie via addWord.",
        "On search without '.', standard trie walk.",
        "On '.', DFS trying all children at that position.",
        "Return true if any branch matches full word."
      ]
    }
  },
  79: {
    summary: "Return all words from words[] found on the board.",
    steps: {
      "Trie + board DFS prune": [
        "Build trie from words; track word endings at nodes.",
        "DFS from each cell, following trie children.",
        "On word end, add to result and prune node to avoid duplicates.",
        "Backtrack marking/unmarking visited cells."
      ]
    }
  },
  80: {
    summary: "Count the number of islands ('1' land cells) in a 2D grid.",
    steps: {
      "DFS flood fill": [
        "Iterate each cell; on '1', increment count.",
        "DFS to mark all connected '1's as visited ('0').",
        "Explore 4 directions from each land cell.",
        "Return total island count."
      ],
      "BFS flood fill": [
        "Iterate each cell; on '1', increment count.",
        "BFS queue to mark all connected land cells visited.",
        "Enqueue 4-directional neighbors that are land.",
        "Return total island count."
      ]
    }
  },
  81: {
    summary: "Return a deep copy of an undirected connected graph.",
    steps: {
      "DFS with hash map clone": [
        "Map original node -> clone in hash map.",
        "DFS from given node; create clone if missing.",
        "Copy neighbors by recursing on each neighbor.",
        "Return clone of start node."
      ],
      "BFS clone": [
        "Map original -> clone; queue start node.",
        "For each node, ensure clone exists and link neighbors.",
        "Enqueue unvisited neighbors.",
        "Return clone of start node."
      ]
    }
  },
  82: {
    summary: "Return the area of the largest island in a binary grid.",
    steps: {
      "DFS area count": [
        "For each unvisited land cell, start DFS.",
        "Count cells in connected component.",
        "Mark visited during DFS.",
        "Return maximum area found."
      ]
    }
  },
  83: {
    summary: "Return cells that can flow to both Pacific and Atlantic oceans.",
    steps: {
      "DFS from both oceans": [
        "DFS from all Pacific border cells; mark reachable.",
        "DFS from all Atlantic border cells; mark reachable.",
        "Return cells marked by both DFS passes.",
        "Use reverse flow (height >= neighbor) from ocean inward."
      ]
    }
  },
  84: {
    summary: "Capture surrounded regions: flip 'O' to 'X' except those connected to border.",
    steps: {
      "DFS from border O's": [
        "DFS from every 'O' on the border; mark as safe.",
        "Scan interior: flip unmarked 'O' to 'X'.",
        "Restore safe marks to 'O'.",
        "Border-connected regions survive capture."
      ],
      "BFS from borders": [
        "BFS from all border 'O' cells; mark temporary safe.",
        "Flip all non-safe 'O' to 'X'.",
        "Restore safe cells to 'O'.",
        "Same logic as DFS variant."
      ]
    }
  },
  85: {
    summary: "Return minimum minutes until no fresh orange remains, or -1 if impossible.",
    steps: {
      "Multi-source BFS": [
        "Enqueue all rotten oranges; count fresh.",
        "BFS level by level, rotting adjacent fresh cells.",
        "Decrement fresh count on each newly rotted cell.",
        "Return minutes if fresh is 0, else -1."
      ]
    }
  },
  86: {
    summary: "Fill each empty room with its distance to the nearest gate.",
    steps: {
      "Multi-source BFS from gates": [
        "Enqueue all gate cells (distance 0).",
        "BFS outward to empty rooms.",
        "Set distance when first reached from a gate.",
        "Skip walls and already-filled rooms."
      ]
    }
  },
  87: {
    summary: "Return true if all courses can be finished given prerequisites.",
    steps: {
      "Kahn's topological sort": [
        "Build graph and indegree array.",
        "Enqueue nodes with indegree 0.",
        "Process queue, decrement neighbor indegrees.",
        "Return true if all nodes were processed."
      ],
      "DFS cycle detection": [
        "Build adjacency list from prerequisites.",
        "DFS with states: unvisited, visiting, visited.",
        "If edge leads to visiting node, cycle exists.",
        "Return false on cycle, true if no cycle."
      ]
    }
  },
  88: {
    summary: "Return a valid course ordering, or empty if impossible.",
    steps: {
      "Kahn's BFS order": [
        "Build graph and indegree counts.",
        "BFS queue of indegree-0 courses.",
        "Append to order and reduce neighbor indegrees.",
        "Return order if size equals numCourses, else []."
      ],
      "DFS post-order": [
        "DFS each unvisited node with cycle detection.",
        "Append node to order after visiting all descendants.",
        "Reverse order at end for topological sort.",
        "Return [] if cycle detected."
      ]
    }
  },
  89: {
    summary: "Find the edge that can be removed to make a tree (undirected graph).",
    steps: {
      "Union-Find last redundant edge": [
        "Process edges in order with Union-Find.",
        "If both endpoints already share a parent, edge is redundant.",
        "Return the last such edge found.",
        "Union otherwise to connect components."
      ]
    }
  },
  90: {
    summary: "Return the number of connected components in an undirected graph.",
    steps: {
      "Union-Find count": [
        "Initialize each node as its own parent.",
        "Union endpoints for each edge.",
        "Count distinct root parents.",
        "Return component count."
      ],
      "DFS count components": [
        "Build adjacency list.",
        "For each unvisited node, DFS and increment count.",
        "Mark visited during DFS.",
        "Return total component count."
      ]
    }
  },
  91: {
    summary: "Return true if edges form a valid tree (connected, no cycles).",
    steps: {
      "Union-Find no cycle + connected": [
        "Union-Find on edges; return false if union finds same parent.",
        "After all edges, check exactly one component (n-1 edges).",
        "Valid tree needs n-1 edges and full connectivity.",
        "Return true only if both hold."
      ],
      "BFS/DFS connectivity": [
        "Build adjacency from edges.",
        "BFS/DFS from node 0; count visited nodes.",
        "Check edges.length == n-1 and visited == n.",
        "Return true if connected acyclic structure."
      ]
    }
  },
  92: {
    summary: "Return the length of shortest transformation sequence from beginWord to endWord.",
    steps: {
      "BFS shortest transformation": [
        "BFS queue with (word, level).",
        "Try changing each char to a-z; check wordList set.",
        "Enqueue unvisited valid words.",
        "Return level when endWord is reached, or 0."
      ]
    }
  },
  93: {
    summary: "Reconstruct the lexicographically smallest valid itinerary from tickets.",
    steps: {
      "Hierholzer Eulerian path": [
        "Build graph; sort each node's neighbors.",
        "DFS consuming edges (post-order stack).",
        "Append airport after exhausting outgoing edges.",
        "Reverse result for itinerary order."
      ],
      "DFS post-order": [
        "Sort adjacency lists lexicographically.",
        "DFS from JFK, removing used edges.",
        "Push airport to route after visiting neighbors.",
        "Reverse collected route at end."
      ]
    }
  },
  94: {
    summary: "Return min cost to connect all points into one network (MST).",
    steps: {
      "Prim's MST": [
        "Start from any point; track min edge cost to tree.",
        "Repeatedly add cheapest outside point.",
        "Use min-heap or array scan for next edge.",
        "Sum edge costs until all points connected."
      ],
      "Kruskal with Union-Find": [
        "Sort all edges by Manhattan distance.",
        "Union-Find merge cheapest edges first.",
        "Add cost when union connects different components.",
        "Stop when n-1 edges are added."
      ]
    }
  },
  95: {
    summary: "Return time for signal from node k to reach all nodes, or -1.",
    steps: {
      "Dijkstra from source": [
        "Min-heap of (time, node) starting at k.",
        "Relax edges: update dist if shorter path found.",
        "Skip stale heap entries.",
        "Return max dist or -1 if any node unreachable."
      ]
    }
  },
  96: {
    summary: "Return minimum time to reach bottom-right cell as water level rises.",
    steps: {
      "Binary search on max height": [
        "Binary search max elevation needed on path.",
        "Check feasibility with BFS/DFS allowing cells <= mid.",
        "Minimize mid until path from top-left to bottom-right exists.",
        "Return smallest feasible max height."
      ],
      "Dijkstra on grid": [
        "Min-heap of (maxHeightSoFar, row, col) from (0,0).",
        "Track best max-height to reach each cell.",
        "Relax 4 neighbors with updated path max.",
        "Return dist at bottom-right when reached."
      ]
    }
  },
  97: {
    summary: "Return alien dictionary character order from sorted words, or '' if invalid.",
    steps: {
      "Build graph + topological sort": [
        "Compare adjacent words to find first differing char edge.",
        "Detect invalid cases (prefix longer word before shorter).",
        "Topological sort the char graph.",
        "Return order string or '' on cycle."
      ]
    }
  },
  98: {
    summary: "Find cheapest price from src to dst with at most k stops.",
    steps: {
      "Bellman-Ford K iterations": [
        "Copy dist array each of k+1 relaxation rounds.",
        "Relax all edges using previous round's distances.",
        "Prevents using more than k+1 edges.",
        "Return dist[dst] or -1 if unreachable."
      ],
      "BFS with (node, stops, cost)": [
        "BFS/queue states: (node, stops used, cost).",
        "Prune if stops > k or cost not improved.",
        "Relax neighbors with stops+1.",
        "Track minimum cost to dst within k stops."
      ]
    }
  },
  99: {
    summary: "Return the number of distinct ways to climb n stairs (1 or 2 steps).",
    steps: {
      "Fibonacci DP": [
        "Set dp[1]=1 and dp[2]=2.",
        "For i from 3 to n: dp[i] = dp[i-1] + dp[i-2].",
        "Use two variables instead of full array.",
        "Return dp[n]."
      ]
    }
  },
  100: {
    summary: "Return minimum cost to reach top of stairs (can start at step 0 or 1).",
    steps: {
      "Bottom-up min of prev two": [
        "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
        "Initialize dp[0]=cost[0], dp[1]=cost[1].",
        "Iterate i from 2 to top index.",
        "Return min(dp[n-1], dp[n-2]) for final step."
      ]
    }
  }
};
