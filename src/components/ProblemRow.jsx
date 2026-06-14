import { useState } from 'react';
import { leetcodeUrl, neetcodeUrl } from '../utils/links';
import styles from './ProblemRow.module.css';

export default function ProblemRow({
  problem,
  patternMap,
  solved,
  onToggle,
  onPatternClick,
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const diffClass = problem.difficulty.toLowerCase();

  return (
    <li className={`${styles.row} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <label className={styles.check}>
          <input type="checkbox" checked={solved} onChange={onToggle} />
        </label>
        <button
          type="button"
          className={styles.titleBtn}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.title}>{problem.title}</span>
          <span className={`${styles.diff} ${styles[diffClass]}`}>
            {problem.difficulty[0]}
          </span>
          {!compact && (
            <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
          )}
        </button>
        {compact && (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={() => setOpen(!open)}
            aria-label="Show approaches"
          >
            {open ? '▲' : '▼'}
          </button>
        )}
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
          </div>
          <div className={styles.approaches}>
            <strong>Approaches</strong>
            {problem.approaches.map((a) => (
              <div
                key={a.name}
                className={`${styles.approach} ${a.optimal ? styles.optimal : ''}`}
              >
                <span className={styles.approachName}>
                  {a.name}
                  {a.optimal && <span className={styles.optBadge}>optimal</span>}
                </span>
                <span className={styles.complexity}>
                  {a.time} · {a.space}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}
