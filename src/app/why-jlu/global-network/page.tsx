'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const galleryImages = [
  { id: 1, src: '/ev1.jpg', position: 'top-[10%] left-[5%]', size: 'w-[140px] h-[200px] md:w-[180px] md:h-[260px]', opacity: 0.7 },
  { id: 2, src: '/ex.jpg', position: 'top-[5%] left-[22%]', size: 'w-[100px] h-[140px] md:w-[130px] md:h-[170px]', opacity: 0.5 },
  { id: 3, src: '/glob.jpg', position: '', size: 'w-[200px] h-[280px] md:w-[260px] md:h-[360px]', isCenter: true, opacity: 1 },
  { id: 4, src: '/ev3.jpg', position: 'top-[8%] right-[18%]', size: 'w-[120px] h-[170px] md:w-[160px] md:h-[220px]', opacity: 0.6 },
  { id: 5, src: '/comm.jpg', position: 'top-[12%] right-[3%]', size: 'w-[90px] h-[130px] md:w-[120px] md:h-[160px]', opacity: 0.4 },
  { id: 6, src: '/ev5.jpg', position: 'bottom-[12%] left-[8%]', size: 'w-[110px] h-[160px] md:w-[150px] md:h-[200px]', opacity: 0.5 },
  { id: 7, src: '/about1.jpg', position: 'bottom-[10%] right-[5%]', size: 'w-[130px] h-[180px] md:w-[170px] md:h-[230px]', opacity: 0.6 },
];

