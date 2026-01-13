import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const WhyJlu = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const whyJluRef = useRef<HTMLDivElement>(null);

  const whyJluCards = [
    {
      bg: '#c3fd7a',
      title: '100+',
      subtitle: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque dexjfdi kedj.',
      textColor: '#21313c'
    },
    {
      bg: '#4a90a4',
      title: 'Lorem ipsum',
      subtitle: '',
      description: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque',
      links: ['Lorem ipsum', 'Lorem ipsum'],
      textColor: '#ffffff'
    },
    {
      bg: '#e85a71',
      title: '100%',
      subtitle: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque dexjfdi kedj.',
      textColor: '#ffffff'
    },
    {
      bg: '#f4c950',
      title: 'Lorem ipsum',
      subtitle: '',
      description: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque dexjfdi kedj sit amet .',
      textColor: '#ffffff'
    }
  ];

  useEffect(() => {
    if (!wrapperRef.current || !whyJluRef.current) return;

    const wrapper = wrapperRef.current;
    const whyJluSection = whyJluRef.current;

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
      whyJluPin.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: '160vh',
        // Invisible wrapper - no background
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
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            color: '#000000',
            letterSpacing: '-0.02em',
          }}
        >
          WHY JLU?
        </h1>
      </div>

      {/* Cards Container - Scrolls over */}
      <div
        style={{
          position: 'absolute',
          top: '60vh',
          left: 0,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          // CRITICAL: Transparent background - only cards visible
          background: 'transparent',
          padding: '0 clamp(40px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 'clamp(8px, 1vw, 12px)',
            alignItems: 'center',
            // Transparent inner container
            background: 'transparent',
          }}
        >
          {whyJluCards.map((card, index) => (
            <div
              key={index}
              style={{
                // Card-specific background color - ONLY this is visible
                background: card.bg,
                width: 'clamp(280px, 24vw, 458px)',
                height: 'clamp(280px, 24vw, 455px)',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(20px, 2vw, 24px)',
                marginTop: index === 3 ? '200px' : (index === 0 || index === 2 ? '80px' : '0'),
                marginBottom: index === 1 ? '80px' : '0',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 'bold',
                      color: card.textColor,
                    }}
                  >
                    {card.title}
                  </span>
                  {card.subtitle && (
                    <span
                      style={{
                        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
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
                    fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                    color: card.textColor,
                    marginBottom: '8px',
                  }}
                >
                  {card.description}
                </p>
                {card.links && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {card.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href="#"
                        style={{
                          fontSize: '0.875rem',
                          color: card.textColor,
                          textDecoration: 'underline',
                        }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
