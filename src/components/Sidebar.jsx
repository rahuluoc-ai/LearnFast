import styles from './Sidebar.module.css';

export default function Sidebar({ categories, selected, onSelect, problems, solved }) {
  const counts = {};
  for (const c of categories) {
    const catProbs = problems.filter((p) => p.category === c);
    counts[c] = {
      total: catProbs.length,
      done: catProbs.filter((p) => solved.has(p.id)).length,
    };
  }

  return (
    <aside className={styles.sidebar}>
      <button
        type="button"
        className={`${styles.item} ${selected === 'All' ? styles.active : ''}`}
        onClick={() => onSelect('All')}
      >
        <span>All categories</span>
        <span className={styles.count}>{solved.size}/{problems.length}</span>
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`${styles.item} ${selected === c ? styles.active : ''}`}
          onClick={() => onSelect(c)}
        >
          <span>{c}</span>
          <span className={styles.count}>
            {counts[c].done}/{counts[c].total}
          </span>
        </button>
      ))}
    </aside>
  );
}
