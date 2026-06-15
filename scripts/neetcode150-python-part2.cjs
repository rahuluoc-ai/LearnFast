// Python solutions and tests for NeetCode 150 problems 51-100
module.exports = {
  51: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def lowestCommonAncestor(self, root, p, q):
        while root:
            if p.val < root.val and q.val < root.val:
                root = root.left
            elif p.val > root.val and q.val > root.val:
                root = root.right
            else:
                return root
        return None`,
    tests: [
      `root = TreeNode(6, TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))), TreeNode(8, TreeNode(7), TreeNode(9)))
p, q = root.left, root.right
assert Solution().lowestCommonAncestor(root, p, q).val == 6`,
      `root = TreeNode(6, TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))), TreeNode(8, TreeNode(7), TreeNode(9)))
p, q = root.left, root.left.right
assert Solution().lowestCommonAncestor(root, p, q).val == 2`,
      `root = TreeNode(2, TreeNode(1))
p, q = root, root.left
assert Solution().lowestCommonAncestor(root, p, q).val == 2`,
    ],
  },
  52: {
    solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root):
        if not root:
            return []
        result, queue = [], deque([root])
        while queue:
            level, size = [], len(queue)
            for _ in range(size):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(level)
        return result`,
    tests: [
      'assert Solution().levelOrder(None) == []',
      `root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
assert Solution().levelOrder(root) == [[3], [9, 20], [15, 7]]`,
      `root = TreeNode(1)
assert Solution().levelOrder(root) == [[1]]`,
    ],
  },
  53: {
    solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(self, root):
        if not root:
            return []
        result, queue = [], deque([root])
        while queue:
            size = len(queue)
            for i in range(size):
                node = queue.popleft()
                if i == size - 1:
                    result.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return result`,
    tests: [
      'assert Solution().rightSideView(None) == []',
      `root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4)))
assert Solution().rightSideView(root) == [1, 3, 4]`,
      `root = TreeNode(1, TreeNode(2), TreeNode(3))
assert Solution().rightSideView(root) == [1, 3]`,
    ],
  },
  54: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def goodNodes(self, root):
        def dfs(node, mx):
            if not node:
                return 0
            count = 1 if node.val >= mx else 0
            mx = max(mx, node.val)
            return count + dfs(node.left, mx) + dfs(node.right, mx)
        return dfs(root, root.val)`,
    tests: [
      `root = TreeNode(3, TreeNode(1), TreeNode(4, TreeNode(1), TreeNode(5)))
assert Solution().goodNodes(root) == 3`,
      `root = TreeNode(3, TreeNode(3, TreeNode(4), TreeNode(2)))
assert Solution().goodNodes(root) == 3`,
      `root = TreeNode(1)
assert Solution().goodNodes(root) == 1`,
    ],
  },
  55: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root):
        def valid(node, lo, hi):
            if not node:
                return True
            if not (lo < node.val < hi):
                return False
            return valid(node.left, lo, node.val) and valid(node.right, node.val, hi)
        return valid(root, float('-inf'), float('inf'))`,
    tests: [
      `root = TreeNode(2, TreeNode(1), TreeNode(3))
assert Solution().isValidBST(root) == True`,
      `root = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
assert Solution().isValidBST(root) == False`,
      `root = TreeNode(2, TreeNode(2), TreeNode(2))
assert Solution().isValidBST(root) == False`,
    ],
  },
  56: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest(self, root, k):
        stack = []
        while root or stack:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            k -= 1
            if k == 0:
                return root.val
            root = root.right`,
    tests: [
      `root = TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4))
assert Solution().kthSmallest(root, 1) == 1`,
      `root = TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4))
assert Solution().kthSmallest(root, 3) == 3`,
      `root = TreeNode(5, TreeNode(3, TreeNode(2, TreeNode(1))), TreeNode(6))
assert Solution().kthSmallest(root, 3) == 3`,
    ],
  },
  57: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder, inorder):
        idx = {val: i for i, val in enumerate(inorder)}

        def dfs(pre_l, pre_r, in_l, in_r):
            if pre_l > pre_r:
                return None
            root_val = preorder[pre_l]
            mid = idx[root_val]
            left_size = mid - in_l
            root = TreeNode(root_val)
            root.left = dfs(pre_l + 1, pre_l + left_size, in_l, mid - 1)
            root.right = dfs(pre_l + left_size + 1, pre_r, mid + 1, in_r)
            return root

        return dfs(0, len(preorder) - 1, 0, len(inorder) - 1)`,
    tests: [
      `root = Solution().buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
