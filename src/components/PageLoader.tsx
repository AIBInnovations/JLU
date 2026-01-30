'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete) return;

    const tl = gsap.timeline({
      defaults: {
        ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      onComplete: () => {
        setTimeout(() => setIsComplete(true), 300);
      },
    });

    // Counter animation
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value).toString().padStart(2, '0');
          }
        },
      },
      0
    );

    // Line expansion
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 2.5, ease: 'power2.inOut' },
      0
    );

    // Title reveal - split text effect
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.3
    );

    // Subtitle reveal
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0.6
    );

    // Hold for a moment
    tl.to({}, { duration: 0.5 });

    // Exit animation - split panels
    tl.to(
      textContainerRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.in',
      },
      '>'
    );

    tl.to(
      [leftPanelRef.current, rightPanelRef.current],
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        stagger: 0.1,
        ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-99999 flex items-center justify-center"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#f5f5f0]"
        style={{ transformOrigin: 'top' }}
      />

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#f5f5f0]"
        style={{ transformOrigin: 'top' }}
      />

      {/* Content Container */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Counter */}
        <div
          ref={counterRef}
          className="absolute -top-20 text-[14px] tracking-[0.3em] font-light"
          style={{ color: '#999' }}
        >
          00
        </div>

        {/* Main Title */}
        <div className="overflow-hidden">
          <div
            ref={titleRef}
            className="text-[clamp(48px,8vw,120px)] font-bold tracking-widest"
            style={{
              fontWeight: 700,
              lineHeight: 1,
              color: '#0a0a0a',
            }}
          >
            JAGRAN LAKECITY
          </div>
        </div>

        {/* Expanding Line */}
        <div
          ref={lineRef}
          className="w-75 h-0.5 bg-[#0a0a0a] my-8"
          style={{
            transformOrigin: 'left',
          }}
        />

        {/* Subtitle */}
        <div className="overflow-hidden">
          <div
            ref={subtitleRef}
            className="text-[clamp(14px,1.5vw,18px)] tracking-[0.3em] font-light uppercase"
            style={{
              color: '#0a0a0a',
            }}
          >
            University
          </div>
        </div>
      </div>

      {/* Corner Marks - Minimal editorial style */}
      <div className="absolute top-8 left-8 w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-px bg-[#0a0a0a]" />
        <div className="absolute top-0 left-0 w-px h-full bg-[#0a0a0a]" />
      </div>
      <div className="absolute top-8 right-8 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-px bg-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-px h-full bg-[#0a0a0a]" />
      </div>
      <div className="absolute bottom-8 left-8 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#0a0a0a]" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-[#0a0a0a]" />
      </div>
      <div className="absolute bottom-8 right-8 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-full h-px bg-[#0a0a0a]" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-[#0a0a0a]" />
      </div>

      {/* Bottom text */}
      <div
        className="absolute bottom-12 text-[10px] tracking-[0.3em] font-light uppercase"
        style={{ color: '#0a0a0a', mixBlendMode: 'difference' }}
      >
        Experience Excellence
      </div>
    </div>
  );
}
