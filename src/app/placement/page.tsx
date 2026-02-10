'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Header, Footer } from '@/components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ============================================
// DATA
// ============================================


// Gallery images for the multi-image showcase - spread out positions with opacity variations
const galleryImages = [
  { id: 1, src: '/posthero1.jpg', position: 'top-[10%] left-[5%]', size: 'w-[140px] h-[200px] md:w-[180px] md:h-[260px]', opacity: 0.7 },
  { id: 2, src: '/posthero2.jpg', position: 'top-[5%] left-[22%]', size: 'w-[100px] h-[140px] md:w-[130px] md:h-[170px]', opacity: 0.5 },
  { id: 3, src: '/posthero3.jpg', position: '', size: 'w-[200px] h-[280px] md:w-[260px] md:h-[360px]', isCenter: true, opacity: 1 },
  { id: 4, src: '/posthero1.jpg', position: 'top-[8%] right-[18%]', size: 'w-[120px] h-[170px] md:w-[160px] md:h-[220px]', opacity: 0.6 },
  { id: 5, src: '/posthero2.jpg', position: 'top-[12%] right-[3%]', size: 'w-[90px] h-[130px] md:w-[120px] md:h-[160px]', opacity: 0.4 },
  { id: 6, src: '/posthero3.jpg', position: 'bottom-[12%] left-[8%]', size: 'w-[110px] h-[160px] md:w-[150px] md:h-[200px]', opacity: 0.5 },
  { id: 7, src: '/posthero1.jpg', position: 'bottom-[10%] right-[5%]', size: 'w-[130px] h-[180px] md:w-[170px] md:h-[230px]', opacity: 0.6 },
  { id: 8, src: '/posthero2.jpg', position: 'bottom-[20%] right-[22%]', size: 'w-[100px] h-[140px] md:w-[130px] md:h-[170px]', opacity: 0.4 },
];


