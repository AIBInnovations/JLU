'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Stop ScrollTrigger from recalculating pins (and thus resetting scroll
  // position) every time the iOS Safari / Chrome Android URL bar hides or
  // shows — that's why scroll was snapping back to the Hero.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Honor reduced-motion users — keep native scroll, no smoothing.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      // lerp drives frame-based smoothing — a single value works for both
      // wheel and touch and keeps perceived motion at ~60fps.
      lerp: 0.1,
      smoothWheel: true,
      // syncTouch makes finger swipes feed Lenis instead of native scroll,
      // so short and long swipes both produce one consistent smooth motion.
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Restore saved scroll immediately after Lenis init so refresh doesn't
    // fight it.
    try {
      const saved = Number(sessionStorage.getItem('scrollPos_' + pathname) || '0');
      if (saved > 0) {
        lenis.scrollTo(saved, { immediate: true });
        sessionStorage.removeItem('scrollPos_' + pathname);
      }
    } catch {}

    // Tie GSAP ScrollTrigger to Lenis's scroll events so pinned/scrub
    // animations stay in sync with Lenis's interpolated scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis through GSAP's ticker — one shared RAF loop. Capture the
    // callback so the cleanup can actually remove it (the previous version
    // passed a fresh arrow function to remove and silently leaked the loop).
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top only on actual route change
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  // Save scroll position before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPos_' + pathname, String(window.scrollY));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  return null;
}
