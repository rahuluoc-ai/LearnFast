import { useState, lazy, Suspense } from 'react';
import { getPatternAnimation, hasPatternAnimation } from '../animations/patternAnimationDefs';
import ProblemRow from './ProblemRow';
import styles from './PatternCard.module.css';

const ConceptFlowModal = lazy(() => import('./ConceptFlowModal'));

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
  const [showFlow, setShowFlow] = useState(false);
  const color = COLOR_MAP[pattern.color] || 'var(--misc)';
  const animation = getPatternAnimation(pattern.id);
  const canWatchFlow = hasPatternAnimation(pattern.id);

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

      {canWatchFlow && (
        <button type="button" className={styles.flowBtn} onClick={() => setShowFlow(true)}>
          Watch concept flow →
        </button>
      )}

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

      {showFlow && animation && (
        <Suspense fallback={null}>
          <ConceptFlowModal animation={animation} onClose={() => setShowFlow(false)} />
        </Suspense>
      )}
    </article>
  );
}