export default function GlobalNetworkPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const centerImageInnerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const ctx = gsap.context(() => {
      if (gallerySectionRef.current) {
        const centerImage = centerImageRef.current;
        const centerImageInner = centerImageInnerRef.current;
        const textOverlay = textOverlayRef.current;
        const horizontalTextTrack = document.querySelector('.horizontal-text-track');
        const sideImages = gsap.utils.toArray<HTMLElement>('.gallery-image:not(.center-image)');

        sideImages.forEach((img) => {
          const imgOpacity = parseFloat(img.getAttribute('data-opacity') || '0.6');
          gsap.fromTo(img, { yPercent: 100, opacity: 0 }, {
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
          });
        });

        if (centerImage) {
          gsap.fromTo(centerImage, { yPercent: 60, opacity: 0 }, {
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
          });
        }

        if (centerImage && centerImageInner && textOverlay) {
          const zoomTl = gsap.timeline({
            scrollTrigger: {
              trigger: gallerySectionRef.current,
              start: 'top top',
              end: '+=400%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          sideImages.forEach((img) => {
            zoomTl.to(img, { opacity: 0, scale: 0.85, duration: 0.35, ease: 'power2.out' }, 0);
          });

          zoomTl.to(centerImage, {
            width: '100vw',
            height: '100vh',
            xPercent: -50,
            yPercent: -50,
            borderRadius: 0,
            duration: 0.35,
            ease: 'power2.inOut',
          }, 0);

          zoomTl.to(centerImageInner, { scale: 1.3, yPercent: 10, duration: 0.2, ease: 'none' }, 0);
          zoomTl.to(textOverlay, { opacity: 1, duration: 0.15, ease: 'power2.out' }, 0.35);
          zoomTl.to('.black-overlay', { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.4);

          if (horizontalTextTrack) {
            zoomTl.fromTo(horizontalTextTrack, { xPercent: 0 }, { xPercent: -72, duration: 0.5, ease: 'none' }, 0.45);
          }

          zoomTl.fromTo('.scroll-desc-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.47);
          zoomTl.to('.scroll-desc-1', { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' }, 0.57);
          zoomTl.fromTo('.scroll-desc-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.59);
          zoomTl.to('.scroll-desc-2', { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' }, 0.69);
          zoomTl.fromTo('.scroll-desc-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.71);
          zoomTl.to('.scroll-desc-3', { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' }, 0.81);
          zoomTl.fromTo('.scroll-desc-4', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.83);

          zoomTl.to(centerImageInner, { yPercent: -10, scale: 1.3, duration: 0.35, ease: 'none' }, 0.65);
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

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/glob.jpg"
              alt="JLU Global Network - 45+ International Collaborations"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: heroOpacity }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px]"
        >
          <motion.h2 className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]">
            GLOBAL{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#c3fd7a', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Connections
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            45+ MOUs with universities across 14 countries including Cambridge, UCL, Imperial College London, RMIT Australia, and Vancouver Film School powering semester exchanges, credited electives, and international teaching months.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[4rem] sm:text-[6rem] md:text-[clamp(7rem,14vw,14rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Global Network
          </motion.h1>
        </div>
      </div>

      {/* Gallery Showcase */}
      {!isMobile && (
        <section ref={gallerySectionRef} className="relative h-screen w-full bg-[#f5f5f5] overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
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
                  ...(img.isCenter && {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }),
                }}
              >
                <div ref={img.isCenter ? centerImageInnerRef : undefined} className="w-full h-full">
                  <img src={img.src} alt={`JLU Global ${img.id}`} className="w-full h-full object-cover" />
                </div>

                {img.isCenter && (
                  <div ref={textOverlayRef} className="absolute inset-0 flex flex-col justify-center opacity-0">
                    <div className="black-overlay absolute inset-0 bg-black/50 opacity-0" />
                    <div className="absolute top-[40%] left-8 md:left-12 right-8 md:right-12 flex items-center z-10">
                      <div className="w-full h-px bg-white" />
                    </div>
                    <div className="absolute top-[15%] left-0 right-0 overflow-hidden z-10">
                      <div className="horizontal-text-track flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-12 md:mx-20">
                          45+ International MOUs
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-12 md:mx-20">
                          14 Countries
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/60 mx-12 md:mx-20">
                          Erasmus+ Partner
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-12 md:mx-20">
                          AUAP Country Chair
                        </span>
                      </div>
                    </div>
                    <div className="scroll-desc-1 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
                        JLU has signed <span className="text-[#f4c950] font-semibold">45+ Memoranda of Understanding</span> with leading universities worldwide, enabling student and faculty exchanges, joint research, and credited electives across continents.
                      </p>
                    </div>
                    <div className="scroll-desc-2 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
                        From <span className="text-[#f4c950] font-semibold">the UK and Australia to Thailand and Kazakhstan</span>, JLU&apos;s academic partnerships span 14 countries — opening doors to semester exchanges, international teaching months, and diverse learning experiences.
                      </p>
                    </div>
                    <div className="scroll-desc-3 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
                        As the <span className="text-[#f4c950] font-semibold">only university from Central India</span> in 3 EU-funded Erasmus+ projects, JLU students access European research networks, collaborative programs, and fully funded exchange opportunities.
                      </p>
                    </div>
                    <div className="scroll-desc-4 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
                        Serving as <span className="text-[#f4c950] font-semibold">India Country Chair for AUAP</span>, JLU shapes the future of cross-border education — connecting 2,500+ students from 8 countries and 27 Indian states to a truly global network.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Gallery */}
      {isMobile && (
        <section className="relative py-16 px-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.slice(0, 4).map((img) => (
              <div key={img.id} className="aspect-3/4 rounded-lg overflow-hidden">
                <img src={img.src} alt={`JLU Global ${img.id}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-light text-gray-900 mb-2">Global Partnerships</h2>
            <p className="text-gray-600 text-sm">45+ international collaborations across 14 countries</p>
          </div>
        </section>
      )}

      {/* Full-VH Feature Section */}
      <section className="relative min-h-screen w-full flex items-center bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400 block mb-4">
                INTERNATIONAL OFFICE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-6" style={{ fontWeight: 600, lineHeight: 1.1 }}>
                Where Learning{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Knows No Borders</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                JLU&apos;s International Office manages 45+ active MOUs across 14 countries, facilitating semester exchanges, credited electives, and joint research. As India Country Chair for the Association of Universities of Asia and the Pacific (AUAP), JLU plays a leadership role in shaping cross-border education.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-2 border-[#f4c950] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#03463B]">3</p>
                  <p className="text-gray-500 text-sm mt-1">Erasmus+ Projects</p>
                </div>
                <div className="border-l-2 border-[#f4c950] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#03463B]">14</p>
                  <p className="text-gray-500 text-sm mt-1">Partner Countries</p>
                </div>
                <div className="border-l-2 border-[#f4c950] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#03463B]">8</p>
                  <p className="text-gray-500 text-sm mt-1">Countries Represented</p>
                </div>
                <div className="border-l-2 border-[#f4c950] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#03463B]">27</p>
                  <p className="text-gray-500 text-sm mt-1">Indian States</p>
                </div>
              </div>
              <a href="/apply" className="inline-flex items-center gap-2 bg-[#21313c] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2630] transition-all">
                Explore Programs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
            {/* Right - Images */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="/about1.jpg" alt="JLU Campus - International Students" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#f6f7f0]">
                <img src="/glob.jpg" alt="JLU Global Partners Map" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ background: '#f4c950' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs mb-3" style={{ color: '#21313c', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}>
                ADMISSIONS OPEN 2025-26
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#21313c] mb-4" style={{ fontWeight: 700, lineHeight: 1.15 }}>
                Explore Global{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Opportunities</span>
              </h2>
              <p className="text-[#21313c]/70 text-sm md:text-base leading-relaxed">
                Connect with 45+ partner universities across 14 countries. Join 2,500+ students from 8 countries at Central India&apos;s only QS Diamond-rated university.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/apply" className="bg-[#21313c] text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#1a2630] transition-all text-center">
                Apply Now
              </a>
              <a href="/admissions" className="border-2 border-[#21313c] text-[#21313c] px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#21313c] hover:text-white transition-all text-center">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10" style={{ background: '#21313c' }} />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-10" style={{ background: '#21313c' }} />
      </section>

      <Footer />
    </div>
  );
}
