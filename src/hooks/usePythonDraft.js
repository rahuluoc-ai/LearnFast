import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'learnfast-python-drafts';

function readDrafts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeDraft(problemId, code) {
  const drafts = readDrafts();
  if (code.trim()) {
    drafts[problemId] = code;
  } else {
    delete drafts[problemId];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function usePythonDraft(problemId, defaultCode) {
  const [code, setCodeState] = useState(() => {
    const drafts = readDrafts();
    return drafts[problemId] ?? defaultCode;
  });
  const saveTimer = useRef(null);

  useEffect(() => {
    const drafts = readDrafts();
    setCodeState(drafts[problemId] ?? defaultCode);
  }, [problemId, defaultCode]);

  const setCode = useCallback(
    (value) => {
      setCodeState(value);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => writeDraft(problemId, value), 400);
    },
    [problemId]
  );

  const resetCode = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setCodeState(defaultCode);
    writeDraft(problemId, defaultCode);
  }, [problemId, defaultCode]);

  useEffect(
    () => () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    },
    []
  );

  return { code, setCode, resetCode };
}
