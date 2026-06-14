import { useState } from 'react';
import ProblemRow from './ProblemRow';
import styles from './RoadmapView.module.css';

export default function RoadmapView({
  categories,
  problems,
  patternMap,
  solved,
  onToggle,
  onPatternClick,
  search,
  difficulty,
}) {
  const [openCats, setOpenCats] = useState(() => new Set([categories[0]]));

  const toggleCat = (cat) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const q = search.toLowerCase().trim();

  return (
    <div className={styles.roadmap}>
      <p className={styles.intro}>
        NeetCode recommended study order — work through each category before moving on.
      </p>
      {categories.map((cat, idx) => {
        const catProbs = problems.filter((p) => {
          if (p.category !== cat) return false;
          if (difficulty !== 'All' && p.difficulty !== difficulty) return false;
          if (!q) return true;
          return (
            p.title.toLowerCase().includes(q) ||
            p.patterns.some((pid) =>
              (patternMap[pid]?.name || '').toLowerCase().includes(q)
            )
          );
        });
        const done = catProbs.filter((p) => solved.has(p.id)).length;
        const isOpen = openCats.has(cat);

        return (
          <section key={cat} className={styles.section}>
            <button
              type="button"
              className={styles.sectionHeader}
              onClick={() => toggleCat(cat)}
            >
              <span className={styles.step}>{idx + 1}</span>
              <span className={styles.catName}>{cat}</span>
              <span className={styles.catProgress}>
                {done}/{catProbs.length}
              </span>
              <span className={styles.chevron}>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && catProbs.length > 0 && (
              <ul className={styles.items}>
                {catProbs.map((p) => (
                  <ProblemRow
                    key={p.id}
                    problem={p}
                    patternMap={patternMap}
                    solved={solved.has(p.id)}
                    onToggle={() => onToggle(p.id)}
                    onPatternClick={onPatternClick}
                  />
                ))}
              </ul>
            )}
            {isOpen && catProbs.length === 0 && (
              <p className={styles.emptyCat}>No problems match current filters.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
