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
      image: '/a1.jpeg',
      title: '4th in MP, 53rd in India — India Today Rankings 2025',
      description: 'Jagran Lakecity University has secured the 4th position in Madhya Pradesh and 53rd position in India in the India Today Best University Rankings 2025. This achievement reflects our continued commitment to academic excellence, innovative teaching practices, and holistic student development.',
      year: '2025',
    },
    {
      image: '/a2.jpeg',
      title: 'Top Rankings — The Week & India Today 2025',
      description: 'The Faculty of Media & Social Sciences was ranked 18th in India Overall (Govt + Private) and 14th among Private Institutions by The Week 2025, and 15th among Private Institutions by India Today 2025 and the top 10 highest scoring Institutions (Established after 2000). The Faculty of Law ranked 39th in India (Govt + Private Law Colleges) and 30th amongst Private Law Colleges by The Week 2025. These rankings are more than numbers \u2014 they\'re milestones in a journey built on passion, purpose, and perseverance.',
      year: '2025',
    },
    {
      image: '/a3.jpeg',
      title: 'No. 1 Private Multidisciplinary University — Education World',
      description: 'Jagran Lakecity University, Bhopal has been ranked No. 1 in the Education World India Higher Education Rankings 2025-26 in India under the category Private Multidisciplinary Universities.',
      year: '2025-26',
    },
    {
      image: '/a4.jpeg',
      title: 'FICCI Higher Education Summit 2025 — Key Speaker',
      description: 'Mr. Abhishek Mohan Gupta, Pro Chancellor, Jagran Lakecity University, was invited as a Key Speaker at the 20th FICCI Higher Education Summit 2025, held on October 6\u20137, 2025, in New Delhi. He shared valuable insights on shaping globally competitive universities and creating impactful learning ecosystems.',
      year: '2025',
    },
    {
      image: '/a5.jpeg',
      title: 'IRM International Affiliation — First in Central India',
      description: 'Jagran Lakecity University has become the first university in Central India to be awarded the Certificate of International Affiliation by the Institute of Risk Management (IRM) India Affiliate. This landmark collaboration integrates IRM\'s globally recognised Enterprise Risk Management (ERM) qualifications into the university\'s curriculum, empowering students with the foresight, strategic thinking, and resilience required to navigate an increasingly complex and uncertain world.',
      year: '2025',
    },
    {
      image: '/a6.jpeg',
      title: 'MP Excellence Award 2025 — Proud Sponsor',
      description: 'Jagran Lakecity University was the proud sponsor for the MP Excellence Award 2025 held on 26th October, 2025 at Minto Hall, Bhopal, to honor individuals and groups for their achievements in various fields.',
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      ScrollTrigger.refresh();
    };
  }, [mounted, isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: isMobile ? '220vh' : '300vh',
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
        <div ref={textContentRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Circular rotating marquee text */}
          <div
            style={{
              position: 'absolute',
              width: isMobile ? '400px' : '750px',
              height: isMobile ? '400px' : '750px',
              animation: 'awards-spin 25s linear infinite',
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%' }}>
              <defs>
                <path
                  id="awardsCircle"
                  d="M 250,250 m -200,0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0"
                />
              </defs>
              <text
                style={{
                  fontSize: '22px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fill: '#21313c',
                  opacity: 0.08,
                  fontWeight: 600,
                }}
              >
                <textPath href="#awardsCircle">
                  AWARDS &amp; ACHIEVEMENTS • RECOGNITION • EXCELLENCE • AWARDS &amp; ACHIEVEMENTS • RECOGNITION • EXCELLENCE •
                </textPath>
              </text>
            </svg>
          </div>
          <style jsx>{`
            @keyframes awards-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                color: '#999',
                fontSize: isMobile ? '1rem' : '1.15rem',
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
                fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
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
                fontSize: isMobile ? '0.95rem' : 'clamp(0.95rem, 1.1vw, 1.15rem)',
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
              <span style={{ color: '#027ea1' }}>Recognized globally.</span>
            </p>
          </div>
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
          /* Mobile: 2 columns, 3 rows */
          <div style={{ padding: '0 16px' }}>
            {[0, 2, 4].map((startIdx, rowIdx) => (
              <div
                key={rowIdx}
                ref={rowIdx === 1 ? middleCardRef : undefined}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}
              >
                {awards.slice(startIdx, startIdx + 2).map((award, index) => (
                  <div key={startIdx + index}>
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
                      <p style={{ color: '#027ea1', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                      <p style={{ color: '#21313c', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                        {award.title}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.75rem', lineHeight: 1.5 }}>
                        {award.description.length > 160 ? award.description.substring(0, 160) + '...' : award.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: 3 columns, 2 rows — cards with most text in the middle */
          <div
            style={{
              padding: '0 4%',
            }}
          >
            {/* Row 1: a1 (left), a2 (middle - most text), a3 (right) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 'clamp(24px, 3vw, 48px)',
                marginBottom: 'clamp(40px, 5vw, 80px)',
                alignItems: 'start',
              }}
            >
              {[awards[0], awards[1], awards[2]].map((award, index) => (
                <div key={index} ref={index === 1 ? middleCardRef : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '16px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                    />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center', width: '100%' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: 'clamp(0.8rem, 0.95vw, 1rem)', lineHeight: 1.7 }}>
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: a6 (left - short text), a5 (middle - most text), a4 (right) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 'clamp(24px, 3vw, 48px)',
                alignItems: 'start',
              }}
            >
              {[awards[5], awards[4], awards[3]].map((award, index) => (
                <div key={index + 3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '16px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                    />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center', width: '100%' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: 'clamp(0.8rem, 0.95vw, 1rem)', lineHeight: 1.7 }}>
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
