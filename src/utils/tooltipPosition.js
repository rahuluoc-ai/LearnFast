const PAD = 8;
const GAP = 8;
export const TOOLTIP_WIDTH = 280;

export function computeTooltipPosition(triggerRect, tooltipWidth, tooltipHeight) {
  let top = triggerRect.top - tooltipHeight - GAP;
  let placement = 'top';
  if (top < PAD) {
    top = triggerRect.bottom + GAP;
    placement = 'bottom';
  }
  let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
  left = Math.max(PAD, Math.min(left, window.innerWidth - tooltipWidth - PAD));
  top = Math.max(PAD, Math.min(top, window.innerHeight - tooltipHeight - PAD));
  return { top, left, placement };
}
