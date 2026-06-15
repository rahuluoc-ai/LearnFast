import { useState, useMemo, useCallback } from 'react';
import patternsData from '../data/patterns.json';
import neetcodeData from '../data/neetcode150.json';
import { filterProblems } from './utils/filterProblems';
import { useProgress } from './hooks/useProgress';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryStrip from './components/CategoryStrip';
import PatternGrid from './components/PatternGrid';
import ProblemList from './components/ProblemList';
import RoadmapView from './components/RoadmapView';
import MindmapView from './components/MindmapView';
import ProblemSolutionPanel from './components/ProblemSolutionPanel';
import TriagePanel from './components/TriagePanel';
import styles from './App.module.css';

const TABS = ['Patterns', 'Problems', 'Roadmap', 'Mindmap'];

export default function App() {
  const { problems } = neetcodeData;
  const { patterns, categories, triage, complexityTable, rescue } = patternsData;

  const [tab, setTab] = useState('Patterns');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [patternFilter, setPatternFilter] = useState(null);
  const [highlightPattern, setHighlightPattern] = useState(null);
  const [panelProblem, setPanelProblem] = useState(null);
  const [selectedApproachIndex, setSelectedApproachIndex] = useState(0);
  const { solved, toggle, count } = useProgress(problems.length);

  const patternMap = useMemo(
    () => Object.fromEntries(patterns.map((p) => [p.id, p])),
    [patterns]
  );

  const problemsByPattern = useMemo(() => {
    const map = {};
    for (const p of patterns) map[p.id] = [];
    for (const prob of problems) {
      for (const pid of prob.patterns) {
        if (map[pid]) map[pid].push(prob);
      }
    }
    return map;
  }, [problems, patterns]);

  const filteredProblems = useMemo(
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

  const openSolution = useCallback((problem, approachIndex = 0) => {
    setPanelProblem(problem);
    setSelectedApproachIndex(approachIndex);
  }, []);

  const closeSolution = useCallback(() => {
    setPanelProblem(null);
  }, []);

  const handlePatternClick = useCallback((patternId) => {
    setPatternFilter(patternId);
    setHighlightPattern(patternId);
    setTab('Patterns');
    setTimeout(() => {
      document.getElementById(`pattern-${patternId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  }, []);

  const clearPatternFilter = useCallback(() => {
    setPatternFilter(null);
    setHighlightPattern(null);
  }, []);

  return (
    <div className={styles.app}>
      <Header
        search={search}
        onSearch={setSearch}
        solved={count}
        total={problems.length}
        tab={tab}
        tabs={TABS}
        onTab={setTab}
        difficulty={difficulty}
        onDifficulty={setDifficulty}
        patternFilter={patternFilter}
        patternMap={patternMap}
        onClearPattern={clearPatternFilter}
      />

      <div className={styles.body}>
        <Sidebar
          categories={categories}
          selected={category}
          onSelect={setCategory}
          problems={problems}
          solved={solved}
        />
        <CategoryStrip
          categories={categories}
          selected={category}
          onSelect={setCategory}
          problems={problems}
          solved={solved}
        />

        <div className={styles.content}>
        <main className={styles.main}>
          {tab === 'Patterns' && (
            <>
              <TriagePanel
                triage={triage}
                complexityTable={complexityTable}
                rescue={rescue}
              />
              <PatternGrid
                patterns={patterns}
                problemsByPattern={problemsByPattern}
                patternMap={patternMap}
                highlightPattern={highlightPattern}
                solved={solved}
                onToggle={toggle}
                onPatternClick={handlePatternClick}
                onOpenSolution={openSolution}
              />
            </>
          )}
          {tab === 'Problems' && (
            <ProblemList
              problems={filteredProblems}
              patternMap={patternMap}
              solved={solved}
              onToggle={toggle}
              onPatternClick={handlePatternClick}
              onOpenSolution={openSolution}
            />
          )}
          {tab === 'Roadmap' && (
            <RoadmapView
              categories={categories}
              problems={problems}
              patternMap={patternMap}
              solved={solved}
              onToggle={toggle}
              onPatternClick={handlePatternClick}
              onOpenSolution={openSolution}
              search={search}
              difficulty={difficulty}
            />
          )}
          {tab === 'Mindmap' && (
            <MindmapView
              problems={problems}
              categories={categories}
              patterns={patterns}
              patternMap={patternMap}
              solved={solved}
              search={search}
              category={category}
              difficulty={difficulty}
              patternFilter={patternFilter}
              onPatternClick={handlePatternClick}
              onOpenSolution={openSolution}
            />
          )}
        </main>
        </div>
      </div>

      {panelProblem && (
        <ProblemSolutionPanel
          problem={panelProblem}
          selectedApproachIndex={selectedApproachIndex}
          onSelectApproach={setSelectedApproachIndex}
          onClose={closeSolution}
          patternMap={patternMap}
          onOpenPatterns={handlePatternClick}
          solved={solved.has(panelProblem.id)}
          onToggle={() => toggle(panelProblem.id)}
        />
      )}
    </div>
  );
}
