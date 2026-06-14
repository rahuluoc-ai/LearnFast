import styles from './CategoryStrip.module.css';

export default function CategoryStrip({ categories, selected, onSelect, problems, solved }) {
  return (
    <div className={styles.strip}>
      <button
        type="button"
        className={`${styles.chip} ${selected === 'All' ? styles.active : ''}`}
        onClick={() => onSelect('All')}
      >
        All
      </button>
      {categories.map((c) => {
        const total = problems.filter((p) => p.category === c).length;
        const done = problems.filter((p) => p.category === c && solved.has(p.id)).length;
        return (
          <button
            key={c}
            type="button"
            className={`${styles.chip} ${selected === c ? styles.active : ''}`}
            onClick={() => onSelect(c)}
          >
            {c.replace(' / ', '/').replace(' Dynamic Programming', ' DP')} ({done}/{total})
          </button>
        );
      })}
    </div>
  );
}
