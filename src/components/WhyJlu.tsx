'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Scattered background images — randomly placed behind the pinned text
const bgImages = [
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a1.webp', top: '8%', left: '5%', width: 130, rotate: -8 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev2.webp', top: '15%', left: '78%', width: 140, rotate: 6 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/learning-phd.webp', top: '55%', left: '8%', width: 120, rotate: 4 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-insta2.webp', top: '62%', left: '82%', width: 135, rotate: -5 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/posthero1.webp', top: '30%', left: '88%', width: 110, rotate: 10 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/e3.webp', top: '72%', left: '25%', width: 115, rotate: -12 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/student-clubs.webp', top: '10%', left: '40%', width: 105, rotate: 3 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni1.webp', top: '75%', left: '60%', width: 125, rotate: -7 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/5th.webp', top: '38%', left: '2%', width: 120, rotate: 8 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/success.webp', top: '45%', left: '72%', width: 110, rotate: -4 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/comm.webp', top: '20%', left: '22%', width: 100, rotate: 6 },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev4.webp', top: '80%', left: '45%', width: 115, rotate: -9 },
];

export const WhyJlu = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const whyJluRef = useRef<HTMLDivElement>(null);
  const bgImagesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const whyJluCards = [
    {
      bg: '#c3fd7a',
      title: 'Global Network',
      subtitle: '',
      description: '45+ international collaborations across 14 countries with universities like Cambridge, UCL, RMIT & more.',
      textColor: '#21313c',
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/glob.webp',
      href: '/why-jlu/global-network',
      pillarIcon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/4.webp',
    },
    {
      bg: '#027ea1',
      title: 'Industry Intervention',
      subtitle: '',
      description: '42+ industry tie-ups with EY, KPMG, Deloitte, Amazon & TCS powering real-world placements.',
      textColor: '#ffffff',
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ex1.webp',
      href: '/why-jlu/industry-intervention',
      pillarIcon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/5.webp',
    },
    {
      bg: '#e85a71',
      title: 'Interdisciplinary Degrees',
      subtitle: '',
      description: '50+ programs across 6 faculties blending law, tech, design, media & management.',
      textColor: '#ffffff',
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev3.webp',
      href: '/why-jlu/interdisciplinary-degrees',
      pillarIcon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/1.webp',
    },
    {
      bg: '#f4c950',
      title: 'Student Approach',
      subtitle: '',
      description: 'Experiential learning with 1-on-1 mentoring, 45+ labs & hands-on projects from day one.',
      textColor: '#21313c',
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/comm.webp',
      href: '/why-jlu/student-approach',
      pillarIcon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/3.webp',
    }
  ];

  // Split cards into two rows for mobile (2 cards each)
  const row1Cards = whyJluCards.slice(0, 2);
  const row2Cards = whyJluCards.slice(2, 4);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !whyJluRef.current) return;

    const wrapper = wrapperRef.current;
    const whyJluSection = whyJluRef.current;

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const whyJluPin = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: whyJluSection,
      pinSpacing: false,
    });

    // Mobile: skip the scroll-tied CSS filter:blur — it's the single most
    // expensive thing this section does on a phone GPU and would tank the
    // pinned scroll experience. Desktop keeps the blur transition.
    const bgImagesEl = bgImagesRef.current;
    let blurTrigger: ScrollTrigger | undefined;
    if (bgImagesEl && !isMobile) {
      blurTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: '20% top',
        end: '60% top',
        onUpdate: (self) => {
          const progress = Math.min(self.progress * 1.5, 1);
          const blur = progress * 20;
          const opacity = 1 - progress * 0.6;
          bgImagesEl.style.filter = `blur(${blur}px)`;
          bgImagesEl.style.opacity = `${opacity}`;
        },
      });
    }

    return () => {
      clearTimeout(timeout);
      whyJluPin.kill();
      if (blurTrigger) blurTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      ScrollTrigger.refresh();
    };
  }, [isMobile, mounted]);

  const renderCard = (card: typeof whyJluCards[0], index: number, originalIndex: number) => (
    <a
      key={originalIndex}
      href={card.href}
      style={{
        position: 'relative',
        width: mounted && isMobile ? 'calc(50% - 6px)' : undefined,
        flexGrow: mounted && isMobile ? 0 : 1,
        flexShrink: 0,
        flexBasis: mounted && isMobile ? 'auto' : 0,
        height: mounted && isMobile ? '260px' : 'auto',
        aspectRatio: mounted && isMobile ? undefined : '1 / 1',
        maxWidth: mounted && isMobile ? undefined : '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: mounted && isMobile ? '14px' : 'clamp(20px, 2vw, 24px)',
        marginTop: mounted && isMobile
          ? (index === 1 ? '24px' : '0')
          : (originalIndex === 3 ? '200px' : (originalIndex === 0 || originalIndex === 2 ? '80px' : '0')),
        marginBottom: mounted && isMobile
          ? (index === 0 ? '24px' : '0')
          : (originalIndex === 1 ? '80px' : '0'),
        borderRadius: mounted && isMobile ? '12px' : '16px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'visible',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Colored background with pillar icon */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: card.bg,
        borderRadius: mounted && isMobile ? '12px' : '16px',
      }} />

      {/* Pillar icon as background watermark */}
      {card.pillarIcon && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: mounted && isMobile ? 'translate(-50%, -65%)' : 'translate(-50%, -55%)',
          zIndex: 1,
          opacity: 1,
        }}>
          <img
            loading="lazy" decoding="async" src={card.pillarIcon}
            alt=""
            style={{
              width: mounted && isMobile ? '150px' : '320px',
              maxWidth: 'none',
              height: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
      )}

      {/* Text content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize: mounted && isMobile ? '0.7rem' : 'clamp(0.7rem, 0.85vw, 0.8rem)',
            color: card.textColor,
            marginBottom: mounted && isMobile ? '6px' : '8px',
            lineHeight: 1.4,
            opacity: 0.7,
          }}
        >
          {card.description}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: mounted && isMobile ? '0.75rem' : 'clamp(0.7rem, 0.85vw, 0.8rem)',
            color: card.textColor,
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          <span>Explore</span>
          <span>→</span>
        </div>
      </div>
    </a>
  );

  // Prevent hydration mismatch - render desktop version until mounted
  const shouldUseMobileLayout = mounted && isMobile;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: shouldUseMobileLayout ? 'auto' : '140vh',
        minHeight: '100vh',
        background: 'transparent',
        overflow: 'hidden',
        paddingBottom: shouldUseMobileLayout ? '40px' : '0',
      }}
    >
      {/* WHY JLU? - Pinned text */}
      <div
        ref={whyJluRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          background: '#f6f7f0',
        }}
      >
        {/* Scattered background images */}
        {(
          <div
            ref={bgImagesRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
              transition: 'filter 0.1s linear, opacity 0.1s linear',
            }}
          >
            {bgImages.map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: img.top,
                  left: img.left,
                  width: shouldUseMobileLayout ? img.width * 0.55 : img.width,
                  transform: `rotate(${img.rotate}deg)`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  background: '#fff',
                  padding: '4px',
                }}
              >
                <img
                  src={img.src}
                  alt=""
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    borderRadius: '7px',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '0 1rem', position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontSize: shouldUseMobileLayout ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2.25rem, 4vw, 3rem)',
              fontWeight: 600,
              color: '#000000',
              lineHeight: 1.1,
            }}
          >
            Pillars of{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>JLU</span>
          </h1>
        </div>
      </div>

      {/* Cards Container */}
      {shouldUseMobileLayout ? (
        // Mobile: Two rows of 2 cards
        <div
          style={{
            position: 'relative',
            marginTop: '100vh',
            width: '100%',
            zIndex: 20,
            background: 'linear-gradient(to bottom, transparent 10%, #f6f7f0 12%)',
            padding: '20px 12px',
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {row1Cards.map((card, index) => renderCard(card, index, index))}
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              marginTop: '12px',
              alignItems: 'flex-start',
            }}
          >
            {row2Cards.map((card, index) => renderCard(card, index, index + 2))}
          </div>
        </div>
      ) : (
        // Desktop: Single row with staggered heights
        <div
          style={{
            position: 'absolute',
            top: '60vh',
            left: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            background: 'linear-gradient(to bottom, transparent 0%, transparent 36%, #f6f7f0 36%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 'clamp(8px, 1vw, 12px)',
              alignItems: 'center',
              background: 'transparent',
              paddingLeft: 'clamp(8px, 1vw, 12px)',
              paddingRight: 'clamp(8px, 1vw, 12px)',
              paddingBottom: '120px',
            }}
          >
            {whyJluCards.map((card, index) => renderCard(card, index, index))}
          </div>
        </div>
      )}
    </div>
  );
};
