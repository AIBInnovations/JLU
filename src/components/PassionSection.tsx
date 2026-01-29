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
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const isMobile = useIsMobile();

  // Section data with full video playback (all use same video file)
  const sections = [
    {
      image: '/passion.jpg',
      video: '/p.mp4',
      primary: 'PASSION',
      secondary: ['STUDY', 'SUCCESS'],
    },
    {
      image: '/study.jpg',
      video: '/p.mp4',
      primary: 'STUDY',
      secondary: ['SUCCESS', 'PASSION'],
    },
    {
      image: '/success.jpg',
      video: '/p.mp4',
      primary: 'SUCCESS',
      secondary: ['STUDY', 'PASSION'],
    },
  ];

  useEffect(() => {
    // Ensure refs are available
    if (!wrapperRef.current || panelsRef.current.length === 0) return;

    const panels = panelsRef.current.filter(Boolean);
    const videos = videoRefs.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];
    const cleanupFunctions: (() => void)[] = [];

    // Force load all videos
    videos.forEach((video) => {
      if (video) {
        video.load();
      }
    });

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Create scroll-controlled video animation for each panel
    panels.forEach((panel, index) => {
      const video = videos[index];

      if (!video) return;

      // Video setup
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      // Wait for video metadata
      const handleMetadata = () => {
        console.log(`Video ${index} metadata loaded, duration: ${video.duration}s`);

        // Initialize video
        video.currentTime = 0;
        video.pause();

        let isScrolling = false;
        let scrollTimeout: number | null = null;
        let rafId: number | null = null;

        // Auto-play when not scrolling
        const autoPlay = () => {
          if (!isScrolling && video.paused) {
            video.playbackRate = 1.0;
            video.play().catch(() => {});
          }
          rafId = requestAnimationFrame(autoPlay);
        };

        // Start auto-play loop
        rafId = requestAnimationFrame(autoPlay);

        // GSAP scroll animation
        const videoAnimation = gsap.to(video, {
          currentTime: video.duration,
          duration: 1,
          ease: 'none',
          paused: true,
        });

        // ScrollTrigger for scroll control
        const videoTrigger = ScrollTrigger.create({
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          animation: videoAnimation,
          onUpdate: () => {
            // Pause video during scrolling
            if (!video.paused) {
              video.pause();
            }

            isScrolling = true;

            // Reset timeout
            if (scrollTimeout) {
              clearTimeout(scrollTimeout);
            }

            // Mark as not scrolling after delay
            scrollTimeout = window.setTimeout(() => {
              isScrolling = false;
            }, 150);
          },
        });

        triggers.push(videoTrigger);

        // Cleanup function
        const cleanup = () => {
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
          }
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          videoAnimation.kill();
          video.pause();
        };

        cleanupFunctions.push(cleanup);
      };

      // Load metadata
      if (video.readyState >= 1) {
        // Metadata already loaded
        handleMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleMetadata, { once: true });
      }

      // Pin each panel except the last one
      if (index < panels.length - 1) {
        const pinTrigger = ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        triggers.push(pinTrigger);
      }
    });

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      cleanupFunctions.forEach((cleanup) => cleanup());
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  // Helper to add panel refs
  const addPanelRef = (el: HTMLDivElement | null, index: number) => {
    if (el) panelsRef.current[index] = el;
  };

  // Helper to add video refs
  const addVideoRef = (el: HTMLVideoElement | null, index: number) => {
    if (el) videoRefs.current[index] = el;
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
          marginTop: isMobile ? '-20vh' : '0',
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
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
            }}
          >
            {/* Background Video - cinematic scroll-controlled */}
            <video
              ref={(el) => addVideoRef(el, index)}
              src={section.video}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: 'scale(1.25)',
                minWidth: '100%',
                minHeight: '100%',
                willChange: 'transform',
              }}
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              disablePictureInPicture
              disableRemotePlayback
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
                    fontWeight: 300,
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
                      fontWeight: 300,
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
