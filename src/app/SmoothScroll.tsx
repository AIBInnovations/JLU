'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Eager-import gsap + ScrollTrigger + Lenis here (NOT dynamic) so that pin-based
// ScrollTriggers registered by HorizontalScroll / PassionSection / WhyJlu are
// active before the user starts scrolling. A dynamic import here introduces a
// race: scroll begins before pins exist, page rolls past, then ScrollTrigger
// initialises retroactively and jumps content — visible as a brief flash of
// downstream sections in their pre-animation state.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
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

    const isTouch =
      'ontouchstart' in window ||
      (navigator?.maxTouchPoints ?? 0) > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    // Lenis on every device. Mobile config is deliberately conservative:
    // - lerp 0.1 = smooth without floaty lag
    // - syncTouch true so finger swipes feed Lenis (smooth Lenis-feel)
    // - touchMultiplier 1.0 (NOT amplified) prevents momentum overshoots
    //   that were teleporting scroll to the bottom of the page
    // - touchInertiaExponent 1.4 = short, controlled inertia
    // The cost of syncTouch is only payable because every scroll-tied
    // animation on the mobile homepage has been removed (no pins, no
    // scrubs, no continuous animations, no backdrop-filters).
    const lenis = new Lenis(
      isTouch
        ? {
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
            touchInertiaExponent: 1.4,
            touchMultiplier: 1.0,
          }
        : {
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: false,
          },
    );
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
