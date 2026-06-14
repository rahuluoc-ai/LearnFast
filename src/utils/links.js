export function leetcodeUrl(problem) {
  return `https://leetcode.com/problems/${problem.slug}/`;
}

export function neetcodeUrl(problem) {
  return `https://neetcode.io/problems/${problem.slug}`;
}

export function difficultyClass(d) {
  return d.toLowerCase();
}
