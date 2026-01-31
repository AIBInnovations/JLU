'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

const partners = [
  { id: 1, name: 'Harvard University', country: 'USA', column: 1 },
  { id: 2, name: 'University of Melbourne', country: 'Australia', column: 2 },
  { id: 3, name: 'NUS Singapore', country: 'Singapore', column: 1 },
  { id: 4, name: 'LSE London', country: 'UK', column: 2 },
  { id: 5, name: 'University of Toronto', country: 'Canada', column: 1 },
  { id: 6, name: 'ETH Zurich', country: 'Switzerland', column: 2 },
];

const pathwayFeatures = [
  'Centres of Excellence',
  'Faculty Research Areas',
  'Interdisciplinary Labs',
];

const journeySteps = [
  {
    id: 1,
    number: '01',
    title: 'Choose program',
    description: 'Explore our wide range of undergraduate and postgraduate courses.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
  },
  {
    id: 2,
    number: '02',
    title: 'Submit application',
    description: 'Complete the online form and upload required documents.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
  },
  {
    id: 3,
    number: '03',
    title: 'Receive offer letter',
    description: 'Successful applicants will receive an offer via email.',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&q=80',
  },
  {
    id: 4,
    number: '04',
    title: 'Apply for visa',
    description: 'Use your offer letter to start your student visa application.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
  },
  {
    id: 5,
    number: '05',
    title: 'Arrive on campus',
    description: 'Book your travel and join us for orientation week.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80',
  },
];

const visaSupport = [
  {
    id: 1,
    title: 'Student Visa Guidance',
    description: 'Comprehensive guides on applying for and maintaining your student visa status throughout your studies.',
  },
  {
    id: 2,
    title: 'Documentation Support',
    description: 'We verify your documents and issue the necessary acceptance letters for a smooth application process.',
  },
  {
    id: 3,
    title: 'Pre-departure Assistance',
    description: 'Webinars and checklists to help you pack, prepare, and plan your travel to India confidently.',
  },
  {
    id: 4,
    title: 'On-arrival Help',
    description: 'Airport pickup coordination and welcome teams to ensure you settle in comfortably from day one.',
  },
];

const bhopalFeatures = [
  {
    id: 1,
    title: 'Safe',
    description: "Consistently ranked as one of India's safest and cleanest cities.",
  },
  {
    id: 2,
    title: 'Affordable',
    description: 'Low cost of living compared to major metros.',
  },
  {
    id: 3,
    title: 'Green',
    description: 'Lush greenery and beautiful lakes create a refreshing atmosphere.',
  },
  {
    id: 4,
    title: 'Cultural',
    description: 'A rich heritage of art, history, and diverse festivals.',
  },
];

