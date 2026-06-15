// Enrichment data for problems 1-50
module.exports = {
  1: {
    summary: "Return true if any value appears at least twice in nums.",
    steps: {
      "Hash set": [
        "Create an empty hash set.",
        "For each num: if num is already in set, return true.",
        "Add num to the set.",
        "Return false after processing all elements."
      ]
    }
  },
  2: {
    summary: "Return true if t is an anagram of s (same letters, same counts).",
    steps: {
      "Frequency count": [
        "If lengths differ, return false.",
        "Count character frequencies in s with a hash map.",
        "Decrement counts for each char in t; return false on missing or negative.",
        "Return true if all counts are zero."
      ]
    }
  },
  3: {
    summary: "Return indices of two numbers in nums that add up to target.",
    steps: {
      "Hash map complement": [
        "Create a map from value to index.",
        "For each num at index i, compute complement = target - num.",
        "If complement exists in map, return [map[complement], i].",
        "Otherwise store num -> i in the map."
      ]
    }
  },
  4: {
    summary: "Group strings that are anagrams of each other.",
    steps: {
      "Sorted string key": [
        "Create a hash map from key to list of strings.",
        "For each string, sort its characters to form the key.",
        "Append the string to map[key].",
        "Return all values in the map."
      ],
      "Frequency count key": [
        "Create a hash map from frequency signature to list of strings.",
        "For each string, build a 26-count key (or tuple of counts).",
        "Append the string to map[key].",
        "Return all values in the map."
      ]
    }
  },
  5: {
    summary: "Return the k most frequent elements in nums.",
    steps: {
      "Min-heap of size k": [
        "Count frequency of each element.",
        "Maintain a min-heap of size k by frequency.",
        "For each (freq, num): push; pop smallest if size exceeds k.",
        "Return all numbers remaining in the heap."
      ],
      "Bucket sort by frequency": [
        "Count frequency of each element.",
        "Create buckets indexed 1..n where bucket[i] holds nums with freq i.",
        "Scan buckets from highest freq downward, collecting until k elements.",
        "Return the collected k elements."
      ]
    }
  },
  6: {
    summary: "Return an array where each element is the product of all other elements in nums.",
    steps: {
      "Prefix + suffix products": [
        "Initialize output array of length n.",
        "Fill left-to-right with running prefix products (exclude self).",
        "Multiply right-to-left with running suffix products.",
        "Return the output array."
      ]
    }
  },
  7: {
    summary: "Design encode/decode for a list of strings into a single string and back.",
    steps: {
      "Length-delimited encoding": [
        "Encode: for each string, write length + '#' + string content.",
        "Join encoded parts into one string.",
        "Decode: read digits until '#', parse length, slice that many chars.",
        "Repeat until the encoded string is fully consumed."
      ]
    }
  },
  8: {
    summary: "Return the length of the longest consecutive elements sequence in nums.",
    steps: {
      "Hash set streak expansion": [
        "Insert all numbers into a hash set.",
        "For each num, only start if num-1 is not in set (sequence start).",
        "Expand num, num+1, num+2... while in set, tracking streak length.",
        "Return the maximum streak length found."
      ]
    }
  },
  9: {
    summary: "Determine if a 9x9 Sudoku board is valid (rows, columns, boxes).",
    steps: {
      "Hash sets per row/col/box": [
        "Create hash sets for each row, column, and 3x3 box.",
        "For each filled cell, compute box index from row/col.",
        "If digit already seen in row, col, or box, return false.",
        "Return true if no conflicts found."
      ]
    }
  },
  10: {
    summary: "Return true if s is a palindrome after considering only alphanumeric chars.",
    steps: {
      "Two pointers inward": [
        "Set left = 0 and right = len(s) - 1.",
        "Skip non-alphanumeric chars at both pointers.",
        "Compare lowercase versions; return false on mismatch.",
        "Return true when pointers cross."
      ]
    }
  },
  11: {
    summary: "In a sorted array, find two numbers that add up to target (1-indexed).",
    steps: {
      "Sorted two pointers": [
        "Set left = 0 and right = len(numbers) - 1.",
        "Compute sum = numbers[left] + numbers[right].",
        "If sum equals target, return [left+1, right+1].",
        "Move left up if sum too small, else move right down."
      ]
    }
  },
  12: {
    summary: "Return all unique triplets in nums that sum to zero.",
    steps: {
      "Sort + two pointers": [
        "Sort nums ascending.",
        "For each index i, run two pointers on i+1..end for -nums[i].",
        "On match, record triplet and skip duplicate values at both pointers.",
        "Return all collected triplets."
      ]
    }
  },
  13: {
    summary: "Find two lines that form a container holding the most water.",
    steps: {
      "Greedy two pointers": [
        "Set left = 0 and right = len(height) - 1.",
        "Compute area = min(height[left], height[right]) * width.",
        "Track maximum area seen.",
        "Move the pointer at the shorter line inward."
      ]
    }
  },
  14: {
    summary: "Compute how much rain water can be trapped between elevation bars.",
    steps: {
      "Two pointers with max heights": [
        "Set left/right pointers and track leftMax and rightMax.",
        "Process the side with smaller max height.",
        "Add trapped water as maxHeight - height[pointer] if positive.",
        "Move that pointer inward and update its max."
      ]
    }
  },
  15: {
    summary: "Return the maximum profit from one buy and one sell transaction.",
    steps: {
      "Track min price + max profit": [
        "Initialize minPrice to infinity and maxProfit to 0.",
        "For each price, update minPrice to the lowest seen so far.",
        "Update maxProfit with price - minPrice.",
        "Return maxProfit after one pass."
      ]
    }
  },
  16: {
    summary: "Return the length of the longest substring without repeating characters.",
    steps: {
      "Sliding window + last seen map": [
        "Maintain window [left, right] and a map of char -> last index.",
        "Expand right; if char seen in window, move left past last index.",
        "Update max length with window size.",
        "Return max length after scanning."
      ]
    }
  },
  17: {
    summary: "Return the longest substring length with at most k character replacements.",
    steps: {
      "Max window with at most k replacements": [
        "Expand right pointer, tracking char frequencies in window.",
        "Let maxFreq be the highest count of any single char in window.",
        "While window size - maxFreq > k, shrink from left.",
        "Track maximum valid window size."
      ],
      "Max window with frequency map": [
        "Use a frequency map for the current window.",
        "Track the most frequent character count in the window.",
        "Shrink left while replacements needed exceed k.",
        "Return the largest window size seen."
      ]
    }
  },
  18: {
    summary: "Return true if s2 contains a permutation of s1 as a substring.",
    steps: {
      "Fixed window frequency match": [
        "Count character frequencies in s1.",
        "Slide a window of len(s1) over s2, updating counts.",
        "Compare window counts to s1 counts each step.",
        "Return true on first match, else false."
      ]
    }
  },
  19: {
    summary: "Return the minimum window substring of s containing all chars of t.",
    steps: {
      "Expand/shrink with need counts": [
        "Count required chars in t; track how many needs are satisfied.",
        "Expand right until all needs are met.",
        "Shrink left while still valid, recording minimum window.",
        "Return the shortest valid substring found."
      ]
    }
  },
  20: {
    summary: "Return the maximum value in each sliding window of size k.",
    steps: {
      "Monotonic deque": [
        "Maintain a deque of indices with decreasing values.",
        "Push right index; pop back while value <= nums[right].",
        "Pop front when index leaves the window.",
        "Record nums[deque front] once window size reaches k."
      ]
    }
  },
  21: {
    summary: "Return true if the string has valid matching parentheses.",
    steps: {
      "Stack matching": [
        "Push opening brackets onto a stack.",
        "On closing bracket, pop and verify it matches.",
        "Return false on mismatch or empty stack pop.",
        "Return true if stack is empty at end."
      ]
    }
  },
  22: {
    summary: "Design a stack that supports push, pop, top, and getMin in O(1).",
    steps: {
      "Two stacks": [
        "Maintain a main stack and a min stack.",
        "On push, push to main; push to min if value <= current min.",
        "On pop, pop both if top of main equals top of min.",
        "getMin returns top of min stack."
      ],
      "Single stack with pairs": [
        "Store pairs of (value, currentMin) on one stack.",
        "On push, update currentMin and push the pair.",
        "On pop, remove the top pair.",
        "getMin returns currentMin from top pair."
      ]
    }
  },
  23: {
    summary: "Evaluate the value of a Reverse Polish Notation expression.",
    steps: {
      "Stack evaluation": [
        "Iterate tokens left to right.",
        "Push numbers onto a stack.",
        "On operator, pop two operands, apply op, push result.",
        "Return the final stack value."
      ]
    }
  },
  24: {
    summary: "For each day, return how many days until a warmer temperature.",
    steps: {
      "Monotonic decreasing stack": [
        "Iterate indices with a stack of unresolved days.",
        "While current temp > stack top temp, pop and set wait = i - popped.",
        "Push current index onto stack.",
        "Remaining stack entries have answer 0."
      ]
    }
  },
  25: {
    summary: "Count how many car fleets reach the target given positions and speeds.",
    steps: {
      "Sort by position + stack merge": [
        "Pair each car's position with time to reach target.",
        "Sort pairs by position descending (nearest to target first).",
        "Push times onto stack; pop if top time <= new time (same fleet).",
        "Return stack size as fleet count."
      ]
    }
  },
  26: {
    summary: "Return the area of the largest rectangle in a histogram.",
    steps: {
      "Monotonic increasing stack": [
        "Append a sentinel height 0 to flush the stack.",
        "For each bar, while stack top height > current, pop and compute area.",
        "Area uses popped height and width to current or stack top.",
        "Track and return maximum area."
      ]
    }
  },
  27: {
    summary: "Return the index of target in nums, or -1 if not found.",
    steps: {
      "Classic lo/hi binary search": [
        "Set lo = 0 and hi = len(nums) - 1.",
        "While lo <= hi, set mid and compare nums[mid] to target.",
        "Return mid on equal; search left or right half otherwise.",
        "Return -1 if search space is exhausted."
      ]
    }
  },
  28: {
    summary: "Return true if target exists in an m x n matrix sorted row-wise.",
    steps: {
      "Treat as 1D sorted array": [
        "Set lo = 0 and hi = m*n - 1.",
        "Map mid to matrix[mid/n][mid%n].",
        "Binary search comparing to target.",
        "Return true on match, false otherwise."
      ]
    }
  },
  29: {
    summary: "Find the minimum eating speed k so Koko finishes all piles within h hours.",
    steps: {
      "Binary search on eating speed": [
        "Binary search k from 1 to max(piles).",
        "For candidate k, compute hours = sum(ceil(pile/k)).",
        "If hours <= h, try smaller k; else try larger k.",
        "Return the smallest feasible k."
      ]
    }
  },
  30: {
    summary: "Find the minimum element in a rotated sorted array with distinct values.",
    steps: {
      "Compare mid with right": [
        "Set lo = 0 and hi = len(nums) - 1.",
        "While lo < hi, compare nums[mid] with nums[hi].",
        "If nums[mid] > nums[hi], min is in right half.",
        "Else min is in left half including mid; return nums[lo]."
      ]
    }
  },
  31: {
    summary: "Search for target in a rotated sorted array with distinct values.",
    steps: {
      "Identify sorted half": [
        "Binary search with lo/hi pointers.",
        "Determine which half [lo,mid] or [mid,hi] is sorted.",
        "If target lies in sorted half, search there; else search other half.",
        "Return index on match or -1 if not found."
      ]
    }
  },
  32: {
    summary: "Design a time-based key-value store with get(key, timestamp).",
    steps: {
      "Hash map + binary search timestamps": [
        "Store key -> list of (timestamp, value) pairs.",
        "On set, append (timestamp, value) to key's list.",
        "On get, binary search largest timestamp <= query.",
        "Return corresponding value or empty string."
      ]
    }
  },
  33: {
    summary: "Return the median of two sorted arrays nums1 and nums2.",
    steps: {
      "Binary search partition": [
        "Ensure nums1 is the shorter array; binary search its partition i.",
        "Set j = (m+n+1)/2 - i for nums2's partition.",
        "Compare cross-partition maxes and mins to validate partition.",
        "Return median from left/right max values of valid partition."
      ]
    }
  },
  34: {
    summary: "Reverse a singly linked list.",
    steps: {
      "Iterative reversal": [
        "Initialize prev = null and curr = head.",
        "Save next, set curr.next = prev, advance prev and curr.",
        "Repeat until curr is null.",
        "Return prev as new head."
      ]
    }
  },
  35: {
    summary: "Merge two sorted linked lists into one sorted list.",
    steps: {
      "Dummy head merge": [
        "Create dummy node and a tail pointer.",
        "Compare list1 and list2 heads; attach smaller to tail.",
        "Advance the chosen list and tail.",
        "Attach remaining nodes; return dummy.next."
      ]
    }
  },
  36: {
    summary: "Reorder list L0->L1->...->Ln to L0->Ln->L1->Ln-1->...",
    steps: {
      "Find mid + reverse + merge": [
        "Find middle with slow/fast pointers.",
        "Reverse the second half of the list.",
        "Merge first and reversed second halves alternately.",
        "Return the reordered list head."
      ]
    }
  },
  37: {
    summary: "Remove the nth node from the end of a linked list.",
    steps: {
      "Fast/slow two pointers": [
        "Advance fast pointer n steps ahead.",
        "Move both fast and slow until fast reaches the end.",
        "Remove slow.next (node after nth-from-end).",
        "Handle edge case of removing head with dummy node."
      ]
    }
  },
  38: {
    summary: "Deep copy a linked list where each node has an extra random pointer.",
    steps: {
      "Hash map old to new": [
        "First pass: create copy of each node, map old -> new.",
        "Second pass: set next and random using the map.",
        "Return map[head] as new list head."
      ],
      "Interweave + split": [
        "Insert copy of each node right after original.",
        "Set random pointers on interleaved copies.",
        "Split list into original and copied lists.",
        "Return head of copied list."
      ]
    }
  },
  39: {
    summary: "Add two numbers represented as linked lists (digits in reverse order).",
    steps: {
      "Simulate addition with carry": [
        "Traverse both lists while either or carry remains.",
        "Sum digits plus carry, append digit % 10 to result.",
        "Carry = sum / 10 for next position.",
        "Return result list head."
      ]
    }
  },
  40: {
    summary: "Return true if the linked list has a cycle.",
    steps: {
      "Floyd cycle detection": [
        "Set slow and fast to head.",
        "Advance slow 1 step and fast 2 steps each iteration.",
        "If they meet, a cycle exists.",
        "If fast reaches null, no cycle."
      ]
    }
  },
  41: {
    summary: "Find the duplicate number in nums where values are in range [1, n].",
    steps: {
      "Floyd cycle on index graph": [
        "Treat index i as pointing to nums[i] (implicit linked list).",
        "Find cycle entrance with slow/fast pointers.",
        "Reset one pointer to start; advance both 1 step until they meet.",
        "Meeting point is the duplicate value."
      ]
    }
  },
  42: {
    summary: "Design an LRU cache with get and put in O(1).",
    steps: {
      "Hash map + doubly linked list": [
        "Map key -> node in a doubly linked list (most recent at head).",
        "On get: move node to head if exists; else return -1.",
        "On put: update or insert at head; evict tail if over capacity.",
        "Maintain capacity invariant after each operation."
      ]
    }
  },
  43: {
    summary: "Merge k sorted linked lists into one sorted list.",
    steps: {
      "Min-heap of k heads": [
        "Push head of each non-empty list into a min-heap.",
        "Pop smallest node, append to result, push its next if any.",
        "Repeat until heap is empty.",
        "Return merged list head."
      ],
      "Divide and conquer merge": [
        "Pair up lists and merge each pair recursively.",
        "Repeat until one list remains.",
        "Use two-list merge helper at each step.",
        "Return the final merged head."
      ]
    }
  },
  44: {
    summary: "Reverse nodes of a linked list k at a time.",
    steps: {
      "Iterative k-group reversal": [
        "Count nodes to check if k nodes remain.",
        "Reverse exactly k nodes in place.",
        "Connect reversed segment to rest of list.",
        "Repeat until fewer than k nodes remain."
      ]
    }
  },
  45: {
    summary: "Invert a binary tree (swap left and right children at every node).",
    steps: {
      "Recursive DFS swap": [
        "Base case: return null if root is null.",
        "Swap root.left and root.right.",
        "Recursively invert left and right subtrees.",
        "Return root."
      ]
    }
  },
  46: {
    summary: "Return the maximum depth (height) of a binary tree.",
    steps: {
      "Recursive max depth": [
        "If root is null, return 0.",
        "Compute leftDepth = maxDepth(left).",
        "Compute rightDepth = maxDepth(right).",
        "Return 1 + max(leftDepth, rightDepth)."
      ]
    }
  },
  47: {
    summary: "Return the diameter (longest path between any two nodes) of a binary tree.",
    steps: {
      "DFS height with global max": [
        "Post-order DFS returns height of subtree.",
        "At each node, update global max with leftHeight + rightHeight.",
        "Return 1 + max(leftHeight, rightHeight) to parent.",
        "Return global max after traversal."
      ]
    }
  },
  48: {
    summary: "Return true if the binary tree is height-balanced.",
    steps: {
      "Post-order height check": [
        "DFS returns height, or -1 if unbalanced.",
        "If abs(leftHeight - rightHeight) > 1, return -1.",
        "Propagate -1 up if any child is unbalanced.",
        "Return true if final height is not -1."
      ]
    }
  },
  49: {
    summary: "Return true if two binary trees are structurally identical with same values.",
    steps: {
      "Recursive compare": [
        "If both null, return true; if one null, return false.",
        "If values differ, return false.",
        "Return isSameTree(left) && isSameTree(right)."
      ]
    }
  },
  50: {
    summary: "Return true if subRoot is a subtree of root.",
    steps: {
      "DFS match at each node": [
        "If root is null, return false.",
        "If isSameTree(root, subRoot), return true.",
        "Return isSubtree(left) || isSubtree(right)."
      ]
    }
  }
};
