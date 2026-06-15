// Python solutions for problems 101-150
module.exports = {
  101: {
    solution: `class Solution:
    def rob(self, nums):
        rob, skip = 0, 0
        for n in nums:
            rob, skip = skip + n, max(rob, skip)
        return max(rob, skip)`,
    tests: [
      'assert Solution().rob([1, 2, 3, 1]) == 4',
      'assert Solution().rob([2, 7, 9, 3, 1]) == 12',
      'assert Solution().rob([2, 1, 1, 2]) == 4',
    ],
  },
  102: {
    solution: `class Solution:
    def rob(self, nums):
        if len(nums) == 1:
            return nums[0]

        def linear(arr):
            rob, skip = 0, 0
            for n in arr:
                rob, skip = skip + n, max(rob, skip)
            return max(rob, skip)

        return max(linear(nums[:-1]), linear(nums[1:]))`,
    tests: [
      'assert Solution().rob([2, 3, 2]) == 3',
      'assert Solution().rob([1, 2, 3, 1]) == 4',
      'assert Solution().rob([1, 2, 3]) == 3',
    ],
  },
  103: {
    solution: `class Solution:
    def longestPalindrome(self, s):
        res = ""

        def expand(l, r):
            nonlocal res
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            if r - l - 1 > len(res):
                res = s[l + 1 : r]

        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)
        return res`,
    tests: [
      'assert Solution().longestPalindrome("babad") in ("bab", "aba")',
      'assert Solution().longestPalindrome("cbbd") == "bb"',
      'assert Solution().longestPalindrome("a") == "a"',
    ],
  },
  104: {
    solution: `class Solution:
    def countSubstrings(self, s):
        count = 0

        def expand(l, r):
            nonlocal count
            while l >= 0 and r < len(s) and s[l] == s[r]:
                count += 1
                l -= 1
                r += 1

        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)
        return count`,
    tests: [
      'assert Solution().countSubstrings("abc") == 3',
      'assert Solution().countSubstrings("aaa") == 6',
      'assert Solution().countSubstrings("aba") == 4',
    ],
  },
  105: {
    solution: `class Solution:
    def numDecodings(self, s):
        if not s or s[0] == "0":
            return 0
        prev2, prev1 = 1, 1
        for i in range(1, len(s)):
            cur = 0
            if s[i] != "0":
                cur += prev1
            two = int(s[i - 1 : i + 1])
            if 10 <= two <= 26:
                cur += prev2
            prev2, prev1 = prev1, cur
        return prev1`,
    tests: [
      'assert Solution().numDecodings("12") == 2',
      'assert Solution().numDecodings("226") == 3',
      'assert Solution().numDecodings("06") == 0',
    ],
  },
  106: {
    solution: `class Solution:
    def coinChange(self, coins, amount):
        dp = [float("inf")] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if c <= a:
                    dp[a] = min(dp[a], dp[a - c] + 1)
        return dp[amount] if dp[amount] != float("inf") else -1`,
    tests: [
      'assert Solution().coinChange([1, 2, 5], 11) == 3',
      'assert Solution().coinChange([2], 3) == -1',
      'assert Solution().coinChange([1], 0) == 0',
    ],
  },
  107: {
    solution: `class Solution:
    def maxProduct(self, nums):
        best = nums[0]
        cur_max = cur_min = nums[0]
        for n in nums[1:]:
            if n < 0:
                cur_max, cur_min = cur_min, cur_max
            cur_max = max(n, cur_max * n)
            cur_min = min(n, cur_min * n)
            best = max(best, cur_max)
        return best`,
    tests: [
      'assert Solution().maxProduct([2, 3, -2, 4]) == 6',
      'assert Solution().maxProduct([-2, 0, -1]) == 0',
      'assert Solution().maxProduct([-2, 3, -4]) == 24',
    ],
  },
  108: {
    solution: `class Solution:
    def wordBreak(self, s, wordDict):
        words = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[len(s)]`,
    tests: [
      'assert Solution().wordBreak("leetcode", ["leet", "code"]) == True',
      'assert Solution().wordBreak("applepenapple", ["apple", "pen"]) == True',
      'assert Solution().wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) == False',
    ],
  },
  109: {
    solution: `class Solution:
    def lengthOfLIS(self, nums):
        tails = []
        for n in nums:
            lo, hi = 0, len(tails)
            while lo < hi:
                mid = (lo + hi) // 2
                if tails[mid] < n:
                    lo = mid + 1
                else:
                    hi = mid
            if lo == len(tails):
                tails.append(n)
            else:
                tails[lo] = n
        return len(tails)`,
    tests: [
      'assert Solution().lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) == 4',
      'assert Solution().lengthOfLIS([0, 1, 0, 3, 2, 3]) == 4',
      'assert Solution().lengthOfLIS([7, 7, 7, 7, 7, 7, 7]) == 1',
    ],
  },
  110: {
    solution: `class Solution:
    def canPartition(self, nums):
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for n in nums:
            for j in range(target, n - 1, -1):
                dp[j] = dp[j] or dp[j - n]
        return dp[target]`,
    tests: [
      'assert Solution().canPartition([1, 5, 11, 5]) == True',
      'assert Solution().canPartition([1, 2, 3, 5]) == False',
      'assert Solution().canPartition([1, 2, 5]) == False',
    ],
  },
  111: {
    solution: `class Solution:
    def uniquePaths(self, m, n):
        row = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                row[j] += row[j - 1]
        return row[-1]`,
    tests: [
      'assert Solution().uniquePaths(3, 7) == 28',
      'assert Solution().uniquePaths(3, 2) == 3',
      'assert Solution().uniquePaths(1, 1) == 1',
    ],
  },
  112: {
    solution: `class Solution:
    def longestCommonSubsequence(self, text1, text2):
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
    tests: [
      'assert Solution().longestCommonSubsequence("abcde", "ace") == 3',
      'assert Solution().longestCommonSubsequence("abc", "abc") == 3',
      'assert Solution().longestCommonSubsequence("abc", "def") == 0',
    ],
  },
  113: {
    solution: `class Solution:
    def maxProfit(self, prices):
        if not prices:
            return 0
        hold, sold, rest = -prices[0], 0, 0
        for p in prices[1:]:
            prev_hold, prev_sold, prev_rest = hold, sold, rest
            hold = max(prev_hold, prev_rest - p)
            sold = prev_hold + p
            rest = max(prev_rest, prev_sold)
        return max(sold, rest)`,
    tests: [
      'assert Solution().maxProfit([1, 2, 3, 0, 2]) == 3',
      'assert Solution().maxProfit([1]) == 0',
      'assert Solution().maxProfit([2, 1]) == 0',
    ],
  },
  114: {
    solution: `class Solution:
    def change(self, amount, coins):
        ways = [0] * (amount + 1)
        ways[0] = 1
        for c in coins:
            for a in range(c, amount + 1):
                ways[a] += ways[a - c]
        return ways[amount]`,
    tests: [
      'assert Solution().change(5, [1, 2, 5]) == 4',
      'assert Solution().change(3, [2]) == 0',
      'assert Solution().change(10, [10]) == 1',
    ],
  },
  115: {
    solution: `class Solution:
    def findTargetSumWays(self, nums, target):
        total = sum(nums)
        if (total + target) % 2 or abs(target) > total:
            return 0
        subset = (total + target) // 2
        dp = [0] * (subset + 1)
        dp[0] = 1
        for n in nums:
            for j in range(subset, n - 1, -1):
                dp[j] += dp[j - n]
        return dp[subset]`,
    tests: [
      'assert Solution().findTargetSumWays([1, 1, 1, 1, 1], 3) == 5',
      'assert Solution().findTargetSumWays([1], 1) == 1',
      'assert Solution().findTargetSumWays([1, 2, 3], 0) == 2',
    ],
  },
  116: {
    solution: `class Solution:
    def isInterleave(self, s1, s2, s3):
        if len(s1) + len(s2) != len(s3):
            return False
        m, n = len(s1), len(s2)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for i in range(m + 1):
            for j in range(n + 1):
                if i > 0 and s1[i - 1] == s3[i + j - 1]:
                    dp[i][j] |= dp[i - 1][j]
                if j > 0 and s2[j - 1] == s3[i + j - 1]:
                    dp[i][j] |= dp[i][j - 1]
        return dp[m][n]`,
    tests: [
      'assert Solution().isInterleave("aabcc", "dbbca", "aadbbcbcac") == True',
      'assert Solution().isInterleave("aabcc", "dbbca", "aadbbbaccc") == False',
      'assert Solution().isInterleave("", "", "") == True',
    ],
  },
  117: {
    solution: `class Solution:
    def longestIncreasingPath(self, matrix):
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        memo = {}
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))

        def dfs(r, c):
            if (r, c) in memo:
                return memo[(r, c)]
            best = 1
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            memo[(r, c)] = best
            return best

        return max(dfs(r, c) for r in range(m) for c in range(n))`,
    tests: [
      'assert Solution().longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]) == 4',
      'assert Solution().longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]) == 4',
      'assert Solution().longestIncreasingPath([[1]]) == 1',
    ],
  },
  118: {
    solution: `class Solution:
    def numDistinct(self, s, t):
        m, n = len(s), len(t)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = 1
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                dp[i][j] = dp[i - 1][j]
                if s[i - 1] == t[j - 1]:
                    dp[i][j] += dp[i - 1][j - 1]
        return dp[m][n]`,
    tests: [
      'assert Solution().numDistinct("rabbbit", "rabbit") == 3',
      'assert Solution().numDistinct("babgbag", "bag") == 5',
      'assert Solution().numDistinct("a", "a") == 1',
    ],
  },
  119: {
    solution: `class Solution:
    def minDistance(self, word1, word2):
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
    tests: [
      'assert Solution().minDistance("horse", "ros") == 3',
      'assert Solution().minDistance("intention", "execution") == 5',
      'assert Solution().minDistance("", "a") == 1',
    ],
  },
  120: {
    solution: `class Solution:
    def maxCoins(self, nums):
        arr = [1] + nums + [1]
        n = len(arr)
        dp = [[0] * n for _ in range(n)]
        for length in range(3, n + 1):
            for left in range(n - length + 1):
                right = left + length - 1
                for k in range(left + 1, right):
                    dp[left][right] = max(
                        dp[left][right],
                        dp[left][k] + arr[left] * arr[k] * arr[right] + dp[k][right],
                    )
        return dp[0][n - 1]`,
    tests: [
      'assert Solution().maxCoins([3, 1, 5, 8]) == 167',
      'assert Solution().maxCoins([1, 5]) == 10',
      'assert Solution().maxCoins([9]) == 9',
    ],
  },
  121: {
    solution: `class Solution:
    def isMatch(self, s, p):
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for j in range(2, n + 1):
            if p[j - 1] == "*":
                dp[0][j] = dp[0][j - 2]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == "*":
                    dp[i][j] = dp[i][j - 2]
                    if p[j - 2] == "." or p[j - 2] == s[i - 1]:
                        dp[i][j] |= dp[i - 1][j]
                elif p[j - 1] == "." or p[j - 1] == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
        return dp[m][n]`,
    tests: [
      'assert Solution().isMatch("aa", "a") == False',
      'assert Solution().isMatch("aa", "a*") == True',
      'assert Solution().isMatch("ab", ".*") == True',
    ],
  },
  122: {
    solution: `class Solution:
    def maxSubArray(self, nums):
        best = cur = nums[0]
        for n in nums[1:]:
            cur = max(n, cur + n)
            best = max(best, cur)
        return best`,
    tests: [
      'assert Solution().maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6',
      'assert Solution().maxSubArray([1]) == 1',
      'assert Solution().maxSubArray([5, 4, -1, 7, 8]) == 23',
    ],
  },
  123: {
    solution: `class Solution:
    def canJump(self, nums):
        farthest = 0
        for i, jump in enumerate(nums):
            if i > farthest:
                return False
            farthest = max(farthest, i + jump)
        return True`,
    tests: [
      'assert Solution().canJump([2, 3, 1, 1, 4]) == True',
      'assert Solution().canJump([3, 2, 1, 0, 4]) == False',
      'assert Solution().canJump([0]) == True',
    ],
  },
  124: {
    solution: `class Solution:
    def jump(self, nums):
        jumps = cur_end = cur_farthest = 0
        for i in range(len(nums) - 1):
            cur_farthest = max(cur_farthest, i + nums[i])
            if i == cur_end:
                jumps += 1
                cur_end = cur_farthest
        return jumps`,
    tests: [
      'assert Solution().jump([2, 3, 1, 1, 4]) == 2',
      'assert Solution().jump([2, 3, 0, 1, 4]) == 2',
      'assert Solution().jump([1, 1, 1, 1]) == 3',
    ],
  },
  125: {
    solution: `class Solution:
    def canCompleteCircuit(self, gas, cost):
        if sum(gas) < sum(cost):
            return -1
        tank = start = 0
        for i in range(len(gas)):
            tank += gas[i] - cost[i]
            if tank < 0:
                start = i + 1
                tank = 0
        return start`,
    tests: [
      'assert Solution().canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) == 3',
      'assert Solution().canCompleteCircuit([2, 3, 4], [3, 4, 3]) == -1',
      'assert Solution().canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1]) == 4',
    ],
  },
  126: {
    solution: `class Solution:
    def isNStraightHand(self, hand, groupSize):
        if len(hand) % groupSize:
            return False
        from collections import Counter

        count = Counter(hand)
        for card in sorted(count):
            while count[card] > 0:
                for k in range(groupSize):
                    if count[card + k] <= 0:
                        return False
                    count[card + k] -= 1
        return True`,
    tests: [
      'assert Solution().isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3) == True',
      'assert Solution().isNStraightHand([1, 2, 3, 4, 5], 4) == False',
      'assert Solution().isNStraightHand([1, 2, 3, 4, 5, 6], 3) == True',
    ],
  },
  127: {
    solution: `class Solution:
    def mergeTriplets(self, triplets, target):
        found = [False, False, False]
        for a, b, c in triplets:
            if a > target[0] or b > target[1] or c > target[2]:
                continue
            if a == target[0]:
                found[0] = True
            if b == target[1]:
                found[1] = True
            if c == target[2]:
                found[2] = True
        return all(found)`,
    tests: [
      'assert Solution().mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5], [1, 1, 5]], [2, 5, 5]) == True',
      'assert Solution().mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]) == False',
      'assert Solution().mergeTriplets([[1, 1, 1]], [1, 1, 1]) == True',
    ],
  },
  128: {
    solution: `class Solution:
    def partitionLabels(self, s):
        last = {ch: i for i, ch in enumerate(s)}
        res = []
        start = end = 0
        for i, ch in enumerate(s):
            end = max(end, last[ch])
            if i == end:
                res.append(end - start + 1)
                start = i + 1
        return res`,
    tests: [
      'assert Solution().partitionLabels("ababcbacadefegdehijhklij") == [9, 7, 8]',
      'assert Solution().partitionLabels("eccbbbbdec") == [10]',
      'assert Solution().partitionLabels("caedbdedda") == [1, 9]',
    ],
  },
  129: {
    solution: `class Solution:
    def checkValidString(self, s):
        lo = hi = 0
        for ch in s:
            if ch == "(":
                lo += 1
                hi += 1
            elif ch == ")":
                lo = max(lo - 1, 0)
                hi -= 1
            else:
                lo = max(lo - 1, 0)
                hi += 1
            if hi < 0:
                return False
        return lo == 0`,
    tests: [
      'assert Solution().checkValidString("()") == True',
      'assert Solution().checkValidString("(*)") == True',
      'assert Solution().checkValidString(")(*") == False',
    ],
  },
  130: {
    solution: `class Solution:
    def insert(self, intervals, newInterval):
        res = []
        i = 0
        n = len(intervals)
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        while i < n:
            res.append(intervals[i])
            i += 1
        return res`,
    tests: [
      'assert Solution().insert([[1, 3], [6, 9]], [2, 5]) == [[1, 5], [6, 9]]',
      'assert Solution().insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]) == [[1, 2], [3, 10], [12, 16]]',
      'assert Solution().insert([], [5, 7]) == [[5, 7]]',
    ],
  },
  131: {
    solution: `class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]
        for s, e in intervals[1:]:
            if s <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], e)
            else:
                merged.append([s, e])
        return merged`,
    tests: [
      'assert Solution().merge([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]]',
      'assert Solution().merge([[1, 4], [4, 5]]) == [[1, 5]]',
      'assert Solution().merge([[1, 4], [0, 4]]) == [[0, 4]]',
    ],
  },
  132: {
    solution: `class Solution:
    def eraseOverlapIntervals(self, intervals):
        intervals.sort(key=lambda x: x[1])
        end = float("-inf")
        kept = 0
        for s, e in intervals:
            if s >= end:
                kept += 1
                end = e
        return len(intervals) - kept`,
    tests: [
      'assert Solution().eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]) == 1',
      'assert Solution().eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]) == 2',
      'assert Solution().eraseOverlapIntervals([[1, 2], [2, 3]]) == 0',
    ],
  },
  133: {
    solution: `class Solution:
    def canAttendMeetings(self, intervals):
        intervals.sort(key=lambda x: x[0])
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False
        return True`,
    tests: [
      'assert Solution().canAttendMeetings([[0, 30], [5, 10], [15, 20]]) == False',
      'assert Solution().canAttendMeetings([[7, 10], [2, 4]]) == True',
      'assert Solution().canAttendMeetings([[1, 5], [5, 10]]) == True',
    ],
  },
  134: {
    solution: `class Solution:
    def minMeetingRooms(self, intervals):
        import heapq

        intervals.sort(key=lambda x: x[0])
        heap = []
        for s, e in intervals:
            if heap and heap[0] <= s:
                heapq.heappop(heap)
            heapq.heappush(heap, e)
        return len(heap)`,
    tests: [
      'assert Solution().minMeetingRooms([[0, 30], [5, 10], [15, 20]]) == 2',
      'assert Solution().minMeetingRooms([[7, 10], [2, 4]]) == 1',
      'assert Solution().minMeetingRooms([[1, 5], [5, 10], [8, 9]]) == 2',
    ],
  },
  135: {
    solution: `class Solution:
    def minInterval(self, intervals, queries):
        import heapq

        intervals.sort()
        res = [-1] * len(queries)
        indexed = sorted(enumerate(queries), key=lambda x: x[1])
        i = 0
        heap = []
        for qi, q in indexed:
            while i < len(intervals) and intervals[i][0] <= q:
                l, r = intervals[i]
                heapq.heappush(heap, (r - l + 1, r))
                i += 1
            while heap and heap[0][1] < q:
                heapq.heappop(heap)
            if heap:
                res[qi] = heap[0][0]
        return res`,
    tests: [
      'assert Solution().minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]) == [3, 3, 1, 4]',
      'assert Solution().minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [3, 4, 23, 24, 25]) == [2, 4, 6, 6, 6]',
      'assert Solution().minInterval([[1, 2]], [1]) == [2]',
    ],
  },
  136: {
    solution: `class Solution:
    def rotate(self, matrix):
        n = len(matrix)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        for row in matrix:
            row.reverse()`,
    tests: [
      '_m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; Solution().rotate(_m); assert _m == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]',
      '_m = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]; Solution().rotate(_m); assert _m == [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]',
      '_m = [[1]]; Solution().rotate(_m); assert _m == [[1]]',
    ],
  },
  137: {
    solution: `class Solution:
    def spiralOrder(self, matrix):
        if not matrix:
            return []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        res = []
        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                res.append(matrix[top][c])
            top += 1
            for r in range(top, bottom + 1):
                res.append(matrix[r][right])
            right -= 1
            if top <= bottom:
                for c in range(right, left - 1, -1):
                    res.append(matrix[bottom][c])
                bottom -= 1
            if left <= right:
                for r in range(bottom, top - 1, -1):
                    res.append(matrix[r][left])
                left += 1
        return res`,
    tests: [
      'assert Solution().spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5]',
      'assert Solution().spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]',
      'assert Solution().spiralOrder([[1]]) == [1]',
    ],
  },
  138: {
    solution: `class Solution:
    def setZeroes(self, matrix):
        m, n = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][j] == 0 for j in range(n))
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0`,
    tests: [
      '_m = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]; Solution().setZeroes(_m); assert _m == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]',
      '_m = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]; Solution().setZeroes(_m); assert _m == [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]',
      '_m = [[1]]; Solution().setZeroes(_m); assert _m == [[1]]',
    ],
  },
  139: {
    solution: `class Solution:
    def isHappy(self, n):
        def next_num(x):
            s = 0
            while x:
                d = x % 10
                s += d * d
                x //= 10
            return s

        slow = fast = n
        while True:
            slow = next_num(slow)
            fast = next_num(next_num(fast))
            if slow == 1:
                return True
            if slow == fast:
                return False`,
    tests: [
      'assert Solution().isHappy(19) == True',
      'assert Solution().isHappy(2) == False',
      'assert Solution().isHappy(1) == True',
    ],
  },
  140: {
    solution: `class Solution:
    def plusOne(self, digits):
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits`,
    tests: [
      'assert Solution().plusOne([1, 2, 3]) == [1, 2, 4]',
      'assert Solution().plusOne([4, 3, 2, 1]) == [4, 3, 2, 2]',
      'assert Solution().plusOne([9]) == [1, 0]',
    ],
  },
  141: {
    solution: `class Solution:
    def myPow(self, x, n):
        if n < 0:
            x = 1 / x
            n = -n
        res = 1
        while n:
            if n & 1:
                res *= x
            x *= x
            n >>= 1
        return res`,
    tests: [
      'assert Solution().myPow(2.0, 10) == 1024.0',
      'assert Solution().myPow(2.1, 3) == 2.1 ** 3',
      'assert Solution().myPow(2.0, -2) == 0.25',
    ],
  },
  142: {
    solution: `class Solution:
    def multiply(self, num1, num2):
        if num1 == "0" or num2 == "0":
            return "0"
        m, n = len(num1), len(num2)
        res = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + res[p2]
                res[p2] = total % 10
                res[p1] += total // 10
        while len(res) > 1 and res[0] == 0:
            res.pop(0)
        return "".join(map(str, res))`,
    tests: [
      'assert Solution().multiply("2", "3") == "6"',
      'assert Solution().multiply("123", "456") == "56088"',
      'assert Solution().multiply("0", "0") == "0"',
    ],
  },
  143: {
    solution: `class DetectSquares:
    def __init__(self):
        self.counts = {}
        self.pts = []

    def add(self, point):
        p = tuple(point)
        self.pts.append(p)
        self.counts[p] = self.counts.get(p, 0) + 1

    def count(self, point):
        px, py = point
        ans = 0
        for x, y in self.pts:
            if abs(px - x) == abs(py - y) and px != x and py != y:
                ans += self.counts.get((x, py), 0) * self.counts.get((px, y), 0)
        return ans`,
    tests: [
      '_ds = DetectSquares(); _ds.add([3, 10]); _ds.add([11, 2]); _ds.add([3, 2]); assert _ds.count([11, 10]) == 1',
      '_ds = DetectSquares(); _ds.add([0, 0]); _ds.add([1, 0]); _ds.add([0, 1]); _ds.add([1, 1]); assert _ds.count([0, 0]) == 1',
      '_ds = DetectSquares(); _ds.add([1, 1]); assert _ds.count([1, 1]) == 0',
    ],
  },
  144: {
    solution: `class Solution:
    def singleNumber(self, nums):
        res = 0
        for n in nums:
            res ^= n
        return res`,
    tests: [
      'assert Solution().singleNumber([2, 2, 1]) == 1',
      'assert Solution().singleNumber([4, 1, 2, 1, 2]) == 4',
      'assert Solution().singleNumber([1]) == 1',
    ],
  },
  145: {
    solution: `class Solution:
    def hammingWeight(self, n):
        count = 0
        while n:
            n &= n - 1
            count += 1
        return count`,
    tests: [
      'assert Solution().hammingWeight(11) == 3',
      'assert Solution().hammingWeight(128) == 1',
      'assert Solution().hammingWeight(0) == 0',
    ],
  },
  146: {
    solution: `class Solution:
    def countBits(self, n):
        bits = [0] * (n + 1)
        for i in range(1, n + 1):
            bits[i] = bits[i >> 1] + (i & 1)
        return bits`,
    tests: [
      'assert Solution().countBits(2) == [0, 1, 1]',
      'assert Solution().countBits(5) == [0, 1, 1, 2, 1, 2]',
      'assert Solution().countBits(0) == [0]',
    ],
  },
  147: {
    solution: `class Solution:
    def reverseBits(self, n):
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res`,
    tests: [
      'assert Solution().reverseBits(43261596) == 964176192',
      'assert Solution().reverseBits(4294967293) == 3221225471',
      'assert Solution().reverseBits(0) == 0',
    ],
  },
  148: {
    solution: `class Solution:
    def missingNumber(self, nums):
        res = len(nums)
        for i, n in enumerate(nums):
            res ^= i ^ n
        return res`,
    tests: [
      'assert Solution().missingNumber([3, 0, 1]) == 2',
      'assert Solution().missingNumber([0, 1]) == 2',
      'assert Solution().missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8',
    ],
  },
  149: {
    solution: `class Solution:
    def getSum(self, a, b):
        mask = 0xFFFFFFFF
        while b:
            carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
    tests: [
      'assert Solution().getSum(1, 2) == 3',
      'assert Solution().getSum(2, 3) == 5',
      'assert Solution().getSum(-1, 1) == 0',
    ],
  },
  150: {
    solution: `class Solution:
    def reverse(self, x):
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31
        res = 0
        sign = -1 if x < 0 else 1
        x = abs(x)
        while x:
            res = res * 10 + x % 10
            x //= 10
        res *= sign
        if res > INT_MAX or res < INT_MIN:
            return 0
        return res`,
    tests: [
      'assert Solution().reverse(123) == 321',
      'assert Solution().reverse(-123) == -321',
      'assert Solution().reverse(120) == 21',
    ],
  },
};
