# LearnFast

Fast interview prep — read the signal, reach for the tool.

## Interactive app (recommended)

Browse all **NeetCode 150** problems with pattern mappings, optimal algorithms, progress tracking, and search.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # preview production build
```

**Features:**
- **Patterns** tab — cheatsheet cards with "Prove it" problem lists per pattern
- **Problems** tab — filterable list with expandable optimal approaches
- **Roadmap** tab — NeetCode study order with per-category progress
- Progress saved in `localStorage`

## Reference cheatsheets

| Format | File | Best for |
|---|---|---|
| **React app** | `npm run dev` → [index.html](index.html) | Interactive study, search, progress |
| **HTML** | [interview-pattern-cheatsheet.html](interview-pattern-cheatsheet.html) | Browser viewing, print / save as PDF |
| **Markdown** | [CHEATSHEET.md](CHEATSHEET.md) | GitHub browsing, quick reference |
| **PDF** | [Interview Pattern Cheatsheet.pdf](Interview%20Pattern%20Cheatsheet.pdf) | Print export of the HTML cheatsheet |

## Data

- [`data/patterns.json`](data/patterns.json) — 20 pattern definitions (signals, do/use/gotcha)
- [`data/neetcode150.json`](data/neetcode150.json) — all 150 problems with approaches and pattern mappings

Problem categories follow the [NeetCode 150 roadmap](https://neetcode.io/practice/practice/neetcode150).
