'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Header, Footer } from '@/components';

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
    image: '/posthero1.jpg',
  },
  {
    title: 'Career Connect',
    description: 'Access exclusive job postings, internships, and career opportunities from our network of 500+ recruiting partners.',
    image: '/posthero2.jpg',
  },
  {
    title: 'Mentorship Program',
    description: 'Give back or get guidance. Our mentorship platform connects experienced alumni with current students.',
    image: '/posthero3.jpg',
  },
  {
    title: 'Business Network',
    description: 'Showcase your business, find partners, and unlock entrepreneurial opportunities within the JLU alumni ecosystem.',
    image: '/j1.jpg',
  },
  {
    title: 'Alumni Chapters',
    description: 'Join regional chapters across India and worldwide. Attend local meetups and community gatherings.',
    image: '/j2.jpg',
  },
  {
    title: 'Events & Reunions',
    description: 'Never miss a reunion, homecoming, or alumni event. Register for upcoming gatherings.',
    image: '/j3.jpg',
  },
];

const notableAlumni = [
  {
    id: '1',
    name: 'Aparna Jha',
    batch: '2018',
    image: '/posthero1.jpg',
    designation: 'Software Developer',
    company: 'Amazon',
    achievement: 'Led development of AWS cloud services used by millions',
  },
  {
    id: '2',
    name: 'Aman Solanki',
    batch: '2019',
    image: '/posthero2.jpg',
    designation: 'Business Analyst',
    company: 'Deloitte',
    achievement: 'Youngest consultant to lead Fortune 500 transformation project',
  },
  {
    id: '3',
    name: 'Soumya Shabani',
    batch: '2020',
    image: '/posthero3.jpg',
    designation: 'Associate Director',
    company: 'HDFC Bank',
    achievement: 'Pioneered digital banking initiatives across 5 states',
  },
  {
    id: '4',
    name: 'Derick Vineet Nathaniel',
    batch: '2017',
    image: '/posthero1.jpg',
    designation: 'Senior Consultant',
    company: 'Infosys',
    achievement: 'Architect of enterprise solutions for global clients',
  },
  {
    id: '5',
    name: 'Kedar Ghimire',
    batch: '2021',
    image: '/posthero2.jpg',
    designation: 'Media Professional',
    company: 'NDTV',
    achievement: 'Award-winning journalist covering national affairs',
  },
  {
    id: '6',
    name: 'Priya Sharma',
    batch: '2016',
    image: '/posthero3.jpg',
    designation: 'Founder & CEO',
    company: 'TechStartup Inc.',
    achievement: 'Built a $10M startup from JLU incubation center',
  },
];

const upcomingEvents = [
  {
    title: 'Annual Alumni Meet 2025',
    date: 'March 15, 2025',
    location: 'JLU Campus, Bhopal',
    type: 'Reunion',
    image: '/e1.jpg',
  },
  {
    title: 'Career Networking Summit',
    date: 'April 5, 2025',
    location: 'Virtual Event',
    type: 'Career',
    image: '/e2.jpg',
  },
  {
    title: 'Entrepreneurship Conclave',
    date: 'April 20, 2025',
    location: 'Delhi NCR Chapter',
    type: 'Business',
    image: '/e3.jpg',
  },
];

