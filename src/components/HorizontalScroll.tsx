'use client';

import { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Scrolling text content - repeated for seamless scroll
  const topTextContent = "VISION • GROWTH • INSPIRE • TRANSFORM • EMPOWER • DISCOVER • INNOVATION • EXCELLENCE • LEADERSHIP • RESEARCH • CREATIVITY • KNOWLEDGE • ";
  const bottomTextContent = "QS DIAMOND RATED • 232 ACRES CAMPUS • 50+ PROGRAMS • 2500+ STUDENTS • JAGRAN LAKECITY UNIVERSITY • BHOPAL • MADHYA PRADESH • SINCE 2013 • ";

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const cards = [
    {
      width: 540,
      height: 500,
      mobileWidth: 280,
      mobileHeight: 260,
      bg: 'bg-[#f6f7f0]',
      hasText: true,
      isTextCard: true,
      title: "Excellence in Education",
      content: "Jagran Lakecity University stands as the first university in MP & CG to receive the prestigious QS I-Gauge DIAMOND rating. Recognized as 'University of the Year' for five consecutive years (2015-2019) and ranked #1 multidisciplinary private university in Madhya Pradesh.\n\nSpread across a sprawling 232-acre campus, JLU offers 50+ degree programs to over 2,500 students, fostering innovation and academic excellence."
    },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#c3fd7a]', hasText: true, isTextCard: false, stat: '232', statLabel: 'Acres of Campus' },
    { width: 770, height: 500, mobileWidth: 280, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: 'https://jlu.edu.in/wp-content/uploads/2025/01/arialview.webp' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#1D4ED8]', hasText: true, isTextCard: false, textColor: 'text-white', stat: '2,500+', statLabel: 'Students Enrolled' },
    { width: 540, height: 500, mobileWidth: 250, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: 'https://jlu.edu.in/wp-content/uploads/2025/01/sclubs.webp' },
    { width: 670, height: 500, mobileWidth: 250, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false , image: 'https://jlu.edu.in/wp-content/uploads/2025/02/faculties-at-jlu.webp' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#E9D502]', hasText: true, isTextCard: false, stat: '50+', statLabel: 'Degree Programs' },
    { width: 1320, height: 500, mobileWidth: 320, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: 'https://jlu.edu.in/wp-content/uploads/2023/10/slider-1-29.jpg' },
  ];

  // Divide cards into 3 rows for mobile (3, 3, 2 distribution)
  const row1Cards = cards.slice(0, 3);
  const row2Cards = cards.slice(3, 6);
  const row3Cards = cards.slice(6, 8);

  // Desktop: Single row horizontal scroll with text animations
  useEffect(() => {
    if (!mounted || isMobile || !containerRef.current || !scrollContainerRef.current) return;

    const section = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    // Calculate scroll distance with extra padding - increased for longer scroll
    const scrollDistance = scrollContainer.scrollWidth - window.innerWidth + 50;
    const extendedScrollMultiplier = 2.5; // Extended scroll length

    // Create timeline for synchronized animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance + window.innerHeight * extendedScrollMultiplier}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Cards move right to left (negative x)
    tl.to(scrollContainer, {
      x: -scrollDistance,
      ease: 'none',
    }, 0);

    // Top text moves left to right (positive x) - opposite direction
    if (topText) {
      tl.fromTo(topText,
        { x: -window.innerWidth * 3 },
        { x: window.innerWidth * 0.5, ease: 'none' },
        0
      );
    }

    // Bottom text moves left to right (positive x) - opposite direction, slightly different speed
    if (bottomText) {
      tl.fromTo(bottomText,
        { x: -window.innerWidth * 2.5 },
        { x: window.innerWidth * 0.8, ease: 'none' },
        0
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [mounted, isMobile]);

  // Mobile: Three rows with horizontal scroll
  useEffect(() => {
    if (!mounted || !isMobile || !containerRef.current) return;
    if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;

    const section = containerRef.current;
    const animations: gsap.core.Tween[] = [];

    // Animate Row 1
    const row1ScrollDistance = row1Ref.current.scrollWidth - window.innerWidth + 50;
    animations.push(gsap.to(row1Ref.current, {
      x: -row1ScrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${row1ScrollDistance + window.innerHeight * 0.3}`,
        scrub: 0.5,
        pin: false,
        invalidateOnRefresh: true,
      },
    }));

    // Animate Row 2
    const row2ScrollDistance = row2Ref.current.scrollWidth - window.innerWidth + 50;
    animations.push(gsap.to(row2Ref.current, {
      x: -row2ScrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${row2ScrollDistance + window.innerHeight * 0.6}`,
        scrub: 0.5,
        pin: false,
        invalidateOnRefresh: true,
      },
    }));

    // Animate Row 3
    const row3ScrollDistance = row3Ref.current.scrollWidth - window.innerWidth + 50;
    animations.push(gsap.to(row3Ref.current, {
      x: -row3ScrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${row3ScrollDistance + window.innerHeight * 0.8}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    }));

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill());
    };
  }, [mounted, isMobile]);

  const renderCard = (card: typeof cards[0], index: number) => (
    <div
      key={index}
      className={`${card.bg} relative rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden`}
      style={{
        width: isMobile ? `${card.mobileWidth}px` : `${card.width}px`,
        height: isMobile ? `${card.mobileHeight}px` : `${card.height}px`,
        padding: card.isTextCard || card.hasText ? (isMobile ? '16px' : '32px') : '0',
      }}
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.title ?? 'JLU highlight'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {card.isTextCard ? (
        <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-4 md:p-6' : ''} text-left`}>
          <h2 className={`text-xl md:text-4xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-3 md:mb-6 drop-shadow-sm`}>{card.title}</h2>
          <div className={`${card.textColor ?? 'text-[#21313c]'} text-xs md:text-lg leading-relaxed whitespace-pre-line drop-shadow-sm`}>
            {isMobile ? card.content?.substring(0, 120) + '...' : card.content}
          </div>
        </div>
      ) : card.hasText ? (
        <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-4 md:p-6' : ''} text-center`}>
          <div className={`text-4xl md:text-8xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-2 md:mb-4 drop-shadow-sm`}>{card.stat ?? '600+'}</div>
          <p className={`${card.textColor ?? 'text-[#21313c]'} text-xs md:text-lg drop-shadow-sm`}>
            {card.statLabel ?? 'Lorem ipsum dolor sit amet consectetur.'}
          </p>
        </div>
      ) : null}
    </div>
  );

  // Prevent hydration mismatch - render desktop version until mounted
  if (!mounted) {
    return (
      <section
        ref={containerRef}
        className="relative bg-[#f6f7f0] overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="h-full flex flex-col justify-center relative">
          {/* Top scrolling text placeholder */}
          <div className="absolute top-8 left-0 right-0 overflow-hidden pointer-events-none">
            <div
              className="whitespace-nowrap text-[#21313c]/10 font-bold uppercase tracking-widest"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {topTextContent.repeat(8)}
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex pl-6"
            style={{ gap: '24px' }}
          >
            {cards.map((card, index) => renderCard(card, index))}
          </div>

          {/* Bottom scrolling text placeholder */}
          <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none">
            <div
              className="whitespace-nowrap text-[#21313c]/10 font-bold uppercase tracking-widest"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {bottomTextContent.repeat(8)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{ height: isMobile ? 'auto' : '100vh', minHeight: isMobile ? '100vh' : 'auto' }}
    >
      {isMobile ? (
        // Mobile: Three rows layout
        <div className="py-8 space-y-4">
          {/* Row 1 */}
          <div className="overflow-hidden">
            <div ref={row1Ref} className="flex pl-4" style={{ gap: '12px' }}>
              {row1Cards.map((card, index) => renderCard(card, index))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden">
            <div ref={row2Ref} className="flex pl-4" style={{ gap: '12px' }}>
              {row2Cards.map((card, index) => renderCard(card, index + 3))}
            </div>
          </div>

          {/* Row 3 */}
          <div className="overflow-hidden">
            <div ref={row3Ref} className="flex pl-4" style={{ gap: '12px' }}>
              {row3Cards.map((card, index) => renderCard(card, index + 6))}
            </div>
          </div>
        </div>
      ) : (
        // Desktop: Single row layout with scrolling text
        <div className="h-full flex flex-col justify-center relative">
          {/* Top scrolling text */}
          <div className="absolute top-8 left-0 right-0 overflow-hidden pointer-events-none">
            <div
              ref={topTextRef}
              className="whitespace-nowrap text-[#21313c]/10 font-bold uppercase tracking-widest"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {topTextContent.repeat(8)}
            </div>
          </div>

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            className="flex pl-6"
            style={{ gap: '24px' }}
          >
            {cards.map((card, index) => renderCard(card, index))}
          </div>

          {/* Bottom scrolling text */}
          <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none">
            <div
              ref={bottomTextRef}
              className="whitespace-nowrap text-[#21313c]/10 font-bold uppercase tracking-widest"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {bottomTextContent.repeat(8)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
