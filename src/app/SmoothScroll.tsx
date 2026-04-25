'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';

export default function SmoothScroll() {
  const [isReady, setIsReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Get saved scroll position immediately
  const getSavedScroll = () => {
    try {
      return Number(sessionStorage.getItem('scrollPos_' + pathname) || '0');
    } catch {
      return 0;
    }
  };

  // On mount: set scroll position immediately before paint
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const saved = getSavedScroll();
    if (saved > 0) {
      window.scrollTo(0, saved);
    }

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Skip Lenis on touch devices and users who prefer reduced motion.
    // On mobile, Lenis's RAF loop + `scroll-behavior: auto !important` (from lenis.css)
    // forces scroll off the compositor thread and breaks native momentum, causing jitter.
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) {
      return;
    }

    const saved = getSavedScroll();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Restore scroll immediately after Lenis init
    if (saved > 0) {
      lenis.scrollTo(saved, { immediate: true });
      sessionStorage.removeItem('scrollPos_' + pathname);
    }

    // Drive Lenis through GSAP's ticker — one shared RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

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
