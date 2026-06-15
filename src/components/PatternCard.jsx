import { useState } from 'react';
import ProblemRow from './ProblemRow';
import styles from './PatternCard.module.css';

const COLOR_MAP = {
  arr: 'var(--arr)',
  tree: 'var(--tree)',
  dp: 'var(--dp)',
  struct: 'var(--struct)',
  misc: 'var(--misc)',
};

export default function PatternCard({
  pattern,
  problems,
  patternMap,
  highlighted,
  solved,
  onToggle,
  onPatternClick,
  onOpenSolution,
}) {
  const [expanded, setExpanded] = useState(false);
  const color = COLOR_MAP[pattern.color] || 'var(--misc)';

  return (
    <article
      id={`pattern-${pattern.id}`}
      className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}
      style={{ borderLeftColor: color }}
    >
      <div className={styles.top}>
        <span className={styles.name}>{pattern.name}</span>
        <span className={styles.bigo} style={{ background: color }}>
          {pattern.complexity}
        </span>
      </div>
      <div className={styles.trig}>
        {pattern.signals.map((s) => `"${s}"`).join(' · ')}
      </div>
      <div className={styles.row}>
        <span className={styles.lbl}>Do</span>
        {pattern.do}
      </div>
      <div className={styles.row}>
        <span className={styles.lbl}>Use</span>
        {pattern.use}
      </div>
      <div className={`${styles.row} ${styles.gotcha}`}>
        <span className={styles.lbl}>Gotcha</span>
        {pattern.gotcha}
      </div>

      <div className={styles.prove}>
        <button
          type="button"
          className={styles.proveBtn}
          onClick={() => setExpanded(!expanded)}
        >
          Prove it — {problems.length} NeetCode problem{problems.length !== 1 ? 's' : ''}
          <span className={styles.chevron}>{expanded ? '▲' : '▼'}</span>
        </button>
        {expanded && (
          <ul className={styles.problemList}>
            {problems.map((p) => (
              <ProblemRow
                key={p.id}
                problem={p}
                patternMap={patternMap}
                solved={solved.has(p.id)}
                onToggle={() => onToggle(p.id)}
                onPatternClick={onPatternClick}
                onOpenSolution={onOpenSolution}
                compact
              />
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