assert root.val == 3 and root.left.val == 9 and root.right.val == 20`,
      `root = Solution().buildTree([-1], [-1])
assert root.val == -1 and root.left is None and root.right is None`,
      `root = Solution().buildTree([1, 2], [2, 1])
assert root.val == 1 and root.left.val == 2`,
    ],
  },
  58: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root):
        best = float('-inf')

        def gain(node):
            nonlocal best
            if not node:
                return 0
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            best = max(best, node.val + left + right)
            return node.val + max(left, right)

        gain(root)
        return best`,
    tests: [
      `root = TreeNode(1, TreeNode(2), TreeNode(3))
assert Solution().maxPathSum(root) == 6`,
      `root = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
assert Solution().maxPathSum(root) == 42`,
      `root = TreeNode(-3)
assert Solution().maxPathSum(root) == -3`,
    ],
  },
  59: {
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        parts = []

        def dfs(node):
            if not node:
                parts.append('null')
                return
            parts.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return ','.join(parts)

    def deserialize(self, data):
        vals = iter(data.split(','))

        def dfs():
            val = next(vals)
            if val == 'null':
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node

        return dfs()`,
    tests: [
      `codec = Codec()
root = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5)))
data = codec.serialize(root)
restored = codec.deserialize(data)
assert restored.val == 1 and restored.left.val == 2 and restored.right.val == 3`,
      `codec = Codec()
assert codec.deserialize(codec.serialize(None)) is None`,
      `codec = Codec()
root = TreeNode(1)
restored = codec.deserialize(codec.serialize(root))
assert restored.val == 1 and restored.left is None and restored.right is None`,
    ],
  },
  60: {
    solution: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
    tests: [
      `k = KthLargest(3, [4, 5, 8, 2])
assert k.add(3) == 4
assert k.add(5) == 5
assert k.add(10) == 5
assert k.add(9) == 8
assert k.add(4) == 8`,
      `k = KthLargest(1, [])
assert k.add(-3) == -3
assert k.add(-2) == -2
assert k.add(-4) == -2`,
    ],
  },
  61: {
    solution: `import heapq

class Solution:
    def lastStoneWeight(self, stones):
        heap = [-s for s in stones]
        heapq.heapify(heap)
        while len(heap) > 1:
            y = -heapq.heappop(heap)
            x = -heapq.heappop(heap)
            if x != y:
                heapq.heappush(heap, -(y - x))
        return -heap[0] if heap else 0`,
    tests: [
      'assert Solution().lastStoneWeight([2, 7, 4, 1, 8, 1]) == 1',
      'assert Solution().lastStoneWeight([1]) == 1',
      'assert Solution().lastStoneWeight([10, 4, 2, 10]) == 2',
    ],
  },
  62: {
    solution: `import heapq

class Solution:
    def kClosest(self, points, k):
        heap = []
        for x, y in points:
            dist = -(x * x + y * y)
            heapq.heappush(heap, (dist, x, y))
            if len(heap) > k:
                heapq.heappop(heap)
        return [[x, y] for _, x, y in sorted(heap, reverse=True)]`,
    tests: [
      'assert sorted(Solution().kClosest([[1, 3], [-2, 2]], 1)) == [[-2, 2]]',
      'assert sorted(Solution().kClosest([[3, 3], [5, -1], [-2, 4]], 2)) == sorted([[-2, 4], [3, 3]])',
      'assert sorted(Solution().kClosest([[1, 1], [2, 2], [3, 3]], 1)) == [[1, 1]]',
    ],
  },
  63: {
    solution: `import random

class Solution:
    def findKthLargest(self, nums, k):
        k = len(nums) - k

        def select(l, r):
            pivot = random.randint(l, r)
            nums[pivot], nums[r] = nums[r], nums[pivot]
            store = l
            for i in range(l, r):
                if nums[i] <= nums[r]:
                    nums[i], nums[store] = nums[store], nums[i]
                    store += 1
            nums[store], nums[r] = nums[r], nums[store]
            if store == k:
                return nums[store]
            if store < k:
                return select(store + 1, r)
            return select(l, store - 1)

        return select(0, len(nums) - 1)`,
    tests: [
      'assert Solution().findKthLargest([3, 2, 1, 5, 6, 4], 2) == 5',
      'assert Solution().findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) == 4',
      'assert Solution().findKthLargest([1], 1) == 1',
    ],
  },
  64: {
    solution: `from collections import Counter

