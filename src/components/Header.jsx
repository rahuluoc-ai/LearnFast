import styles from './Header.module.css';

export default function Header({
  search,
  onSearch,
  solved,
  total,
  tab,
  tabs,
  onTab,
  difficulty,
  onDifficulty,
  patternFilter,
  patternMap,
  onClearPattern,
}) {
  const pct = total ? Math.round((solved / total) * 100) : 0;

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h1>LearnFast</h1>
          <span className={styles.tag}>NeetCode 150 · read the signal → reach for the tool</span>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <span className={styles.progressText}>
            {solved}/{total} solved
          </span>
        </div>
      </div>

      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search problems, patterns, algorithms…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          className={styles.select}
          value={difficulty}
          onChange={(e) => onDifficulty(e.target.value)}
        >
          <option value="All">All difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {patternFilter && (
        <div className={styles.filterBanner}>
          Filtering by pattern: <strong>{patternMap[patternFilter]?.name}</strong>
          <button type="button" onClick={onClearPattern} className={styles.clearBtn}>
            Clear
          </button>
        </div>
      )}

      <nav className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => onTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>
    </header>
  );
}
