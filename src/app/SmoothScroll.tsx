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

    // Mobile = let native hardware scroll handle touch (Android Chrome and
    // iOS Safari both have hardware-accelerated touch scrolling that beats
    // any JS-driven scroll). Lenis stays loaded so ScrollTrigger animations
    // still get scroll events, but it does NOT intercept touch — that's what
    // was saturating the main thread on Android.
    // Desktop = smooth wheel via Lenis.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Diagnostic logging — gated by ?debug=1 so it never logs for real users.
    // Remove once the mobile-stuck investigation is closed.
    if (
      typeof window !== 'undefined' &&
      new URL(window.location.href).searchParams.get('debug') === '1'
    ) {
      // eslint-disable-next-line no-console
      console.log('[SmoothScroll] Lenis init', {
        userAgent: navigator.userAgent,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        touchPoints: navigator.maxTouchPoints,
        pointerCoarse: window.matchMedia('(pointer: coarse)').matches,
      });
      lenis.on('scroll', (e: { scroll: number; velocity: number; direction: number }) => {
        // eslint-disable-next-line no-console
        console.log('[SmoothScroll] scroll', {
          scrollY: Math.round(e.scroll),
          velocity: e.velocity?.toFixed(2),
          dir: e.direction,
        });
      });
    }

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
