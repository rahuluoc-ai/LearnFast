import { useState, useCallback, useMemo, useEffect } from 'react';
import { buildPythonTemplate, buildSolutionCode } from '../utils/pythonTemplate';
import { buildTestHarness, parseTestResults } from '../utils/pythonTestRunner';
import { runPython, preloadPythonRuntime } from '../utils/pyodideRunner';
import { usePythonDraft } from '../hooks/usePythonDraft';
import TestResultsPanel from './TestResultsPanel';
import styles from './PythonEditor.module.css';

export default function PythonEditor({ problem }) {
  const defaultCode = useMemo(() => buildPythonTemplate(problem), [problem]);
  const hasTests = (problem.python?.tests?.length ?? 0) > 0;
  const hasSolution = Boolean(problem.python?.solution);

  const { code, setCode, resetCode } = usePythonDraft(problem.id, defaultCode);

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState(null);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [runMode, setRunMode] = useState(null);

  useEffect(() => {
    setTestResults(null);
    setOutput('');
    setError(null);
    setRunMode(null);
  }, [problem.id]);

  const runCode = useCallback(
    async (source, label, mode) => {
      setRunning(true);
      setOutput('');
      setError(null);
      setTestResults(null);
      setRunMode(mode);
      setStatus(label);

      const result = await runPython(source, { onStatus: setStatus });

      setRunning(false);
      setStatus(null);

      if (result.error) {
        setError(result.error);
      } else if (mode === 'tests') {
        const parsed = parseTestResults(result.stdout);
        if (parsed.results.length > 0) {
          setTestResults(parsed);
        } else {
          const combined = [result.stdout, result.stderr].filter(Boolean).join('');
          setOutput(combined || '(no test output — check your code for syntax errors)');
        }
      } else {
        const combined = [result.stdout, result.stderr].filter(Boolean).join('');
        setOutput(combined || '(no output)');
      }
    },
    []
  );

  const handleRun = useCallback(() => {
    runCode(code, 'Running…', 'code');
  }, [code, runCode]);

  const handleRunTests = useCallback(() => {
    if (!hasTests) return;
    const harness = buildTestHarness(code, problem.python.tests);
    runCode(harness, 'Running tests…', 'tests');
  }, [code, hasTests, problem.python?.tests, runCode]);

  const handleLoadSolution = useCallback(() => {
    if (!hasSolution) return;
    setCode(buildSolutionCode(problem));
    setOutput('');
    setError(null);
    setTestResults(null);
    setRunMode(null);
  }, [hasSolution, problem, setCode]);

  const handleCodeChange = useCallback(
    (e) => {
      setCode(e.target.value);
      setTestResults(null);
    },
    [setCode]
  );

  const handleReset = useCallback(() => {
    resetCode();
    setTestResults(null);
    setOutput('');
    setError(null);
    setRunMode(null);
  }, [resetCode]);

  const handlePreload = useCallback(() => {
    preloadPythonRuntime();
  }, []);

  return (
    <div className={styles.editor}>
      <p className={styles.hint}>
        Write your solution, then run tests
        {hasTests ? ` (${problem.python.tests.length} cases)` : ''}. Code auto-saves locally.
        First run downloads Python (~10MB).
      </p>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.runBtn}
          onClick={handleRunTests}
          disabled={running || !hasTests}
        >
          {running && runMode === 'tests' ? 'Running…' : '▶ Run tests'}
        </button>
        <button
          type="button"
          className={styles.toolBtn}
          onClick={handleRun}
          disabled={running}
        >
          Run code
        </button>
        {hasSolution && (
          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleLoadSolution}
            disabled={running}
          >
            Load solution
          </button>
        )}
        <button type="button" className={styles.toolBtn} onClick={handleReset} disabled={running}>
          Reset template
        </button>
        <button type="button" className={styles.toolBtn} onClick={handlePreload}>
          Preload runtime
        </button>
      </div>

      <textarea
        className={styles.code}
        value={code}
        onChange={handleCodeChange}
        spellCheck={false}
        aria-label="Python solution code"
      />

      {(status || running) && <p className={styles.status}>{status || 'Running…'}</p>}

      {testResults && runMode === 'tests' && (
        <TestResultsPanel summary={testResults.summary} results={testResults.results} />
      )}

      {(output || error) && !testResults && (
        <div className={styles.outputWrap}>
          <div className={styles.outputHeader}>Output</div>
          {error ? (
            <pre className={`${styles.output} ${styles.error}`}>{error}</pre>
          ) : (
            <pre className={styles.output}>{output}</pre>
          )}
        </div>
      )}
    </div>
  );
}
