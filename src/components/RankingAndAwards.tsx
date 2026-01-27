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

    // Fade out only the text content when middle card reaches it (stays in place, just fades)
    const fadeOutAnimation = gsap.to(textContent, {
      opacity: 0,
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
        height: isMobile ? '200vh' : '250vh',
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
        <div ref={textContentRef}>
          <h2
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 'bold',
              color: '#21313c',
              textAlign: 'center',
              lineHeight: 1.1,
              padding: '0 1rem',
            }}
          >
            Ranking and Awards
          </h2>
          <p
            style={{
              color: '#21313c',
              fontSize: isMobile ? '0.75rem' : 'clamp(0.875rem, 1vw, 1.125rem)',
              textAlign: 'center',
              marginTop: isMobile ? '1rem' : '2rem',
              maxWidth: isMobile ? '18rem' : '48rem',
              padding: '0 1rem',
              lineHeight: 1.6,
            }}
          >
            JLU has received recognition across national and international platforms for academic quality, innovation and institutional growth. These acknowledgements reflect collective effort and shared purpose.
          </p>
        </div>
      </div>

      {/* Cards Container - Scrolls over with scattered positioning */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '100vh' : '120vh',
          left: 0,
          width: '100%',
          zIndex: 20,
          background: 'transparent',
        }}
      >
        {/* Scattered positioning - same layout for mobile and desktop */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: isMobile ? '390/600' : '1920/1558',
            background: 'transparent',
          }}
        >
          {/* Card 1 - Top Left */}
          <div
            style={{
              position: 'absolute',
              left: isMobile ? '8%' : '15%',
              top: isMobile ? '3%' : '5%',
            }}
          >
            <div
              style={{
                width: isMobile ? '80px' : 'clamp(166px, 17.4vw, 333px)',
                height: isMobile ? '80px' : 'clamp(167px, 17.5vw, 335px)',
                overflow: 'hidden',
              }}
            >
              <img
                src={awards[0].image}
                alt={awards[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: isMobile ? '4px' : '8px' }}>
              <p style={{ color: '#21313c', fontSize: isMobile ? '0.45rem' : 'clamp(0.7rem, 0.9vw, 0.875rem)', fontWeight: 500 }}>
                {awards[0].title}
              </p>
              <p style={{ color: '#8bc34a', fontSize: isMobile ? '0.4rem' : 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{awards[0].year}</p>
            </div>
          </div>

          {/* Card 2 - Top Right */}
          <div
            style={{
              position: 'absolute',
              right: isMobile ? '8%' : '15%',
              top: isMobile ? '6%' : '8%',
            }}
          >
            <div
              style={{
                width: isMobile ? '80px' : 'clamp(166px, 17.4vw, 333px)',
                height: isMobile ? '80px' : 'clamp(167px, 17.5vw, 335px)',
                overflow: 'hidden',
              }}
            >
              <img
                src={awards[1].image}
                alt={awards[1].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: isMobile ? '4px' : '8px' }}>
              <p style={{ color: '#21313c', fontSize: isMobile ? '0.45rem' : 'clamp(0.7rem, 0.9vw, 0.875rem)', fontWeight: 500 }}>
                {awards[1].title}
              </p>
              <p style={{ color: '#8bc34a', fontSize: isMobile ? '0.4rem' : 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{awards[1].year}</p>
            </div>
          </div>

          {/* Card 3 - Middle Center */}
          <div
            ref={middleCardRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '22%' : '28%',
              transform: 'translateX(-50%)',
            }}
          >
            <div
              style={{
                width: isMobile ? '80px' : 'clamp(166px, 17.4vw, 333px)',
                height: isMobile ? '80px' : 'clamp(167px, 17.5vw, 335px)',
                overflow: 'hidden',
              }}
            >
              <img
                src={awards[2].image}
                alt={awards[2].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: isMobile ? '4px' : '8px' }}>
              <p style={{ color: '#21313c', fontSize: isMobile ? '0.45rem' : 'clamp(0.7rem, 0.9vw, 0.875rem)', fontWeight: 500 }}>
                {awards[2].title}
              </p>
              <p style={{ color: '#8bc34a', fontSize: isMobile ? '0.4rem' : 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{awards[2].year}</p>
            </div>
          </div>

          {/* Card 4 - Bottom Left */}
          <div
            style={{
              position: 'absolute',
              left: isMobile ? '5%' : '12%',
              top: isMobile ? '42%' : '52%',
            }}
          >
            <div
              style={{
                width: isMobile ? '80px' : 'clamp(166px, 17.4vw, 333px)',
                height: isMobile ? '80px' : 'clamp(167px, 17.5vw, 335px)',
                overflow: 'hidden',
              }}
            >
              <img
                src={awards[3].image}
                alt={awards[3].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: isMobile ? '4px' : '8px' }}>
              <p style={{ color: '#21313c', fontSize: isMobile ? '0.45rem' : 'clamp(0.7rem, 0.9vw, 0.875rem)', fontWeight: 500 }}>
                {awards[3].title}
              </p>
              <p style={{ color: '#8bc34a', fontSize: isMobile ? '0.4rem' : 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{awards[3].year}</p>
            </div>
          </div>

          {/* Card 5 - Bottom Right */}
          <div
            style={{
              position: 'absolute',
              right: isMobile ? '10%' : '18%',
              top: isMobile ? '45%' : '55%',
            }}
          >
            <div
              style={{
                width: isMobile ? '80px' : 'clamp(166px, 17.4vw, 333px)',
                height: isMobile ? '80px' : 'clamp(167px, 17.5vw, 335px)',
                overflow: 'hidden',
              }}
            >
              <img
                src={awards[4].image}
                alt={awards[4].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: isMobile ? '4px' : '8px' }}>
              <p style={{ color: '#21313c', fontSize: isMobile ? '0.45rem' : 'clamp(0.7rem, 0.9vw, 0.875rem)', fontWeight: 500 }}>
                {awards[4].title}
              </p>
              <p style={{ color: '#8bc34a', fontSize: isMobile ? '0.4rem' : 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{awards[4].year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { RankingAndAwards };
export default RankingAndAwards;
