'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const galleryImages = [
  { id: 1, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/comm.jpg', position: 'top-[10%] left-[5%]', size: 'w-[70px] h-[100px] md:w-[180px] md:h-[260px]', opacity: 0.7 },
  { id: 2, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev5.jpg', position: 'top-[5%] left-[22%]', size: 'w-[50px] h-[70px] md:w-[130px] md:h-[170px]', opacity: 0.5 },
  { id: 3, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/student-clubs.jpg', position: '', size: 'w-[120px] h-[170px] md:w-[260px] md:h-[360px]', isCenter: true, opacity: 1 },
  { id: 4, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev4.jpg', position: 'top-[8%] right-[18%]', size: 'w-[60px] h-[85px] md:w-[160px] md:h-[220px]', opacity: 0.6 },
  { id: 5, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/pro1.jpg', position: 'top-[12%] right-[3%]', size: 'w-[45px] h-[65px] md:w-[120px] md:h-[160px]', opacity: 0.4 },
  { id: 6, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev3.jpg', position: 'bottom-[12%] left-[8%]', size: 'w-[55px] h-[80px] md:w-[150px] md:h-[200px]', opacity: 0.5 },
  { id: 7, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev2.jpg', position: 'bottom-[10%] right-[5%]', size: 'w-[65px] h-[90px] md:w-[170px] md:h-[230px]', opacity: 0.6 },
];

export default function StudentApproachPage() {
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
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (gallerySectionRef.current) {
        const centerImage = centerImageRef.current;
        const centerImageInner = centerImageInnerRef.current;
        const textOverlay = textOverlayRef.current;
        const horizontalTextTrack = document.querySelector('.horizontal-text-track');
        const isMobileScreen = window.innerWidth < 768;
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
            zoomTl.fromTo(horizontalTextTrack, { xPercent: 0 }, { xPercent: isMobileScreen ? -85 : -72, duration: 0.5, ease: 'none' }, 0.45);
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
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div ref={containerRef} className="bg-white min-h-screen overflow-x-hidden">

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
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/comm.jpg"
              alt="JLU Student-Centric Approach - Experiential Learning"
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
            STUDENT{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Centered
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white" style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            Every student gets 1-on-1 mentoring, access to 45+ laboratories, and hands-on projects from day one. With 2,500+ students from 8 countries across a 40-acre campus featuring a pyramid-shaped library with 42,000+ books, JLU makes learning personal.
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
            Student Approach
          </motion.h1>
        </div>
      </div>

      {/* Gallery Showcase */}
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
                  <img src={img.src} alt={`JLU Student Life ${img.id}`} className="w-full h-full object-cover" />
                </div>

                {img.isCenter && (
                  <div ref={textOverlayRef} className="absolute inset-0 flex flex-col justify-center opacity-0">
                    <div className="black-overlay absolute inset-0 bg-black/50 opacity-0" />
                    <div className="absolute top-[25%] md:top-[40%] left-8 md:left-12 right-8 md:right-12 flex items-center z-10">
                      <div className="w-full h-px bg-white" />
                    </div>
                    <div className="absolute top-[20%] md:top-[15%] left-0 right-0 overflow-hidden z-10">
                      <div className="horizontal-text-track flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-4 sm:mx-10 md:mx-20">
                          1-on-1 Mentoring
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-4 sm:mx-10 md:mx-20">
                          45+ Laboratories
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/60 mx-4 sm:mx-10 md:mx-20">
                          40-Acre Campus
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-4 sm:mx-10 md:mx-20">
                          42,000+ Books
                        </span>
                      </div>
                    </div>
                    <div className="scroll-desc-1 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Every student is assigned a <span className="text-[#027ea1] font-semibold">dedicated faculty mentor</span> who guides their academic journey, career planning, and personal growth — ensuring no student is ever just a number at JLU.
                      </p>
                    </div>
                    <div className="scroll-desc-2 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        From engineering workshops to media studios and moot courts — <span className="text-[#027ea1] font-semibold">45+ specialized laboratories</span> provide hands-on, experiential learning across every discipline from day one.
                      </p>
                    </div>
                    <div className="scroll-desc-3 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Spread across <span className="text-[#027ea1] font-semibold">40 acres in Chandanpur, Bhopal</span>, the campus features 14 academic blocks, 122 smart classrooms, 4 auditoriums, and lush green open spaces designed for learning and living.
                      </p>
                    </div>
                    <div className="scroll-desc-4 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        The iconic <span className="text-[#027ea1] font-semibold">28,000 sq ft pyramid-shaped library</span> houses 42,000+ books, digital journals, and research databases — a landmark of knowledge that anchors the entire JLU campus experience.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      {/* Full-VH Feature Section */}
      <section className="relative w-full bg-[#f6f7f0]">
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-16 md:py-[140px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ fontSize: '28px', letterSpacing: '0.25em' }}>
                EXPERIENTIAL LEARNING
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-6" style={{ fontWeight: 600, lineHeight: 1.1 }}>
                Built Around{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Every Student</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                JLU&apos;s student-centric model rests on three pillars — experiential learning, skills development, and community service. With 122 classrooms across 14 academic blocks, the iconic 28,000 sq ft pyramid-shaped library housing 42,000+ books, and 45+ specialized laboratories, every student receives the environment and mentorship to thrive.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-2 border-[#027ea1] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#027ea1]">122</p>
                  <p className="text-gray-500 text-sm mt-1">Smart Classrooms</p>
                </div>
                <div className="border-l-2 border-[#027ea1] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#027ea1]">42,000+</p>
                  <p className="text-gray-500 text-sm mt-1">Library Books</p>
                </div>
                <div className="border-l-2 border-[#027ea1] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#027ea1]">30+</p>
                  <p className="text-gray-500 text-sm mt-1">Student Clubs</p>
                </div>
                <div className="border-l-2 border-[#027ea1] pl-4">
                  <p className="text-2xl md:text-3xl font-bold text-[#027ea1]">4</p>
                  <p className="text-gray-500 text-sm mt-1">Auditoriums</p>
                </div>
              </div>
              <a href="/apply" className="inline-flex items-center gap-2 bg-[#21313c] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2630] transition-all">
                Experience JLU
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
            {/* Right - Images */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev4.jpg" alt="JLU Student Activities" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#f6f7f0]">
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/student-clubs.jpg" alt="JLU Student Clubs and Sports" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20">
        <div className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 rounded-xl md:rounded-3xl lg:rounded-4xl" style={{ maxWidth: '1400px' }}>
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
              ADMISSIONS OPEN 2025-26
            </span>
            <h2 className="text-white" style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Your Future Starts{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Here</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Experience personalized mentoring, 45+ laboratories, and a vibrant campus life across our 40-acre Chandanpur campus with 2,500+ students from 8 countries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
            <a href="https://apply.jlu.edu.in/" className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full">
              Apply Now <span>→</span>
            </a>
            <a href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/JLU-Brochure-2026.pdf" download target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center">
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
