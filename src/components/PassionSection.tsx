import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const PassionSection = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();

  // Section data
  const sections = [
    {
      image: '/passion.jpg',
      primary: 'PASSION',
      secondary: ['STUDY', 'SUCCESS'],
    },
    {
      image: '/study.jpg',
      primary: 'STUDY',
      secondary: ['SUCCESS', 'PASSION'],
    },
    {
      image: '/success.jpg',
      primary: 'SUCCESS',
      secondary: ['STUDY', 'PASSION'],
    },
  ];

  useEffect(() => {
    // Ensure refs are available
    if (!wrapperRef.current || panelsRef.current.length === 0) return;

    const panels = panelsRef.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];

    // Small delay to ensure DOM is ready after mobile/desktop switch
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Create pinning effect for each panel except the last one
    // Each panel pins in place while the next one scrolls over it
    panels.forEach((panel, index) => {
      // Don't pin the last panel - it just scrolls naturally
      if (index === panels.length - 1) return;

      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        // Pin until the next panel fully covers this one
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      triggers.push(trigger);
    });

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  // Helper to add panel refs
  const addPanelRef = (el: HTMLDivElement | null, index: number) => {
    if (el) panelsRef.current[index] = el;
  };

  return (
    <>
      {/*
        ============================================
        PASSION SECTION - Sticky Overlap Effect
        ============================================

        Structure:
        - Wrapper contains all 3 panels (PASSION, STUDY, SUCCESS)
        - Each panel is 100vh tall and full-width
        - First two panels pin in place while the next scrolls over
        - Creates a "stacked cards" effect

        Z-Index Strategy:
        - Earlier panels have lower z-index (10, 11, 12)
        - This allows later panels to naturally overlap earlier ones

        ScrollTrigger Config:
        - pin: true - pins the panel to viewport
        - pinSpacing: false - prevents extra scroll space
        - scrub: true - smooth animation tied to scroll
      */}
      <div
        ref={wrapperRef}
        className="relative"
        style={{
          height: `${sections.length * 100}vh`,
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => addPanelRef(el, index)}
            className="absolute w-full h-screen top-0 left-0 overflow-hidden"
            style={{
              top: `${index * 100}vh`,
              zIndex: 10 + index,
            }}
          >
            {/* Background Image with subtle scale animation potential */}
            <img
              src={section.image}
              alt={section.primary}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Text Content - Centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                {/* Primary heading - solid filled text */}
                <h2
                  className="text-white"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: isMobile ? 'clamp(48px, 12vw, 80px)' : 'clamp(80px, 10vw, 145px)',
                    fontWeight: 400,
                    lineHeight: '130%',
                    letterSpacing: isMobile ? '2px' : '3px',
                    textAlign: 'center',
                  }}
                >
                  {section.primary}
                </h2>

                {/* Secondary text - outline only (no fill) */}
                {section.secondary.map((text, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: isMobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(60px, 8vw, 120px)',
                      fontWeight: 400,
                      lineHeight: '130%',
                      letterSpacing: isMobile ? '2px' : '3px',
                      textAlign: 'center',
                      color: 'transparent',
                      WebkitTextStroke: isMobile ? '2px rgba(255,255,255,0.6)' : '4px rgba(255,255,255,0.6)',
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
