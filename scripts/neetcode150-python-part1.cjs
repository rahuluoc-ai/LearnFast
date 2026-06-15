// Python solutions and tests for NeetCode 150 problems 1-50
module.exports = {
  1: {
    solution: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False`,
    tests: [
      'assert Solution().containsDuplicate([1, 2, 3, 1]) == True',
      'assert Solution().containsDuplicate([1, 2, 3, 4]) == False',
      'assert Solution().containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) == True',
    ],
  },
  2: {
    solution: `class Solution:
    def isAnagram(self, s, t):
        if len(s) != len(t):
            return False
        count = {}
        for c in s:
            count[c] = count.get(c, 0) + 1
        for c in t:
            if c not in count:
                return False
            count[c] -= 1
            if count[c] == 0:
                del count[c]
        return len(count) == 0`,
    tests: [
      'assert Solution().isAnagram("anagram", "nagaram") == True',
      'assert Solution().isAnagram("rat", "car") == False',
      'assert Solution().isAnagram("a", "ab") == False',
    ],
  },
  3: {
    solution: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, n in enumerate(nums):
            comp = target - n
            if comp in seen:
                return [seen[comp], i]
            seen[n] = i`,
    tests: [
      'assert Solution().twoSum([2, 7, 11, 15], 9) == [0, 1]',
      'assert Solution().twoSum([3, 2, 4], 6) == [1, 2]',
      'assert Solution().twoSum([3, 3], 6) == [0, 1]',
    ],
  },
  4: {
    solution: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs):
        groups = defaultdict(list)
        for s in strs:
            key = tuple(sorted(s))
            groups[key].append(s)
        return list(groups.values())`,
    tests: [
      'result = Solution().groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])\nassert sorted([sorted(g) for g in result]) == sorted([sorted(g) for g in [["bat"], ["nat", "tan"], ["eat", "tea", "ate"]]])',
      'assert Solution().groupAnagrams([""]) == [[""]]',
      'assert Solution().groupAnagrams(["a"]) == [["a"]]',
    ],
  },
  5: {
    solution: `from collections import Counter

class Solution:
    def topKFrequent(self, nums, k):
        count = Counter(nums)
        return [x for x, _ in count.most_common(k)]`,
    tests: [
      'assert sorted(Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)) == [1, 2]',
      'assert Solution().topKFrequent([1], 1) == [1]',
      'assert sorted(Solution().topKFrequent([4, 4, 4, 5, 5, 6], 2)) == [4, 5]',
    ],
  },
  6: {
    solution: `class Solution:
    def productExceptSelf(self, nums):
        n = len(nums)
        result = [1] * n
        prefix = 1
        for i in range(n):
            result[i] = prefix
            prefix *= nums[i]
        suffix = 1
        for i in range(n - 1, -1, -1):
            result[i] *= suffix
            suffix *= nums[i]
        return result`,
    tests: [
      'assert Solution().productExceptSelf([1, 2, 3, 4]) == [24, 12, 8, 6]',
      'assert Solution().productExceptSelf([-1, 1, 0, -3, 3]) == [0, 0, 9, 0, 0]',
      'assert Solution().productExceptSelf([2, 3]) == [3, 2]',
    ],
  },
  7: {
    solution: `class Codec:
    def encode(self, strs):
        parts = []
        for s in strs:
            parts.append(f"{len(s)}#{s}")
        return "".join(parts)

    def decode(self, s):
        result = []
        i = 0
        while i < len(s):
            j = s.index("#", i)
            length = int(s[i:j])
            i = j + 1
            result.append(s[i:i + length])
            i += length
        return result`,
    tests: [
      'codec = Codec()\nassert codec.decode(codec.encode(["hello", "world"])) == ["hello", "world"]',
      'codec = Codec()\nassert codec.decode(codec.encode([""])) == [""]',
      'codec = Codec()\nassert codec.decode(codec.encode(["a", "ab", "abc"])) == ["a", "ab", "abc"]',
    ],
  },
  8: {
    solution: `class Solution:
    def longestConsecutive(self, nums):
        num_set = set(nums)
        best = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 0
                while n + length in num_set:
                    length += 1
                best = max(best, length)
        return best`,
    tests: [
      'assert Solution().longestConsecutive([100, 4, 200, 1, 3, 2]) == 4',
      'assert Solution().longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) == 9',
      'assert Solution().longestConsecutive([]) == 0',
    ],
  },
  9: {
    solution: `class Solution:
    def isValidSudoku(self, board):
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == ".":
                    continue
                box = (r // 3) * 3 + c // 3
                if val in rows[r] or val in cols[c] or val in boxes[box]:
                    return False
                rows[r].add(val)
                cols[c].add(val)
                boxes[box].add(val)
        return True`,
    tests: [
      'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\nassert Solution().isValidSudoku(board) == True',
      'board = [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\nassert Solution().isValidSudoku(board) == False',
      'assert Solution().isValidSudoku([["."] * 9 for _ in range(9)]) == True',
    ],
  },
  10: {
    solution: `class Solution:
    def isPalindrome(self, s):
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
    tests: [
      'assert Solution().isPalindrome("A man, a plan, a canal: Panama") == True',
      'assert Solution().isPalindrome("race a car") == False',
      'assert Solution().isPalindrome(" ") == True',
    ],
  },
  11: {
    solution: `class Solution:
    def twoSum(self, numbers, target):
        left, right = 0, len(numbers) - 1
        while left < right:
            total = numbers[left] + numbers[right]
            if total == target:
                return [left + 1, right + 1]
            if total < target:
                left += 1
            else:
                right -= 1`,
    tests: [
      'assert Solution().twoSum([2, 7, 11, 15], 9) == [1, 2]',
      'assert Solution().twoSum([2, 3, 4], 6) == [1, 3]',
      'assert Solution().twoSum([-1, 0], -1) == [1, 2]',
    ],
  },
  12: {
    solution: `class Solution:
    def threeSum(self, nums):
        nums.sort()
        result = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1
        return result`,
    tests: [
      'result = Solution().threeSum([-1, 0, 1, 2, -1, -4])\nassert sorted([sorted(t) for t in result]) == sorted([sorted(t) for t in [[-1, -1, 2], [-1, 0, 1]]])',
      'assert Solution().threeSum([0, 1, 1]) == []',
      'assert Solution().threeSum([0, 0, 0]) == [[0, 0, 0]]',
    ],
  },
  13: {
    solution: `class Solution:
    def maxArea(self, height):
        left, right = 0, len(height) - 1
        best = 0
        while left < right:
            area = min(height[left], height[right]) * (right - left)
            best = max(best, area)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return best`,
    tests: [
      'assert Solution().maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49',
      'assert Solution().maxArea([1, 1]) == 1',
      'assert Solution().maxArea([4, 3, 2, 1, 4]) == 16',
    ],
  },
  14: {
    solution: `class Solution:
    def trap(self, height):
        if not height:
            return 0
        left, right = 0, len(height) - 1
        left_max = right_max = 0
        water = 0
        while left < right:
            if height[left] <= height[right]:
                left_max = max(left_max, height[left])
                water += left_max - height[left]
                left += 1
            else:
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                right -= 1
        return water`,
    tests: [
      'assert Solution().trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6',
      'assert Solution().trap([4, 2, 0, 3, 2, 5]) == 9',
      'assert Solution().trap([1, 2, 3]) == 0',
    ],
  },
  15: {
    solution: `class Solution:
    def maxProfit(self, prices):
        min_price = float("inf")
        best = 0
        for p in prices:
            min_price = min(min_price, p)
            best = max(best, p - min_price)
        return best`,
    tests: [
      'assert Solution().maxProfit([7, 1, 5, 3, 6, 4]) == 5',
      'assert Solution().maxProfit([7, 6, 4, 3, 1]) == 0',
      'assert Solution().maxProfit([2, 4, 1]) == 2',
    ],
  },
  16: {
    solution: `class Solution:
    def lengthOfLongestSubstring(self, s):
        seen = {}
        start = 0
        best = 0
        for i, c in enumerate(s):
            if c in seen and seen[c] >= start:
                start = seen[c] + 1
            seen[c] = i
            best = max(best, i - start + 1)
        return best`,
    tests: [
      'assert Solution().lengthOfLongestSubstring("abcabcbb") == 3',
      'assert Solution().lengthOfLongestSubstring("bbbbb") == 1',
      'assert Solution().lengthOfLongestSubstring("pwwkew") == 3',
    ],
  },
  17: {
    solution: `class Solution:
    def characterReplacement(self, s, k):
        count = {}
        left = 0
        max_freq = 0
        best = 0
        for right in range(len(s)):
            count[s[right]] = count.get(s[right], 0) + 1
            max_freq = max(max_freq, count[s[right]])
            while (right - left + 1) - max_freq > k:
                count[s[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best`,
    tests: [
      'assert Solution().characterReplacement("ABAB", 2) == 4',
      'assert Solution().characterReplacement("AABABBA", 1) == 4',
      'assert Solution().characterReplacement("AAAA", 0) == 4',
    ],
  },
  18: {
    solution: `class Solution:
    def checkInclusion(self, s1, s2):
        if len(s1) > len(s2):
            return False
        need = [0] * 26
        window = [0] * 26
        for c in s1:
            need[ord(c) - ord("a")] += 1
        left = 0
        for right in range(len(s2)):
            window[ord(s2[right]) - ord("a")] += 1
            if right - left + 1 > len(s1):
                window[ord(s2[left]) - ord("a")] -= 1
                left += 1
            if right - left + 1 == len(s1) and window == need:
                return True
        return False`,
    tests: [
      'assert Solution().checkInclusion("ab", "eidbaooo") == True',
      'assert Solution().checkInclusion("ab", "eidboaoo") == False',
      'assert Solution().checkInclusion("adc", "dcda") == True',
    ],
  },
  19: {
    solution: `class Solution:
    def minWindow(self, s, t):
        if not t or not s:
            return ""
        need = {}
        for c in t:
            need[c] = need.get(c, 0) + 1
        required = len(need)
        formed = 0
        window = {}
        left = 0
        best_len = float("inf")
        best = (0, 0)
        for right, c in enumerate(s):
            window[c] = window.get(c, 0) + 1
            if c in need and window[c] == need[c]:
                formed += 1
            while formed == required:
                if right - left + 1 < best_len:
                    best_len = right - left + 1
                    best = (left, right)
                left_c = s[left]
                window[left_c] -= 1
                if left_c in need and window[left_c] < need[left_c]:
                    formed -= 1
                left += 1
        return "" if best_len == float("inf") else s[best[0]:best[1] + 1]`,
    tests: [
      'assert Solution().minWindow("ADOBECODEBANC", "ABC") == "BANC"',
      'assert Solution().minWindow("a", "a") == "a"',
      'assert Solution().minWindow("a", "aa") == ""',
    ],
  },
  20: {
    solution: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums, k):
        dq = deque()
        result = []
        for i, n in enumerate(nums):
            while dq and nums[dq[-1]] <= n:
                dq.pop()
            dq.append(i)
            if dq[0] <= i - k:
                dq.popleft()
            if i >= k - 1:
                result.append(nums[dq[0]])
        return result`,
    tests: [
      'assert Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7]',
      'assert Solution().maxSlidingWindow([1], 1) == [1]',
      'assert Solution().maxSlidingWindow([9, 11], 2) == [11]',
    ],
  },
  21: {
    solution: `class Solution:
    def isValid(self, s):
        stack = []
        pairs = {")": "(", "}": "{", "]": "["}
        for c in s:
            if c in pairs.values():
                stack.append(c)
            elif not stack or stack.pop() != pairs[c]:
                return False
        return not stack`,
    tests: [
      'assert Solution().isValid("()") == True',
      'assert Solution().isValid("()[]{}") == True',
      'assert Solution().isValid("(]") == False',
    ],
  },
  22: {
    solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]`,
    tests: [
      's = MinStack()\ns.push(-2)\ns.push(0)\ns.push(-3)\nassert s.getMin() == -3\ns.pop()\nassert s.top() == 0\nassert s.getMin() == -2',
      's = MinStack()\ns.push(2)\ns.push(1)\nassert s.getMin() == 1\ns.pop()\nassert s.top() == 2\nassert s.getMin() == 2',
      's = MinStack()\ns.push(5)\ns.push(5)\ns.pop()\nassert s.top() == 5',
    ],
  },
  23: {
    solution: `class Solution:
    def evalRPN(self, tokens):
        stack = []
        ops = {"+", "-", "*", "/"}
        for t in tokens:
            if t in ops:
                b = stack.pop()
                a = stack.pop()
                if t == "+":
                    stack.append(a + b)
                elif t == "-":
                    stack.append(a - b)
                elif t == "*":
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(t))
        return stack[0]`,
    tests: [
      'assert Solution().evalRPN(["2", "1", "+", "3", "*"]) == 9',
      'assert Solution().evalRPN(["4", "13", "5", "/", "+"]) == 6',
      'assert Solution().evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]) == 22',
    ],
  },
  24: {
    solution: `class Solution:
    def dailyTemperatures(self, temperatures):
        n = len(temperatures)
        result = [0] * n
        stack = []
        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                j = stack.pop()
                result[j] = i - j
            stack.append(i)
        return result`,
    tests: [
      'assert Solution().dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]) == [1, 1, 4, 2, 1, 1, 0, 0]',
      'assert Solution().dailyTemperatures([30, 40, 50, 60]) == [1, 1, 1, 0]',
      'assert Solution().dailyTemperatures([30, 60, 90]) == [1, 1, 0]',
    ],
  },
  25: {
    solution: `class Solution:
    def carFleet(self, target, position, speed):
        pairs = sorted(zip(position, speed), reverse=True)
        fleets = 0
        prev_time = 0
        for pos, spd in pairs:
            time = (target - pos) / spd
            if time > prev_time:
                fleets += 1
                prev_time = time
        return fleets`,
    tests: [
      'assert Solution().carFleet(12, [10, 8], [3, 4]) == 2',
      'assert Solution().carFleet(10, [3], [3]) == 1',
      'assert Solution().carFleet(100, [0, 2, 4], [4, 2, 1]) == 1',
    ],
  },
  26: {
    solution: `class Solution:
    def largestRectangleArea(self, heights):
        stack = []
        best = 0
        heights.append(0)
        for i, h in enumerate(heights):
            while stack and h < heights[stack[-1]]:
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                best = max(best, height * width)
            stack.append(i)
        heights.pop()
        return best`,
    tests: [
      'assert Solution().largestRectangleArea([2, 1, 5, 6, 2, 3]) == 10',
      'assert Solution().largestRectangleArea([2, 4]) == 4',
      'assert Solution().largestRectangleArea([1]) == 1',
    ],
  },
  27: {
    solution: `class Solution:
    def search(self, nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
    tests: [
      'assert Solution().search([-1, 0, 3, 5, 9, 12], 9) == 4',
      'assert Solution().search([-1, 0, 3, 5, 9, 12], 2) == -1',
      'assert Solution().search([5], 5) == 0',
    ],
  },
  28: {
    solution: `class Solution:
    def searchMatrix(self, matrix, target):
        if not matrix:
            return False
        rows, cols = len(matrix), len(matrix[0])
        left, right = 0, rows * cols - 1
        while left <= right:
            mid = (left + right) // 2
            val = matrix[mid // cols][mid % cols]
            if val == target:
                return True
            if val < target:
                left = mid + 1
            else:
                right = mid - 1
        return False`,
    tests: [
      'matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\nassert Solution().searchMatrix(matrix, 3) == True',
      'matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\nassert Solution().searchMatrix(matrix, 13) == False',
      'assert Solution().searchMatrix([[1]], 1) == True',
    ],
  },
  29: {
    solution: `import math

class Solution:
    def minEatingSpeed(self, piles, h):
        left, right = 1, max(piles)
        while left < right:
            mid = (left + right) // 2
            hours = sum(math.ceil(p / mid) for p in piles)
            if hours <= h:
                right = mid
            else:
                left = mid + 1
        return left`,
    tests: [
      'assert Solution().minEatingSpeed([3, 6, 7, 11], 8) == 4',
      'assert Solution().minEatingSpeed([30, 11, 23, 4, 20], 5) == 30',
      'assert Solution().minEatingSpeed([30, 11, 23, 4, 20], 6) == 23',
    ],
  },
  30: {
    solution: `class Solution:
    def findMin(self, nums):
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]`,
    tests: [
      'assert Solution().findMin([3, 4, 5, 1, 2]) == 1',
      'assert Solution().findMin([4, 5, 6, 7, 0, 1, 2]) == 0',
      'assert Solution().findMin([11, 13, 15, 17]) == 11',
    ],
  },
  31: {
    solution: `class Solution:
    def search(self, nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1`,
    tests: [
      'assert Solution().search([4, 5, 6, 7, 0, 1, 2], 0) == 4',
      'assert Solution().search([4, 5, 6, 7, 0, 1, 2], 3) == -1',
      'assert Solution().search([1], 0) == -1',
    ],
  },
  32: {
    solution: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key, timestamp):
        if key not in self.store:
            return ""
        arr = self.store[key]
        left, right = 0, len(arr) - 1
        result = ""
        while left <= right:
            mid = (left + right) // 2
            if arr[mid][0] <= timestamp:
                result = arr[mid][1]
                left = mid + 1
            else:
                right = mid - 1
        return result`,
    tests: [
      'tm = TimeMap()\ntm.set("foo", "bar", 1)\nassert tm.get("foo", 1) == "bar"\nassert tm.get("foo", 3) == "bar"',
      'tm = TimeMap()\ntm.set("foo", "bar", 1)\ntm.set("foo", "bar2", 4)\nassert tm.get("foo", 4) == "bar2"\nassert tm.get("foo", 5) == "bar2"',
      'tm = TimeMap()\ntm.set("love", "high", 10)\ntm.set("love", "low", 20)\nassert tm.get("love", 5) == ""\nassert tm.get("love", 10) == "high"\nassert tm.get("love", 15) == "high"\nassert tm.get("love", 20) == "low"',
    ],
  },
  33: {
    solution: `class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        A, B = nums1, nums2
        if len(A) > len(B):
            A, B = B, A
        total = len(A) + len(B)
        half = total // 2
        left, right = 0, len(A)
        while True:
            i = (left + right) // 2
            j = half - i
            Aleft = float("-inf") if i == 0 else A[i - 1]
            Aright = float("inf") if i == len(A) else A[i]
            Bleft = float("-inf") if j == 0 else B[j - 1]
            Bright = float("inf") if j == len(B) else B[j]
            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            if Aleft > Bright:
                right = i - 1
            else:
                left = i + 1`,
    tests: [
      'assert Solution().findMedianSortedArrays([1, 3], [2]) == 2.0',
      'assert Solution().findMedianSortedArrays([1, 2], [3, 4]) == 2.5',
      'assert Solution().findMedianSortedArrays([0, 0], [0, 0]) == 0.0',
    ],
  },
  34: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nassert ll_to_list(Solution().reverseList(list_to_ll([1, 2, 3, 4, 5]))) == [5, 4, 3, 2, 1]',
      'assert ll_to_list(Solution().reverseList(list_to_ll([1, 2]))) == [2, 1]',
      'assert ll_to_list(Solution().reverseList(None)) == []',
    ],
  },
  35: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        cur = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nassert ll_to_list(Solution().mergeTwoLists(list_to_ll([1, 2, 4]), list_to_ll([1, 3, 4]))) == [1, 1, 2, 3, 4, 4]',
      'assert ll_to_list(Solution().mergeTwoLists(None, None)) == []',
      'assert ll_to_list(Solution().mergeTwoLists(None, list_to_ll([0]))) == [0]',
    ],
  },
  36: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head):
        if not head or not head.next:
            return
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        second = slow.next
        slow.next = None
        prev = None
        while second:
            nxt = second.next
            second.next = prev
            prev = second
            second = nxt
        first, second = head, prev
        while second:
            t1, t2 = first.next, second.next
            first.next = second
            second.next = t1
            first, second = t1, t2`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nhead = list_to_ll([1, 2, 3, 4])\nSolution().reorderList(head)\nassert ll_to_list(head) == [1, 4, 2, 3]',
      'head = list_to_ll([1, 2, 3, 4, 5])\nSolution().reorderList(head)\nassert ll_to_list(head) == [1, 5, 2, 4, 3]',
      'head = list_to_ll([1])\nSolution().reorderList(head)\nassert ll_to_list(head) == [1]',
    ],
  },
  37: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nassert ll_to_list(Solution().removeNthFromEnd(list_to_ll([1, 2, 3, 4, 5]), 2)) == [1, 2, 3, 5]',
      'assert ll_to_list(Solution().removeNthFromEnd(list_to_ll([1]), 1)) == []',
      'assert ll_to_list(Solution().removeNthFromEnd(list_to_ll([1, 2]), 1)) == [1]',
    ],
  },
  38: {
    solution: `class Node:
    def __init__(self, x, next=None, random=None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head):
        if not head:
            return None
        cur = head
        while cur:
            copy = Node(cur.val)
            copy.next = cur.next
            cur.next = copy
            cur = copy.next
        cur = head
        while cur:
            if cur.random:
                cur.next.random = cur.random.next
            cur = cur.next.next
        cur = head
        copy_head = head.next
        while cur:
            copy = cur.next
            cur.next = copy.next
            copy.next = copy.next.next if copy.next else None
            cur = cur.next
        return copy_head`,
    tests: [
      'def build_list(vals):\n    if not vals:\n        return None\n    nodes = [Node(v) for v, _ in vals]\n    for i, (_, r) in enumerate(vals):\n        if i + 1 < len(nodes):\n            nodes[i].next = nodes[i + 1]\n        nodes[i].random = nodes[r] if r is not None else None\n    return nodes[0]\n\ndef list_vals(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\norig = build_list([[7, None], [13, 0], [11, 4], [10, 2], [1, 0]])\ncopy = Solution().copyRandomList(orig)\nassert list_vals(copy) == [7, 13, 11, 10, 1]\nassert copy.next.random.val == 7',
      'assert Solution().copyRandomList(None) is None',
      'orig = build_list([[3, None], [3, 0], [3, None]])\ncopy = Solution().copyRandomList(orig)\nassert list_vals(copy) == [3, 3, 3]',
    ],
  },
  39: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1, l2):
        dummy = ListNode(0)
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            total = carry
            if l1:
                total += l1.val
                l1 = l1.next
            if l2:
                total += l2.val
                l2 = l2.next
            carry, val = divmod(total, 10)
            cur.next = ListNode(val)
            cur = cur.next
        return dummy.next`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nassert ll_to_list(Solution().addTwoNumbers(list_to_ll([2, 4, 3]), list_to_ll([5, 6, 4]))) == [7, 0, 8]',
      'assert ll_to_list(Solution().addTwoNumbers(list_to_ll([0]), list_to_ll([0]))) == [0]',
      'assert ll_to_list(Solution().addTwoNumbers(list_to_ll([9, 9, 9, 9, 9, 9, 9]), list_to_ll([9, 9, 9, 9]))) == [8, 9, 9, 9, 0, 0, 0, 1]',
    ],
  },
  40: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def hasCycle(self, head):
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False`,
    tests: [
      'n1 = ListNode(3)\nn2 = ListNode(2)\nn3 = ListNode(0)\nn4 = ListNode(-4)\nn1.next = n2\nn2.next = n3\nn3.next = n4\nn4.next = n2\nassert Solution().hasCycle(n1) == True',
      'assert Solution().hasCycle(ListNode(1)) == False',
      'n1 = ListNode(1)\nn2 = ListNode(2)\nn1.next = n2\nn2.next = n1\nassert Solution().hasCycle(n1) == True',
    ],
  },
  41: {
    solution: `class Solution:
    def findDuplicate(self, nums):
        slow = fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow`,
    tests: [
      'assert Solution().findDuplicate([1, 3, 4, 2, 2]) == 2',
      'assert Solution().findDuplicate([3, 1, 3, 4, 2]) == 3',
      'assert Solution().findDuplicate([1, 1]) == 1',
    ],
  },
  42: {
    solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    tests: [
      'cache = LRUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\nassert cache.get(1) == 1\ncache.put(3, 3)\nassert cache.get(2) == -1\ncache.put(4, 4)\nassert cache.get(1) == -1\nassert cache.get(3) == 3\nassert cache.get(4) == 4',
      'cache = LRUCache(1)\ncache.put(2, 1)\nassert cache.get(2) == 1\ncache.put(3, 2)\nassert cache.get(2) == -1\nassert cache.get(3) == 2',
      'cache = LRUCache(2)\ncache.put(2, 1)\ncache.put(1, 1)\ncache.put(2, 3)\ncache.put(4, 1)\nassert cache.get(1) == -1\nassert cache.get(2) == 3',
    ],
  },
  43: {
    solution: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists):
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))
        dummy = ListNode(0)
        cur = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            cur.next = node
            cur = cur.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nlists = [list_to_ll([1, 4, 5]), list_to_ll([1, 3, 4]), list_to_ll([2, 6])]\nassert ll_to_list(Solution().mergeKLists(lists)) == [1, 1, 2, 3, 4, 4, 5, 6]',
      'assert ll_to_list(Solution().mergeKLists([])) == []',
      'assert ll_to_list(Solution().mergeKLists([None])) == []',
    ],
  },
  44: {
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseKGroup(self, head, k):
        def get_kth(curr, k):
            while curr and k > 1:
                curr = curr.next
                k -= 1
            return curr

        dummy = ListNode(0, head)
        group_prev = dummy
        while True:
            kth = get_kth(group_prev, k + 1)
            if not kth:
                break
            group_next = kth.next
            prev, curr = kth.next, group_prev.next
            while curr != group_next:
                nxt = curr.next
                curr.next = prev
                prev = curr
                curr = nxt
            tmp = group_prev.next
            group_prev.next = kth
            group_prev = tmp
        return dummy.next`,
    tests: [
      'def list_to_ll(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef ll_to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\nassert ll_to_list(Solution().reverseKGroup(list_to_ll([1, 2, 3, 4, 5]), 2)) == [2, 1, 4, 3, 5]',
      'assert ll_to_list(Solution().reverseKGroup(list_to_ll([1, 2, 3, 4, 5]), 3)) == [3, 2, 1, 4, 5]',
      'assert ll_to_list(Solution().reverseKGroup(list_to_ll([1]), 1)) == [1]',
    ],
  },
  45: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\ndef tree_to_list(root):\n    if not root:\n        return []\n    out = []\n    queue = [root]\n    while queue:\n        node = queue.pop(0)\n        if node:\n            out.append(node.val)\n            queue.append(node.left)\n            queue.append(node.right)\n        else:\n            out.append(None)\n    while out and out[-1] is None:\n        out.pop()\n    return out\n\nroot = list_to_tree([4, 2, 7, 1, 3, 6, 9])\nassert tree_to_list(Solution().invertTree(root)) == [4, 7, 2, 9, 6, 3, 1]',
      'root = list_to_tree([2, 1, 3])\nassert tree_to_list(Solution().invertTree(root)) == [2, 3, 1]',
      'assert Solution().invertTree(None) is None',
    ],
  },
  46: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root):
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\nassert Solution().maxDepth(list_to_tree([3, 9, 20, None, None, 15, 7])) == 3',
      'assert Solution().maxDepth(list_to_tree([1, None, 2])) == 2',
      'assert Solution().maxDepth(None) == 0',
    ],
  },
  47: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root):
        self.best = 0

        def depth(node):
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            self.best = max(self.best, left + right)
            return 1 + max(left, right)

        depth(root)
        return self.best`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\nassert Solution().diameterOfBinaryTree(list_to_tree([1, 2, 3, 4, 5])) == 3',
      'assert Solution().diameterOfBinaryTree(list_to_tree([1, 2])) == 1',
      'assert Solution().diameterOfBinaryTree(None) == 0',
    ],
  },
  48: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isBalanced(self, root):
        def height(node):
            if not node:
                return 0
            left = height(node.left)
            if left == -1:
                return -1
            right = height(node.right)
            if right == -1:
                return -1
            if abs(left - right) > 1:
                return -1
            return 1 + max(left, right)

        return height(root) != -1`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\nassert Solution().isBalanced(list_to_tree([3, 9, 20, None, None, 15, 7])) == True',
      'assert Solution().isBalanced(list_to_tree([1, 2, 2, 3, 3, None, None, 4, 4])) == False',
      'assert Solution().isBalanced(None) == True',
    ],
  },
  49: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p, q):
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\np = list_to_tree([1, 2, 3])\nq = list_to_tree([1, 2, 3])\nassert Solution().isSameTree(p, q) == True',
      'p = list_to_tree([1, 2])\nq = list_to_tree([1, None, 2])\nassert Solution().isSameTree(p, q) == False',
      'assert Solution().isSameTree(None, None) == True',
    ],
  },
  50: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSubtree(self, root, subRoot):
        def same(p, q):
            if not p and not q:
                return True
            if not p or not q or p.val != q.val:
                return False
            return same(p.left, q.left) and same(p.right, q.right)

        if not root:
            return False
        if same(root, subRoot):
            return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)`,
    tests: [
      'def list_to_tree(arr):\n    if not arr:\n        return None\n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    while queue and i < len(arr):\n        node = queue.pop(0)\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\nroot = list_to_tree([3, 4, 5, 1, 2])\nsub = list_to_tree([4, 1, 2])\nassert Solution().isSubtree(root, sub) == True',
      'root = list_to_tree([3, 4, 5, 1, 2, None, None, None, None, 0])\nsub = list_to_tree([4, 1, 2])\nassert Solution().isSubtree(root, sub) == False',
      'assert Solution().isSubtree(None, list_to_tree([1])) == False',
    ],
  },
};
