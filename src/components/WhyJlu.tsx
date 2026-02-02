'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const WhyJlu = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const whyJluRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const whyJluCards = [
    {
      bg: '#c3fd7a',
      title: 'Multiplicity',
      subtitle: '',
      description: 'Where ideas, cultures, and disciplines converge.',
      textColor: '#21313c',
      image: '/j1.jpg'
    },
    {
      bg: '#4a90a4',
      title: 'Worldly Outlook',
      subtitle: '',
      description: 'An education shaped by global exposure and open horizons.',
      textColor: '#ffffff',
      image: '/j2.jpg'
    },
    {
      bg: '#e85a71',
      title: 'A Lived Campus',
      subtitle: '',
      description: 'Spaces that invite learning, connection, and pause.',
      textColor: '#ffffff',
      image: '/j3.jpg'
    },
    {
      bg: '#f4c950',
      title: 'Lasting Impressions',
      subtitle: '',
      description: 'Experiences that stay, long after you move on.',
      textColor: '#ffffff',
      image: '/j4.jpg'
    }
  ];

  // Split cards into two rows for mobile (2 cards each)
  const row1Cards = whyJluCards.slice(0, 2);
  const row2Cards = whyJluCards.slice(2, 4);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !whyJluRef.current) return;

    const wrapper = wrapperRef.current;
    const whyJluSection = whyJluRef.current;

    // Small delay to ensure DOM is ready after mobile/desktop switch
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Pin "WHY JLU?" text - it stays fixed while cards scroll over it
    const whyJluPin = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: whyJluSection,
      pinSpacing: false,
    });

    // Cleanup
    return () => {
      clearTimeout(timeout);
      whyJluPin.kill();
      ScrollTrigger.refresh();
    };
  }, [isMobile, mounted]);

  const renderCard = (card: typeof whyJluCards[0], index: number, originalIndex: number) => (
    <div
      key={originalIndex}
      style={{
        background: card.bg,
        width: mounted && isMobile ? 'calc(50% - 6px)' : undefined,
        flexGrow: mounted && isMobile ? 0 : 1,
        flexShrink: 0,
        flexBasis: mounted && isMobile ? 'auto' : 0,
        height: mounted && isMobile ? '200px' : 'auto',
        aspectRatio: mounted && isMobile ? undefined : '1 / 1',
        maxWidth: mounted && isMobile ? undefined : '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: mounted && isMobile ? '12px' : 'clamp(20px, 2vw, 24px)',
        marginTop: mounted && isMobile
          ? (index === 1 ? '40px' : '0') // Second card in each row is pushed down
          : (originalIndex === 3 ? '200px' : (originalIndex === 0 || originalIndex === 2 ? '80px' : '0')),
        marginBottom: mounted && isMobile
          ? (index === 0 ? '40px' : '0') // First card has bottom margin to match second card's top margin
          : (originalIndex === 1 ? '80px' : '0'),
        borderRadius: mounted && isMobile ? '12px' : '16px',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: mounted && isMobile ? '1rem' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'bold',
              color: card.textColor,
              lineHeight: 1.2,
            }}
          >
            {card.title}
          </span>
          {card.subtitle && (
            <span
              style={{
                fontSize: mounted && isMobile ? '0.6rem' : 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 600,
                color: card.textColor,
              }}
            >
              {card.subtitle}
            </span>
          )}
        </div>
      </div>

      <div>
        <p
          style={{
            fontSize: mounted && isMobile ? '0.65rem' : 'clamp(0.875rem, 1vw, 1rem)',
            color: card.textColor,
            marginBottom: '4px',
            lineHeight: 1.3,
          }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );

  // Prevent hydration mismatch - render desktop version until mounted
  const shouldUseMobileLayout = mounted && isMobile;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: shouldUseMobileLayout ? 'auto' : '160vh',
        minHeight: shouldUseMobileLayout ? '100vh' : 'auto',
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
          background: shouldUseMobileLayout
            ? 'transparent'
            : '#f6f7f0',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 1rem' }}>
          <p
            style={{
              color: '#999',
              fontSize: shouldUseMobileLayout ? '0.65rem' : '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: shouldUseMobileLayout ? '0.75rem' : '1rem',
            }}
          >
            WHY CHOOSE US
          </p>
          <h1
            style={{
              fontSize: shouldUseMobileLayout ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 600,
              color: '#000000',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            The JLU{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Experience</span>
          </h1>
        </div>
      </div>

      {/* Cards Container */}
      {shouldUseMobileLayout ? (
        // Mobile: Two rows of 2 cards
        <div
          style={{
            position: 'relative',
            marginTop: '60vh',
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
            top: '65vh',
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
            }}
          >
            {whyJluCards.map((card, index) => renderCard(card, index, index))}
          </div>
        </div>
      )}
    </div>
  );
};
