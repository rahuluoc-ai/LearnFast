function approachNodes(problem) {
  const optimal = problem.approaches.filter((a) => a.optimal);
  return optimal.map((a, i) => ({
    id: `p-${problem.id}-opt-${i}`,
    label: a.name,
    time: a.time,
    space: a.space,
    type: 'approach',
    approachIndex: i,
    approach: a,
    problem,
  }));
}

function problemNode(problem) {
  return {
    id: `p-${problem.id}`,
    label: problem.title,
    problem,
    type: 'problem',
    children: approachNodes(problem),
  };
}

export function buildMindmapTree(problems, categories) {
  return {
    id: 'root',
    label: 'NeetCode 150',
    type: 'root',
    children: categories.map((cat) => ({
      id: `cat-${cat}`,
      label: cat,
      type: 'category',
      children: problems.filter((p) => p.category === cat).map(problemNode),
    })),
  };
}

export function buildMindmapTreeByPattern(problems, patterns) {
  return {
    id: 'root',
    label: 'NeetCode 150',
    type: 'root',
    children: patterns.map((pattern) => ({
      id: `pat-${pattern.id}`,
      label: pattern.name,
      patternId: pattern.id,
      type: 'category',
      children: problems
        .filter((p) => p.patterns.includes(pattern.id))
        .map(problemNode),
    })),
  };
}

export function pruneTree(tree) {
  if (tree.type === 'problem' || tree.type === 'approach') return tree;
  const children = (tree.children || [])
    .map(pruneTree)
    .filter((child) => {
      if (child.type === 'category') return child.children.length > 0;
      return true;
    });
  return { ...tree, children };
}
