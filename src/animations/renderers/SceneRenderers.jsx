import { motion } from 'framer-motion';
import styles from './renderers.module.css';

const spring = { type: 'spring', stiffness: 320, damping: 28 };

export function ArrayHashRenderer({ visuals, reduced }) {
  const { array = [], pointer = -1, hashSet = [], highlight = [], flash = [] } = visuals;
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className={styles.stage}>
      <div className={styles.arrayRow}>
        {array.map((val, i) => (
          <motion.div
            key={i}
            layout
            className={`${styles.cell} ${highlight.includes(i) ? styles.cellActive : ''} ${flash.includes(i) ? styles.cellFlash : ''}`}
            animate={{ scale: pointer === i ? 1.08 : 1 }}
            transition={transition}
          >
            <span className={styles.cellVal}>{val}</span>
            {pointer === i && <span className={styles.pointer}>i</span>}
          </motion.div>
        ))}
      </div>
      <div className={styles.sidePanel}>
        <span className={styles.sideLabel}>Hash set</span>
        <div className={styles.chipRow}>
          {hashSet.map((v) => (
            <motion.span
              key={v}
              layout
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className={styles.chip}
            >
              {v}
            </motion.span>
          ))}
          {hashSet.length === 0 && <span className={styles.empty}>∅</span>}
        </div>
      </div>
    </div>
  );
}

export function TwoPointersRenderer({ visuals, reduced }) {
  const { array = [], lo = 0, hi = 0, sum, target, highlight = [] } = visuals;
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className={styles.stage}>
      <div className={styles.arrayRow}>
        {array.map((val, i) => (
          <motion.div
            key={i}
            layout
            className={`${styles.cell} ${highlight.includes(i) ? styles.cellActive : ''}`}
            animate={{
              scale: i === lo || i === hi ? 1.06 : 1,
              borderColor: i === lo ? 'var(--accent)' : i === hi ? 'var(--tree)' : undefined,
            }}
            transition={transition}
          >
            <span className={styles.cellVal}>{val}</span>
            {i === lo && <span className={`${styles.pointer} ${styles.lo}`}>lo</span>}
            {i === hi && <span className={`${styles.pointer} ${styles.hi}`}>hi</span>}
          </motion.div>
        ))}
      </div>
      {sum != null && (
        <motion.p
          className={styles.sumLine}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          sum = {sum} {target != null && `(target ${target})`}
        </motion.p>
      )}
    </div>
  );
}

export function SlidingWindowRenderer({ visuals, reduced }) {
  const { array = [], window = [0, 0], invalid = false, highlight = [] } = visuals;
  const transition = reduced ? { duration: 0 } : spring;
  const [L, R] = window;

  return (
    <div className={styles.stage}>
      <motion.div
        className={`${styles.windowBracket} ${invalid ? styles.windowInvalid : ''}`}
        animate={{
          left: `${L * 52}px`,
          width: `${(R - L + 1) * 52 - 4}px`,
        }}
        transition={transition}
      />
      <div className={styles.arrayRow}>
        {array.map((val, i) => (
          <motion.div
            key={i}
            className={`${styles.cell} ${i >= L && i <= R ? styles.inWindow : ''} ${highlight.includes(i) ? styles.cellActive : ''}`}
            animate={{ scale: invalid && i >= L && i <= R ? [1, 1.02, 1] : 1 }}
            transition={transition}
          >
            <span className={styles.cellVal}>{val}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function StackRenderer({ visuals, reduced }) {
  const { input = [], index = 0, stack = [], invalid = false } = visuals;
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className={styles.stageStack}>
      <div className={styles.inputRow}>
        {input.map((ch, i) => (
          <motion.span
            key={i}
            className={`${styles.char} ${i === index ? styles.charActive : ''} ${i < index ? styles.charDone : ''}`}
            animate={{ scale: i === index ? 1.1 : 1 }}
            transition={transition}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <div className={styles.stackCol}>
        <span className={styles.sideLabel}>Stack</span>
        {[...stack].reverse().map((ch, i) => (
          <motion.div
            key={`${ch}-${i}`}
            layout
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.stackItem}
            transition={transition}
          >
            {ch}
          </motion.div>
        ))}
        {stack.length === 0 && <span className={styles.empty}>empty</span>}
      </div>
      {invalid && <p className={styles.invalidNote}>Mismatch!</p>}
    </div>
  );
}

export function TreeBfsRenderer({ visuals, reduced }) {
  const { levels = [], visited = [], queue = [], current } = visuals;
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className={styles.stage}>
      <div className={styles.treeLevels}>
        {levels.map((row, li) => (
          <div key={li} className={styles.treeRow}>
            {row.map((node) => (
              <motion.div
                key={node}
                className={`${styles.treeNode} ${visited.includes(node) ? styles.visited : ''} ${current === node ? styles.current : ''}`}
                animate={{ scale: current === node ? 1.12 : 1 }}
                transition={transition}
              >
                {node}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.queueRow}>
        <span className={styles.sideLabel}>Queue</span>
        {queue.map((n) => (
          <span key={n} className={styles.chip}>
            {n}
          </span>
        ))}
        {queue.length === 0 && <span className={styles.empty}>empty</span>}
      </div>
    </div>
  );
}

export function Dp1dRenderer({ visuals, reduced }) {
  const { cells = [], active = 0, highlight = [], labels = [] } = visuals;
  const transition = reduced ? { duration: 0 } : spring;

  return (
    <div className={styles.stage}>
      <div className={styles.dpRow}>
        {cells.map((val, i) => (
          <motion.div
            key={i}
            className={`${styles.dpCell} ${highlight.includes(i) ? styles.cellActive : ''} ${active === i ? styles.dpActive : ''}`}
            animate={{ scale: active === i ? 1.08 : 1 }}
            transition={transition}
          >
            <span className={styles.dpLabel}>{labels[i] ?? `i=${i}`}</span>
            <span className={styles.dpVal}>{val == null ? '?' : val}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function GenericRenderer({ caption }) {
  return (
    <div className={styles.genericStage}>
      <p>{caption || 'Follow the step caption below.'}</p>
    </div>
  );
}
