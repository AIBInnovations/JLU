'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const galleryImages = [
  { id: 1, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-event.webp', position: 'top-[10%] left-[5%]', size: 'w-[70px] h-[100px] md:w-[180px] md:h-[260px]', opacity: 0.7 },
  { id: 2, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/seminar.webp', position: 'top-[5%] left-[22%]', size: 'w-[50px] h-[70px] md:w-[130px] md:h-[170px]', opacity: 0.5 },
  { id: 3, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-building.webp', position: '', size: 'w-[120px] h-[170px] md:w-[260px] md:h-[360px]', isCenter: true, opacity: 1 },
  { id: 4, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/law.webp', position: 'top-[8%] right-[18%]', size: 'w-[60px] h-[85px] md:w-[160px] md:h-[220px]', opacity: 0.6 },
  { id: 5, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/lab.webp', position: 'top-[12%] right-[3%]', size: 'w-[45px] h-[65px] md:w-[120px] md:h-[160px]', opacity: 0.4 },
  { id: 6, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/classroom.webp', position: 'bottom-[12%] left-[8%]', size: 'w-[55px] h-[80px] md:w-[150px] md:h-[200px]', opacity: 0.5 },
  { id: 7, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.webp', position: 'bottom-[10%] right-[5%]', size: 'w-[65px] h-[90px] md:w-[170px] md:h-[230px]', opacity: 0.6 },
];

export default function InterdisciplinaryDegreesPage() {
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
              loading="lazy" decoding="async" src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-slider.webp"
              alt="JLU Bhopal Campus - 50+ Interdisciplinary Programs across 6 Faculties"
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
            INTERDISCIPLINARY{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#e85a71', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Innovation
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white" style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            50+ programs across 6 faculties and 15+ schools blending law, engineering, design, journalism, management, and creative arts. From Sports Management to Business Analytics to the Jagran Centre for Creative Skills — JLU builds future-ready graduates.
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
            Interdisciplinary Degrees
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
                  <img loading="lazy" decoding="async" src={img.src} alt={`JLU Programs ${img.id}`} className="w-full h-full object-cover" />
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
                          6 Faculties
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-4 sm:mx-10 md:mx-20">
                          50+ Programs
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/60 mx-4 sm:mx-10 md:mx-20">
                          15+ Schools
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-4 sm:mx-10 md:mx-20">
                          Skill-Based Degrees
                        </span>
                      </div>
                    </div>
                    <div className="scroll-desc-1 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        <span className="text-[#027ea1] font-semibold">Engineering, Management, Law, Design, Journalism, and Sciences</span> — six faculties working together to create cross-disciplinary learning that mirrors the complexity of the real world.
                      </p>
                    </div>
                    <div className="scroll-desc-2 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        From B.Tech in AI/ML to MBA in Business Analytics to BA LLB — <span className="text-[#027ea1] font-semibold">over 50 programs</span> designed to blend multiple disciplines into career-ready qualifications with industry certifications built in.
                      </p>
                    </div>
                    <div className="scroll-desc-3 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Specialized schools like the <span className="text-[#027ea1] font-semibold">Jagran Centre for Creative Skills (JCCS)</span>, School of Law, and School of Engineering provide focused excellence and deep domain expertise within each discipline.
                      </p>
                    </div>
                    <div className="scroll-desc-4 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Every degree integrates <span className="text-[#027ea1] font-semibold">practical skill modules</span> — from EY Six Sigma for MBA to live newsroom training for Journalism to moot courts for Law — ensuring graduates are job-ready from day one.
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
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-16 md:py-[140px] w-full" style={{ maxWidth: '1440px' }}>
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ fontSize: '28px', letterSpacing: '0.25em' }}>
              6 FACULTIES &bull; 15+ SCHOOLS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4" style={{ fontWeight: 600, lineHeight: 1.1 }}>
              One University,{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Infinite Possibilities</span>
            </h2>
            <p className="text-[#999] max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', lineHeight: 1.7, fontWeight: 400 }}>
              JLU&apos;s 6 faculties house 15+ specialized schools offering 50+ programs that blend disciplines for future-ready careers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Engineering & Technology', desc: 'B.Tech, M.Tech in CSE, AI/ML, Civil, Mechanical with hands-on labs and industry projects.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/lab.webp' },
              { title: 'Management & Commerce', desc: 'MBA, BBA, B.Com with EY Six Sigma certification and CIMA recognition.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/management.webp' },
              { title: 'Law & Governance', desc: 'BA LLB, BBA LLB with moot courts, legal aid clinics, and judiciary preparation.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/law.webp' },
              { title: 'Design & Creative Arts', desc: 'JCCS programs in Film, Animation, Interior Design developed with Indian Institute of Creative Skills.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/jsjc.webp' },
              { title: 'Journalism & Mass Comm', desc: 'Programs powered by Jagran Prakashan — India\'s largest media group — with live newsroom training.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/partnership.webp' },
              { title: 'Sciences & Humanities', desc: 'B.Sc, M.Sc, BA, MA programs with interdisciplinary electives across all faculties.', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/library.webp' },
            ].map((faculty) => (
              <div key={faculty.title} className="group relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[3/4]">
                <img loading="lazy" decoding="async" src={faculty.image} alt={faculty.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">{faculty.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{faculty.desc}</p>
                </div>
              </div>
            ))}
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
              Break Academic{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Boundaries</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Explore 50+ skill-based interdisciplinary programs across Law, Engineering, Design, Journalism, Management, and Creative Arts at Central India&apos;s only QS Diamond-rated university.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
            <a href="https://apply.jlu.edu.in/" className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full">
              Apply Now <span>→</span>
            </a>
            <a href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/JLU-Brochure-2026.pdf" download target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center">
              Download Brochure
            </a>
            <a href="/Fee-Structure-2026-27.pdf" download="JLU-Fee-Structure-2026-27.pdf" target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center">
              Fee Structure 2026-27
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
