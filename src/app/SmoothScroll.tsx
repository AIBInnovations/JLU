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
  // shows.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Honor reduced-motion users.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Mobile / any touch device: do NOT init Lenis. Native mobile scroll is
    // hardware-accelerated 60fps by the OS — JS-driven smooth scroll on
    // mobile cannot match it and only ever creates jitter, momentum
    // overshoot ("teleport to bottom of page"), or laggy scroll. Lenis stays
    // a desktop-wheel-only enhancement.
    const isTouch =
      'ontouchstart' in window ||
      (navigator?.maxTouchPoints ?? 0) > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    try {
      const saved = Number(sessionStorage.getItem('scrollPos_' + pathname) || '0');
      if (saved > 0) {
        lenis.scrollTo(saved, { immediate: true });
        sessionStorage.removeItem('scrollPos_' + pathname);
      }
    } catch {}

    lenis.on('scroll', ScrollTrigger.update);

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

  // Scroll to top only on actual route change.
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

  // Save scroll position before unload.
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPos_' + pathname, String(window.scrollY));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  return null;
}
