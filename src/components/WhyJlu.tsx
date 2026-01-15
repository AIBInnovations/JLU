import { useEffect, useRef } from 'react';
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

  const whyJluCards = [
    {
      bg: '#c3fd7a',
      title: 'Multiplicity',
      subtitle: '',
      description: 'Where ideas, cultures, and disciplines converge.',
      textColor: '#21313c'
    },
    {
      bg: '#4a90a4',
      title: 'Worldly Outlook',
      subtitle: '',
      description: 'An education shaped by global exposure and open horizons.',
      textColor: '#ffffff'
    },
    {
      bg: '#e85a71',
      title: 'A Lived Campus',
      subtitle: '',
      description: 'Spaces that invite learning, connection, and pause.',
      textColor: '#ffffff'
    },
    {
      bg: '#f4c950',
      title: 'Lasting Impressions',
      subtitle: '',
      description: 'Experiences that stay, long after you move on.',
      textColor: '#ffffff'
    }
  ];

  useEffect(() => {
    if (!wrapperRef.current || !whyJluRef.current) return;

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
  }, [isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: isMobile ? '150vh' : '160vh',
        background: 'transparent',
        overflow: 'hidden',
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
        <h1
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            color: '#000000',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          The JLU Experience
        </h1>
      </div>

      {/* Cards Container - Scrolls over */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '90vh' : '65vh',
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'center',
          zIndex: 20,
          background: isMobile
            ? 'linear-gradient(to bottom, transparent 0%, transparent 4%, #f6f7f0 4%)'
            : 'linear-gradient(to bottom, transparent 0%, transparent 36%, #f6f7f0 36%)',
          padding: isMobile ? '0 8px' : '0 clamp(40px, 5vw, 80px)',
          paddingBottom: isMobile ? '40px' : '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: isMobile ? '6px' : 'clamp(8px, 1vw, 12px)',
            alignItems: isMobile ? 'flex-start' : 'center',
            background: 'transparent',
          }}
        >
          {whyJluCards.map((card, index) => (
            <div
              key={index}
              style={{
                background: card.bg,
                width: isMobile ? 'calc((100vw - 34px) / 4)' : 'clamp(280px, 24vw, 458px)',
                height: isMobile ? '180px' : 'clamp(280px, 24vw, 455px)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isMobile ? '10px' : 'clamp(20px, 2vw, 24px)',
                marginTop: isMobile
                  ? (index === 3 ? '60px' : (index === 0 || index === 2 ? '25px' : '0'))
                  : (index === 3 ? '200px' : (index === 0 || index === 2 ? '80px' : '0')),
                marginBottom: isMobile ? '0' : (index === 1 ? '80px' : '0'),
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: isMobile ? '0.7rem' : 'clamp(2rem, 4vw, 3rem)',
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
                        fontSize: isMobile ? '0.5rem' : 'clamp(1rem, 1.5vw, 1.25rem)',
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
                    fontSize: isMobile ? '0.5rem' : 'clamp(0.875rem, 1vw, 1rem)',
                    color: card.textColor,
                    marginBottom: '4px',
                    lineHeight: 1.3,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
