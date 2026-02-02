'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const RankingAndAwards = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const awards = [
    { image: '/aw1.jpg', title: 'QS Diamond Rating badge', year: '2022' },
    { image: '/aw3.jpg', title: 'QS Diamond Rating badge', year: '2019' },
    { image: '/aw2.jpg', title: 'QS Diamond Rating badge', year: '2025' },
    { image: '/aw4.jpg', title: 'QS Diamond Rating badge', year: '2024' },
    { image: '/aw5.jpg', title: 'QS Diamond Rating badge', year: '2023' },
  ];

  useEffect(() => {
    if (!wrapperRef.current || !headerRef.current || !textContentRef.current || !middleCardRef.current) return;

    const wrapper = wrapperRef.current;
    const headerSection = headerRef.current;
    const textContent = textContentRef.current;
    const middleCard = middleCardRef.current;

    const triggers: ScrollTrigger[] = [];

    // Small delay to ensure DOM is ready after mobile/desktop switch
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Pin "Ranking and Awards" text - it stays fixed while cards scroll over it
    const headerPin = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: headerSection,
      pinSpacing: false,
    });
    triggers.push(headerPin);

    // Fade out and blur the text content when middle card reaches it (stays in place, just fades with blur)
    const fadeOutAnimation = gsap.to(textContent, {
      opacity: 0,
      filter: 'blur(12px)',
      ease: 'none',
      scrollTrigger: {
        trigger: middleCard,
        start: 'top 60%',
        end: 'top 40%',
        scrub: true,
      },
    });
    if (fadeOutAnimation.scrollTrigger) {
      triggers.push(fadeOutAnimation.scrollTrigger);
    }

    // Cleanup
    return () => {
      clearTimeout(timeout);
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: isMobile ? '170vh' : '250vh',
        background: '#f6f7f0',
        overflow: 'hidden',
      }}
    >
      {/* Ranking and Awards - Pinned text */}
      <div
        ref={headerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          background: '#f6f7f0',
        }}
      >
        <div ref={textContentRef} style={{ filter: 'blur(0px)', textAlign: 'center', padding: '0 1rem' }}>
          <span
            style={{
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              display: 'block',
              fontSize: isMobile ? '10px' : '12px',
              marginBottom: isMobile ? '12px' : '16px',
            }}
          >
            Recognition
          </span>
          <h2
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              color: '#21313c',
              textAlign: 'center',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Ranking and{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              Awards
            </span>
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: isMobile ? '12px' : '15px',
              textAlign: 'center',
              marginTop: isMobile ? '16px' : '24px',
              maxWidth: isMobile ? '280px' : '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7,
            }}
          >
            JLU has received recognition across national and international platforms for academic quality, innovation and institutional growth.
          </p>
        </div>
      </div>

      {/* Cards Container - Scrolls over */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '70vh' : '120vh',
          left: 0,
          width: '100%',
          zIndex: 20,
          background: 'transparent',
        }}
      >
        {isMobile ? (
          /* Mobile: Simple 2-column grid layout */
          <div style={{ padding: '0 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {/* Row 1: Cards 1 & 2 */}
              {awards.slice(0, 2).map((award, index) => (
                <div key={index}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ color: '#21313c', fontSize: '11px', fontWeight: 500 }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#f0c14b', fontSize: '10px' }}>{award.year}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Card 3 centered */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }} ref={middleCardRef}>
              <div style={{ width: 'calc(50% - 6px)' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '12px',
                  }}
                >
                  <img
                    src={awards[2].image}
                    alt={awards[2].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <p style={{ color: '#21313c', fontSize: '11px', fontWeight: 500 }}>
                    {awards[2].title}
                  </p>
                  <p style={{ color: '#f0c14b', fontSize: '10px' }}>{awards[2].year}</p>
                </div>
              </div>
            </div>

            {/* Row 3: Cards 4 & 5 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {awards.slice(3, 5).map((award, index) => (
                <div key={index + 3}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ color: '#21313c', fontSize: '11px', fontWeight: 500 }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#f0c14b', fontSize: '10px' }}>{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Scattered positioning layout */
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1920/1558',
              background: 'transparent',
            }}
          >
            {/* Card 1 - Top Left */}
            <div
              style={{
                position: 'absolute',
                left: '15%',
                top: '5%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17.4vw, 333px)',
                  height: 'clamp(167px, 17.5vw, 335px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[0].image}
                  alt={awards[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#21313c', fontSize: 'clamp(11px, 0.9vw, 14px)', fontWeight: 500 }}>
                  {awards[0].title}
                </p>
                <p style={{ color: '#f0c14b', fontSize: 'clamp(10px, 0.8vw, 12px)' }}>{awards[0].year}</p>
              </div>
            </div>

            {/* Card 2 - Top Right */}
            <div
              style={{
                position: 'absolute',
                right: '15%',
                top: '8%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17.4vw, 333px)',
                  height: 'clamp(167px, 17.5vw, 335px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[1].image}
                  alt={awards[1].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#21313c', fontSize: 'clamp(11px, 0.9vw, 14px)', fontWeight: 500 }}>
                  {awards[1].title}
                </p>
                <p style={{ color: '#f0c14b', fontSize: 'clamp(10px, 0.8vw, 12px)' }}>{awards[1].year}</p>
              </div>
            </div>

            {/* Card 3 - Middle Center */}
            <div
              ref={middleCardRef}
              style={{
                position: 'absolute',
                left: '50%',
                top: '28%',
                transform: 'translateX(-50%)',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17.4vw, 333px)',
                  height: 'clamp(167px, 17.5vw, 335px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[2].image}
                  alt={awards[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#21313c', fontSize: 'clamp(11px, 0.9vw, 14px)', fontWeight: 500 }}>
                  {awards[2].title}
                </p>
                <p style={{ color: '#f0c14b', fontSize: 'clamp(10px, 0.8vw, 12px)' }}>{awards[2].year}</p>
              </div>
            </div>

            {/* Card 4 - Bottom Left */}
            <div
              style={{
                position: 'absolute',
                left: '12%',
                top: '52%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17.4vw, 333px)',
                  height: 'clamp(167px, 17.5vw, 335px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[3].image}
                  alt={awards[3].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#21313c', fontSize: 'clamp(11px, 0.9vw, 14px)', fontWeight: 500 }}>
                  {awards[3].title}
                </p>
                <p style={{ color: '#f0c14b', fontSize: 'clamp(10px, 0.8vw, 12px)' }}>{awards[3].year}</p>
              </div>
            </div>

            {/* Card 5 - Bottom Right */}
            <div
              style={{
                position: 'absolute',
                right: '18%',
                top: '55%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17.4vw, 333px)',
                  height: 'clamp(167px, 17.5vw, 335px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[4].image}
                  alt={awards[4].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#21313c', fontSize: 'clamp(11px, 0.9vw, 14px)', fontWeight: 500 }}>
                  {awards[4].title}
                </p>
                <p style={{ color: '#f0c14b', fontSize: 'clamp(10px, 0.8vw, 12px)' }}>{awards[4].year}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { RankingAndAwards };
export default RankingAndAwards;
