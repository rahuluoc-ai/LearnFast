export function slugToMethodName(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export function buildPythonTemplate(problem) {
  const method = slugToMethodName(problem.slug);
  const testCount = problem.python?.tests?.length ?? 0;
  const testHint =
    testCount > 0
      ? `\n    # ${testCount} test case${testCount !== 1 ? 's' : ''} available — click "Run tests"`
      : '';

  return `"""${problem.title}
${problem.summary}
"""

class Solution:
    def ${method}(self):
        # TODO: implement${testHint}
        pass
`;
}

export function buildSolutionCode(problem) {
  return problem.python?.solution ?? buildPythonTemplate(problem);
}
