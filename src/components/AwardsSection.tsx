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
  const [selectedAward, setSelectedAward] = useState<{ image: string; title: string; description: string; year: string } | null>(null);
  const isMobile = useIsMobile();

  // Wait for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const awards = [
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a1.jpeg',
      title: '4th in MP, 53rd in India — India Today Rankings 2025',
      description: 'Jagran Lakecity University has secured the 4th position in Madhya Pradesh and 53rd position in India in the India Today Best University Rankings 2025. This achievement reflects our continued commitment to academic excellence, innovative teaching practices, and holistic student development.',
      year: '2025',
      center: true,
    },
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a2.jpeg',
      title: 'Top Rankings — The Week & India Today 2025',
      description: 'The Faculty of Media & Social Sciences was ranked 18th in India Overall (Govt + Private) and 14th among Private Institutions by The Week 2025, and 15th among Private Institutions by India Today 2025 and the top 10 highest scoring Institutions (Established after 2000). The Faculty of Law ranked 39th in India (Govt + Private Law Colleges) and 30th amongst Private Law Colleges by The Week 2025. These rankings are more than numbers \u2014 they\'re milestones in a journey built on passion, purpose, and perseverance.',
      year: '2025',
    },
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a3.jpeg',
      title: 'No. 1 Private Multidisciplinary University — Education World',
      description: 'Jagran Lakecity University, Bhopal has been ranked No. 1 in the Education World India Higher Education Rankings 2025-26 in India under the category Private Multidisciplinary Universities.',
      year: '2025-26',
    },
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a4.jpeg',
      title: 'FICCI Higher Education Summit 2025 — Key Speaker',
      description: 'Mr. Abhishek Mohan Gupta, Pro Chancellor, Jagran Lakecity University, was invited as a Key Speaker at the 20th FICCI Higher Education Summit 2025, held on October 6\u20137, 2025, in New Delhi. He shared valuable insights on shaping globally competitive universities and creating impactful learning ecosystems.',
      year: '2025',
    },
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a5.jpeg',
      title: 'IRM International Affiliation — First in Central India',
      description: 'Jagran Lakecity University has become the first university in Central India to be awarded the Certificate of International Affiliation by the Institute of Risk Management (IRM) India Affiliate. This landmark collaboration integrates IRM\'s globally recognised Enterprise Risk Management (ERM) qualifications into the university\'s curriculum, empowering students with the foresight, strategic thinking, and resilience required to navigate an increasingly complex and uncertain world.',
      year: '2025',
    },
    {
      image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a6.jpeg',
      title: 'MP Excellence Award 2025 — Proud Sponsor',
      description: 'Jagran Lakecity University was the proud sponsor for the MP Excellence Award 2025 held on 26th October, 2025 at Minto Hall, Bhopal, to honor individuals and groups for their achievements in various fields.',
      year: '2025',
      center: true,
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
                fontSize: isMobile ? '1.5rem' : '1.875rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: isMobile ? '0.75rem' : '1rem',
              }}
            >
              RECOGNITION
            </p>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl text-center"
              style={{ fontWeight: 600, lineHeight: 1.1, padding: '0 1rem' }}
            >
              Awards & Achievements
            </h1>
            <p
              style={{
                color: '#666',
                fontSize: isMobile ? '1rem' : 'clamp(1.15rem, 1.8vw, 1.5rem)',
                textAlign: 'center',
                marginTop: isMobile ? '1rem' : '2rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '1000px',
                padding: '0 1rem',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Jagran Lakecity University continues to earn accolades across national and international platforms. Recognized globally.
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
          /* Mobile: 2 columns staggered */
          <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {awards.map((award, index) => (
              <div
                key={index}
                ref={index === 2 ? middleCardRef : undefined}
                style={{ marginTop: index % 2 === 1 ? '40px' : '0' }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 2',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ marginTop: '10px', textAlign: award.center ? 'center' : 'left' }}>
                  <p style={{ color: '#027ea1', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                  <p style={{ color: '#21313c', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px' }}>
                    {award.title}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {award.description.substring(0, 70)}...
                  </p>
                  <button
                    onClick={() => setSelectedAward(award)}
                    style={{ color: '#027ea1', fontSize: '0.9rem', fontWeight: 600, marginTop: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Staggered layout with landscape cards centered */
          <div style={{ padding: '0 4%' }}>
            {/* Top group */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(30px, 3.5vw, 56px)', alignItems: 'start', marginBottom: 'clamp(30px, 4vw, 60px)' }}>
              {/* Left card - offset down */}
              {(() => { const award = awards[1]; return (
                <div ref={middleCardRef} style={{ marginTop: '60px' }}>
                  <div style={{ width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
              {/* Center - landscape card (a1) */}
              {(() => { const award = awards[0]; return (
                <div>
                  <div style={{ width: '100%', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
              {/* Right card - offset down more */}
              {(() => { const award = awards[2]; return (
                <div style={{ marginTop: '100px' }}>
                  <div style={{ width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
            </div>

            {/* Bottom group */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(30px, 3.5vw, 56px)', alignItems: 'start' }}>
              {/* Left card - offset down */}
              {(() => { const award = awards[3]; return (
                <div style={{ marginTop: '40px' }}>
                  <div style={{ width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
              {/* Center - landscape card (a6) */}
              {(() => { const award = awards[5]; return (
                <div>
                  <div style={{ width: '100%', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
              {/* Right card - offset down more */}
              {(() => { const award = awards[4]; return (
                <div style={{ marginTop: '80px' }}>
                  <div style={{ width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
                    <img src={award.image} alt={award.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p style={{ color: '#027ea1', fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: 'clamp(1.2rem, 1.5vw, 1.7rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{award.title}</p>
                    <p style={{ color: '#666', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.7 }}>{award.description.substring(0, 100)}...</p>
                    <button onClick={() => setSelectedAward(award)} style={{ color: '#027ea1', fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 600, marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Read More →</button>
                  </div>
                </div>
              ); })()}
            </div>
          </div>
        )}
      </div>

      {/* Award Detail Modal */}
      {selectedAward && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={() => setSelectedAward(null)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <div
            style={{
              position: 'relative',
              background: 'white',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '90%',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={selectedAward.image}
                alt={selectedAward.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#e8eae2' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <button
                onClick={() => setSelectedAward(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                ✕
              </button>
              <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                <span style={{ background: '#027ea1', color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.1em' }}>
                  {selectedAward.year}
                </span>
              </div>
            </div>
            {/* Modal Content */}
            <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>
              <h3 style={{ color: '#21313c', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '14px' }}>
                {selectedAward.title}
              </h3>
              <p style={{ color: '#666', fontSize: '1.15rem', lineHeight: 1.8 }}>
                {selectedAward.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
