import { useState, useMemo, useCallback } from 'react';
import { filterProblems } from '../utils/filterProblems';
import {
  buildMindmapTree,
  buildMindmapTreeByPattern,
  pruneTree,
} from '../utils/buildMindmapTree';
import MindmapNode from './MindmapNode';
import PatternTooltip from './PatternTooltip';
import styles from './MindmapView.module.css';

export default function MindmapView({
  problems,
  categories,
  patterns,
  patternMap,
  solved,
  onToggle,
  search,
  category,
  difficulty,
  patternFilter,
  onPatternClick,
  onOpenSolution,
}) {
  const [viewMode, setViewMode] = useState('category');
  const [expanded, setExpanded] = useState(() => new Set(['root']));
  const [zoom, setZoom] = useState(1);

  const filtered = useMemo(
    () =>
      filterProblems(problems, {
        search,
        category,
        difficulty,
        patternFilter,
        patternMap,
      }),
    [problems, search, category, difficulty, patternFilter, patternMap]
  );

  const tree = useMemo(() => {
    const raw =
      viewMode === 'category'
        ? buildMindmapTree(filtered, categories)
        : buildMindmapTreeByPattern(filtered, patterns);
    return pruneTree(raw);
  }, [filtered, categories, patterns, viewMode]);

  const toggleExpand = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const ids = new Set(['root']);
    for (const child of tree.children) {
      ids.add(child.id);
    }
    setExpanded(ids);
  }, [tree]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set(['root']));
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const zoomReset = () => setZoom(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>View</span>
          <button
            type="button"
            className={`${styles.modeBtn} ${viewMode === 'category' ? styles.modeActive : ''}`}
            onClick={() => setViewMode('category')}
          >
            By category
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${viewMode === 'pattern' ? styles.modeActive : ''}`}
            onClick={() => setViewMode('pattern')}
          >
            By pattern
          </button>
        </div>
        <div className={styles.controlGroup}>
          <button type="button" className={styles.ctrlBtn} onClick={expandAll}>
            Expand all
          </button>
          <button type="button" className={styles.ctrlBtn} onClick={collapseAll}>
            Collapse all
          </button>
        </div>
        <div className={`${styles.controlGroup} ${styles.zoomGroup}`}>
          <button type="button" className={styles.ctrlBtn} onClick={zoomOut} aria-label="Zoom out">
            −
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button type="button" className={styles.ctrlBtn} onClick={zoomIn} aria-label="Zoom in">
            +
          </button>
          <button type="button" className={styles.ctrlBtn} onClick={zoomReset}>
            Reset
          </button>
        </div>
      </div>

      <p className={styles.hint}>
        Click a problem or approach for the full question, analogy, and solution steps. Hover
        patterns for cheatsheet details.
      </p>

      <div className={styles.chartOuter}>
        <div className={styles.chart} style={{ transform: `scale(${zoom})` }}>
          <MindmapNode
            node={tree}
            expanded={expanded}
            onToggle={toggleExpand}
            solved={solved}
            patternMap={patternMap}
            onOpenPanel={onOpenSolution}
            onOpenPatterns={onPatternClick}
            PatternTooltip={PatternTooltip}
            depth={0}
          />
        </div>
      </div>
    </div>
  );
}
