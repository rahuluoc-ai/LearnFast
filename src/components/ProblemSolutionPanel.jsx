import { useState, useMemo, lazy, Suspense } from 'react';
import { leetcodeUrl, neetcodeUrl } from '../utils/links';
import {
  buildProblemFlow,
  getProblemScenarioCount,
  hasProblemFlow,
} from '../animations/problemTraceBuilder';
import PatternTooltip from './PatternTooltip';
import styles from './ProblemSolutionPanel.module.css';

const PythonEditor = lazy(() => import('./PythonEditor'));
const FlowPlayer = lazy(() => import('./FlowPlayer'));

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
  const [scenarioIndex, setScenarioIndex] = useState(0);

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
  const showFlow = hasProblemFlow(problem);
  const scenarioCount = getProblemScenarioCount(problem);

  const problemFlow = useMemo(() => {
    if (!current) return null;
    return buildProblemFlow(problem, current, scenarioIndex);
  }, [problem, current, scenarioIndex]);

  const isWide = panelView === 'python' || panelView === 'flow';

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside
        className={`${styles.panel} ${isWide ? styles.panelWide : ''}`}
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
            {showFlow && (
              <button
                type="button"
                role="tab"
                aria-selected={panelView === 'flow'}
                className={`${styles.panelTab} ${panelView === 'flow' ? styles.panelTabActive : ''}`}
                onClick={() => setPanelView('flow')}
              >
                Flow
              </button>
            )}
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
          {panelView === 'guide' && (
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
                    {showFlow && (
                      <button
                        type="button"
                        className={styles.flowLinkBtn}
                        onClick={() => setPanelView('flow')}
                      >
                        Watch step-by-step flow →
                      </button>
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
          )}

          {panelView === 'flow' && problemFlow && (
            <section className={styles.section}>
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
              {scenarioCount > 1 && (
                <div className={styles.scenarioRow}>
                  <span className={styles.scenarioLabel}>Scenario</span>
                  {Array.from({ length: scenarioCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.scenarioBtn} ${scenarioIndex === i ? styles.scenarioActive : ''}`}
                      onClick={() => setScenarioIndex(i)}
                    >
                      Test {i + 1}
                    </button>
                  ))}
                </div>
              )}
              <Suspense fallback={<p className={styles.loading}>Loading animation…</p>}>
                <FlowPlayer
                  key={`${problem.id}-${safeIndex}-${scenarioIndex}`}
                  title={problemFlow.title}
                  subtitle={problemFlow.subtitle}
                  frames={problemFlow.frames}
                  compact
                />
              </Suspense>
            </section>
          )}

          {panelView === 'python' && (
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