// ============================================
// MAIN PLACEMENT PAGE COMPONENT
// ============================================
export default function PlacementPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll transforms for hero - only use after mounted to avoid hydration error
  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const centerImageInnerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================================
  // MAIN GSAP ANIMATIONS
  // ============================================
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {

      // ----------------------------------------
      // 2. GALLERY SHOWCASE - Images rise from bottom, then pin and zoom to FULL SCREEN
      // ----------------------------------------
      if (gallerySectionRef.current && galleryContainerRef.current && !isMobile) {
        const centerImage = centerImageRef.current;
        const centerImageInner = centerImageInnerRef.current;
        const textOverlay = textOverlayRef.current;
        const horizontalTextTrack = document.querySelector('.horizontal-text-track');
        const sideImages = gsap.utils.toArray<HTMLElement>('.gallery-image:not(.center-image)');

        // PHASE 1: Side images rise from bottom as section enters viewport (SLOW)
        sideImages.forEach((img) => {
          const imgOpacity = parseFloat(img.getAttribute('data-opacity') || '0.6');

          gsap.fromTo(
            img,
            {
              yPercent: 100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: imgOpacity,
              duration: 1.5,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: gallerySectionRef.current,
                start: 'top 95%',
                end: 'top 10%',
                scrub: 2,
              },
            }
          );
        });

        // Center image rises from bottom (SLOW)
        if (centerImage) {
          gsap.fromTo(
            centerImage,
            {
              yPercent: 60,
              opacity: 0,
            },
            {
              yPercent: -50,
              xPercent: -50,
              opacity: 1,
              duration: 1.5,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: gallerySectionRef.current,
                start: 'top 95%',
                end: 'top 10%',
                scrub: 2,
              },
            }
          );
        }

        // PHASE 2: Pin section at top, then zoom center image to FULL SCREEN
        if (centerImage && centerImageInner && textOverlay) {
          const zoomTl = gsap.timeline({
            scrollTrigger: {
              trigger: gallerySectionRef.current,
              start: 'top top',
              end: '+=280%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          // Fade out side images AND expand center image TOGETHER
          sideImages.forEach((img) => {
            zoomTl.to(
              img,
              {
                opacity: 0,
                scale: 0.85,
                duration: 0.35,
                ease: 'power2.out'
              },
              0
            );
          });

          // Expand center image to FULL SCREEN - starts at same time as side images fade
          zoomTl.to(
            centerImage,
            {
              width: '100vw',
              height: '100vh',
              xPercent: -50,
              yPercent: -50,
              borderRadius: 0,
              duration: 0.35,
              ease: 'power2.inOut',
            },
            0
          );

          // Initial scale for image to have room for parallax movement (larger scale = more room to move up)
          zoomTl.to(
            centerImageInner,
            {
              scale: 1.3,
              yPercent: 10,
              duration: 0.2,
              ease: 'none',
            },
            0
          );

          // Fade in text overlay container after image is expanded
          zoomTl.to(
            textOverlay,
            { opacity: 1, duration: 0.15, ease: 'power2.out' },
            0.35
          );

          // Fade in black overlay after image fully expands
          zoomTl.to(
            '.black-overlay',
            { opacity: 1, duration: 0.2, ease: 'power2.out' },
            0.4
          );

          // Horizontal scroll - move titles from right to left (end at Career Growth visible)
          if (horizontalTextTrack) {
            zoomTl.fromTo(
              horizontalTextTrack,
              { xPercent: 0 },
              { xPercent: -72, duration: 0.5, ease: 'none' },
              0.45
            );
          }

          // Fade in the description text on the right
          zoomTl.fromTo(
            '.vision-description',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
            0.55
          );

          // Parallax effect - inner image moves UP on scroll (from +10% to -10%)
          zoomTl.to(
            centerImageInner,
            {
              yPercent: -10,
              scale: 1.3,
              duration: 0.35,
              ease: 'none',
            },
            0.65
          );
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isMobile]);


  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      {/* Fixed Header */}
      <Header />

      {/* ============================================ */}
      {/* HERO SECTION - About Style with Large Text */}
      {/* ============================================ */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/posthero2.jpg"
              alt="Placement Drive"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          {/* Black Overlay with fade on scroll */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: heroOpacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            CAREER{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            Bridging exceptional talent with industry-leading opportunities. Where academic excellence meets professional success through strategic partnerships and dedicated mentorship.
          </motion.p>
        </motion.div>

        {/* Large "Placements" Text - Bottom Left */}
        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[4.5rem] sm:text-[6rem] md:text-[clamp(7rem,14vw,14rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Placements
          </motion.h1>
        </div>
      </div>

      {/* ============================================ */}
      {/* GALLERY SHOWCASE - Multi-image Rise, Pin, Zoom to Full Screen */}
      {/* ============================================ */}
      {!isMobile && (
        <section
          ref={gallerySectionRef}
          className="relative h-screen w-full bg-[#f5f5f5] overflow-hidden"
        >
          {/* Gallery Container */}
          <div
            ref={galleryContainerRef}
            className="relative w-full h-full overflow-hidden"
          >
            {/* Scattered Gallery Images */}
            {galleryImages.map((img) => (
              <div
                key={img.id}
                data-opacity={img.opacity}
                className={`gallery-image absolute ${img.isCenter ? '' : img.position} ${img.size} overflow-hidden ${
                  img.isCenter ? 'center-image z-20' : 'z-10'
                }`}
                ref={img.isCenter ? centerImageRef : undefined}
                style={{
                  borderRadius: img.isCenter ? '12px' : '6px',
                  opacity: 0,
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  ...(img.isCenter && {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) translateZ(0)',
                  }),
                }}
              >
                <div
                  ref={img.isCenter ? centerImageInnerRef : undefined}
                  className="w-full h-full"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                >
                  <img
                    src={img.src}
                    alt={`Gallery ${img.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Overlay - Only on center image */}
                {img.isCenter && (
                  <div
                    ref={textOverlayRef}
                    className="absolute inset-0 flex flex-col justify-center opacity-0"
                    style={{ willChange: 'opacity' }}
                  >
                    {/* Black overlay that fades in */}
                    <div className="black-overlay absolute inset-0 bg-black/50 opacity-0" />

                    {/* Number on the left */}
                    <div className="absolute top-[38%] left-8 md:left-12 z-10">
                      <span className="text-white/80 text-sm md:text-base font-light">03</span>
                    </div>

                    {/* Horizontal white line */}
                    <div className="absolute top-[40%] left-16 md:left-24 right-8 md:right-12 flex items-center z-10">
                      <div className="w-full h-px bg-gradient-to-r from-[#efc04b] via-white/40 to-transparent" />
                    </div>

                    {/* VISION label on the right */}
                    <div className="absolute top-[38%] right-8 md:right-12 z-10">
                      <span className="text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase">PLACEMENTS</span>
                    </div>

                    {/* Horizontal Scrolling Titles - Top area */}
                    <div className="absolute top-[15%] left-0 right-0 overflow-hidden z-10">
                      <div
                        className="horizontal-text-track flex items-center whitespace-nowrap"
                        style={{
                          width: 'max-content',
                          willChange: 'transform',
                          transform: 'translateZ(0)',
                        }}
                      >
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-12 md:mx-20" style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '-0.02em' }}>
                          Industry Excellence
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-12 md:mx-20" style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '-0.02em' }}>
                          Career Growth
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/60 mx-12 md:mx-20" style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '-0.02em' }}>
                          Global Reach
                        </span>
                        {/* Repeat for seamless scroll */}
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-12 md:mx-20" style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '-0.02em' }}>
                          Industry Excellence
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-12 md:mx-20" style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: '-0.02em' }}>
                          Career Growth
                        </span>
                      </div>
                    </div>

                    {/* Description text - bottom right */}
                    <div className="vision-description absolute bottom-[18%] right-8 md:right-12 max-w-md z-10 opacity-0">
                      <p className="text-white/70 text-sm md:text-base leading-relaxed text-right">
                        Our placement excellence is established through strategic industry partnerships and comprehensive training programs, which considers student skills, market demands, and career aspirations. We combine these elements to create exceptional placement outcomes that shape futures.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </section>
      )}

      {/* Mobile Gallery - Simpler version */}
      {isMobile && (
        <section className="relative py-16 px-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.slice(0, 4).map((img) => (
              <div
                key={img.id}
                className="aspect-3/4 rounded-lg overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={`Gallery ${img.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-2">Our Success Stories</h2>
            <p className="text-gray-600 text-sm">500+ recruiting partners trust JLU talent</p>
          </div>
        </section>
      )}



      {/* ============================================ */}
      {/* CTA SECTION - Matching other pages style */}
      {/* ============================================ */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12 bg-[#21313c] relative overflow-hidden">
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="text-center">
            <span className="text-[#efc04b] text-xs tracking-[0.2em] uppercase block mb-3">
              Get Started
            </span>
            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-3"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Ready to Hire{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                JLU Talent?
              </span>
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto mb-6">
              Partner with us for campus recruitment and access to highly skilled, industry-ready graduates who are prepared to make an immediate impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href="mailto:placements@jlu.edu.in"
                className="bg-[#efc04b] text-[#21313c] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4a93d] transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                Contact Placement Cell
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/broucher/placement-brochure.pdf"
                className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white hover:text-[#21313c] transition-all inline-flex items-center justify-center gap-2"
              >
                Download Brochure
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#efc04b] flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs mb-0.5">Email</p>
              <p className="text-white font-medium text-sm">placements@jlu.edu.in</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-[#efc04b] flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs mb-0.5">Phone</p>
              <p className="text-white font-medium text-sm">0755-6611152</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-[#efc04b] flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs mb-0.5">Location</p>
              <p className="text-white font-medium text-sm">JLU Campus, Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ============================================ */}
      {/* GLOBAL STYLES */}
      {/* ============================================ */}
      <style jsx global>{`
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Will-change optimizations */
        .gallery-image,
        .horizontal-text-track {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}