class Solution:
    def leastInterval(self, tasks, n):
        counts = Counter(tasks)
        max_freq = max(counts.values())
        max_count = sum(1 for c in counts.values() if c == max_freq)
        return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)`,
    tests: [
      'assert Solution().leastInterval(["A", "A", "A", "B", "B", "B"], 2) == 8',
      'assert Solution().leastInterval(["A", "A", "A", "B", "B", "B"], 0) == 6',
      'assert Solution().leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2) == 16',
    ],
  },
  65: {
    solution: `from collections import defaultdict, deque

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)
        self.following = defaultdict(set)

    def postTweet(self, userId, tweetId):
        self.time += 1
        self.tweets[userId].append((self.time, tweetId))

    def getNewsFeed(self, userId):
        users = self.following[userId] | {userId}
        feed = []
        for uid in users:
            feed.extend(self.tweets[uid][-10:])
        feed.sort(reverse=True)
        return [tid for _, tid in feed[:10]]

    def follow(self, followerId, followeeId):
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.following[followerId].discard(followeeId)`,
    tests: [
      `t = Twitter()
t.postTweet(1, 5)
assert t.getNewsFeed(1) == [5]
t.postTweet(1, 3)
assert t.getNewsFeed(1) == [3, 5]`,
      `t = Twitter()
t.postTweet(1, 1)
t.follow(2, 1)
assert t.getNewsFeed(2) == [1]
t.unfollow(2, 1)
assert t.getNewsFeed(2) == []`,
    ],
  },
  66: {
    solution: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    tests: [
      `m = MedianFinder()
m.addNum(1)
m.addNum(2)
assert m.findMedian() == 1.5
m.addNum(3)
assert m.findMedian() == 2.0`,
      `m = MedianFinder()
