# LearnFast

Fast interview prep — read the signal, reach for the tool.

LearnFast maps all [**NeetCode 150**](https://neetcode.io/practice/practice/neetcode150) problems to cheatsheet patterns, optimal algorithms, and step-by-step solution outlines. Use the interactive React app for study and progress tracking, or the printable cheatsheets for quick reference.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # preview production build
npm run validate # check all problem summaries, solution steps + analogies
```

## Interactive app

| Tab | What it does |
|---|---|
| **Patterns** | 20 cheatsheet cards (signals, do/use/gotcha) with a **Prove it** list of NeetCode problems per pattern |
| **Problems** | All 150 problems — search, filter by difficulty/category, expand to see optimal approaches |
| **Roadmap** | NeetCode study order — accordion by category with solved progress |
| **Mindmap** | Visual tree: category/pattern → problem → optimal algo branches (multi-algo problems show every path) |

**Mindmap interactions:**
- **Hover** a pattern name → floating tooltip with full cheatsheet details (not clipped by scroll)
- **Click** a problem → slide-over panel with question summary, pattern tooltips, analogy, solution steps, and a **Python** tab to write and run code
- **Click** an approach leaf → same panel, with that algo tab pre-selected when multiple optimal solutions exist

Progress (solved checkboxes) is saved in `localStorage`.

## Reference cheatsheets

| Format | File | Best for |
|---|---|---|
| **React app** | `npm run dev` | Interactive study, mindmap, solution panel |
| **HTML** | [interview-pattern-cheatsheet.html](interview-pattern-cheatsheet.html) | Browser viewing, print / save as PDF |
| **Markdown** | [CHEATSHEET.md](CHEATSHEET.md) | GitHub browsing, quick reference |
| **PDF** | [Interview Pattern Cheatsheet.pdf](Interview%20Pattern%20Cheatsheet.pdf) | Print export of the HTML cheatsheet |

## Data

| File | Contents |
|---|---|
| [`data/patterns.json`](data/patterns.json) | 20 pattern definitions — signals, do/use/gotcha, complexity |
| [`data/neetcode150.json`](data/neetcode150.json) | 150 problems — category, patterns, approaches, `summary`, optimal `steps` + `analogy`, `python` solution + tests |

Each problem includes:
- `summary` — one-line question prompt
- `approaches[]` — name, time/space complexity, `optimal` flag
- `steps[]` on optimal approaches — 3–6 bullet solution outline
- `analogy` on optimal approaches — one-sentence everyday metaphor for the approach
- `python` — reference `solution` code and 2–3 `tests` (assert scripts) for the in-browser playground

Run `npm run validate` to confirm all 150 summaries, optimal step lists, analogies, and python solutions are present.

## Project structure

```
LearnFast/
├── index.html              # Vite entry
├── src/                    # React app (Patterns, Problems, Roadmap, Mindmap)
├── data/                   # patterns.json + neetcode150.json
├── scripts/                # validate-solutions.js
├── interview-pattern-cheatsheet.html
├── CHEATSHEET.md
└── dist/                   # production build (after npm run build)
```

## Tech stack

React 18 · Vite · CSS modules · no backend — static deploy to GitHub Pages or any static host.
