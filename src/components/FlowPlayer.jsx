import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualRenderer from '../animations/VisualRenderer';
import { useReducedMotion } from '../animations/useReducedMotion';
import styles from './FlowPlayer.module.css';

const SPEEDS = [
  { label: '0.5×', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '2×', value: 2 },
];

export default function FlowPlayer({ title, subtitle, frames, compact = false }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const total = frames?.length ?? 0;
  const current = frames?.[step];
  const duration = reduced ? 0 : (current?.durationMs ?? 1000) / speed;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (index) => {
      if (!total) return;
      setStep(Math.max(0, Math.min(index, total - 1)));
    },
    [total]
  );

  const next = useCallback(() => goTo(step + 1), [goTo, step]);
  const prev = useCallback(() => goTo(step - 1), [goTo, step]);

  useEffect(() => {
    clearTimer();
    if (!playing || !current || step >= total - 1) {
      if (step >= total - 1) setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, total - 1));
    }, duration);
    return clearTimer;
  }, [playing, step, current, duration, total, clearTimer]);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
    clearTimer();
  }, [frames, clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  if (!frames?.length) {
    return <p className={styles.empty}>No animation frames for this item yet.</p>;
  }

  return (
    <div className={`${styles.player} ${compact ? styles.compact : ''}`}>
      {!compact && title && (
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}

      <div className={styles.stageWrap}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className={styles.stageInner}
          >
            <VisualRenderer
              visuals={current.visuals}
              caption={current.caption}
              reduced={reduced}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        key={`cap-${step}`}
        className={styles.caption}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      >
        {current.caption}
      </motion.p>

      <div className={styles.timeline}>
        {frames.map((f, i) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.dot} ${i === step ? styles.dotActive : ''} ${i < step ? styles.dotDone : ''}`}
            onClick={() => {
              setPlaying(false);
              goTo(i);
            }}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.ctrlBtn} onClick={prev} disabled={step === 0}>
          Prev
        </button>
        <button
          type="button"
          className={styles.playBtn}
          onClick={() => {
            if (step >= total - 1) {
              goTo(0);
              setPlaying(true);
            } else {
              setPlaying((p) => !p);
            }
          }}
        >
          {playing ? 'Pause' : step >= total - 1 ? 'Replay' : 'Play'}
        </button>
        <button type="button" className={styles.ctrlBtn} onClick={next} disabled={step >= total - 1}>
          Next
        </button>
        <div className={styles.speedGroup}>
          {SPEEDS.map((s) => (
            <button
              key={s.value}
              type="button"
              className={`${styles.speedBtn} ${speed === s.value ? styles.speedActive : ''}`}
              onClick={() => setSpeed(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.stepCounter}>
        Step {step + 1} / {total}
      </p>
    </div>
  );
}