m.addNum(6)
assert m.findMedian() == 6.0
m.addNum(10)
assert m.findMedian() == 8.0`,
    ],
  },
  67: {
    solution: `class Solution:
    def subsets(self, nums):
        result = [[]]
        for num in nums:
            result += [subset + [num] for subset in result]
        return result`,
    tests: [
      'assert sorted(Solution().subsets([1, 2, 3])) == sorted([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]])',
      'assert Solution().subsets([0]) == [[], [0]]',
      'assert sorted(Solution().subsets([1, 2])) == sorted([[], [1], [2], [1, 2]])',
    ],
  },
  68: {
    solution: `class Solution:
    def combinationSum(self, candidates, target):
        result = []

        def dfs(i, total, path):
            if total == target:
                result.append(path[:])
                return
            if total > target or i == len(candidates):
                return
            path.append(candidates[i])
            dfs(i, total + candidates[i], path)
            path.pop()
            dfs(i + 1, total, path)

        dfs(0, 0, [])
        return result`,
    tests: [
      'assert sorted(Solution().combinationSum([2, 3, 6, 7], 7)) == sorted([[2, 2, 3], [7]])',
      'assert sorted(Solution().combinationSum([2, 3, 5], 8)) == sorted([[2, 2, 2, 2], [2, 3, 3], [3, 5]])',
      'assert Solution().combinationSum([2], 1) == []',
    ],
  },
  69: {
    solution: `class Solution:
    def permute(self, nums):
        result = []

        def dfs(path, remaining):
            if not remaining:
                result.append(path[:])
                return
            for i in range(len(remaining)):
                path.append(remaining[i])
                dfs(path, remaining[:i] + remaining[i + 1:])
                path.pop()

        dfs([], nums)
        return result`,
    tests: [
      'assert sorted(Solution().permute([1, 2, 3])) == sorted([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])',
      'assert Solution().permute([0, 1]) == [[0, 1], [1, 0]]',
      'assert Solution().permute([1]) == [[1]]',
    ],
  },
  70: {
    solution: `class Solution:
    def subsetsWithDup(self, nums):
        nums.sort()
        result = []

        def dfs(i, path):
            result.append(path[:])
            for j in range(i, len(nums)):
                if j > i and nums[j] == nums[j - 1]:
                    continue
                path.append(nums[j])
                dfs(j + 1, path)
                path.pop()

        dfs(0, [])
        return result`,
    tests: [
      'assert sorted(Solution().subsetsWithDup([1, 2, 2])) == sorted([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]])',
      'assert Solution().subsetsWithDup([0]) == [[], [0]]',
      'assert sorted(Solution().subsetsWithDup([4, 4, 4, 1, 4])) == sorted([[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]])',
    ],
  },
  71: {
    solution: `class Solution:
    def combinationSum2(self, candidates, target):
        candidates.sort()
        result = []

        def dfs(i, total, path):
            if total == target:
                result.append(path[:])
                return
            if total > target or i == len(candidates):
                return
            path.append(candidates[i])
            dfs(i + 1, total + candidates[i], path)
            path.pop()
            while i + 1 < len(candidates) and candidates[i + 1] == candidates[i]:
                i += 1
            dfs(i + 1, total, path)

        dfs(0, 0, [])
        return result`,
    tests: [
      'assert sorted(Solution().combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)) == sorted([[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]])',
      'assert sorted(Solution().combinationSum2([2, 5, 2, 1, 2], 5)) == sorted([[1, 2, 2], [5]])',
      'assert Solution().combinationSum2([1, 1, 1, 1, 1], 4) == [[1, 1, 1, 1]]',
    ],
  },
  72: {
    solution: `class Solution:
    def exist(self, board, word):
        rows, cols = len(board), len(board[0])

        def dfs(r, c, i):
            if i == len(word):
                return True
            if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (
                dfs(r + 1, c, i + 1)
                or dfs(r - 1, c, i + 1)
                or dfs(r, c + 1, i + 1)
                or dfs(r, c - 1, i + 1)
            )
            board[r][c] = temp
            return found

        for r in range(rows):
            for c in range(cols):
                if dfs(r, c, 0):
                    return True
        return False`,
    tests: [
      'assert Solution().exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED") == True',
      'assert Solution().exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "SEE") == True',
      'assert Solution().exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCB") == False',
    ],
  },
  73: {
    solution: `class Solution:
    def partition(self, s):
        result = []

        def is_pal(sub):
            return sub == sub[::-1]

        def dfs(i, path):
            if i == len(s):
                result.append(path[:])
                return
            for j in range(i, len(s)):
                sub = s[i : j + 1]
                if is_pal(sub):
                    path.append(sub)
                    dfs(j + 1, path)
                    path.pop()

        dfs(0, [])
        return result`,
    tests: [
      'assert sorted(Solution().partition("aab")) == sorted([["a", "a", "b"], ["aa", "b"]])',
      'assert Solution().partition("a") == [["a"]]',
      'assert sorted(Solution().partition("efe")) == sorted([["e", "f", "e"], ["efe"]])',
    ],
  },
  74: {
    solution: `class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []
        phone = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }
        result = []

        def dfs(i, path):
            if i == len(digits):
                result.append("".join(path))
                return
            for ch in phone[digits[i]]:
                path.append(ch)
                dfs(i + 1, path)
                path.pop()

        dfs(0, [])
        return result`,
    tests: [
      'assert sorted(Solution().letterCombinations("23")) == sorted(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"])',
      'assert Solution().letterCombinations("") == []',
      'assert Solution().letterCombinations("2") == ["a", "b", "c"]',
    ],
  },
  75: {
    solution: `class Solution:
    def solveNQueens(self, n):
        cols = set()
        pos_diag = set()
        neg_diag = set()
        board = [['.'] * n for _ in range(n)]
        result = []

        def dfs(r):
            if r == n:
                result.append(["".join(row) for row in board])
                return
            for c in range(n):
                if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                    continue
                cols.add(c)
                pos_diag.add(r + c)
                neg_diag.add(r - c)
                board[r][c] = 'Q'
                dfs(r + 1)
                board[r][c] = '.'
                cols.remove(c)
                pos_diag.remove(r + c)
                neg_diag.remove(r - c)

        dfs(0)
        return result`,
    tests: [
      'assert len(Solution().solveNQueens(4)) == 2',
      'assert Solution().solveNQueens(1) == [["Q"]]',
      'assert len(Solution().solveNQueens(8)) == 92',
    ],
  },
  76: {
    solution: `class Solution:
    def generateParenthesis(self, n):
        result = []

        def dfs(open_count, close_count, path):
            if len(path) == 2 * n:
                result.append("".join(path))
                return
            if open_count < n:
                path.append('(')
                dfs(open_count + 1, close_count, path)
                path.pop()
            if close_count < open_count:
                path.append(')')
                dfs(open_count, close_count + 1, path)
                path.pop()

        dfs(0, 0, [])
        return result`,
    tests: [
      'assert sorted(Solution().generateParenthesis(3)) == sorted(["((()))", "(()())", "(())()", "()(())", "()()()"])',
      'assert Solution().generateParenthesis(1) == ["()"]',
      'assert len(Solution().generateParenthesis(4)) == 14',
    ],
  },
  77: {
    solution: `class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['#'] = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node:
                return False
            node = node[ch]
        return '#' in node

    def startsWith(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return False
            node = node[ch]
        return True`,
    tests: [
      `t = Trie()
t.insert("apple")
assert t.search("apple") == True
assert t.search("app") == False
assert t.startsWith("app") == True
t.insert("app")
assert t.search("app") == True`,
      `t = Trie()
t.insert("")
assert t.search("") == True
assert t.startsWith("") == True`,
    ],
  },
  78: {
    solution: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['#'] = True

    def search(self, word):
        def dfs(i, node):
            if i == len(word):
                return '#' in node
            ch = word[i]
            if ch == '.':
                for key, child in node.items():
                    if key != '#' and dfs(i + 1, child):
                        return True
                return False
            if ch not in node:
                return False
            return dfs(i + 1, node[ch])

        return dfs(0, self.root)`,
    tests: [
      `d = WordDictionary()
d.addWord("bad")
d.addWord("dad")
d.addWord("mad")
assert d.search("pad") == False
assert d.search("bad") == True
assert d.search(".ad") == True
assert d.search("b..") == True`,
      `d = WordDictionary()
d.addWord("a")
assert d.search(".") == True
assert d.search("a") == True`,
    ],
  },
  79: {
    solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def findWords(self, board, words):
        root = TrieNode()
        for word in words:
            node = root
            for ch in word:
                node = node.children.setdefault(ch, TrieNode())
            node.word = word

        rows, cols = len(board), len(board[0])
        result = set()

        def dfs(r, c, node):
            ch = board[r][c]
            if ch not in node.children:
                return
            node = node.children[ch]
            if node.word:
                result.add(node.word)
            board[r][c] = '#'
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, node)
            board[r][c] = ch

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)
        return list(result)`,
    tests: [
      'assert sorted(Solution().findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"])) == sorted(["eat", "oath"])',
      'assert sorted(Solution().findWords([["a", "b"], ["c", "d"]], ["abcb"])) == []',
      'assert sorted(Solution().findWords([["a"]], ["a"])) == ["a"]',
    ],
  },
  80: {
    solution: `class Solution:
    def numIslands(self, grid):
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        count = 0

        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
    tests: [
      'assert Solution().numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]) == 1',
      'assert Solution().numIslands([["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]) == 3',
      'assert Solution().numIslands([["1", "0", "1", "1", "0", "1", "1"]]) == 3',
    ],
  },
  81: {
    solution: `from collections import deque

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node):
        if not node:
            return None
        clones = {}

        def dfs(n):
            if n in clones:
                return clones[n]
            copy = Node(n.val)
            clones[n] = copy
            for nei in n.neighbors:
                copy.neighbors.append(dfs(nei))
            return copy

        return dfs(node)`,
    tests: [
      `n1 = Node(1)
n2 = Node(2)
n1.neighbors = [n2]
n2.neighbors = [n1]
copy = Solution().cloneGraph(n1)
assert copy is not n1 and copy.val == 1 and len(copy.neighbors) == 1
assert copy.neighbors[0] is not n2 and copy.neighbors[0].val == 2`,
      'assert Solution().cloneGraph(None) is None',
      `n = Node(7)
copy = Solution().cloneGraph(n)
assert copy.val == 7 and copy.neighbors == []`,
    ],
  },
  82: {
    solution: `class Solution:
    def maxAreaOfIsland(self, grid):
        rows, cols = len(grid), len(grid[0])
        best = 0

        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == 0:
                return 0
            grid[r][c] = 0
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    best = max(best, dfs(r, c))
        return best`,
    tests: [
      'assert Solution().maxAreaOfIsland([[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]) == 6',
      'assert Solution().maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]]) == 0',
      'assert Solution().maxAreaOfIsland([[1, 1], [1, 0]]) == 3',
    ],
  },
  83: {
    solution: `class Solution:
    def pacificAtlantic(self, heights):
        if not heights:
            return []
        rows, cols = len(heights), len(heights[0])
        pac, atl = set(), set()

        def dfs(r, c, visited):
            visited.add((r, c))
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited and heights[nr][nc] >= heights[r][c]:
                    dfs(nr, nc, visited)

        for c in range(cols):
            dfs(0, c, pac)
            dfs(rows - 1, c, atl)
        for r in range(rows):
            dfs(r, 0, pac)
            dfs(r, cols - 1, atl)
        return sorted([list(cell) for cell in pac & atl])`,
    tests: [
      'assert Solution().pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]) == [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]',
      'assert Solution().pacificAtlantic([[1]]) == [[0, 0]]',
      'assert Solution().pacificAtlantic([[2, 1], [1, 2]]) == [[0, 0], [0, 1], [1, 0], [1, 1]]',
    ],
  },
  84: {
    solution: `class Solution:
    def solve(self, board):
        if not board:
            return
        rows, cols = len(board), len(board[0])

        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != 'O':
                return
            board[r][c] = 'T'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            dfs(r, 0)
            dfs(r, cols - 1)
        for c in range(cols):
            dfs(0, c)
            dfs(rows - 1, c)
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == 'O':
                    board[r][c] = 'X'
                elif board[r][c] == 'T':
                    board[r][c] = 'O'`,
    tests: [
      `board = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]
Solution().solve(board)
assert board == [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]]`,
      `board = [["X"]]
Solution().solve(board)
assert board == [["X"]]`,
      `board = [["O", "O"], ["O", "O"]]
Solution().solve(board)
assert board == [["O", "O"], ["O", "O"]]`,
    ],
  },
  85: {
    solution: `from collections import deque

class Solution:
    def orangesRotting(self, grid):
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
        minutes = 0
        while queue and fresh:
            minutes += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        queue.append((nr, nc))
        return minutes if fresh == 0 else -1`,
    tests: [
      'assert Solution().orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]) == 4',
      'assert Solution().orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]) == -1',
      'assert Solution().orangesRotting([[0, 2]]) == 0',
    ],
  },
  86: {
    solution: `from collections import deque

class Solution:
    def wallsAndGates(self, rooms):
        if not rooms:
            return
        rows, cols = len(rooms), len(rooms[0])
        queue = deque()
        for r in range(rows):
            for c in range(cols):
                if rooms[r][c] == 0:
                    queue.append((r, c))
        while queue:
            r, c = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == 2147483647:
                    rooms[nr][nc] = rooms[r][c] + 1
                    queue.append((nr, nc))`,
    tests: [
      `rooms = [[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, -1]]
Solution().wallsAndGates(rooms)
assert rooms == [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, -1]]`,
      `rooms = [[-1]]
Solution().wallsAndGates(rooms)
assert rooms == [[-1]]`,
      `rooms = [[0]]
Solution().wallsAndGates(rooms)
assert rooms == [[0]]`,
    ],
  },
  87: {
    solution: `from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses, prerequisites):
        graph = defaultdict(list)
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        taken = 0
        while queue:
            course = queue.popleft()
            taken += 1
            for nxt in graph[course]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        return taken == numCourses`,
    tests: [
      'assert Solution().canFinish(2, [[1, 0]]) == True',
      'assert Solution().canFinish(2, [[1, 0], [0, 1]]) == False',
      'assert Solution().canFinish(3, [[0, 1], [0, 2], [1, 2]]) == True',
    ],
  },
  88: {
    solution: `from collections import defaultdict, deque

class Solution:
    def findOrder(self, numCourses, prerequisites):
        graph = defaultdict(list)
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        order = []
        while queue:
            course = queue.popleft()
            order.append(course)
            for nxt in graph[course]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        return order if len(order) == numCourses else []`,
    tests: [
      'assert Solution().findOrder(2, [[1, 0]]) == [0, 1]',
      'assert Solution().findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]) == [0, 1, 2, 3]',
      'assert Solution().findOrder(1, []) == [0]',
    ],
  },
  89: {
    solution: `class Solution:
    def findRedundantConnection(self, edges):
        parent = {}
        rank = {}

        def find(x):
            parent.setdefault(x, x)
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return False
            rank.setdefault(ra, 0)
            rank.setdefault(rb, 0)
            if rank[ra] < rank[rb]:
                parent[ra] = rb
            elif rank[ra] > rank[rb]:
                parent[rb] = ra
            else:
                parent[rb] = ra
                rank[ra] += 1
            return True

        for u, v in edges:
            if not union(u, v):
                return [u, v]
        return []`,
    tests: [
      'assert Solution().findRedundantConnection([[1, 2], [1, 3], [2, 3]]) == [2, 3]',
      'assert Solution().findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]) == [1, 4]',
      'assert Solution().findRedundantConnection([[1, 2], [2, 3], [1, 3]]) == [1, 3]',
    ],
  },
  90: {
    solution: `class Solution:
    def countComponents(self, n, edges):
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[rb] = ra
                return 1
            return 0

        components = n
        for a, b in edges:
            components -= union(a, b)
        return components`,
    tests: [
      'assert Solution().countComponents(5, [[0, 1], [1, 2], [3, 4]]) == 2',
      'assert Solution().countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]) == 1',
      'assert Solution().countComponents(3, [[0, 1], [1, 2], [2, 0]]) == 1',
    ],
  },
  91: {
    solution: `class Solution:
    def validTree(self, n, edges):
        if len(edges) != n - 1:
            return False
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra == rb:
                return False
            parent[rb] = ra
        return True`,
    tests: [
      'assert Solution().validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]) == True',
      'assert Solution().validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]) == False',
      'assert Solution().validTree(1, []) == True',
    ],
  },
  92: {
    solution: `from collections import deque

class Solution:
    def ladderLength(self, beginWord, endWord, wordList):
        word_set = set(wordList)
        if endWord not in word_set:
            return 0
        queue = deque([(beginWord, 1)])
        while queue:
            word, steps = queue.popleft()
            if word == endWord:
                return steps
            for i in range(len(word)):
                for ch in 'abcdefghijklmnopqrstuvwxyz':
                    nxt = word[:i] + ch + word[i + 1 :]
                    if nxt in word_set:
                        word_set.remove(nxt)
                        queue.append((nxt, steps + 1))
        return 0`,
    tests: [
      'assert Solution().ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]) == 5',
      'assert Solution().ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"]) == 0',
      'assert Solution().ladderLength("a", "c", ["a", "b", "c"]) == 2',
    ],
  },
  93: {
    solution: `from collections import defaultdict

class Solution:
    def findItinerary(self, tickets):
        graph = defaultdict(list)
        for src, dst in sorted(tickets, reverse=True):
            graph[src].append(dst)

        route = []

        def visit(airport):
            while graph[airport]:
                visit(graph[airport].pop())
            route.append(airport)

        visit('JFK')
        return route[::-1]`,
    tests: [
      'assert Solution().findItinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]) == ["JFK", "MUC", "LHR", "SFO", "SJC"]',
      'assert Solution().findItinerary([["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]) == ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]',
      'assert Solution().findItinerary([["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]) == ["JFK", "NRT", "JFK", "KUL"]',
    ],
  },
  94: {
    solution: `import heapq

class Solution:
    def minCostConnectPoints(self, points):
        n = len(points)
        visited = {0}
        heap = []
        x0, y0 = points[0]
        for i in range(1, n):
            x, y = points[i]
            heapq.heappush(heap, (abs(x0 - x) + abs(y0 - y), 0, i))
        total = 0
        while len(visited) < n:
            cost, u, v = heapq.heappop(heap)
            if v in visited:
                continue
            visited.add(v)
            total += cost
            x, y = points[v]
            for j in range(n):
                if j not in visited:
                    xj, yj = points[j]
                    heapq.heappush(heap, (abs(x - xj) + abs(y - yj), v, j))
        return total`,
    tests: [
      'assert Solution().minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]) == 20',
      'assert Solution().minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]) == 18',
      'assert Solution().minCostConnectPoints([[0, 0], [1, 1]]) == 2',
    ],
  },
  95: {
    solution: `import heapq

class Solution:
    def networkDelayTime(self, times, n, k):
        graph = [[] for _ in range(n + 1)]
        for u, v, w in times:
            graph[u].append((v, w))
        dist = [float('inf')] * (n + 1)
        dist[k] = 0
        heap = [(0, k)]
        while heap:
            d, node = heapq.heappop(heap)
            if d > dist[node]:
                continue
            for nei, w in graph[node]:
                nd = d + w
                if nd < dist[nei]:
                    dist[nei] = nd
                    heapq.heappush(heap, (nd, nei))
        result = max(dist[1:])
        return result if result < float('inf') else -1`,
    tests: [
      'assert Solution().networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2) == 2',
      'assert Solution().networkDelayTime([[1, 2, 1]], 2, 1) == 1',
      'assert Solution().networkDelayTime([[1, 2, 1]], 2, 2) == -1',
    ],
  },
  96: {
    solution: `import heapq

class Solution:
    def swimInWater(self, grid):
        n = len(grid)
        heap = [(grid[0][0], 0, 0)]
        seen = {(0, 0)}
        while heap:
            t, r, c = heapq.heappop(heap)
            if r == n - 1 and c == n - 1:
                return t
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in seen:
                    seen.add((nr, nc))
                    heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))`,
    tests: [
      'assert Solution().swimInWater([[0, 2], [1, 3]]) == 3',
      'assert Solution().swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]) == 16',
      'assert Solution().swimInWater([[0]]) == 0',
    ],
  },
  97: {
    solution: `from collections import defaultdict, deque

class Solution:
    def alienOrder(self, words):
        graph = defaultdict(set)
        indegree = {c: 0 for word in words for c in word}
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            if len(w1) > len(w2) and w1.startswith(w2):
                return ""
            for a, b in zip(w1, w2):
                if a != b:
                    if b not in graph[a]:
                        graph[a].add(b)
                        indegree[b] += 1
                    break
        queue = deque([c for c in indegree if indegree[c] == 0])
        order = []
        while queue:
            c = queue.popleft()
            order.append(c)
            for nei in graph[c]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    queue.append(nei)
        if len(order) != len(indegree):
            return ""
        return "".join(order)`,
    tests: [
      'assert Solution().alienOrder(["wrt", "wrf", "er", "ett", "rftt"]) == "wertf"',
      'assert Solution().alienOrder(["z", "x"]) == "zx"',
      'assert Solution().alienOrder(["abc", "ab"]) == ""',
    ],
  },
  98: {
    solution: `import heapq

class Solution:
    def findCheapestPrice(self, n, flights, src, dst, k):
        graph = [[] for _ in range(n)]
        for u, v, price in flights:
            graph[u].append((v, price))
        heap = [(0, src, k + 1)]
        stops = [float('inf')] * n
        stops[src] = 0
        while heap:
            cost, node, remain = heapq.heappop(heap)
            if node == dst:
                return cost
            if remain == 0:
                continue
            for nei, price in graph[node]:
                nc = cost + price
                if nc < stops[nei]:
                    stops[nei] = nc
                    heapq.heappush(heap, (nc, nei, remain - 1))
        return -1`,
    tests: [
      'assert Solution().findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1) == 200',
      'assert Solution().findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0) == 500',
      'assert Solution().findCheapestPrice(4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 4]], 0, 3, 2) == 3',
    ],
  },
  99: {
    solution: `class Solution:
    def climbStairs(self, n):
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
    tests: [
      'assert Solution().climbStairs(2) == 2',
      'assert Solution().climbStairs(3) == 3',
      'assert Solution().climbStairs(5) == 8',
    ],
  },
  100: {
    solution: `class Solution:
    def minCostClimbingStairs(self, cost):
        n = len(cost)
        for i in range(2, n):
            cost[i] += min(cost[i - 1], cost[i - 2])
        return min(cost[-1], cost[-2])`,
    tests: [
      'assert Solution().minCostClimbingStairs([10, 15, 20]) == 15',
      'assert Solution().minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6',
      'assert Solution().minCostClimbingStairs([0, 0, 0, 1]) == 0',
    ],
  },
};
