import { useState } from 'react';
import styles from './PythonEditor.module.css';

function formatValue(value) {
  if (value === undefined) return '—';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function Detail({ label, value, mono = true }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className={styles.detailBlock}>
      <span className={styles.detailLabel}>{label}</span>
      <pre className={mono ? styles.detailValue : styles.detailText}>{formatValue(value)}</pre>
    </div>
  );
}

function TestRow({ result, defaultExpanded }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const passed = result.status === 'passed';

  return (
    <div className={`${styles.testRow} ${passed ? styles.testPassed : styles.testFailed}`}>
      <button
        type="button"
        className={styles.testRowHeader}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className={styles.testIcon} aria-hidden="true">
          {passed ? '✓' : '✗'}
        </span>
        <span className={styles.testLabel}>{result.label || `Test ${result.index + 1}`}</span>
        <span className={`${styles.testBadge} ${passed ? styles.badgePass : styles.badgeFail}`}>
          {passed ? 'Passed' : 'Failed'}
        </span>
        <span className={styles.testChevron}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className={styles.testBody}>
          {result.input && result.input !== 'See script' && (
            <Detail label="Input" value={result.input} />
          )}
          {result.expected !== undefined && (
            <Detail label="Expected" value={result.expected} />
          )}
          {result.actual !== undefined && (
            <Detail label="Actual" value={result.actual} />
          )}
          {result.script && <Detail label="Script" value={result.script} />}
          {result.error && <Detail label="Error" value={result.error} />}
        </div>
      )}
    </div>
  );
}

export default function TestResultsPanel({ summary, results }) {
  if (!results?.length) return null;

  const allPassed = summary.failed === 0;

  return (
    <div className={`${styles.resultsPanel} ${allPassed ? styles.resultsAllPass : styles.resultsHasFail}`}>
      {allPassed ? (
        <div className={styles.congratsBanner}>
          <span className={styles.congratsIcon} aria-hidden="true">
            ✓
          </span>
          <div className={styles.congratsText}>
            <strong>Congratulations — all tests passed!</strong>
            <span>
              {summary.total}/{summary.total} test cases succeeded
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.summaryBar}>
          <div className={styles.summaryFailText}>
            <strong>
              {summary.passed}/{summary.total} passed
            </strong>
            <span>
              {summary.failed} test{summary.failed !== 1 ? 's' : ''} failed — expand below for
              details
            </span>
          </div>
        </div>
      )}

      <div className={styles.testList}>
        {results.map((r) => (
          <TestRow
            key={r.index}
            result={r}
            defaultExpanded={!allPassed && r.status === 'failed'}
          />
        ))}
      </div>
    </div>
  );
}
