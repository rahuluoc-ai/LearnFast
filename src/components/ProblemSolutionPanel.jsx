import { useState, useMemo, lazy, Suspense } from 'react';
import { leetcodeUrl, neetcodeUrl } from '../utils/links';
import PatternTooltip from './PatternTooltip';
import styles from './ProblemSolutionPanel.module.css';

const PythonEditor = lazy(() => import('./PythonEditor'));

const DIFF_CLASS = { Easy: 'easy', Medium: 'medium', Hard: 'hard' };

export default function ProblemSolutionPanel({
  problem,
  selectedApproachIndex,
  onSelectApproach,
  onClose,
  patternMap,
  onOpenPatterns,
  solved,
  onToggle,
}) {
  const [panelView, setPanelView] = useState('guide');

  const optimalApproaches = useMemo(
    () => problem.approaches.filter((a) => a.optimal),
    [problem]
  );

  const safeIndex = Math.min(
    selectedApproachIndex,
    Math.max(0, optimalApproaches.length - 1)
  );
  const current = optimalApproaches[safeIndex];
  const diff = DIFF_CLASS[problem.difficulty] || 'medium';

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside
        className={`${styles.panel} ${panelView === 'python' ? styles.panelWide : ''}`}
        role="dialog"
        aria-label={`Solution: ${problem.title}`}
      >
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>{problem.title}</h2>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
          <div className={styles.headerMeta}>
            <span className={`${styles.diffBadge} ${styles[diff]}`}>{problem.difficulty}</span>
            <label className={styles.solvedLabel}>
              <input type="checkbox" checked={solved} onChange={onToggle} />
              Mark solved
            </label>
          </div>
          <div className={styles.panelTabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={panelView === 'guide'}
              className={`${styles.panelTab} ${panelView === 'guide' ? styles.panelTabActive : ''}`}
              onClick={() => setPanelView('guide')}
            >
              Guide
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={panelView === 'python'}
              className={`${styles.panelTab} ${panelView === 'python' ? styles.panelTabActive : ''}`}
              onClick={() => setPanelView('python')}
            >
              Python
            </button>
          </div>
        </header>

        <div className={styles.body}>
          {panelView === 'guide' ? (
            <>
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Question</h3>
                <p className={styles.summary}>
                  {problem.summary || `Solve ${problem.title} on LeetCode.`}
                </p>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Patterns</h3>
                <div className={styles.patternRow}>
                  {problem.patterns.map((pid) => (
                    <PatternTooltip
                      key={pid}
                      patternId={pid}
                      patternMap={patternMap}
                      onOpenPatterns={onOpenPatterns}
                    >
                      <span className={styles.patternChip}>
                        {patternMap[pid]?.name || pid}
                      </span>
                    </PatternTooltip>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Links</h3>
                <div className={styles.links}>
                  <a href={leetcodeUrl(problem)} target="_blank" rel="noreferrer">
                    LeetCode #{problem.leetcodeId}
                  </a>
                  <a href={neetcodeUrl(problem)} target="_blank" rel="noreferrer">
                    NeetCode problem
                  </a>
                </div>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Solution{optimalApproaches.length > 1 ? 's' : ''}
                </h3>

                {optimalApproaches.length > 1 && (
                  <div className={styles.tabs} role="tablist">
                    {optimalApproaches.map((a, i) => (
                      <button
                        key={a.name}
                        type="button"
                        role="tab"
                        aria-selected={i === safeIndex}
                        className={`${styles.tab} ${i === safeIndex ? styles.tabActive : ''}`}
                        onClick={() => onSelectApproach(i)}
                      >
                        {a.name}
                      </button>
                    ))}
                  </div>
                )}

                {current && (
                  <div className={styles.solutionCard} role="tabpanel">
                    <div className={styles.solutionHeader}>
                      <strong>{current.name}</strong>
                      <span className={styles.complexity}>
                        {current.time} · {current.space}
                      </span>
                    </div>
                    {current.analogy && (
                      <p className={styles.analogy}>{current.analogy}</p>
                    )}
                    {current.steps && current.steps.length > 0 ? (
                      <ol className={styles.steps}>
                        {current.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className={styles.noSteps}>Step outline not available yet.</p>
                    )}
                    <a
                      href={neetcodeUrl(problem)}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.neetcodeLink}
                    >
                      Full solution on NeetCode →
                    </a>
                  </div>
                )}
              </section>
            </>
          ) : (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Python playground</h3>
              <Suspense fallback={<p className={styles.loading}>Loading editor…</p>}>
                <PythonEditor key={problem.id} problem={problem} />
              </Suspense>
            </section>
          )}
        </div>
      </aside>
    </>
  );
}
