'use client';

// Temporary on-screen diagnostic for mobile scroll issue.
// Renders a tiny fixed overlay that updates ~5x/sec with the values we need
// to figure out why scroll feels stuck. Remove this component once the
// root cause is confirmed.
//
// Mount via <ScrollDebug /> in layout.tsx, visible only when ?debug=1 is in
// the URL so it never shows up for real users.

import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface DebugSnapshot {
  scrollY: number;
  documentHeight: number;
  viewportHeight: number;
  htmlClasses: string;
  bodyClasses: string;
  htmlOverflow: string;
  bodyOverflow: string;
  htmlOverflowY: string;
  bodyOverflowY: string;
  htmlPosition: string;
  bodyPosition: string;
  htmlHeight: string;
  bodyHeight: string;
  totalScrollTriggers: number;
  pinnedScrollTriggers: number;
  activePin: string;
  touchAction: string;
  lenisDetected: boolean;
  lenisStopped: boolean;
  lenisSmooth: boolean;
}

const initial: DebugSnapshot = {
  scrollY: 0,
  documentHeight: 0,
  viewportHeight: 0,
  htmlClasses: '',
  bodyClasses: '',
  htmlOverflow: '',
  bodyOverflow: '',
  htmlOverflowY: '',
  bodyOverflowY: '',
  htmlPosition: '',
  bodyPosition: '',
  htmlHeight: '',
  bodyHeight: '',
  totalScrollTriggers: 0,
  pinnedScrollTriggers: 0,
  activePin: 'none',
  touchAction: '',
  lenisDetected: false,
  lenisStopped: false,
  lenisSmooth: false,
};

export default function ScrollDebug() {
  const [enabled, setEnabled] = useState(false);
  const [snap, setSnap] = useState<DebugSnapshot>(initial);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('debug') !== '1') return;
    setEnabled(true);

    let lastScroll = 0;
    let stuckMs = 0;
    let lastTickTs = performance.now();

    const sample = () => {
      const html = document.documentElement;
      const body = document.body;
      const htmlStyle = getComputedStyle(html);
      const bodyStyle = getComputedStyle(body);

      const scrollY = window.scrollY;
      const now = performance.now();
      const elapsed = now - lastTickTs;
      lastTickTs = now;

      // Track time since scroll position last changed
      if (Math.abs(scrollY - lastScroll) < 1) {
        stuckMs += elapsed;
      } else {
        stuckMs = 0;
      }
      lastScroll = scrollY;

      const triggers = ScrollTrigger.getAll();
      const pinned = triggers.filter((t) => Boolean(t.pin));
      const activePin = pinned.find((t) => scrollY >= t.start && scrollY <= t.end);

      const next: DebugSnapshot = {
        scrollY: Math.round(scrollY),
        documentHeight: Math.round(document.documentElement.scrollHeight),
        viewportHeight: Math.round(window.innerHeight),
        htmlClasses: html.className || '(empty)',
        bodyClasses: body.className || '(empty)',
        htmlOverflow: htmlStyle.overflow,
        bodyOverflow: bodyStyle.overflow,
        htmlOverflowY: htmlStyle.overflowY,
        bodyOverflowY: bodyStyle.overflowY,
        htmlPosition: htmlStyle.position,
        bodyPosition: bodyStyle.position,
        htmlHeight: htmlStyle.height,
        bodyHeight: bodyStyle.height,
        totalScrollTriggers: triggers.length,
        pinnedScrollTriggers: pinned.length,
        activePin: activePin
          ? `${(activePin.vars.trigger as Element)?.tagName ?? '?'}.${
              ((activePin.vars.trigger as Element)?.className as string)?.split(' ').slice(0, 2).join('.') ?? ''
            } [${Math.round(activePin.start)}→${Math.round(activePin.end)}]`
          : 'none',
        touchAction: htmlStyle.touchAction + ' / ' + bodyStyle.touchAction,
        lenisDetected: html.classList.contains('lenis'),
        lenisStopped: html.classList.contains('lenis-stopped'),
        lenisSmooth: html.classList.contains('lenis-smooth'),
      };

      setSnap(next);

      // Also dump to console every 2s with stuck-detection so user can see in
      // Safari/Chrome remote inspector if the scrollY froze while finger was
      // moving.
      if (stuckMs > 600) {
        // eslint-disable-next-line no-console
        console.warn('[ScrollDebug] scrollY frozen', {
          scrollY,
          stuckMs: Math.round(stuckMs),
          activePin: next.activePin,
          htmlClasses: next.htmlClasses,
          bodyClasses: next.bodyClasses,
          htmlOverflow: next.htmlOverflow,
          bodyOverflow: next.bodyOverflow,
        });
      }
    };

    sample();
    const id = setInterval(sample, 200);
    return () => clearInterval(id);
  }, []);

  if (!enabled) return null;

  const row = (label: string, value: string | number | boolean, warn = false) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        padding: '2px 0',
        color: warn ? '#ff6b6b' : 'inherit',
      }}
    >
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{String(value)}</span>
    </div>
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 999999,
        background: 'rgba(0,0,0,0.85)',
        color: '#0f0',
        fontFamily: 'monospace',
        fontSize: 10,
        lineHeight: 1.3,
        padding: 8,
        borderRadius: 6,
        maxWidth: 240,
        pointerEvents: 'none',
      }}
    >
      {row('scrollY', snap.scrollY)}
      {row('docH', snap.documentHeight)}
      {row('vh', snap.viewportHeight)}
      {row(
        'html.lenis',
        snap.lenisDetected ? 'yes' : 'no',
        !snap.lenisDetected,
      )}
      {row('lenis-stopped', snap.lenisStopped ? 'YES' : 'no', snap.lenisStopped)}
      {row('lenis-smooth', snap.lenisSmooth ? 'yes' : 'no')}
      {row(
        'html overflow',
        snap.htmlOverflow,
        snap.htmlOverflow === 'hidden',
      )}
      {row(
        'body overflow',
        snap.bodyOverflow,
        snap.bodyOverflow === 'hidden',
      )}
      {row('html height', snap.htmlHeight)}
      {row('body height', snap.bodyHeight)}
      {row('html.classes', snap.htmlClasses)}
      {row('body.classes', snap.bodyClasses)}
      {row('touch-action', snap.touchAction)}
      {row('STs total', snap.totalScrollTriggers)}
      {row('STs pinned', snap.pinnedScrollTriggers)}
      {row('active pin', snap.activePin, snap.activePin !== 'none')}
    </div>
  );
}
