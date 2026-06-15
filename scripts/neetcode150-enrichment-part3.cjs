// Enrichment data for problems 101-150
module.exports = {
  101: {
    summary: "Return maximum money robbed from non-adjacent houses on a street.",
    steps: {
      "Rob/skip DP": [
        "Track robPrev and skipPrev as you iterate.",
        "At each house: newRob = skipPrev + nums[i].",
        "newSkip = max(robPrev, skipPrev).",
        "Return max(robPrev, skipPrev) at end."
      ]
    }
  },
  102: {
    summary: "Return max money robbed when houses are arranged in a circle.",
    steps: {
      "Two linear passes skip ends": [
        "Rob houses 0..n-2 with linear house robber DP.",
        "Rob houses 1..n-1 with same DP.",
        "Take max of both results.",
        "Handles first/last adjacency constraint."
      ]
    }
  },
  103: {
    summary: "Return the longest palindromic substring of s.",
    steps: {
      "Expand around center": [
        "For each index, expand as odd-length center.",
        "For each pair, expand as even-length center.",
        "Track longest palindrome start and length.",
        "Return substring from best range."
      ]
    }
  },
  104: {
    summary: "Return the count of palindromic substrings in s.",
    steps: {
      "Expand around center": [
        "For each center, expand while chars match.",
        "Count each valid palindrome found during expansion.",
        "Try odd and even centers.",
        "Return total count."
      ]
    }
  },
  105: {
    summary: "Return the number of ways to decode a digit string to letters.",
    steps: {
      "Linear DP ways[i]": [
        "ways[0]=1; ways[1] based on first one/two digits valid.",
        "For i from 2: add ways[i-1] if single digit valid.",
        "Add ways[i-2] if two-digit substring valid.",
        "Return ways[n]."
      ]
    }
  },
  106: {
    summary: "Return the fewest number of coins needed to make amount, or -1.",
    steps: {
      "Unbounded knapsack DP": [
        "Initialize dp[0]=0, others to infinity.",
        "For each coin, update dp[a] = min(dp[a], dp[a-coin]+1).",
        "Iterate amounts from coin value upward.",
        "Return dp[amount] or -1 if unreachable."
      ]
    }
  },
  107: {
    summary: "Return the maximum product of any contiguous subarray.",
    steps: {
      "Track max and min product": [
        "Track curMax and curMin ending at each index.",
        "Update both considering nums[i] and nums[i]*prev.",
        "Swap max/min when nums[i] is negative.",
        "Return global maximum product."
      ]
    }
  },
  108: {
    summary: "Return true if s can be segmented into dictionary words.",
    steps: {
      "DP reachable[i]": [
        "reachable[0] = true.",
        "For each start where reachable[start], try each word.",
        "If s[start:start+len] in dict, mark reachable[start+len].",
        "Return reachable[len(s)]."
      ]
    }
  },
  109: {
    summary: "Return the length of the longest strictly increasing subsequence.",
    steps: {
      "Patience sorting / tails": [
        "Maintain tails array of smallest tail per length.",
        "For each num, binary search position in tails.",
        "Replace or extend tails accordingly.",
        "Return tails length."
      ]
    }
  },
  110: {
    summary: "Return true if nums can be partitioned into two equal-sum subsets.",
    steps: {
      "0/1 knapsack DP": [
        "If total sum odd, return false.",
        "Target = sum/2; dp[0]=true.",
        "For each num, update dp backward from target.",
        "Return dp[target]."
      ]
    }
  },
  111: {
    summary: "Return number of unique paths from top-left to bottom-right (only down/right).",
    steps: {
      "Grid DP bottom-up": [
        "Initialize first row and column to 1.",
        "dp[r][c] = dp[r-1][c] + dp[r][c-1].",
        "Fill grid row by row.",
        "Return dp[m-1][n-1]."
      ],
      "Combinatorics C(m+n-2,m-1)": [
        "Total moves = (m-1)+(n-1).",
        "Choose (m-1) down moves from total.",
        "Compute binomial coefficient.",
        "Return combination value."
      ]
    }
  },
  112: {
    summary: "Return the length of the longest common subsequence of text1 and text2.",
    steps: {
      "2D DP table": [
        "dp[i][j] = LCS length of text1[0:i] and text2[0:j].",
        "If chars match, dp[i][j] = dp[i-1][j-1] + 1.",
        "Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
        "Return dp[m][n]."
      ],
      "Space-optimized 1D": [
        "Use 1D dp array over text2 length.",
        "Iterate text1; update dp right-to-left.",
        "Same recurrence as 2D version.",
        "Return dp[n] after processing."
      ]
    }
  },
  113: {
    summary: "Return max profit with buy/sell and a cooldown day after each sell.",
    steps: {
      "State machine DP (hold/sold/rest)": [
        "Track hold, sold, rest max profits each day.",
        "hold = max(hold, rest - price).",
        "sold = hold + price; rest = max(rest, sold).",
        "Return max(sold, rest) at end."
      ]
    }
  },
  114: {
    summary: "Return the number of combinations of coins that make up amount.",
    steps: {
      "Unbounded knapsack ways": [
        "ways[0] = 1.",
        "For each coin, add ways[a-coin] to ways[a].",
        "Iterate amounts ascending per coin.",
        "Return ways[amount]."
      ]
    }
  },
  115: {
    summary: "Return number of ways to assign +/- to nums to reach target sum.",
    steps: {
      "Subset sum DP": [
        "Transform to subset sum: (sum + target) must be even.",
        "Count subsets summing to (sum + target) / 2.",
        "Standard 0/1 knapsack count DP.",
        "Return subset count or 0 if impossible."
      ]
    }
  },
  116: {
    summary: "Return true if s3 is formed by interleaving s1 and s2.",
    steps: {
      "2D DP match s1/s2": [
        "dp[i][j] = can s1[0:i] and s2[0:j] form s3[0:i+j].",
        "Match next char from s1 or s2 to s3.",
        "Base: empty strings match empty prefix.",
        "Return dp[m][n]."
      ],
      "Space-optimized 1D": [
        "Use 1D dp over s2 length.",
        "Update row for each prefix of s1.",
        "Same interleaving recurrence.",
        "Return dp[n] after full s1 processed."
      ]
    }
  },
  117: {
    summary: "Return length of longest strictly increasing path in a matrix.",
    steps: {
      "DFS + memoization": [
        "DFS from each cell with memo cache.",
        "Explore 4 neighbors strictly greater than current.",
        "memo[r][c] = 1 + max DFS neighbor length.",
        "Return max memo value over all cells."
      ]
    }
  },
  118: {
    summary: "Return count of distinct subsequences of s that equal t.",
    steps: {
      "2D DP count matches": [
        "dp[i][j] = ways s[0:i] matches t[0:j].",
        "If s[i-1]==t[j-1], add dp[i-1][j-1] to dp[i-1][j].",
        "Always carry dp[i-1][j] forward.",
        "Return dp[m][n]."
      ],
      "Space-optimized 1D": [
        "1D dp over t length.",
        "Update right-to-left for each s char.",
        "Same subsequence counting logic.",
        "Return dp[n]."
      ]
    }
  },
  119: {
    summary: "Return minimum edit operations to convert word1 to word2.",
    steps: {
      "Levenshtein DP": [
        "dp[i][j] = edits between word1[0:i] and word2[0:j].",
        "On match, dp[i][j]=dp[i-1][j-1].",
        "Else 1 + min(insert, delete, replace).",
        "Return dp[m][n]."
      ],
      "Space-optimized 1D": [
        "Two rows or 1D rolling array.",
        "Iterate word1 updating dp over word2.",
        "Same min-edit recurrence.",
        "Return final dp[n]."
      ]
    }
  },
  120: {
    summary: "Return maximum coins collected by bursting balloons optimally.",
    steps: {
      "Interval DP": [
        "Pad array with 1 at both ends.",
        "dp[left][right] = max coins for open interval (left, right).",
        "Try each last balloon k in interval.",
        "dp[left][right] = max of dp[left][k] + val + dp[k][right]."
      ]
    }
  },
  121: {
    summary: "Return true if s matches pattern p with '.' and '*' wildcards.",
    steps: {
      "2D DP with .* cases": [
        "dp[i][j] = match s[0:i] with p[0:j].",
        "Handle '*' by zero occurrences or repeat prior char.",
        "Handle '.' as any single char match.",
        "Return dp[m][n]."
      ]
    }
  },
  122: {
    summary: "Return the maximum sum of any contiguous subarray.",
    steps: {
      "Kadane's algorithm": [
        "Track curSum and maxSum.",
        "curSum = max(nums[i], curSum + nums[i]).",
        "Update maxSum with curSum each step.",
        "Return maxSum."
      ]
    }
  },
  123: {
    summary: "Return true if you can reach the last index from index 0.",
    steps: {
      "Track farthest reachable": [
        "Track farthest index reachable so far.",
        "If i > farthest, return false.",
        "Update farthest = max(farthest, i + nums[i]).",
        "Return true if farthest >= last index."
      ],
      "Backward greedy": [
        "Set goal = last index.",
        "Scan backward from n-2.",
        "If i + nums[i] >= goal, move goal to i.",
        "Return true if goal reaches 0."
      ]
    }
  },
  124: {
    summary: "Return the minimum number of jumps to reach the last index.",
    steps: {
      "Greedy BFS-like jumps": [
        "Track current jump range end and next range end.",
        "Expand next end with i + nums[i] within current range.",
        "Increment jumps when i reaches current end.",
        "Return jumps when end reaches last index."
      ]
    }
  },
  125: {
    summary: "Return starting gas station index to complete a circuit, or -1.",
    steps: {
      "Single pass total + start": [
        "Track total tank and current tank.",
        "If tank goes negative, reset start to i+1.",
        "Accumulate gas - cost each step.",
        "Return start if total >= 0, else -1."
      ]
    }
  },
  126: {
    summary: "Return true if hand can be rearranged into groups of consecutive cards.",
    steps: {
      "Sort + hash map groups": [
        "Count card frequencies in hash map.",
        "Process cards in sorted order.",
        "For each card, form groupSize consecutive group or return false.",
        "Decrement counts as groups are formed."
      ]
    }
  },
  127: {
    summary: "Return true if some triplets can be merged to form target triplet.",
    steps: {
      "Track max of needed dims": [
        "Track max values seen for each target dimension.",
        "Ignore triplet if any value exceeds target.",
        "If all three dims reach target max, return true.",
        "Return false after scanning all triplets."
      ]
    }
  },
  128: {
    summary: "Partition string so each part's chars appear only in that part.",
    steps: {
      "Last occurrence greedy partition": [
        "Record last index of each character.",
        "Extend end to max last index of chars in current part.",
        "When i reaches end, cut part and reset start.",
        "Return lengths of all parts."
      ]
    }
  },
  129: {
    summary: "Return true if string with '(' ')' '*' can form valid parentheses.",
    steps: {
      "Two-pass open/close balance": [
        "Forward pass: treat '*' as '('; track balance >= 0.",
        "Backward pass: treat '*' as ')'; track balance >= 0.",
        "Return true if both passes succeed.",
        "Covers all '*' interpretations."
      ],
      "Greedy range lo/hi": [
        "Track min and max possible open count after each char.",
        "Update range for '(', ')', and '*'.",
        "If lo < 0, shift range up.",
        "Return lo == 0 at end."
      ]
    }
  },
  130: {
    summary: "Insert newInterval into intervals and merge overlapping intervals.",
    steps: {
      "Merge in one pass": [
        "Add intervals entirely before newInterval.",
        "Merge overlapping intervals with newInterval.",
        "Append remaining intervals after merged block.",
        "Return result list."
      ]
    }
  },
  131: {
    summary: "Merge all overlapping intervals.",
    steps: {
      "Sort by start + merge": [
        "Sort intervals by start time.",
        "Initialize merged with first interval.",
        "If overlap, extend last end; else append.",
        "Return merged list."
      ]
    }
  },
  132: {
    summary: "Return minimum intervals to remove so none overlap.",
    steps: {
      "Sort by end + greedy keep": [
        "Sort intervals by end time.",
        "Keep interval if start >= prev end.",
        "Else increment remove count (drop overlapping).",
        "Return remove count."
      ]
    }
  },
  133: {
    summary: "Return true if a person can attend all meetings (no overlaps).",
    steps: {
      "Sort + check overlap": [
        "Sort intervals by start.",
        "Compare each start to previous end.",
        "Return false on overlap.",
        "Return true if no overlaps."
      ]
    }
  },
  134: {
    summary: "Return minimum number of rooms needed for all meetings.",
    steps: {
      "Min-heap of end times": [
        "Sort meetings by start.",
        "Min-heap stores end times of ongoing meetings.",
        "If start >= heap min, reuse room (pop).",
        "Return heap size as rooms needed."
      ],
      "Sweep line": [
        "Create start +1 and end -1 events.",
        "Sort events by time.",
        "Track concurrent meetings with running sum.",
        "Return maximum concurrent count."
      ]
    }
  },
  135: {
    summary: "For each query, return smallest interval size containing it, or -1.",
    steps: {
      "Sort queries + sweep with heap": [
        "Sort intervals by start; sort queries with indices.",
        "Push intervals starting <= query into min-heap by size.",
        "Pop intervals that do not contain query.",
        "Record heap top size or -1 per query."
      ]
    }
  },
  136: {
    summary: "Rotate an n x n matrix 90 degrees clockwise in place.",
    steps: {
      "Layer-by-layer rotate": [
        "Process concentric layers from outside in.",
        "Rotate four cells in each layer position.",
        "Advance around the layer.",
        "Return rotated matrix."
      ],
      "Transpose + reverse rows": [
        "Transpose matrix over main diagonal.",
        "Reverse each row.",
        "Equivalent to 90° clockwise rotation.",
        "Return result matrix."
      ]
    }
  },
  137: {
    summary: "Return all elements of an m x n matrix in spiral order.",
    steps: {
      "Boundary simulation": [
        "Track top, bottom, left, right boundaries.",
        "Traverse right, down, left, up in order.",
        "Shrink boundaries after each direction.",
        "Collect until boundaries cross."
      ]
    }
  },
  138: {
    summary: "Set matrix cells to zero if their row or column contains zero.",
    steps: {
      "First row/col as markers": [
        "Use first row and column as zero flags.",
        "Handle first row/col zero separately.",
        "Mark zeros in body using first row/col.",
        "Apply marks to zero rows and columns."
      ]
    }
  },
  139: {
    summary: "Return true if n is a happy number (sum of squared digits reaches 1).",
    steps: {
      "Floyd cycle on digit squares": [
        "Define next(n) as sum of squares of digits.",
        "Use slow/fast pointers on next chain.",
        "If fast reaches 1, return true.",
        "If slow meets fast (cycle not 1), return false."
      ]
    }
  },
  140: {
    summary: "Add one to a large integer represented as digit array.",
    steps: {
      "Simulate carry from end": [
        "Start from last digit, add 1 with carry.",
        "Propagate carry left while digit is 9.",
        "If carry remains, prepend 1.",
        "Return digit array."
      ]
    }
  },
  141: {
    summary: "Compute x raised to the power n.",
    steps: {
      "Fast exponentiation": [
        "Handle negative n by inverting result at end.",
        "While n > 0: if n odd, multiply result by x.",
        "Square x and halve n each iteration.",
        "Return result."
      ]
    }
  },
  142: {
    summary: "Multiply two non-negative integers given as strings.",
    steps: {
      "Grade-school multiplication": [
        "Initialize result array of size m+n.",
        "Multiply each digit pair, add to result[i+j+1] with carry.",
        "Propagate carries through result.",
        "Strip leading zeros and return string."
      ]
    }
  },
  143: {
    summary: "Count number of axis-aligned squares with given points as corners.",
    steps: {
      "Hash map point counts": [
        "Store point frequencies in hash map.",
        "For each pair (p1, p2), compute potential square corners.",
        "Check if both missing corners exist in map.",
        "Sum valid square counts (avoid double count)."
      ]
    }
  },
  144: {
    summary: "Return the single element that appears once (all others appear twice).",
    steps: {
      "XOR all elements": [
        "Initialize result = 0.",
        "XOR each number with result.",
        "Pairs cancel to 0; singleton remains.",
        "Return result."
      ]
    }
  },
  145: {
    summary: "Return the number of set bits (1s) in unsigned 32-bit n.",
    steps: {
      "n & (n-1) loop": [
        "While n > 0, increment count.",
        "Clear lowest set bit: n = n & (n-1).",
        "Each iteration removes one 1-bit.",
        "Return count."
      ],
      "Built-in bit count": [
        "Use language bit_count or popcount on n.",
        "Return the count of set bits.",
        "O(1) or O(bits) depending on implementation."
      ]
    }
  },
  146: {
    summary: "Return array where ans[i] is number of 1 bits in binary representation of i.",
    steps: {
      "DP bits[i] = bits[i>>1] + i&1": [
        "bits[0] = 0.",
        "For i from 1 to n: bits[i] = bits[i>>1] + (i & 1).",
        "Right shift drops last bit; add its value.",
        "Return bits array."
      ]
    }
  },
  147: {
    summary: "Reverse the bits of a 32-bit unsigned integer.",
    steps: {
      "Bit-by-bit reverse": [
        "Initialize result = 0.",
        "For 32 iterations, shift result left.",
        "Append n's least significant bit to result.",
        "Right shift n each step."
      ]
    }
  },
  148: {
    summary: "Find the missing number from array containing n distinct numbers in [0, n].",
    steps: {
      "XOR index and values": [
        "XOR all indices 0..n and all nums values.",
        "Duplicate pairs cancel; missing remains.",
        "Return XOR result.",
        "O(n) time, O(1) space."
      ],
      "Sum formula": [
        "Expected sum = n*(n+1)/2.",
        "Subtract actual sum of nums.",
        "Difference is missing number.",
        "Return missing value."
      ]
    }
  },
  149: {
    summary: "Sum two integers a and b without using + or - operators.",
    steps: {
      "XOR + carry loop": [
        "While carry != 0: sum = a ^ b.",
        "carry = (a & b) << 1.",
        "Update a = sum, b = carry.",
        "Return a when carry is 0."
      ]
    }
  },
  150: {
    summary: "Reverse digits of 32-bit signed integer x; return 0 on overflow.",
    steps: {
      "Extract digits with overflow check": [
        "While x != 0, pop digit with x % 10.",
        "Check overflow before push: res > INT_MAX/10 or boundary case.",
        "Push digit: res = res*10 + digit.",
        "Return res."
      ]
    }
  }
};
