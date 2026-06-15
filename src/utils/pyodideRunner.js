import { loadPyodide } from 'pyodide';

const PYODIDE_VERSION = '0.27.7';
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let runtimePromise = null;

export function loadPythonRuntime(onStatus) {
  if (!runtimePromise) {
    onStatus?.('Loading Python runtime (first run may take a moment)…');
    runtimePromise = loadPyodide({ indexURL: INDEX_URL }).then((pyodide) => {
      onStatus?.(null);
      return pyodide;
    });
  }
  return runtimePromise;
}

export async function runPython(code, { onStatus, onStream } = {}) {
  const pyodide = await loadPythonRuntime(onStatus);
  let stdout = '';
  let stderr = '';

  pyodide.setStdout({
    batched: (chunk) => {
      stdout += chunk;
      onStream?.('stdout', chunk);
    },
  });
  pyodide.setStderr({
    batched: (chunk) => {
      stderr += chunk;
      onStream?.('stderr', chunk);
    },
  });

  try {
    await pyodide.runPythonAsync(code);
    return { stdout, stderr, error: null };
  } catch (err) {
    const message = err?.message || String(err);
    return { stdout, stderr, error: message };
  } finally {
    pyodide.setStdout();
    pyodide.setStderr();
  }
}

export function preloadPythonRuntime() {
  loadPythonRuntime().catch(() => {});
}
