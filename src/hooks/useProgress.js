import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'learnfast-solved';

export function useProgress(total) {
  const [solved, setSolved] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
  }, [solved]);

  const toggle = useCallback((id) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { solved, toggle, count: solved.size, total };
}
