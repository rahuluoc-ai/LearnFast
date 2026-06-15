import PatternCard from './PatternCard';
import styles from './PatternGrid.module.css';

export default function PatternGrid({
  patterns,
  problemsByPattern,
  patternMap,
  highlightPattern,
  solved,
  onToggle,
  onPatternClick,
  onOpenSolution,
}) {
  const groups = [...new Set(patterns.map((p) => p.group))];

  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <section key={group}>
          <h2 className={styles.groupTitle}>{group}</h2>
          <div className={styles.cards}>
            {patterns
              .filter((p) => p.group === group)
              .map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  problems={problemsByPattern[pattern.id] || []}
                  patternMap={patternMap}
                  highlighted={highlightPattern === pattern.id}
                  solved={solved}
                  onToggle={onToggle}
                  onPatternClick={onPatternClick}
                  onOpenSolution={onOpenSolution}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
