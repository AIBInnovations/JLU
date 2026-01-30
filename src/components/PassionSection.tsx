'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const PassionSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState(0);
  const isMobile = useIsMobile();

  // Section data
  const sections = [
    { video: '/p.mp4', text: 'PASSION' },
    { video: '/s.mp4', text: 'STUDY' },
    { video: '/p.mp4', text: 'SUCCESS' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!wrapperRef.current || !containerRef.current) return;

    const videos = videoRefs.current;
    const triggers: ScrollTrigger[] = [];

    // Load videos
    videos.forEach((video) => {
      if (video) {
        video.load();
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.play().catch(() => {});
      }
    });

    const container = containerRef.current;

    // Initial state - container is small and centered
    if (!prefersReducedMotion) {
      const initialScale = isMobile ? 0.75 : 0.65;

      gsap.set(container, {
        scale: initialScale,
        borderRadius: '24px',
        transformOrigin: 'center center',
      });

      // Scale up animation
      const scaleAnimation = gsap.to(container, {
        scale: 1,
        borderRadius: '0px',
        ease: 'power2.out',
      });

      const scaleTrigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        animation: scaleAnimation,
      });

      triggers.push(scaleTrigger);

      // Text fade in
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 50 });

        const textFadeIn = gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        });

        const textTrigger = ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
          animation: textFadeIn,
        });

        triggers.push(textTrigger);
      }
    }

    // Set initial clip-path for panels 2 and 3 using GSAP
    if (panel2Ref.current) {
      gsap.set(panel2Ref.current, { clipPath: 'inset(100% 0 0 0)' });
    }
    if (panel3Ref.current) {
      gsap.set(panel3Ref.current, { clipPath: 'inset(100% 0 0 0)' });
    }

    // Create a single timeline for both panel reveals
    const panelTimeline = gsap.timeline();

    if (panel2Ref.current) {
      panelTimeline.to(panel2Ref.current, {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none',
        duration: 1,
      });
    }

    if (panel3Ref.current) {
      panelTimeline.to(panel3Ref.current, {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none',
        duration: 1,
      });
    }

    // Pin the container and control the panel timeline
    const pinTrigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3}`,
      pin: container,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      animation: panelTimeline,
      onUpdate: (self) => {
        const progress = self.progress;

        // Update text based on which panel is revealed
        if (progress < 0.33) {
          setCurrentText(0); // PASSION - page 1 visible
        } else if (progress < 0.66) {
          setCurrentText(1); // STUDY - page 2 revealed
        } else {
          setCurrentText(2); // SUCCESS - page 3 revealed
        }
      },
    });

    triggers.push(pinTrigger);

    // Refresh after setup
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  const addVideoRef = (el: HTMLVideoElement | null, index: number) => {
    if (el) videoRefs.current[index] = el;
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: '400vh' }}
    >
      {/* Main container that scales and pins */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Panel 1 - PASSION */}
        <div
          ref={panel1Ref}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        >
          <video
            ref={(el) => addVideoRef(el, 0)}
            src="/p.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Panel 2 - STUDY */}
        <div
          ref={panel2Ref}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
        >
          <video
            ref={(el) => addVideoRef(el, 1)}
            src="/s.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Panel 3 - SUCCESS (highest z-index) */}
        <div
          ref={panel3Ref}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 4 }}
        >
          <video
            ref={(el) => addVideoRef(el, 2)}
            src="/video.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Dark overlay for better text visibility */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            pointerEvents: 'none',
          }}
        />

        {/* Text overlay - always on top of all panels */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="text-center px-4">
            {/* All three words - filled or outlined based on currentText */}
            {sections.map((section, index) => (
              <h2
                key={index}
                className="transition-all duration-500"
                style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: index === currentText
                    ? (isMobile ? 'clamp(48px, 12vw, 80px)' : 'clamp(80px, 10vw, 145px)')
                    : (isMobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(60px, 8vw, 120px)'),
                  fontWeight: 300,
                  lineHeight: '130%',
                  letterSpacing: isMobile ? '2px' : '3px',
                  color: index === currentText ? '#ffffff' : 'transparent',
                  WebkitTextStroke: index === currentText
                    ? '0px'
                    : (isMobile ? '2px rgba(255,255,255,0.6)' : '4px rgba(255,255,255,0.6)'),
                  WebkitTextFillColor: index === currentText ? '#ffffff' : 'transparent',
                }}
              >
                {section.text}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
