import styles from './MindmapView.module.css';

const DIFF_CLASS = { Easy: 'easy', Medium: 'medium', Hard: 'hard' };

export default function MindmapNode({
  node,
  expanded,
  onToggle,
  solved,
  patternMap,
  onOpenPanel,
  onOpenPatterns,
  PatternTooltip,
  depth,
}) {
  const isExpanded = expanded.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  if (node.type === 'root') {
    return (
      <div className={styles.rootSection}>
        <div className={styles.rootNode}>{node.label}</div>
        <div className={styles.branches}>
          {node.children.map((child) => (
            <MindmapNode
              key={child.id}
              node={child}
              expanded={expanded}
              onToggle={onToggle}
              solved={solved}
              patternMap={patternMap}
              onOpenPanel={onOpenPanel}
              onOpenPatterns={onOpenPatterns}
              PatternTooltip={PatternTooltip}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  if (node.type === 'category') {
    const headerLabel = node.patternId ? (
      <PatternTooltip
        patternId={node.patternId}
        patternMap={patternMap}
        onOpenPatterns={onOpenPatterns}
      >
        <span className={styles.patternCategoryLabel}>{node.label}</span>
      </PatternTooltip>
    ) : (
      node.label
    );

    return (
      <div className={styles.categorySection}>
        <button
          type="button"
          className={styles.categoryHeader}
          onClick={() => onToggle(node.id)}
        >
          <span className={styles.chevron}>{isExpanded ? '▼' : '▶'}</span>
          <span className={styles.categoryLabel}>{headerLabel}</span>
          <span className={styles.countBadge}>{node.children.length}</span>
        </button>
        {isExpanded && hasChildren && (
          <div className={styles.problemList}>
            {node.children.map((child) => (
              <MindmapNode
                key={child.id}
                node={child}
                expanded={expanded}
                onToggle={onToggle}
                solved={solved}
                patternMap={patternMap}
                onOpenPanel={onOpenPanel}
                onOpenPatterns={onOpenPatterns}
                PatternTooltip={PatternTooltip}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
        {isExpanded && !hasChildren && (
          <p className={styles.emptyBranch}>No problems match current filters.</p>
        )}
      </div>
    );
  }

  if (node.type === 'problem') {
    const p = node.problem;
    const diff = DIFF_CLASS[p.difficulty] || 'medium';
    const isSolved = solved.has(p.id);

    return (
      <div className={styles.problemRow}>
        <div className={styles.problemFlow}>
          <button
            type="button"
            className={`${styles.problemNode} ${styles[diff]}`}
            onClick={() => onOpenPanel(p, 0)}
          >
            {isSolved && <span className={styles.solvedBadge}>✓</span>}
            <span className={styles.problemTitle}>{node.label}</span>
            <span className={styles.diffTag}>{p.difficulty[0]}</span>
          </button>
          {hasChildren && (
            <>
              <span className={styles.connector} aria-hidden="true" />
              <div className={styles.approachBranches}>
                {node.children.map((child) => (
                  <MindmapNode
                    key={child.id}
                    node={child}
                    expanded={expanded}
                    onToggle={onToggle}
                    solved={solved}
                    patternMap={patternMap}
                    onOpenPanel={onOpenPanel}
                    onOpenPatterns={onOpenPatterns}
                    PatternTooltip={PatternTooltip}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (node.type === 'approach') {
    return (
      <button
        type="button"
        className={styles.approachNode}
        title={`${node.time} · ${node.space} — click for solution steps`}
        onClick={() => onOpenPanel(node.problem, node.approachIndex)}
      >
        <span className={styles.approachName}>{node.label}</span>
        <span className={styles.approachComplexity}>
          {node.time} · {node.space}
        </span>
      </button>
    );
  }

  return null;
}
