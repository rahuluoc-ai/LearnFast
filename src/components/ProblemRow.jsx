import { useState } from 'react';
import { leetcodeUrl, neetcodeUrl } from '../utils/links';
import styles from './ProblemRow.module.css';

export default function ProblemRow({
  problem,
  patternMap,
  solved,
  onToggle,
  onPatternClick,
  onOpenSolution,
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const diffClass = problem.difficulty.toLowerCase();
  let optimalIdx = 0;

  return (
    <li className={`${styles.row} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <label className={styles.check}>
          <input type="checkbox" checked={solved} onChange={onToggle} />
        </label>
        <button
          type="button"
          className={styles.titleBtn}
          onClick={() => onOpenSolution?.(problem, 0)}
          title="Open solution panel"
        >
          <span className={styles.title}>{problem.title}</span>
          <span className={`${styles.diff} ${styles[diffClass]}`}>
            {problem.difficulty[0]}
          </span>
        </button>
        <button
          type="button"
          className={compact ? styles.expandBtn : styles.chevron}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Hide approaches' : 'Show approaches'}
        >
          {open ? '▲' : '▼'}
        </button>
      </div>

      {!compact && (
        <div className={styles.meta}>
          <span className={styles.category}>{problem.category}</span>
          <div className={styles.tags}>
            {problem.patterns.map((pid) => (
              <button
                key={pid}
                type="button"
                className={styles.tag}
                onClick={() => onPatternClick?.(pid)}
              >
                {patternMap[pid]?.name || pid}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className={styles.detail}>
          <div className={styles.links}>
            <a href={leetcodeUrl(problem)} target="_blank" rel="noreferrer">
              LeetCode #{problem.leetcodeId}
            </a>
            <a href={neetcodeUrl(problem)} target="_blank" rel="noreferrer">
              NeetCode
            </a>
            {onOpenSolution && (
              <button
                type="button"
                className={styles.solutionBtn}
                onClick={() => onOpenSolution(problem, 0)}
              >
                Full solution →
              </button>
            )}
          </div>
          <div className={styles.approaches}>
            <strong>Approaches</strong>
            {problem.approaches.map((a) => {
              const currentOptIdx = a.optimal ? optimalIdx++ : -1;
              const Wrapper = a.optimal && onOpenSolution ? 'button' : 'div';
              return (
                <Wrapper
                  key={a.name}
                  type={a.optimal && onOpenSolution ? 'button' : undefined}
                  className={`${styles.approach} ${a.optimal ? styles.optimal : ''} ${
                    a.optimal && onOpenSolution ? styles.approachBtn : ''
                  }`}
                  onClick={
                    a.optimal && onOpenSolution
                      ? () => onOpenSolution(problem, currentOptIdx)
                      : undefined
                  }
                  title={a.optimal && onOpenSolution ? 'Open in solution panel' : undefined}
                >
                  <span className={styles.approachName}>
                    {a.name}
                    {a.optimal && <span className={styles.optBadge}>optimal</span>}
                  </span>
                  <span className={styles.complexity}>
                    {a.time} · {a.space}
                  </span>
                </Wrapper>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
}
