'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

// ============================================
// HERO COMPONENT
// ============================================
export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoButtonPos, setVideoButtonPos] = useState({ left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0 });
  const [expandingCard, setExpandingCard] = useState<number | null>(null);
  const [cardRect, setCardRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();


  // Refs for GSAP animation
  const backgroundRef = useRef<HTMLImageElement>(null);
  const buildingRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Track image loading state
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Parallax state for background
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Parallax speed - adjust this value to control the effect intensity
      const parallaxSpeed = 0.5;
      setParallaxOffset(scrollY * parallaxSpeed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wait for images to load before starting animation
  useEffect(() => {
    let count = 0;
    const totalImages = 2;

    const handleImageLoad = () => {
      count++;
      if (count === totalImages) {
        // Add a small delay to ensure everything is painted
        setTimeout(() => setImagesLoaded(true), 200);
      }
    };

    if (backgroundRef.current && buildingRef.current) {
      if (backgroundRef.current.complete) {
        handleImageLoad();
      } else {
        backgroundRef.current.addEventListener('load', handleImageLoad);
      }

      if (buildingRef.current.complete) {
        handleImageLoad();
      } else {
        buildingRef.current.addEventListener('load', handleImageLoad);
      }
    }

    return () => {
      if (backgroundRef.current) {
        backgroundRef.current.removeEventListener('load', handleImageLoad);
      }
      if (buildingRef.current) {
        buildingRef.current.removeEventListener('load', handleImageLoad);
      }
    };
  }, []);

  // GSAP Timeline Animation - only runs after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    // Set initial states immediately - both images start as a line in the middle
    // On mobile, building is 65% height at bottom, so adjust its clipPath to match background's visual center
    const buildingClipStart = isMobile ? '23%' : '50%';
    gsap.set(backgroundRef.current, {
      opacity: 1,
      clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      scale: 1,
    });
    gsap.set(buildingRef.current, {
      opacity: 1,
      clipPath: `polygon(0% ${buildingClipStart}, 100% ${buildingClipStart}, 100% ${buildingClipStart}, 0% ${buildingClipStart})`,
      scale: 1,
    });
    gsap.set(textRef.current, {
      opacity: 0,
      y: isMobile ? 200 : 400,
    });
    gsap.set(exploreButtonRef.current, {
      opacity: 0,
      y: 30,
    });

    let tl: gsap.core.Timeline | null = null;

    // Start animation immediately (page loader deactivated)
    const loaderDelay = setTimeout(() => {
      tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Animation sequence
      tl
        // 1. Both images reveal from middle to top and bottom
        .to([backgroundRef.current, buildingRef.current], {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power2.inOut',
        })
        // 2. Subtle zoom effect on both images (reduced for performance)
        .to([backgroundRef.current, buildingRef.current], {
          scale: 1.02,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
        // 3. Text slides up and fades in (behind building)
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: isMobile ? 1.4 : 1.2,
          ease: 'power2.out',
        }, isMobile ? '-=0.8' : '-=1.2')
        // 4. Explore button fades in
        .to(exploreButtonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6');
    }, 0); // Start immediately (page loader deactivated)

    return () => {
      clearTimeout(loaderDelay);
      if (tl) tl.kill();
    };
  }, [imagesLoaded, isMobile]);

  return (
    <div className="bg-[#f6f7f0]">
      {/* Cinematic Hero Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? 'calc(100vh - 16px)' : 'calc(100vh - 4px)', padding: isMobile ? '16px' : '24px' }}
      >
        <div
          ref={heroRef}
          className="relative w-full h-full overflow-hidden rounded-3xl"
        >
          {/* Layer 1: Background Image (z-index: 1) */}
          <div
            className="absolute inset-0"
            style={{ zIndex: 1, overflow: 'hidden' }}
          >
            <img
              ref={backgroundRef}
              src="/onlybg.png"
              alt="Background"
              className={`absolute inset-0 w-full h-full object-cover ${isMobile ? '' : 'scale-110'}`}
              style={{
                objectPosition: isMobile ? 'center center' : 'center top',
                clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
                transform: `translateY(${parallaxOffset}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>

          {/* Layer 2: Text - JAGRAN LAKECITY UNIVERSITY (z-index: 2) */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: 2,
              paddingBottom: isMobile ? '65%' : '20%',
              opacity: 0,
            }}
          >
            <h1
              className="text-center font-bold uppercase tracking-wider select-none"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontSize: isMobile ? 'clamp(5.5rem, 26vw, 10rem)' : 'clamp(18rem, 24vw, 24rem)',
                lineHeight: isMobile ? 1.0 : 1.1,
                letterSpacing: isMobile ? '0.02em' : '0.01em',
                wordSpacing: isMobile ? '0.05em' : '0.3em',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                maxWidth: isMobile ? '90vw' : 'none',
                backgroundImage: isMobile
                  ? 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0) 100%)'
                  : 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}
            >
              {isMobile ? (
                <>
                  JAGRAN<br />LAKECITY
                </>
              ) : (
                'JAGRAN LAKECITY'
              )}
            </h1>
          </div>

          {/* Layer 3: Building/Foreground Image (z-index: 3) */}
          <img
            ref={buildingRef}
            src="/hero.png"
            alt="JLU Building"
            className="absolute"
            style={{
              zIndex: 3,
              width: '100%',
              height: isMobile ? '65%' : '100%',
              bottom: 0,
              left: 0,
              right: 0,
              objectFit: 'cover',
              objectPosition: 'center bottom',
              clipPath: isMobile
                ? 'polygon(0% 23%, 100% 23%, 100% 23%, 0% 23%)'
                : 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            }}
          />

          {/* Explore JLU Button (z-index: 120) */}
          <button
            ref={exploreButtonRef}
            onClick={() => {
              if (exploreButtonRef.current && heroRef.current) {
                const buttonRect = exploreButtonRef.current.getBoundingClientRect();
                const heroRect = heroRef.current.getBoundingClientRect();
                if (isMobile) {
                  setVideoButtonPos({
                    left: buttonRect.left,
                    top: buttonRect.top,
                    width: buttonRect.width,
                    height: buttonRect.height,
                    centerX: buttonRect.left + buttonRect.width / 2,
                    centerY: buttonRect.top + buttonRect.height / 2,
                  });
                } else {
                  setVideoButtonPos({
                    left: buttonRect.left - heroRect.left,
                    top: buttonRect.top - heroRect.top,
                    width: buttonRect.width,
                    height: buttonRect.height,
                    centerX: buttonRect.left - heroRect.left + buttonRect.width / 2,
                    centerY: buttonRect.top - heroRect.top + buttonRect.height / 2,
                  });
                }
              }
              setIsVideoOpen(true);
            }}
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16 bg-white text-[#21313c] font-semibold cursor-pointer"
            style={{
              zIndex: 40,
              padding: isMobile ? '12px 24px' : '16px 32px',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              visibility: isVideoOpen ? 'hidden' : 'visible',
              pointerEvents: isVideoOpen ? 'none' : 'auto',
              opacity: 0,
            }}
          >
            Explore JLU
          </button>

          {/* Video Expansion Overlay (z-index: 60) */}
          <AnimatePresence>
            {isVideoOpen && (
              <>
                {isMobile ? (
                  <>
                    {/* Mobile: Button expands to fullscreen */}
                    <motion.div
                      initial={{
                        width: videoButtonPos.width,
                        height: videoButtonPos.height,
                        borderRadius: '8px',
                        left: videoButtonPos.left,
                        top: videoButtonPos.top,
                      }}
                      animate={{
                        width: '100vw',
                        height: '100vh',
                        borderRadius: '0px',
                        left: 0,
                        top: 0,
                      }}
                      exit={{
                        width: videoButtonPos.width,
                        height: videoButtonPos.height,
                        borderRadius: '8px',
                        left: videoButtonPos.left,
                        top: videoButtonPos.top,
                      }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="fixed bg-white"
                        style={{ zIndex: 58 }}
                      />

                      {/* Mobile Video Content */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                        className="fixed inset-0"
                        style={{ zIndex: 59 }}
                      >
                        <button
                          onClick={() => setIsVideoOpen(false)}
                          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg z-10"
                          aria-label="Close video"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <video
                          className="w-full h-full object-cover"
                          src="/video.mp4"
                          autoPlay
                          playsInline
                          onEnded={() => setIsVideoOpen(false)}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Desktop: Button expands to full hero size */}
                      <motion.div
                        initial={{
                          clipPath: `inset(${videoButtonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - videoButtonPos.left - videoButtonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - videoButtonPos.top - videoButtonPos.height : 0}px ${videoButtonPos.left}px round 8px)`,
                        }}
                        animate={{
                          clipPath: 'inset(0px 0px 0px 0px round 24px)',
                        }}
                        exit={{
                          clipPath: `inset(${videoButtonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - videoButtonPos.left - videoButtonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - videoButtonPos.top - videoButtonPos.height : 0}px ${videoButtonPos.left}px round 8px)`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute inset-0 bg-white"
                        style={{ zIndex: 100 }}
                      />

                      {/* Desktop Video Content */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.5 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          zIndex: 101,
                          borderRadius: '24px',
                        }}
                      >
                        <button
                          onClick={() => setIsVideoOpen(false)}
                          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                          style={{ zIndex: 102 }}
                          aria-label="Close video"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <video
                          className="w-full h-full object-cover"
                          src="/video.mp4"
                          autoPlay
                          playsInline
                          onEnded={() => setIsVideoOpen(false)}
                        />
                      </motion.div>
                    </>
                  )}
                </>
              )}
          </AnimatePresence>

        </div>
      </section>

      {/* Awards and Accreditations Banner */}
      <section className="relative bg-[#f6f7f0] py-6 overflow-hidden">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-10 lg:px-16">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {/* UGC Approved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <svg className="w-5 h-5 text-[#03463B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">UGC Approved</span>
            </motion.div>

            {/* NAAC Accredited */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <svg className="w-5 h-5 text-[#03463B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">NAAC B+ Accredited</span>
            </motion.div>

            {/* AICTE Approved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <svg className="w-5 h-5 text-[#03463B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">AICTE Approved</span>
            </motion.div>

            {/* BCI Recognized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <svg className="w-5 h-5 text-[#03463B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">BCI Recognized</span>
            </motion.div>

            {/* QS I-Gauge Diamond */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#03463B] to-[#025039] rounded-lg shadow-md"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-white">QS I-Gauge Diamond</span>
            </motion.div>

            {/* AIU Member */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <svg className="w-5 h-5 text-[#03463B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">AIU Member</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro text section */}
      <section className="relative px-4 pb-12 pt-14 sm:px-10 lg:px-16 bg-[#f6f7f0]">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-6">
          <div>
            <h2
              className="max-w-4xl leading-tight text-[#21313c]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              A university with a{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                pulse
              </span>
            </h2>
          </div>
          <div>
            <p
              className="max-w-3xl text-[#666]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Jagran Lakecity University is not defined by buildings alone. It is defined by the rhythm of daily life, the exchange of ideas, and the quiet confidence of people who belong here.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <p
              className="max-w-md text-right text-[#999]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Learning unfolds naturally, through dialogue, discovery, and shared moments that extend far beyond formal spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Image grid section */}
      <section className="relative px-0 pb-12 md:pb-20 bg-[#f6f7f0] overflow-hidden">
        <div className="relative mx-auto max-w-[1800px]" style={{ paddingLeft: isMobile ? '12px' : '16px', paddingRight: isMobile ? '12px' : '16px' }}>
          <div
            className="flex w-full items-end justify-center"
            style={{ gap: isMobile ? '12px' : '16px' }}
          >
            {[
              { src: '/about-us.jpg', alt: 'JLU Campus', height: 550, mobileHeight: 220, label: 'About Us', href: '/about' },
              { src: '/admissions.jpg', alt: 'Admissions', height: 500, mobileHeight: 200, label: 'Admissions', href: '/admissions' },
              { src: '/student-clubs.jpg', alt: 'Student Clubs', height: 530, mobileHeight: 210, label: 'Student Clubs', href: '/student-clubs' },
            ].map((img, index) => (
              <div
                key={img.src}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="flex items-end group cursor-pointer"
                style={{
                  flex: '1 1 0',
                  maxWidth: '33.333%',
                  position: 'relative',
                }}
                onClick={() => {
                  const cardEl = cardRefs.current[index];
                  if (cardEl) {
                    const rect = cardEl.getBoundingClientRect();
                    setCardRect({
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                    });
                    setExpandingCard(index);
                    // Navigate after full animation completes
                    setTimeout(() => {
                      if (img.href.startsWith('http')) {
                        window.open(img.href, '_blank', 'noopener,noreferrer');
                        setExpandingCard(null);
                      } else {
                        window.location.href = img.href;
                      }
                    }, 1200);
                  }
                }}
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block w-full object-cover"
                    style={{
                      height: isMobile ? `${img.mobileHeight}px` : `${img.height}px`,
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      display: 'block',
                    }}
                  />
                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 bg-black/15 group-hover:bg-black/60 transition-all duration-700 ease-in-out"
                    style={{
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  {/* Hover text at bottom - hero style */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-start pl-6 sm:pl-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                    }}
                  >
                    <h2
                      className="text-left font-bold uppercase tracking-wider select-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                      style={{
                        fontFamily: "'Humane', sans-serif",
                        fontSize: isMobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(4.5rem, 8vw, 8rem)',
                        lineHeight: 1.1,
                        letterSpacing: isMobile ? '0.02em' : '0.01em',
                        wordSpacing: isMobile ? '0.05em' : '0.3em',
                        backgroundImage: isMobile
                          ? 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0) 100%)'
                          : 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {img.label.toUpperCase()}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen card expansion overlay */}
        <AnimatePresence>
          {expandingCard !== null && (
            <>
              {/* Step 1: Card zooms to fullscreen with smooth easing */}
              <motion.div
                initial={{
                  position: 'fixed',
                  left: cardRect.left,
                  top: cardRect.top,
                  width: cardRect.width,
                  height: cardRect.height,
                  borderRadius: isMobile ? 12 : 16,
                }}
                animate={{
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  borderRadius: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{ zIndex: 9998, overflow: 'hidden' }}
              >
                <motion.img
                  src={['/about-us.jpg', '/admissions.jpg', '/student-clubs.jpg'][expandingCard]}
                  alt="Expanding"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                />
                {/* Gradient overlay that fades in */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                  }}
                />
              </motion.div>

              {/* Step 2: Page slides up from bottom - clean reveal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.5,
                }}
                className="fixed inset-0 bg-[#f6f7f0]"
                style={{ zIndex: 9999 }}
              />
            </>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
