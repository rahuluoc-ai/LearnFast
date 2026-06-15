import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { computeTooltipPosition, TOOLTIP_WIDTH } from '../utils/tooltipPosition';
import styles from './PatternTooltip.module.css';

export default function PatternTooltip({ patternId, patternMap, onOpenPatterns, children }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, placement: 'top' });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const closeTimerRef = useRef(null);
  const pattern = patternMap[patternId];

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipWidth = tooltip?.offsetWidth || TOOLTIP_WIDTH;
    const tooltipHeight = tooltip?.offsetHeight || 200;
    setPos(computeTooltipPosition(triggerRect, tooltipWidth, tooltipHeight));
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [open, updatePosition, pattern]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('scroll', onScrollOrResize, true);
    return () => {
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      const t = triggerRef.current;
      const tip = tooltipRef.current;
      if (t?.contains(e.target) || tip?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const handleEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleLeave = () => {
    scheduleClose();
  };

  if (!pattern) return children;

  const tooltipEl = open && (
    <div
      ref={tooltipRef}
      className={`${styles.tooltip} ${styles[pos.placement]}`}
      role="tooltip"
      style={{ top: pos.top, left: pos.left }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={styles.tooltipHeader}>
        <strong>{pattern.name}</strong>
        <span className={styles.badge}>{pattern.complexity}</span>
      </div>
      <div className={styles.signals}>
        {pattern.signals.map((s) => `"${s}"`).join(' · ')}
      </div>
      <div className={styles.row}>
        <span className={styles.lbl}>Do</span>
        {pattern.do}
      </div>
      <div className={styles.row}>
        <span className={styles.lbl}>Use</span>
        {pattern.use}
      </div>
      <div className={`${styles.row} ${styles.gotcha}`}>
        <span className={styles.lbl}>Gotcha</span>
        {pattern.gotcha}
      </div>
      {onOpenPatterns && (
        <button
          type="button"
          className={styles.footerLink}
          onClick={() => {
            setOpen(false);
            onOpenPatterns(patternId);
          }}
        >
          Open in Patterns tab →
        </button>
      )}
    </div>
  );

  return (
    <span className={styles.wrap}>
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        className={styles.trigger}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        {children}
      </span>
      {tooltipEl && createPortal(tooltipEl, document.body)}
    </span>
  );
}