// Journey Step type
interface JourneyStep {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

// Timeline Journey Section - Awwwards style with laser light effect
const JourneySection = ({ steps }: { steps: JourneyStep[] }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Laser light follows scroll - stops at final dot
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.3,
        onUpdate: (self) => {
          if (laserRef.current && timelineRef.current) {
            const progress = self.progress;
            const timelineHeight = timelineRef.current.offsetHeight;
            // Stop behind the CTA button
            const maxPosition = timelineHeight * 0.98;
            const position = Math.min(progress * timelineHeight, maxPosition);
            gsap.to(laserRef.current, {
              top: position,
              opacity: 1,
              duration: 0.1,
              ease: 'none',
            });
          }
        },
      });

      // Header animation - starts zoomed in, zooms out on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { scale: 1.3, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }

      // Each step animates in
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        const isLeft = index % 2 === 0;
        const textContent = step.querySelector('.step-content');
        const dot = step.querySelector('.step-dot');

        // Dot animation
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Text content animation
        if (textContent) {
          gsap.fromTo(
            textContent,
            { opacity: 0, x: isLeft ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Image animation - reveal from bottom-right
        const clipWrapper = step.querySelector('.image-clip-wrapper') as HTMLElement;
        if (clipWrapper) {
          gsap.to(clipWrapper, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4">
            Your Journey
          </h2>
          <p className="text-xl md:text-2xl text-[#1a1a1a]/60 max-w-2xl mx-auto">
            International Admissions Process — From application to arrival
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0">
            <div
              ref={timelineRef}
              className="w-full h-full bg-[#1a3a3a]"
            />
          </div>

          {/* Laser Light Effect - Black, stops at CTA */}
          <div
            ref={laserRef}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-12 z-0 opacity-0 pointer-events-none rounded"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #1a1a1a 20%, #1a1a1a 80%, transparent 100%)',
            }}
          />

          {/* Steps */}
          <div className="relative z-5">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`relative flex items-center mb-24 md:mb-32 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className="step-dot absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#1a3a3a] rounded-full z-20 border-4 border-white ring-2 ring-[#1a3a3a]"
                  />

                  {/* Content Side */}
                  <div
                    className={`step-content w-5/12 ${
                      isLeft ? 'pr-12 text-right' : 'pl-12 text-left'
                    }`}
                  >
                    {/* Step Number */}
                    <div
                      className={`inline-flex items-center gap-3 mb-4 ${
                        isLeft ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <span className="text-5xl md:text-6xl font-bold text-[#1a3a3a]">
                        {step.number}
                      </span>
                      <div className="w-12 h-px bg-[#1a1a1a]/30" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-[#1a1a1a]/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for timeline */}
                  <div className="w-2/12" />

                  {/* Image Side */}
                  <div className={`step-image w-5/12 ${isLeft ? 'pl-12' : 'pr-12'}`}>
                    <div className="image-clip-wrapper" style={{ clipPath: isLeft ? 'inset(100% 100% 0 0)' : 'inset(100% 0 0 100%)' }}>
                      <div className="image-container relative aspect-[4/3] overflow-hidden shadow-2xl" style={{ borderRadius: isLeft ? '1rem 1rem 1rem 0' : '1rem 1rem 0 1rem' }}>
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="40vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA at the end */}
            <div className="relative flex justify-center pt-16">
              {/* Final Timeline Dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 bg-[#1a1a1a] rounded-full z-20 flex items-center justify-center border-4 border-white ring-2 ring-[#d4e4a0]"
              >
                <span className="text-white text-sm">✓</span>
              </div>

              <a
                href="#"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#1a1a1a] text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-[#1a3a3a] hover:scale-105 mt-8"
              >
                Start your application
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InternationalOffice = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80"
              alt="International Office"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            YOUR{' '}
            <span
              style={{
                fontFamily: "'Times New Roman', serif",
                fontStyle: 'italic',
                color: '#f0c14b',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              global
            </span>{' '}
            JOURNEY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-relaxed"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            }}
          >
            The International Office supports students from across the world —<br />
            from admissions and visas to campus life and global opportunities.
          </motion.p>
        </motion.div>

        {/* Large "International" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingBottom: '0px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(5rem, 12vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            International
          </motion.h1>
        </div>
      </div>

      {/* Global Partnerships Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between" style={{ gap: '80px' }}>
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              style={{ maxWidth: '480px' }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Global Network
              </span>
              <h2
                className="text-[#21313c] mb-8"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Global partnerships{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  that open doors
                </span>
              </h2>
              <p
                className="text-[#666]"
                style={{ fontSize: '18px', lineHeight: 1.8 }}
              >
                Our university collaborates with institutions worldwide to enable exchange programs, joint research, and global learning pathways. We believe in borderless education.
              </p>
            </motion.div>

            {/* Right Side - Partners Grid */}
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex" style={{ gap: '60px' }}>
                {/* Column 1 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 1).map((partner) => (
                    <motion.div
                      key={partner.id}
                      variants={staggerItem}
                      className="py-5 border-b border-[#e5e5e5] group cursor-pointer"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg text-[#21313c] font-medium block group-hover:text-[#f0c14b] transition-colors">
                        {partner.name}
                      </span>
                      <span className="text-sm text-[#999]">{partner.country}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Column 2 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 2).map((partner) => (
                    <motion.div
                      key={partner.id}
                      variants={staggerItem}
                      className="py-5 border-b border-[#e5e5e5] group cursor-pointer"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg text-[#21313c] font-medium block group-hover:text-[#f0c14b] transition-colors">
                        {partner.name}
                      </span>
                      <span className="text-sm text-[#999]">{partner.country}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                className="flex justify-end mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-3 text-[#21313c] font-medium group"
                  style={{ fontSize: '15px' }}
                  whileHover={{ x: 5 }}
                >
                  View all 150+ Partners
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Foundation & Prep Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Programs
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Foundation &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Prep
              </span>
            </h2>
          </motion.div>

          <div className="flex" style={{ gap: '80px' }}>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: customEase }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: '580px', height: '580px' }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: customEase }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
                  alt="Pathway Programs"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              <h3
                className="text-[#21313c] mb-6"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Pathway programs for a{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  smooth transition
                </span>
              </h3>
              <p
                className="text-[#666] mb-10"
                style={{ fontSize: '18px', lineHeight: 1.8 }}
              >
                Designed for international students to build academic readiness and cultural confidence before entering full-time degree programs.
              </p>

              {/* Features List */}
              <motion.div
                className="flex flex-col gap-5 mb-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {pathwayFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="w-6 h-6 rounded-full bg-[#21313c] text-white flex items-center justify-center"
                      style={{ fontSize: '12px' }}
                    >
                      ✓
                    </span>
                    <span className="text-lg text-[#21313c] font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#21313c] text-white font-medium w-fit"
                style={{ borderRadius: '100px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore pathway programs
                <span>→</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Summer Schools Section */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto flex flex-col items-center justify-center"
          style={{
            maxWidth: '1440px',
            minHeight: '560px',
            paddingTop: '120px',
            paddingRight: '120px',
            paddingBottom: '120px',
            paddingLeft: '120px',
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-white/50 uppercase tracking-widest block mb-8"
              style={{ fontSize: '12px', letterSpacing: '0.3em' }}
            >
              Summer Programs
            </span>
            <h2
              className="text-white mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Summer schools that{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                connect cultures
              </span>
            </h2>
            <p
              className="text-white/70 max-w-2xl mx-auto mb-12"
              style={{ fontSize: '18px', lineHeight: 1.8 }}
            >
              Short-term international programs that combine academic learning, cultural exposure, and global networking in a vibrant environment.
            </p>
            <motion.button
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#21313c] font-semibold"
              style={{ borderRadius: '100px' }}
              whileHover={{ scale: 1.05, backgroundColor: '#f0c14b' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              View summer schools
              <span>→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Your Journey Section - Awwwards-style Animated Timeline */}
      <JourneySection steps={journeySteps} />

      {/* Visa & Immigration Support Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Support Services
            </span>
            <h2
              className="text-[#21313c] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Visa & immigration support{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                you can rely on
              </span>
            </h2>
            <p
              className="text-[#666] max-w-2xl mx-auto"
              style={{ fontSize: '18px', lineHeight: 1.8 }}
            >
              Navigating immigration can be complex. Our dedicated team is here to guide you every step of the way, ensuring legal compliance and peace of mind.
            </p>
          </motion.div>

          {/* Support Cards */}
          <motion.div
            className="grid grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visaSupport.map((item, index) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="bg-[#f6f7f0] p-8 group cursor-pointer"
                style={{ borderRadius: '16px' }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Number */}
                <div
                  className="text-[#f0c14b] font-bold mb-6"
                  style={{ fontSize: '48px', lineHeight: 1 }}
                >
                  0{index + 1}
                </div>
                <h3
                  className="text-[#21313c] mb-4 group-hover:text-[#f0c14b] transition-colors"
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-[#666]" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Life in Bhopal Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between" style={{ gap: '80px' }}>
            {/* Left Side - Content */}
            <motion.div
              style={{ maxWidth: '520px' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                City of Lakes
              </span>
              <h2
                className="text-[#21313c] mb-8"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Life in{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Bhopal
                </span>
              </h2>
              <p
                className="text-[#666] mb-12"
                style={{ fontSize: '18px', lineHeight: 1.8 }}
              >
                Discover a city that blends culture, safety, affordability, and student-friendly living. Known as the City of Lakes, Bhopal offers a serene environment perfect for academic focus and cultural exploration.
              </p>

              {/* Features Grid */}
              <motion.div
                className="grid grid-cols-2 gap-8 mb-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {bhopalFeatures.map((feature) => (
                  <motion.div key={feature.id} variants={staggerItem} className="group">
                    <h3
                      className="text-[#21313c] mb-3 group-hover:text-[#f0c14b] transition-colors"
                      style={{ fontSize: '20px', fontWeight: 600 }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#666]" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#21313c] text-white font-medium"
                style={{ borderRadius: '100px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore life in Bhopal
                <span>→</span>
              </motion.button>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: customEase }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: '580px', height: '680px', borderRadius: '16px' }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: customEase }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80"
                  alt="Life in Bhopal"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span
                  className="text-white/60 uppercase tracking-wider block mb-2"
                  style={{ fontSize: '11px' }}
                >
                  Explore
                </span>
                <h3 className="text-white font-semibold" style={{ fontSize: '24px' }}>
                  The Heart of India
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { InternationalOffice };
export default InternationalOffice;
