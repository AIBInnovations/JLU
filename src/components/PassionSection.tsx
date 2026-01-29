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

    // One-time user interaction handler to enable autoplay
    let hasInteracted = false;
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        // Try to play the first video on first user interaction
        const firstVideo = videos[0];
        if (firstVideo && firstVideo.paused) {
          firstVideo.playbackRate = 1.0;
          firstVideo.play().catch(() => {});
        }
        // Remove listeners after first interaction
        window.removeEventListener('scroll', handleFirstInteraction);
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    // Small delay to ensure DOM is ready after mobile/desktop switch
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Create cinematic scroll-controlled video animation for each panel
    panels.forEach((panel, index) => {
      const video = videos[index];

      // Set up cinematic video scroll control with smooth inertia
      if (video) {
        // Ensure video is loaded and ready
        video.preload = 'auto';
        video.pause();

        // Wait for video metadata to load
        const handleMetadata = () => {
          // Initialize video to start
          video.currentTime = 0;

          // Add listener to loop video when it ends
          const handleTimeUpdate = () => {
            if (video.currentTime >= video.duration - 0.1) {
              video.currentTime = 0;
            }
          };
          video.addEventListener('timeupdate', handleTimeUpdate);

          let lastScrollTime = Date.now() - 200; // Start 200ms in past so playback starts immediately
          let scrollDirection = 1; // 1 for forward, -1 for backward
          let isScrolling = false;
          let rafId: number | null = null;
          let lastProgress = 0;
          let lastUpdateTime = 0;

          // Playback control loop
          const updatePlayback = () => {
            const now = Date.now();
            const timeSinceLastScroll = now - lastScrollTime;
            const timeSinceLastUpdate = now - lastUpdateTime;

            // Detect if stopped scrolling
            if (timeSinceLastScroll > 150) {
              isScrolling = false;
            }

            // Play regardless of viewport position, but only when not actively scrolling
            if (!isScrolling) {
              // Not scrolling: play automatically
              if (scrollDirection === -1) {
                // Backward playback (manual control)
                if (timeSinceLastUpdate > 33) {
                  video.pause();
                  const speed = 1 / 30; // 1x speed at 30fps
                  const newTime = video.currentTime - speed;
                  video.currentTime = Math.max(0, Math.min(video.duration, newTime));
                  lastUpdateTime = now;

                  // Stop if reached start
                  if (video.currentTime <= 0) {
                    video.currentTime = 0;
                  }
                }
              } else {
                // Forward playback (native) - start immediately when not scrolling
                if (video.paused) {
                  video.playbackRate = 1.0;
                  video.play().catch(() => {});
                } else if (Math.abs(video.playbackRate - 1.0) > 0.01) {
                  video.playbackRate = 1.0;
                }
              }
            } else if (isScrolling) {
              // During scrolling, let GSAP control the video but ensure it's paused
              // so GSAP can update currentTime smoothly
              if (!video.paused) {
                video.pause();
              }
            }

            // Continue loop
            rafId = requestAnimationFrame(updatePlayback);
          };

          // Start playback loop immediately
          rafId = requestAnimationFrame(updatePlayback);

          // For the first panel (index 0), start playing immediately
          if (index === 0) {
            setTimeout(() => {
              if (video.paused) {
                video.playbackRate = 1.0;
                video.play().catch((error) => {
                  console.log('Autoplay prevented, waiting for user interaction:', error);
                });
              }
            }, 100);
          }

          // Use GSAP to animate video currentTime based on scroll
          const videoAnimation = gsap.fromTo(video,
            {
              currentTime: 0,
            },
            {
              currentTime: video.duration,
              duration: 1,
              ease: 'none',
              paused: true,
            }
          );

          // Create ScrollTrigger with scrub for smooth video control
          const videoTrigger = ScrollTrigger.create({
            trigger: panel,
            start: 'top bottom+=300px', // Start 300px before panel reaches viewport
            end: 'bottom top',
            scrub: 0.1, // Minimal scrubbing for responsive control
            animation: videoAnimation,
            onEnter: () => {
              // Start playing when entering viewport
              isScrolling = false;
              lastScrollTime = Date.now() - 200;
              scrollDirection = 1;
              // Don't reset video position - preserve where user left off
            },
            onUpdate: (self) => {
              isScrolling = true;
              lastScrollTime = Date.now();

              const progressDelta = self.progress - lastProgress;

              // Determine scroll direction
              if (progressDelta > 0) {
                scrollDirection = 1; // Scrolling down/forward
              } else if (progressDelta < 0) {
                scrollDirection = -1; // Scrolling up/backward
              }

              lastProgress = self.progress;
            },
            onLeave: () => {
              scrollDirection = 1;
              isScrolling = false;
              lastScrollTime = Date.now();
            },
            onEnterBack: () => {
              scrollDirection = -1;
              isScrolling = false;
              lastScrollTime = Date.now();
            },
            onLeaveBack: () => {
              scrollDirection = -1;
              isScrolling = false;
              lastScrollTime = Date.now();
            },
          });

          triggers.push(videoTrigger);

          // Store cleanup function
          (videoTrigger as any).cleanup = () => {
            if (rafId !== null) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
            videoAnimation.kill();
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.pause();
          };
        };

        video.addEventListener('loadedmetadata', handleMetadata);
      }

      // Pin each panel except the last one for stacked card effect
      if (index === panels.length - 1) return;

      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true, // Better performance on fast scrolls
      });

      triggers.push(trigger);
    });

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      // Remove interaction listeners
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      // Cleanup triggers
      triggers.forEach((trigger) => {
        // Cancel animation frames and cleanup
        if ((trigger as any).cleanup) {
          (trigger as any).cleanup();
        }
        trigger.kill();
      });
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
