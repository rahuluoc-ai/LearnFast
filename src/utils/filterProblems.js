export function problemMatchesSearch(problem, query, patternMap) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  if (problem.title.toLowerCase().includes(q)) return true;
  if (problem.category.toLowerCase().includes(q)) return true;
  if ((problem.summary || '').toLowerCase().includes(q)) return true;

  if (
    problem.patterns.some((pid) =>
      (patternMap[pid]?.name || pid).toLowerCase().includes(q)
    )
  ) {
    return true;
  }

  for (const a of problem.approaches) {
    if (a.name.toLowerCase().includes(q)) return true;
    if (a.optimal) {
      if ((a.analogy || '').toLowerCase().includes(q)) return true;
      if (a.steps?.some((step) => step.toLowerCase().includes(q))) return true;
    }
  }

  if ((problem.python?.solution || '').toLowerCase().includes(q)) return true;
  if (
    problem.python?.tests?.some((t) => {
      const text =
        typeof t === 'string'
          ? t
          : [t.label, t.input, t.call, t.script, t.expectedExpr]
              .filter(Boolean)
              .join(' ');
      return text.toLowerCase().includes(q);
    })
  ) {
    return true;
  }

  return false;
}

export function filterProblems(
  problems,
  { search = '', category = 'All', difficulty = 'All', patternFilter = null, patternMap = {} }
) {
  return problems.filter((p) => {
    if (category !== 'All' && p.category !== category) return false;
    if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
    if (patternFilter && !p.patterns.includes(patternFilter)) return false;
    return problemMatchesSearch(p, search, patternMap);
  });
}