const testimonials = [
  {
    quote: "JLU shaped who I am today. The alumni network has been instrumental in my career growth, connecting me with mentors and opportunities I never imagined possible.",
    name: "Rajesh Kumar",
    batch: "2014",
    role: "VP Engineering, Microsoft",
    image: "/posthero1.jpg"
  },
  {
    quote: "From campus to corporate, the JLU family has always been there. The mentorship program helped me navigate my early career challenges with confidence.",
    name: "Sneha Patel",
    batch: "2017",
    role: "Product Manager, Google",
    image: "/posthero2.jpg"
  },
  {
    quote: "The business connect platform helped me find co-founders for my startup. Today, we're a team of 50, all thanks to the JLU alumni ecosystem.",
    name: "Vikram Singh",
    batch: "2016",
    role: "Founder, InnovateTech",
    image: "/posthero3.jpg"
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
      const cardWidth = isMobile ? 300 : 380;
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
      {/* Fixed Header */}
      <Header />

      {/* Hero Section with Full Image and Scroll Animation */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/alumni1.jpg"
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
                fontSize: isMobile ? '20px' : '32px',
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
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Image */}
            <div
              className="w-full md:w-1/2 rounded-2xl md:rounded-3xl overflow-hidden"
              style={{ height: isMobile ? '280px' : '380px' }}
            >
              <img
                src="/alumni2.jpg"
                alt="Alumni gathering"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text in front */}
            <div
              ref={showcaseText1Ref}
              className="w-full md:w-1/2"
            >
              <h2
                className="text-[#21313c]"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 800,
                  fontSize: isMobile ? '24px' : '36px',
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
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            {/* Text in front */}
            <div
              ref={showcaseText2Ref}
              className="w-full md:w-1/2"
            >
              <h2
                className="text-[#21313c] md:text-right"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 800,
                  fontSize: isMobile ? '24px' : '36px',
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
              className="w-full md:w-1/2 rounded-2xl md:rounded-3xl overflow-hidden"
              style={{ height: isMobile ? '280px' : '380px' }}
            >
              <img
                src="/alumni3.jpg"
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
              fontSize: isMobile ? '24px' : '36px',
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
        <div className="w-full overflow-hidden">
          <div
            ref={serviceContainerRef}
            className="flex gap-5 pb-8"
            style={{
              width: 'max-content',
              transform: `translateX(calc(50vw - ${(isMobile ? 260 : 300) / 2}px - ${activeServiceIndex * ((isMobile ? 260 : 300) + 20)}px))`,
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
                  width: isMobile ? '260px' : '300px',
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
                    style={{ height: isMobile ? '240px' : '280px' }}
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
                    style={{ fontSize: isMobile ? '18px' : '20px' }}
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
                    style={{ fontSize: isMobile ? '14px' : '15px' }}
                  >
                    {service.description}
                  </p>
                  <a
                    href="#"
                    className="text-[#21313c] font-medium text-sm hover:text-[#4a90a4] transition-colors"
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
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="text-sm font-medium text-[#4a90a4] tracking-wider uppercase mb-4 block">
                Success Stories
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                Notable{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                  Alumni
                </span>
              </h2>
              <p className="text-[#666] mt-4 max-w-xl">
                Our alumni are making waves across industries worldwide, leading innovation and driving change.
              </p>
            </div>

            {/* Navigation Arrows */}
            {!isMobile && (
              <div className="flex gap-3">
                <button
                  onClick={() => scrollToAlumni(Math.max(0, activeAlumniIndex - 1))}
                  className="w-12 h-12 rounded-full border-2 border-[#21313c]/20 flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30"
                  disabled={activeAlumniIndex === 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => scrollToAlumni(Math.min(notableAlumni.length - 1, activeAlumniIndex + 1))}
                  className="w-12 h-12 rounded-full border-2 border-[#21313c]/20 flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30"
                  disabled={activeAlumniIndex === notableAlumni.length - 1}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </motion.div>

          {/* Alumni Cards Carousel */}
          <div
            ref={alumniScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {notableAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="flex-shrink-0 bg-[#f6f7f0] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
                style={{
                  width: isMobile ? '300px' : '380px',
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#21313c]/50" />

                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#efc04b] text-[#21313c] text-xs font-semibold rounded-full">
                    Batch {alumni.batch}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{alumni.name}</h3>
                    <p className="text-white/80 text-sm">{alumni.designation} at {alumni.company}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[#666] text-sm mb-4">{alumni.achievement}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-[#4a90a4] font-medium text-sm hover:text-[#21313c] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect
                    </a>
                    <a
                      href="#"
                      className="text-[#21313c]/60 text-sm hover:text-[#21313c] transition-colors"
                    >
                      Read Story →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-4">
              {notableAlumni.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToAlumni(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeAlumniIndex === index ? 'w-6 bg-[#21313c]' : 'bg-[#21313c]/20'
                  }`}
                />
              ))}
            </div>
          )}
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
            <span className="text-sm font-medium text-[#efc04b] tracking-wider uppercase mb-4 block">
              Testimonials
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Voices of{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
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
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Image */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#efc04b] flex-shrink-0">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  <svg className="w-10 h-10 text-[#efc04b]/30 mb-4 mx-auto md:mx-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <p className="text-[#efc04b] font-semibold text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-white/60 text-sm">Batch {testimonials[activeTestimonial].batch} | {testimonials[activeTestimonial].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index ? 'bg-[#efc04b] scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <span className="text-sm font-medium text-[#4a90a4] tracking-wider uppercase mb-4 block">
                Mark Your Calendar
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                Upcoming{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                  Events
                </span>
              </h2>
            </div>
            <a
              href="https://alumni.jlu.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4a90a4] font-semibold hover:text-[#21313c] transition-colors"
            >
              View All Events
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#21313c]/30" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#efc04b] text-[#21313c] text-xs font-semibold rounded-full">
                    {event.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#21313c] mb-3 group-hover:text-[#4a90a4] transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-[#666]">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a90a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a90a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {alumniStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21313c] block mb-2">
                  {stat.value}
                </span>
                <span className="text-[#666] text-sm md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12 bg-[#21313c] relative overflow-hidden">
        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-3"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Ready to{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                Reconnect?
              </span>
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto mb-6">
              Join thousands of JLU alumni who are already networking, mentoring, and growing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <a
                href="https://alumni.jlu.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#efc04b] text-[#21313c] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4a93d] transition-all shadow-lg inline-flex items-center justify-center gap-2"
              >
                Register Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="mailto:alumni@jlu.edu.in"
                className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white hover:text-[#21313c] transition-all inline-flex items-center justify-center gap-2"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="grid sm:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs mb-0.5">Email</p>
              <p className="text-white font-medium text-sm">alumni@jlu.edu.in</p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-[#efc04b] flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white/60 text-xs mb-0.5">Address</p>
              <p className="text-white font-medium text-sm">JLU, Bhopal - 462044, MP</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="mt-6 flex justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { name: 'Instagram', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
              { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#efc04b] hover:text-[#21313c] transition-colors group"
                aria-label={social.name}
              >
                <svg className="w-4 h-4 text-white group-hover:text-[#21313c]" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

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
