'use client';

import { useEffect, useRef } from 'react';

/** Horizontal click-and-drag scrolling — track follows the pointer live. */
export default function useDragScroll() {
  const ref = useRef(null);
  const didDrag = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let active = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let pid = null;
    let axis = null;
    const THRESHOLD = 4;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      active = true;
      dragging = false;
      didDrag.current = false;
      startX = e.clientX;
      startY = e.clientY;
      startScroll = el.scrollLeft;
      pid = e.pointerId;
      axis = null;
    };

    const move = (e) => {
      if (!active) return;
      if (pid != null && e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!axis && Math.max(Math.abs(dx), Math.abs(dy)) < THRESHOLD) return;
      if (!axis) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'y') {
        active = false;
        pid = null;
        return;
      }
      if (!dragging) {
        dragging = true;
        didDrag.current = true;
        el.classList.add('is-dragging');
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      el.scrollLeft = startScroll - dx;
      e.preventDefault();
    };

    const up = (e) => {
      if (!active) return;
      if (e && pid != null && e.pointerId !== pid) return;
      active = false;
      pid = null;
      axis = null;
      if (dragging) {
        el.classList.remove('is-dragging');
        const block = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener('click', block, { capture: true, once: true });
      }
      dragging = false;
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move, { passive: false });
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);

    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('lostpointercapture', up);
    };
  }, []);

  return { ref, didDrag };
}
