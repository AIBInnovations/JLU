'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Footer } from '@/components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Career Readiness Pillars Data
const careerPillars = [
  {
    title: 'Industry-Ready Curriculum',
    description: 'Programs co-designed with industry leaders, ensuring skills align with market demands and emerging technologies.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_0858.JPG',
    accent: '#c3fd7a',
    darkText: true,
    modalContent: {
      overview: 'Our curriculum is continuously updated in collaboration with industry partners like EY, KPMG, Deloitte, Amazon, and TCS. Every program integrates real-world case studies, live projects, and industry certifications.',
      features: [
        'Curriculum co-designed with 42+ industry partners',
        'Embedded industry certifications (Google, AWS, Microsoft)',
        'Live projects with real companies every semester',
        'Industry-relevant electives updated annually',
        'Capstone projects solving actual business problems',
      ],
      stats: [
        { label: 'Industry Partners', value: '42+' },
        { label: 'Certifications', value: '15+' },
        { label: 'Live Projects/Year', value: '200+' },
      ],
    },
  },
  {
    title: 'Dedicated Training & Development',
    description: 'Pre-placement training programs including aptitude, technical skills, and professional communication workshops.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_5604.JPG',
    accent: '#027ea1',
    darkText: false,
    modalContent: {
      overview: 'The Career Development Centre runs a comprehensive training program from Year 1. Students undergo structured aptitude training, domain-specific technical workshops, and professional development sessions.',
      features: [
        'Aptitude & reasoning training from Year 1',
        'Domain-specific technical skill workshops',
        'Professional communication & business writing',
        'Resume building & LinkedIn optimization',
        'Corporate etiquette & presentation skills',
      ],
      stats: [
        { label: 'Training Hours/Year', value: '200+' },
        { label: 'Expert Trainers', value: '25+' },
        { label: 'Workshop Sessions', value: '100+' },
      ],
    },
  },
  {
    title: 'Mock Interviews & Soft Skills',
    description: 'Rigorous mock interviews, group discussions, and personality development sessions with industry professionals.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_0885.JPG',
    accent: '#e85a71',
    darkText: false,
    modalContent: {
      overview: 'Students participate in intensive mock interview rounds conducted by HR professionals from top companies. Group discussions, stress interviews, and technical rounds prepare students for every scenario.',
      features: [
        'Mock interviews with real HR professionals',
        'Group discussion practice sessions weekly',
        'Personality development & confidence building',
        'Stress interview preparation',
        'Video interview training for remote placements',
      ],
      stats: [
        { label: 'Mock Interviews/Year', value: '500+' },
        { label: 'HR Professionals', value: '30+' },
        { label: 'Success Rate', value: '92%' },
      ],
    },
  },
  {
    title: 'Global Career Network',
    description: 'International placement partnerships and alumni network spanning Fortune 500 companies across 15+ countries.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_4625.JPG',
    accent: '#f4c950',
    darkText: true,
    modalContent: {
      overview: 'JLU\'s global network connects students with opportunities across borders. Our alumni are placed in Fortune 500 companies worldwide, and international collaborations open doors to global careers.',
      features: [
        'Placements in Fortune 500 companies',
        'International internship opportunities',
        'Alumni mentorship from global professionals',
        'Cross-border recruitment drives',
        'Global industry exposure through exchange programs',
      ],
      stats: [
        { label: 'Countries', value: '15+' },
        { label: 'Alumni Network', value: '5,000+' },
        { label: 'Recruiters', value: '350+' },
      ],
    },
  },
];

