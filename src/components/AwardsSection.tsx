'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const AwardsSection = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  // Wait for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const awards = [
    {
      image: '/aw1.jpg',
      title: 'IRM International Affiliation — First in Central India',
      description: 'Jagran Lakecity University has become the first university in Central India to be awarded the Certificate of International Affiliation by the Institute of Risk Management (IRM) India Affiliate. This landmark collaboration integrates IRM\'s globally recognised Enterprise Risk Management (ERM) qualifications into the university\'s curriculum.',
      year: '2025',
    },
    {
      image: '/aw3.jpg',
      title: '4th in MP, 53rd in India — India Today Rankings',
      description: 'Jagran Lakecity University has secured the 4th position in Madhya Pradesh and 53rd position in India in the India Today Best University Rankings 2025. The Faculty of Media & Social Sciences was ranked 18th in India Overall and the Faculty of Law ranked 39th in India.',
      year: '2025',
    },
    {
      image: '/aw2.jpg',
      title: 'No. 1 Private Multidisciplinary University — Education World',
      description: 'Jagran Lakecity University, Bhopal has been ranked No. 1 in the Education World India Higher Education Rankings 2025-26 in India under the category Private Multidisciplinary Universities.',
      year: '2025-26',
    },
    {
      image: '/aw4.jpg',
      title: 'MP Excellence Award Sponsor',
      description: 'Jagran Lakecity University was the proud sponsor for the MP Excellence Award 2025 held on 26th October, 2025 at Minto Hall, Bhopal, to honor individuals and groups for their achievements in various fields.',
      year: '2025',
    },
    {
      image: '/aw5.jpg',
      title: 'FICCI Higher Education Summit — Key Speaker',
      description: 'Shri Abhishek Mohan Gupta, Pro-Chancellor, Jagran Lakecity University, was invited as a Key Speaker at the 20th FICCI Higher Education Summit 2025, held on October 6–7, 2025, in New Delhi. He shared valuable insights on shaping globally competitive universities.',
      year: '2025',
    },
  ];

  useEffect(() => {
    if (!mounted) return;
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

    // Pin "AWARDS AND ACHIEVEMENTS" text - it stays fixed while cards scroll over it
    const headerPin = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: headerSection,
      pinSpacing: false,
      anticipatePin: 1,
    });
    triggers.push(headerPin);

    // Fade out only the text content when middle card reaches it (stays in place, just fades)
    const fadeOutAnimation = gsap.to(textContent, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: middleCard,
        start: 'top 60%',
        end: 'top 40%',
        scrub: 1,
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
  }, [mounted, isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: isMobile ? '170vh' : '250vh',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* AWARDS AND ACHIEVEMENTS - Pinned text */}
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
        <div ref={textContentRef}>
          <p
            style={{
              color: '#999',
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: isMobile ? '0.75rem' : '1rem',
            }}
          >
            RECOGNITION
          </p>
          <h2
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 600,
              color: '#21313c',
              textAlign: 'center',
              lineHeight: 1,
              padding: '0 1rem',
            }}
          >
            Awards & Achievements
          </h2>
          <p
            style={{
              color: '#666',
              fontSize: isMobile ? '0.75rem' : 'clamp(0.75rem, 1vw, 1rem)',
              textAlign: 'center',
              marginTop: isMobile ? '1rem' : '2rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: isMobile ? '18rem' : '28rem',
              padding: '0 1rem',
              lineHeight: 1.7,
            }}
          >
            Jagran Lakecity University continues to earn accolades across national and international platforms.{' '}
            <span style={{ color: '#8bc34a' }}>Recognized globally.</span>
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
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
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
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#8bc34a', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                      {award.description.length > 120 ? award.description.substring(0, 120) + '...' : award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Card 3 centered */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} ref={middleCardRef}>
              <div style={{ width: 'calc(50% - 8px)' }}>
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
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <p style={{ color: '#8bc34a', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{awards[2].year}</p>
                  <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                    {awards[2].title}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                    {awards[2].description.length > 120 ? awards[2].description.substring(0, 120) + '...' : awards[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3: Cards 4 & 5 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#8bc34a', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                      {award.description.length > 120 ? award.description.substring(0, 120) + '...' : award.description}
                    </p>
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
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[0].image}
                  alt={awards[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#8bc34a', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[0].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[0].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[0].description}
                </p>
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
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[1].image}
                  alt={awards[1].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#8bc34a', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[1].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[1].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[1].description}
                </p>
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
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[2].image}
                  alt={awards[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#8bc34a', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[2].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[2].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[2].description}
                </p>
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
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[3].image}
                  alt={awards[3].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#8bc34a', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[3].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[3].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[3].description}
                </p>
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
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[4].image}
                  alt={awards[4].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#8bc34a', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[4].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[4].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[4].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
