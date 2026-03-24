'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DATA
// ============================================

const alumniStats = [
  { value: '10,000+', label: 'Global Alumni Network' },
  { value: '50+', label: 'Countries Represented' },
  { value: '500+', label: 'Partner Companies' },
  { value: '95%', label: 'Employment Rate' },
];

const services = [
  {
    title: 'Alumni Directory',
    description: 'Connect with fellow graduates across the globe. Search by batch, program, location, or industry.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-alumni-directory.jpg',
  },
  {
    title: 'Career Connect',
    description: 'Access exclusive job postings, internships, and career opportunities from our network of 500+ recruiting partners.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-career-connect.jpg',
  },
  {
    title: 'Mentorship Program',
    description: 'Give back or get guidance. Our mentorship platform connects experienced alumni with current students.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-mentorship.jpg',
  },
  {
    title: 'Business Network',
    description: 'Showcase your business, find partners, and unlock entrepreneurial opportunities within the JLU alumni ecosystem.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-business-network.jpg',
  },
  {
    title: 'Alumni Chapters',
    description: 'Join regional chapters across India and worldwide. Attend local meetups and community gatherings.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-alumni-chapters.jpg',
  },
  {
    title: 'Events & Reunions',
    description: 'Never miss a reunion, homecoming, or alumni event. Register for upcoming gatherings.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-events-reunions.jpg',
  },
];

const notableAlumni = [
  {
    id: '1',
    name: 'Mr. Sagar Agrawal',
    batch: '2025',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement1.jpeg',
    designation: 'JLU00505',
    company: 'BA.LLB Program',
    achievement: 'Alumni Award Recipient 2025',
  },
  {
    id: '2',
    name: 'Mr. Sanchit Shrivastava',
    batch: '2025',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement2.jpeg',
    designation: 'JLU04696',
    company: 'BAJMC Program',
    achievement: 'Alumni Award Recipient 2025',
  },
  {
    id: '3',
    name: 'Mr. Aman Verma',
    batch: '2024',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement3.jpeg',
    designation: 'JLU01216',
    company: 'BBA Program',
    achievement: 'Alumni Award Recipient 2024',
  },
  {
    id: '4',
    name: 'Mr. Ugyen Rhuntsho Rabgay',
    batch: '2024',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-insta1.jpg',
    designation: 'JLU00927',
    company: 'BAJMC Program',
    achievement: 'Alumni Award Recipient 2024',
  },
  {
    id: '5',
    name: 'Mr. Namgay Dorji',
    batch: '2024',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-insta2.jpg',
    designation: 'JLU00402',
    company: 'BBA.LLB Program',
    achievement: 'Alumni Award Recipient 2024',
  },
  {
    id: '6',
    name: 'Mr. Sajal Jain',
    batch: '2023',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-insta3.jpg',
    designation: 'JLU02151',
    company: 'B.Com Program',
    achievement: 'Alumni Award Recipient 2023',
  },
  {
    id: '7',
    name: 'Ms. Urvashi Mathur',
    batch: '2023',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement1.jpeg',
    designation: 'JLU02531',
    company: 'B.Sc. (Hospitality & Hotel Administration) Program',
    achievement: 'Alumni Award Recipient 2023',
  },
  {
    id: '8',
    name: 'Ms. Sumaira Yasin',
    batch: '2023',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-placement2.jpeg',
    designation: 'JLU00922',
    company: 'BAJMC Program',
    achievement: 'Alumni Award Recipient 2023',
  },
];

const testimonials = [
  {
    quote: "JLU shaped who I am today. The alumni network has been instrumental in my career growth, connecting me with mentors and opportunities I never imagined possible.",
    name: "Rajesh Kumar",
    batch: "2014",
    role: "VP Engineering, Microsoft",
    image: "https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-testimonial2.webp"
  },
  {
    quote: "From campus to corporate, the JLU family has always been there. The mentorship program helped me navigate my early career challenges with confidence.",
    name: "Sneha Patel",
    batch: "2017",
    role: "Product Manager, Google",
    image: "https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-testimonial1.webp"
  },
  {
    quote: "The business connect platform helped me find co-founders for my startup. Today, we're a team of 50, all thanks to the JLU alumni ecosystem.",
    name: "Priya Sharma",
    batch: "2016",
    role: "Founder, InnovateTech",
    image: "https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-testimonial3.webp"
  },
];

