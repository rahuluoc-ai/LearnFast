import ProblemRow from './ProblemRow';
import styles from './ProblemList.module.css';

export default function ProblemList({
  problems,
  patternMap,
  solved,
  onToggle,
  onPatternClick,
  onOpenSolution,
}) {
  if (problems.length === 0) {
    return (
      <div className={styles.empty}>
        No problems match your filters. Try clearing search or category.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <p className={styles.count}>{problems.length} problem{problems.length !== 1 ? 's' : ''}</p>
      <ul className={styles.items}>
        {problems.map((p) => (
          <ProblemRow
            key={p.id}
            problem={p}
            patternMap={patternMap}
            solved={solved.has(p.id)}
            onToggle={() => onToggle(p.id)}
            onPatternClick={onPatternClick}
            onOpenSolution={onOpenSolution}
          />
        ))}
      </ul>
    </div>
  );
}
