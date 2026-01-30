'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for initial load before initializing smooth scroll
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isReady]);

  return null;
}