// Career Pillar Modal Component
const PillarModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: typeof careerPillars[0] | null }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-[9999] bg-white flex flex-col shadow-2xl top-0 right-0 bottom-0 w-full md:w-[540px] md:rounded-l-3xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header image */}
            <div className="relative h-[200px] md:h-[260px] shrink-0 overflow-hidden">
              <Image src={data.image} alt={data.title} fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${data.accent}ee 0%, transparent 60%)` }} />
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/></svg>
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className={`text-xl md:text-2xl font-semibold ${data.darkText ? 'text-[#21313c]' : 'text-white'}`}>{data.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-[#666] text-sm md:text-[15px] mb-6" style={{ lineHeight: 1.7 }}>{data.modalContent.overview}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {data.modalContent.stats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="bg-[#f6f7f0] px-4 py-3 rounded-lg flex-1 min-w-[100px]">
                    <p className="text-[#21313c] text-lg md:text-xl font-bold">{stat.value}</p>
                    <p className="text-[#666] text-xs">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">Key Features</h3>
              <div className="space-y-3">
                {data.modalContent.features.map((feature, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }} className="flex items-start gap-3">
                    <svg className="w-5 h-5 rounded-full p-1 shrink-0 mt-0.5 text-white" style={{ backgroundColor: data.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#444] text-sm" style={{ lineHeight: 1.5 }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// DATA
// ============================================


// Gallery images for the multi-image showcase - placement-themed images
const galleryImages = [
  { id: 1, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_5604.JPG', position: 'top-[5%] left-[2%]', size: 'w-[85px] h-[115px] md:w-[180px] md:h-[260px]', opacity: 0.7 },
  { id: 2, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement1.jpeg', position: 'top-[2%] left-[30%]', size: 'w-[65px] h-[85px] md:w-[130px] md:h-[170px]', opacity: 0.5 },
  { id: 3, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_4625.JPG', position: '', size: 'w-[140px] h-[190px] md:w-[260px] md:h-[360px]', isCenter: true, opacity: 1 },
  { id: 4, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement2.jpeg', position: 'top-[3%] right-[2%]', size: 'w-[75px] h-[100px] md:w-[160px] md:h-[220px]', opacity: 0.6 },
  { id: 5, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1357.JPG', position: 'top-[22%] right-[1%]', size: 'w-[55px] h-[75px] md:w-[120px] md:h-[160px]', opacity: 0.4 },
  { id: 6, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement3.jpeg', position: 'bottom-[8%] left-[2%]', size: 'w-[70px] h-[95px] md:w-[150px] md:h-[200px]', opacity: 0.5 },
  { id: 7, src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_5026.JPG', position: 'bottom-[5%] right-[2%]', size: 'w-[80px] h-[105px] md:w-[170px] md:h-[230px]', opacity: 0.6 },
];


// ============================================
// MAIN PLACEMENT PAGE COMPONENT
// ============================================
export default function PlacementPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState<typeof careerPillars[0] | null>(null);

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
  const journeyLineRef = useRef<HTMLDivElement>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const journeyScrollRef = useRef<HTMLDivElement>(null);


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
      if (gallerySectionRef.current && galleryContainerRef.current) {
        const centerImage = centerImageRef.current;
        const centerImageInner = centerImageInnerRef.current;
        const textOverlay = textOverlayRef.current;
        const horizontalTextTrack = document.querySelector('.horizontal-text-track');
        const isMobileScreen = window.innerWidth < 768;
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
              end: '+=400%',
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

          // Horizontal scroll - move titles from right to left
          if (horizontalTextTrack) {
            zoomTl.fromTo(
              horizontalTextTrack,
              { xPercent: 0 },
              { xPercent: isMobileScreen ? -73 : -73, duration: 0.5, ease: 'none' },
              0.45
            );
          }

          // Fade in/out multiple description texts sequentially
          zoomTl.fromTo(
            '.scroll-desc-1',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
            0.47
          );
          zoomTl.to(
            '.scroll-desc-1',
            { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' },
            0.57
          );

          zoomTl.fromTo(
            '.scroll-desc-2',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
            0.59
          );
          zoomTl.to(
            '.scroll-desc-2',
            { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' },
            0.69
          );

          zoomTl.fromTo(
            '.scroll-desc-3',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
            0.71
          );
          zoomTl.to(
            '.scroll-desc-3',
            { opacity: 0, y: -20, duration: 0.04, ease: 'power2.in' },
            0.81
          );

          zoomTl.fromTo(
            '.scroll-desc-4',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
            0.83
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

      // ----------------------------------------
      // PLACEMENT JOURNEY - Line follows horizontal scroll
      // ----------------------------------------
      const scrollContainer = journeyScrollRef.current;
      const line = journeyLineRef.current;
      if (scrollContainer && line && window.innerWidth < 768) {
        const onScroll = () => {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
          const maxScroll = scrollWidth - clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          // Map from 0% to full width so line reaches step 05
          const lineWidth = 5 + progress * (scrollWidth * 0.9);
          line.style.width = `${lineWidth}px`;
        };
        scrollContainer.addEventListener('scroll', onScroll, { passive: true });
        // Cleanup handled by context revert won't cover this, so store for manual cleanup
        (scrollContainer as any).__journeyCleanup = () => scrollContainer.removeEventListener('scroll', onScroll);
      }

    }, containerRef);

    return () => {
      ctx.revert();
      const sc = journeyScrollRef.current;
      if (sc && (sc as any).__journeyCleanup) {
        (sc as any).__journeyCleanup();
        delete (sc as any).__journeyCleanup;
      }
    };
  }, [mounted]);


  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0a]" />;
  }

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      {/* ============================================ */}
      {/* HERO SECTION - About Style with Large Text */}
      {/* ============================================ */}
      <div ref={heroRef} className="relative w-screen h-svh md:h-auto m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_5604.JPG"
              alt="JLU Students Celebrating Placements"
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
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white"
            style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            Bridging exceptional talent with industry-leading opportunities. Where academic excellence meets professional success through strategic partnerships and dedicated mentorship.
          </motion.p>
        </motion.div>

        {/* Large "Placements" Text - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 pl-3 sm:pl-6 md:pl-10 pb-0 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[5.2rem] sm:text-[8rem] md:text-[clamp(7rem,14vw,14rem)]"
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
                  ...(img.isCenter && {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }),
                }}
              >
                <div
                  ref={img.isCenter ? centerImageInnerRef : undefined}
                  className="w-full h-full"
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
                  >
                    {/* Black overlay that fades in */}
                    <div className="black-overlay absolute inset-0 bg-black/50 opacity-0" />

                    {/* Horizontal white line */}
                    <div className="absolute top-[25%] md:top-[40%] left-8 md:left-12 right-8 md:right-12 flex items-center z-10">
                      <div className="w-full h-px bg-white" />
                    </div>

                    {/* Horizontal Scrolling Titles - Top area */}
                    <div className="absolute top-[20%] md:top-[15%] left-0 right-0 overflow-hidden z-10">
                      <div
                        className="horizontal-text-track flex items-center whitespace-nowrap"
                        style={{ width: 'max-content' }}
                      >
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-4 sm:mx-10 md:mx-20">
                          80%+ Placement Rate
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/80 mx-4 sm:mx-10 md:mx-20">
                          500+ Recruiters
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white/60 mx-4 sm:mx-10 md:mx-20">
                          Career Excellence
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mx-4 sm:mx-10 md:mx-20">
                          Global Opportunities
                        </span>
                      </div>
                    </div>

                    {/* Multiple changing description texts */}
                    <div className="scroll-desc-1 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        JLU maintains a <span className="text-[#027ea1] font-semibold">consistent 80%+ placement rate</span> year after year, with dedicated pre-placement training, industry mentorship, and comprehensive career development programs ensuring student success.
                      </p>
                    </div>

                    <div className="scroll-desc-2 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Over <span className="text-[#027ea1] font-semibold">500+ top-tier companies including Infosys, TCS, Deloitte, Amazon, and HDFC Bank</span> actively recruit from JLU, conducting 200+ campus drives annually across diverse sectors.
                      </p>
                    </div>

                    <div className="scroll-desc-3 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        Our Career Development Centre offers <span className="text-[#027ea1] font-semibold">rigorous pre-placement training including aptitude tests, coding bootcamps, mock interviews, and soft skills development</span> — preparing students for every stage of the recruitment process.
                      </p>
                    </div>

                    <div className="scroll-desc-4 absolute bottom-[10%] left-8 md:left-12 max-w-xl z-10 opacity-0">
                      <p className="text-white text-lg lg:text-xl leading-relaxed">
                        With <span className="text-[#027ea1] font-semibold">highest packages reaching 15 LPA and strong alumni networks in 15+ countries</span>, JLU graduates secure positions in Fortune 500 companies, innovative startups, and global corporations worldwide.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </section>



      {/* ============================================ */}
      {/* PLACEMENT AT A GLANCE - Stats */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#21313c]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              Placement Highlights
            </span>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Numbers That{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                Speak
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
            className="flex justify-between items-center"
          >
            {[
              { number: '80%+', label: 'Placement Rate' },
              { number: '500+', label: 'Recruiters' },
              { number: '15 LPA', label: 'Highest Package' },
              { number: '200+', label: 'Companies' },
            ].map((stat, i, arr) => (
              <div key={stat.label} className="flex items-center">
                <div className="text-center px-2 md:px-8">
                  <span className="text-[#027ea1] text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold block mb-1" style={{ letterSpacing: '-0.02em' }}>
                    {stat.number}
                  </span>
                  <span className="text-white/60 text-xs sm:text-xs md:text-sm">
                    {stat.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8 md:h-12 bg-white/15" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CAREER READINESS PILLARS - 4 Cards */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-[#f6f7f0] px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-12 md:mb-20"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              What Sets Us Apart
            </span>
            <h2 className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Career Readiness{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Pillars
              </span>
            </h2>
          </motion.div>

          {/* Mobile: 2x2 staggered grid */}
          <div className="md:hidden">
            {/* Row 1 */}
            <div className="flex flex-row gap-3">
              {careerPillars.slice(0, 2).map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: customEase }}
                  className="relative overflow-hidden rounded-xl cursor-pointer active:-translate-y-1 active:shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                  style={{
                    width: 'calc(50% - 6px)',
                    height: '260px',
                    marginTop: i === 1 ? '24px' : '0',
                    marginBottom: i === 0 ? '24px' : '0',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onClick={() => setSelectedPillar(card)}
                >
                  <img src={card.image} alt={card.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="card-overlay absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                    <h3 className="text-white text-base font-bold mb-1.5" style={{ lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="text-white/85 text-[0.7rem] leading-relaxed mb-1.5">{card.description}</p>
                    <div className="flex items-center gap-1 text-white/80 text-xs font-semibold">
                      <span>Explore</span><span className="text-xs">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex flex-row gap-3 mt-3">
              {careerPillars.slice(2, 4).map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 + 0.2, ease: customEase }}
                  className="relative overflow-hidden rounded-xl cursor-pointer active:-translate-y-1 active:shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                  style={{
                    width: 'calc(50% - 6px)',
                    height: '260px',
                    marginTop: i === 1 ? '24px' : '0',
                    marginBottom: i === 0 ? '24px' : '0',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onClick={() => setSelectedPillar(card)}
                >
                  <img src={card.image} alt={card.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="card-overlay absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                    <h3 className="text-white text-base font-bold mb-1.5" style={{ lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="text-white/85 text-[0.7rem] leading-relaxed mb-1.5">{card.description}</p>
                    <div className="flex items-center gap-1 text-white/80 text-xs font-semibold">
                      <span>Explore</span><span className="text-xs">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Original 4-column grid */}
          <div className="hidden md:grid grid-cols-4 gap-5">
            {careerPillars.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: customEase }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ aspectRatio: '1 / 1.2' }}
                onClick={() => setSelectedPillar(card)}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, ${card.accent}ee 0%, ${card.accent}99 35%, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3
                    className={`text-xl font-semibold mb-2 ${card.darkText ? 'text-[#21313c]' : 'text-white'}`}
                    style={{ lineHeight: 1.2 }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${card.darkText ? 'text-[#21313c]/80' : 'text-white/80'}`}
                  >
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PLACEMENT JOURNEY - Process Steps */}
      {/* ============================================ */}
      <section ref={journeySectionRef} className="py-20 md:py-32 bg-white overflow-visible md:overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              Step By Step
            </span>
            <h2 className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              The JLU Placement{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Journey
              </span>
            </h2>
          </motion.div>

          <div ref={journeyScrollRef} className="flex flex-row overflow-x-auto md:overflow-visible gap-4 md:gap-0 pb-4 md:pb-0 md:grid md:grid-cols-5 relative scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#027ea1] to-transparent" />

            {/* Connecting line (mobile) - animated on scroll */}
            <div ref={journeyLineRef} className="md:hidden absolute top-[24px] left-[5%] h-px bg-[#027ea1] z-0" style={{ width: '0%' }} />

            {[
              { step: '01', title: 'Pre-Placement Training', desc: 'Aptitude tests, coding bootcamps & communication workshops' },
              { step: '02', title: 'Resume Building', desc: 'Professional portfolio & LinkedIn optimization with expert guidance' },
              { step: '03', title: 'Mock Interviews', desc: 'Industry professionals conduct rigorous mock interview sessions' },
              { step: '04', title: 'Campus Drives', desc: '200+ companies visit campus for recruitment drives annually' },
              { step: '05', title: 'Offer & Onboarding', desc: 'Career Development Centre assists with offer negotiation & smooth transition' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: customEase }}
                className="text-center relative flex-shrink-0 w-[110px] md:w-auto snap-center"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-3 md:mb-5 relative z-10 shadow-lg shadow-[#027ea1]/20">
                  <span className="text-[#21313c] text-sm md:text-xl font-bold">{step.step}</span>
                </div>
                <h4 className="text-[#21313c] font-semibold text-[0.65rem] md:text-base mb-1 md:mb-2 leading-tight">{step.title}</h4>
                <p className="text-[#666] text-[0.6rem] md:text-sm leading-relaxed max-w-[110px] md:max-w-[180px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Swipe hint - mobile only */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-4 text-[#999] text-[0.65rem] animate-pulse">
            <span>Swipe left</span>
            <span>→</span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TOP RECRUITERS - Marquee */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              Our Recruiting Partners
            </span>
            <h2 className="text-white text-3xl md:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Trusted By{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                Industry Leaders
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative mb-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {['Infosys', 'TCS', 'Wipro', 'Cognizant', 'HCL Tech', 'Tech Mahindra', 'Capgemini', 'Deloitte', 'KPMG', 'Ernst & Young', 'Accenture', 'IBM', 'Infosys', 'TCS', 'Wipro', 'Cognizant', 'HCL Tech', 'Tech Mahindra', 'Capgemini', 'Deloitte', 'KPMG', 'Ernst & Young', 'Accenture', 'IBM'].map((company, i) => (
              <span
                key={`row1-${i}`}
                className="text-white/15 text-4xl md:text-6xl lg:text-7xl font-bold mx-6 md:mx-10 select-none"
                style={{ fontFamily: "system-ui, sans-serif", letterSpacing: '-0.03em' }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 - Reverse */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {['Amazon', 'Flipkart', 'Zomato', 'Paytm', 'Axis Bank', 'HDFC', 'ICICI', 'Reliance', 'Adani', 'L&T', 'Godrej', 'Jio', 'Amazon', 'Flipkart', 'Zomato', 'Paytm', 'Axis Bank', 'HDFC', 'ICICI', 'Reliance', 'Adani', 'L&T', 'Godrej', 'Jio'].map((company, i) => (
              <span
                key={`row2-${i}`}
                className="text-white/8 text-4xl md:text-6xl lg:text-7xl font-bold mx-6 md:mx-10 select-none"
                style={{ fontFamily: "system-ui, sans-serif", letterSpacing: '-0.03em' }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHERE DREAMS TAKE FLIGHT - Bento Grid */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-20"
          >
            <div>
              <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
                Success Stories
              </span>
              <h2 className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Where Dreams{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Take Flight
                </span>
              </h2>
            </div>
            <p className="text-[#666] text-sm md:text-base max-w-[400px] mt-4 md:mt-0" style={{ lineHeight: 1.7 }}>
              Our graduates are making their mark across industries, from Fortune 500 corporations to innovative startups worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: customEase }}
              className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl min-h-[280px] md:min-h-[600px]"
            >
              <img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1357.JPG"
                alt="Corporate Success"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-10">
                <span className="text-[#999] uppercase tracking-widest block mb-1 md:mb-3 text-xl md:text-2xl font-bold">Corporate Excellence</span>
                <h3 className="text-white text-sm md:text-3xl lg:text-4xl font-semibold mb-1 md:mb-3" style={{ lineHeight: 1.2 }}>
                  Building Careers That{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Matter</span>
                </h3>
                <p className="text-white/70 text-[0.6rem] md:text-base max-w-[500px] hidden md:block" style={{ lineHeight: 1.7 }}>
                  Our Career Development Centre works tirelessly to connect talented students with leading organizations, resulting in exceptional career outcomes year after year.
                </p>
              </div>
            </motion.div>

            {/* Top right card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: customEase }}
              className="group relative overflow-hidden rounded-2xl min-h-[180px] md:min-h-[280px]"
            >
              <img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_5026.JPG"
                alt="Professional Growth"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-6">
                <span className="text-xl md:text-4xl font-bold text-[#027ea1] block mb-0.5 md:mb-1">95%</span>
                <span className="text-white text-[0.6rem] md:text-sm font-semibold block leading-tight">Students Placed Before Graduation</span>
                <span className="text-white/50 text-[0.5rem] md:text-xs">2024-25 Batch</span>
              </div>
            </motion.div>

            {/* Bottom right card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: customEase }}
              className="group relative overflow-hidden rounded-2xl min-h-[180px] md:min-h-[280px]"
            >
              <img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1020.JPG"
                alt="Industry Connections"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-6">
                <span className="text-xl md:text-4xl font-bold text-[#c3fd7a] block mb-0.5 md:mb-1">42+</span>
                <span className="text-white text-[0.6rem] md:text-sm font-semibold block leading-tight">Global Industry Partnerships</span>
                <span className="text-white/50 text-[0.5rem] md:text-xs">Across 15+ countries</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS - Student Success Stories */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              From Our Students
            </span>
            <h2 className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Voices of{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Success
              </span>
            </h2>
          </motion.div>

          {(() => {
            const testimonials = [
              {
                quote: "The Career Development Centre at JLU provided exceptional support throughout my placement journey. The mock interviews and industry mentorship helped me secure my dream role.",
                name: 'Mann Saxena',
                role: 'Placed at AML RightSource',
                batch: 'MBA (Business Analytics), Batch 2025',
                image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement1.jpeg',
              },
              {
                quote: "JLU's structured placement process and dedicated training programs gave me the confidence to perform well in interviews. The career guidance was truly transformative.",
                name: 'Neha Patkar',
                role: 'Placed at AML RightSource',
                batch: 'MBA (Business Analytics), Batch 2025',
                image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement2.jpeg',
              },
              {
                quote: 'The placement cell at JLU connected me with top legal firms. The exposure through internships and moot courts prepared me for a successful career in legal consulting.',
                name: 'Shubham Rawat',
                role: 'Consultant - Legal, Elevate',
                batch: 'LLM, Batch 2025',
                image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement3.jpeg',
              },
            ];

            const renderCard = (testimonial: typeof testimonials[0]) => (
              <div className="bg-[#f6f7f0] rounded-2xl p-6 md:p-8 flex flex-col group hover:shadow-xl transition-shadow duration-300 h-full">
                <svg className="w-8 h-8 text-[#027ea1] mb-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#21313c] text-sm md:text-base flex-1 mb-6" style={{ lineHeight: 1.8 }}>
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <span className="text-[#21313c] font-semibold text-sm block">{testimonial.name}</span>
                    <span className="text-[#027ea1] text-xs font-medium block">{testimonial.role}</span>
                    <span className="text-[#999] text-xs">{testimonial.batch}</span>
                  </div>
                </div>
              </div>
            );

            return (
              <>
                {/* Mobile: Single card carousel with arrows */}
                <div className="md:hidden">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: customEase }}
                  >
                    {renderCard(testimonials[activeTestimonial])}
                  </motion.div>

                  <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                      className="w-10 h-10 rounded-full border border-[#21313c]/20 flex items-center justify-center text-[#21313c] active:bg-[#21313c] active:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex gap-2">
                      {testimonials.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === activeTestimonial ? 'bg-[#027ea1]' : 'bg-[#21313c]/15'}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full border border-[#21313c]/20 flex items-center justify-center text-[#21313c] active:bg-[#21313c] active:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Desktop: 3-column grid (unchanged) */}
                <div className="hidden md:grid grid-cols-3 gap-8">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.15, ease: customEase }}
                    >
                      {renderCard(testimonial)}
                    </motion.div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION - Matching other pages style */}
      {/* ============================================ */}
      <section className="py-6 md:py-14 px-3 sm:px-6 lg:px-12 bg-[#21313c] relative overflow-hidden">
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="text-center">
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              Get Started
            </span>
            <h2
              className="text-xl md:text-4xl lg:text-5xl font-semibold text-white mb-2 md:mb-3"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Ready to Hire{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                JLU Talent?
              </span>
            </h2>
            <p className="text-white/70 text-xs md:text-base max-w-xl mx-auto mb-4 md:mb-6">
              Partner with us for campus recruitment and access to highly skilled, industry-ready graduates who are prepared to make an immediate impact.
            </p>

            <div className="flex flex-row gap-2 md:gap-3 justify-center mb-5 md:mb-8">
              <a
                href="mailto:placements@jlu.edu.in"
                className="bg-[#027ea1] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-[0.65rem] md:text-sm hover:bg-[#025f7a] transition-all shadow-lg inline-flex items-center justify-center gap-1.5 md:gap-2"
              >
                Contact Career Development Centre
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/broucher/placement-brochure.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="border md:border-2 border-white text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-[0.65rem] md:text-sm hover:bg-white hover:text-[#21313c] transition-all inline-flex items-center justify-center gap-1.5 md:gap-2"
              >
                Download Brochure
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 text-center">
            <div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1.5 md:mb-2">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-[0.5rem] md:text-xs mb-0.5">Email</p>
              <p className="text-white font-medium text-[0.6rem] md:text-sm">placements@jlu.edu.in</p>
            </div>
            <div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1.5 md:mb-2">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-white/60 text-[0.5rem] md:text-xs mb-0.5">Phone</p>
              <p className="text-white font-medium text-[0.6rem] md:text-sm">0755-6611152</p>
            </div>
            <div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1.5 md:mb-2">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-[0.5rem] md:text-xs mb-0.5">Location</p>
              <p className="text-white font-medium text-[0.6rem] md:text-sm">JLU Campus, Bhopal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Pillar Modal */}
      <PillarModal isOpen={selectedPillar !== null} onClose={() => setSelectedPillar(null)} data={selectedPillar} />

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

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
      `}</style>
    </div>
  );
}