// ============================================
// MAIN ALUMNI PAGE COMPONENT
// ============================================
export default function AlumniPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAlumniIndex, setActiveAlumniIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const serviceContainerRef = useRef<HTMLDivElement>(null);
  const alumniScrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const showcaseSectionRef = useRef<HTMLDivElement>(null);
  const showcaseText1Ref = useRef<HTMLDivElement>(null);
  const showcaseText2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Triple services for seamless infinite loop (need cards on both sides)
  const triplicatedServices = [...services, ...services, ...services];

  // Start from middle set on mount
  useEffect(() => {
    setActiveServiceIndex(services.length);
  }, []);

  // Auto-rotate services every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Seamless loop reset - when we enter the third set, instantly jump back to middle set
  useEffect(() => {
    if (activeServiceIndex >= services.length * 2) {
      // Wait for animation to complete, then instantly reset to middle set
      const timer = setTimeout(() => {
        const container = serviceContainerRef.current;
        if (container) {
          container.style.transition = 'none';
          container.offsetHeight; // Force reflow
        }
        setActiveServiceIndex(services.length);

        setTimeout(() => {
          if (container) {
            container.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
          }
        }, 50);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeServiceIndex]);

  // GSAP Scroll Animation for Hero Text - optimized for smooth performance
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll('.hero-text-line > span');
        gsap.set(lines, { y: '100%', willChange: 'transform' });

        lines.forEach((line, index) => {
          const startPercent = 95 - index * 5;
          const endPercent = 60 - index * 5;

          gsap.to(line, {
            y: '0%',
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: heroRef.current,
              start: `top ${startPercent}%`,
              end: `top ${Math.max(endPercent, 20)}%`,
              scrub: 0.5,
            },
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [mounted]);

  // GSAP Scroll Animation for Showcase Section Texts
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // First text block animation - trigger on the text block itself
      if (showcaseText1Ref.current) {
        const lines1 = showcaseText1Ref.current.querySelectorAll('.showcase-text-line > span');
        gsap.set(lines1, { y: '100%', willChange: 'transform' });

        lines1.forEach((line, index) => {
          gsap.to(line, {
            y: '0%',
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: showcaseText1Ref.current,
              start: `top ${90 - index * 3}%`,
              end: `top ${60 - index * 3}%`,
              scrub: 0.5,
            },
          });
        });
      }

      // Second text block animation - trigger on the text block itself
      if (showcaseText2Ref.current) {
        const lines2 = showcaseText2Ref.current.querySelectorAll('.showcase-text-line > span');
        gsap.set(lines2, { y: '100%', willChange: 'transform' });

        lines2.forEach((line, index) => {
          gsap.to(line, {
            y: '0%',
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: showcaseText2Ref.current,
              start: `top ${90 - index * 3}%`,
              end: `top ${60 - index * 3}%`,
              scrub: 0.5,
            },
          });
        });
      }
    }, showcaseSectionRef);

    return () => ctx.revert();
  }, [mounted]);


  const scrollToAlumni = (index: number) => {
    if (alumniScrollRef.current) {
      const cardWidth = isMobile ? 220 : 380;
      const gap = 24;
      alumniScrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setActiveAlumniIndex(index);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden" style={{ transform: 'translateZ(0)' }}>
      {/* Hero Section with Full Image and Scroll Animation */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni1.jpg"
            alt="Alumni Gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#21313c]/70" />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Top Left Content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 px-4 pt-32 sm:pt-36 max-w-[95%] sm:px-6 sm:max-w-[90%] md:pl-10 md:pt-[180px] md:max-w-[1000px] md:pr-0 z-10"
        >
          <div ref={textRef}>
            <h3
              className="text-white/90"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 800,
                fontSize: isMobile ? '22px' : '32px',
                lineHeight: '1.3',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">A global community of achievers, shaping industries</span>
              </span>
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">and driving change across the world with passion,</span>
              </span>
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">purpose, and pride in everything they do.</span>
              </span>
            </h3>
          </div>
        </motion.div>

        {/* Large "Alumni" Text - Bottom Left */}
        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
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
            Alumni
          </motion.h1>
        </div>
      </section>

      {/* Alumni Showcase Section - Two Images with Text in Front */}
      <section
        ref={showcaseSectionRef}
        className="relative bg-white overflow-hidden py-20 md:py-32 px-4 sm:px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto space-y-16 md:space-y-24">
          {/* Block 1 - Image Left, Text Right */}
          <div className="flex flex-row items-center gap-4 md:gap-16">
            {/* Image */}
            <div
              className="w-1/2 rounded-2xl md:rounded-3xl overflow-hidden"
              style={{ height: isMobile ? '180px' : '380px' }}
            >
              <img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni2.jpg"
                alt="Alumni gathering"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text in front */}
            <div
              ref={showcaseText1Ref}
              className="w-1/2"
            >
              <h2
                className="text-[#21313c]"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 800,
                  fontSize: isMobile ? '16px' : '36px',
                  lineHeight: '1.25',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">Building bridges between</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">generations of excellence,</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">where mentorship meets</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">opportunity.</span>
                </span>
              </h2>
            </div>
          </div>

          {/* Block 2 - Text Left, Image Right */}
          <div className="flex flex-row items-center gap-4 md:gap-16">
            {/* Text in front */}
            <div
              ref={showcaseText2Ref}
              className="w-1/2"
            >
              <h2
                className="text-[#21313c] text-right"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 800,
                  fontSize: isMobile ? '16px' : '36px',
                  lineHeight: '1.25',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">From campus corridors</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">to boardrooms worldwide,</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">our legacy continues</span>
                </span>
                <span className="showcase-text-line block overflow-hidden">
                  <span className="inline-block">to inspire.</span>
                </span>
              </h2>
            </div>

            {/* Image */}
            <div
              className="w-1/2 rounded-2xl md:rounded-3xl overflow-hidden"
              style={{ height: isMobile ? '180px' : '380px' }}
            >
              <img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni3.jpg"
                alt="Alumni success stories"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Centered Layout */}
      <section id="services" className="py-20 md:py-32 bg-[#f5f5f5] overflow-hidden">
        {/* Top - Heading */}
        <motion.div
          className="px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-[#21313c]"
            style={{
              fontFamily: 'Inter, Arial Black, sans-serif',
              fontSize: isMobile ? '18px' : '36px',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
            }}
          >
            Comprehensive services designed<br />
            to support your journey<br />
            beyond graduation.
          </h2>
        </motion.div>

        {/* Center - Carousel with Step Scroll */}
        <div className="w-full overflow-hidden" style={{ minHeight: isMobile ? '420px' : '620px' }}>
          <div
            ref={serviceContainerRef}
            className="flex gap-5 pb-8"
            style={{
              width: 'max-content',
              transform: `translateX(calc(50vw - ${(isMobile ? 200 : 300) / 2}px - ${activeServiceIndex * ((isMobile ? 200 : 300) + 20)}px))`,
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {triplicatedServices.map((service, index) => {
              const actualActiveIndex = activeServiceIndex % services.length;
              const isActive = index % services.length === actualActiveIndex;
              return (
              <div
                key={`${service.title}-${index}`}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  width: isMobile ? '200px' : '300px',
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1)' : 'scale(0.9)',
                  transition: 'opacity 0.5s, transform 0.5s',
                }}
                onClick={() => {
                  // Set to the clicked card's position in the middle set
                  const serviceIndex = index % services.length;
                  setActiveServiceIndex(services.length + serviceIndex);
                }}
              >
                {/* Main Card Container */}
                <div className="bg-white rounded-3xl p-4 shadow-sm">
                  {/* Card Image with hover zoom */}
                  <div
                    className="relative overflow-hidden rounded-2xl mb-4"
                    style={{ height: isMobile ? '160px' : '280px' }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  {/* Card Title */}
                  <h3
                    className="text-[#21313c] font-medium px-1"
                    style={{ fontSize: isMobile ? '13px' : '20px' }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Service Details - Show when active */}
                <div
                  className="bg-white rounded-3xl p-5 mt-4 shadow-sm transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    maxHeight: isActive ? '200px' : '0px',
                    padding: isActive ? '20px' : '0px 20px',
                    marginTop: isActive ? '16px' : '0px',
                    overflow: 'hidden',
                  }}
                >
                  <p className="text-[#999] text-sm mb-3">Service Overview</p>
                  <p
                    className="text-[#21313c] leading-relaxed mb-4"
                    style={{ fontSize: isMobile ? '13px' : '15px' }}
                  >
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="text-[#21313c] font-medium text-sm hover:text-[#027ea1] transition-colors"
                  >
                    Explore Service
                  </a>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notable Alumni Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex flex-row items-end justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
                Recognition
              </span>
              <h2
                className="text-xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                Alumni{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                  Award
                </span>
                {' '}Recipients
              </h2>
              <p className="text-[#999] text-xs sm:text-sm mt-1" style={{ letterSpacing: '0.05em' }}>
                Last 3 Years
              </p>
              <p className="text-[#666] mt-2 md:mt-4 max-w-xl text-xs md:text-base">
                Celebrating alumni who have excelled in their respective fields and brought pride to the JLU community.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => scrollToAlumni(Math.max(0, activeAlumniIndex - 1))}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#21313c]/20 flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30"
                  disabled={activeAlumniIndex === 0}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                    <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => scrollToAlumni(Math.min(notableAlumni.length - 1, activeAlumniIndex + 1))}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#21313c]/20 flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30"
                  disabled={activeAlumniIndex === notableAlumni.length - 1}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-5 md:h-5">
                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
          </motion.div>

          {/* Alumni Cards Carousel */}
          <div
            ref={alumniScrollRef}
            className="flex gap-3 md:gap-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {notableAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="flex-shrink-0 bg-[#f6f7f0] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
                style={{
                  width: isMobile ? '220px' : '380px',
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="relative h-32 md:h-56 overflow-hidden">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#21313c]/50" />

                  <span className="absolute top-2 right-2 md:top-4 md:right-4 px-2 py-0.5 md:px-3 md:py-1 bg-[#027ea1] text-white text-[11px] md:text-xs font-semibold rounded-full">
                    Batch {alumni.batch}
                  </span>

                  <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                    <h3 className="text-sm md:text-xl font-semibold text-white">{alumni.name}</h3>
                    <p className="text-white/80 text-[12px] md:text-sm">{alumni.designation} at {alumni.company}</p>
                  </div>
                </div>

                <div className="p-3 md:p-6">
                  <p className="text-[#666] text-[12px] md:text-sm mb-2 md:mb-4">{alumni.achievement}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="flex items-center gap-1 md:gap-2 text-[#027ea1] font-medium text-[12px] md:text-sm hover:text-[#21313c] transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="md:w-4 md:h-4">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect
                    </a>
                    <a
                      href="#"
                      className="text-[#21313c]/60 text-[12px] md:text-sm hover:text-[#21313c] transition-colors"
                    >
                      Read Story →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#21313c] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold">
              Testimonials
            </span>
            <h2
              className="text-xl md:text-4xl lg:text-5xl font-semibold text-white"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Voices of{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                Alumni
              </span>
            </h2>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row items-center gap-4 md:gap-12"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 md:border-4 border-[#027ea1] flex-shrink-0">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-left">
                  <svg className="w-6 h-6 md:w-10 md:h-10 text-[#027ea1]/30 mb-2 md:mb-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-white/90 text-xs md:text-xl lg:text-2xl leading-relaxed mb-3 md:mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <p className="text-[#027ea1] font-semibold text-sm md:text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-white/60 text-[12px] md:text-sm">Batch {testimonials[activeTestimonial].batch} | {testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  activeTestimonial === index ? 'bg-[#027ea1] scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-4 gap-12">
            {alumniStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <span className="text-xl md:text-5xl lg:text-6xl font-bold text-[#21313c] block mb-1 md:mb-2">
                  {stat.value}
                </span>
                <span className="text-[#666] text-[11px] md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20">
        <div className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 rounded-xl md:rounded-3xl lg:rounded-4xl" style={{ maxWidth: '1400px' }}>
          <motion.div
            className="text-center mb-6 md:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
              Alumni Network
            </span>
            <h2 className="text-white" style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Ready to{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Reconnect?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Join thousands of JLU alumni who are already networking, mentoring, and growing together.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto mb-10">
            <a
              href="https://alumni.jlu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full"
            >
              Register Now <span>→</span>
            </a>
            <a
              href="mailto:alumni@jlu.edu.in"
              className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center"
            >
              Contact Us
            </a>
          </div>

          {/* Contact Info */}
          <motion.div
            className="grid grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1 md:mb-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-white/60 text-[11px] md:text-xs mb-0.5">Phone</p>
              <p className="text-white font-medium text-[12px] md:text-sm">0755-6611152</p>
            </div>
            <div>
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1 md:mb-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-[11px] md:text-xs mb-0.5">Email</p>
              <p className="text-white font-medium text-[12px] md:text-sm">alumni@jlu.edu.in</p>
            </div>
            <div>
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#027ea1] flex items-center justify-center mx-auto mb-1 md:mb-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-[11px] md:text-xs mb-0.5">Address</p>
              <p className="text-white font-medium text-[12px] md:text-sm">JLU, Bhopal - 462044, MP</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Scrollbar Hide + Performance Optimizations */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hero-text-line > span,
        .showcase-text-line > span {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
