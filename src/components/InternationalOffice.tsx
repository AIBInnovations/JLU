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

const partners = [
  { id: 1, name: 'Harvard University', column: 1 },
  { id: 2, name: 'University of Melbourne', column: 2 },
  { id: 3, name: 'NUS Singapore', column: 1 },
  { id: 4, name: 'LSE London', column: 2 },
  { id: 5, name: 'University of Toronto', column: 1 },
  { id: 6, name: 'ETH Zurich', column: 2 },
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
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            YOUR <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>global</span> JOURNEY
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            The International Office supports students from across the world — from admissions and visas to campus life and global opportunities.
          </p>
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
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(5rem, 12vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
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
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '400px' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
                Global partnerships<br />that open doors
              </h2>
              <p className="text-base text-[#666666] leading-relaxed">
                Our university collaborates with institutions worldwide to enable exchange programs, joint research, and global learning pathways. We believe in borderless education.
              </p>
            </div>

            {/* Right Side - Partners Grid */}
            <div className="flex-1">
              <div className="flex" style={{ gap: '80px' }}>
                {/* Column 1 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 1).map((partner) => (
                    <div
                      key={partner.id}
                      className="py-4 border-b border-gray-200"
                    >
                      <span className="text-lg text-[#888888]">{partner.name}</span>
                    </div>
                  ))}
                </div>
                {/* Column 2 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 2).map((partner) => (
                    <div
                      key={partner.id}
                      className="py-4 border-b border-gray-200"
                    >
                      <span className="text-lg text-[#888888]">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium hover:underline">
                  View all 150+ Partners
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Foundation & Prep Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Foundation & Prep
          </h2>

          <div className="flex" style={{ gap: '64px' }}>
            {/* Image */}
            <div
              className="relative shrink-0 overflow-hidden rounded-lg"
              style={{ width: '580px', height: '580px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
                alt="Pathway Programs"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                Pathway programs for a<br />smooth transition
              </h3>
              <p className="text-base text-[#666666] leading-relaxed mb-8">
                Designed for international students to build academic readiness and cultural confidence before entering full-time degree programs.
              </p>

              {/* Features List */}
              <div className="flex flex-col gap-4 mb-8">
                {pathwayFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-[#666666]">✓</span>
                    <span className="text-base text-[#21313c]">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 text-[#21313c] font-medium rounded-full hover:bg-gray-50 transition-colors w-fit"
              >
                Explore pathway programs
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Summer Schools Section */}
      <div className="w-full bg-[#d9d9d9]">
        <div
          className="mx-auto flex flex-col items-center justify-center"
          style={{
            maxWidth: '1440px',
            height: '480px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
            gap: '44px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] text-center">
            Summer schools that<br />connect cultures
          </h2>
          <p className="text-base text-[#666666] text-center max-w-2xl">
            Short-term international programs that combine academic learning, cultural exposure, and global networking in a vibrant environment.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#21313c] font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            View summer schools
            <span>→</span>
          </a>
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
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-4">
              Visa & immigration support you<br />can rely on
            </h2>
            <p className="text-base text-[#666666] max-w-2xl mx-auto">
              Navigating immigration can be complex. Our dedicated team is here to guide you every step of the way, ensuring legal compliance and peace of mind.
            </p>
          </div>

          {/* Support Cards */}
          <div className="flex justify-between">
            {visaSupport.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8f8f8] p-6"
                style={{ width: '270px' }}
              >
                {/* Icon Placeholder */}
                <div
                  className="bg-[#d9d9d9] mb-6"
                  style={{ width: '48px', height: '48px', borderRadius: '8px' }}
                />
                <h3 className="text-lg font-bold text-[#21313c] mb-3">{item.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Life in Bhopal Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '500px' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
                Life in Bhopal
              </h2>
              <p className="text-base text-[#666666] leading-relaxed mb-10">
                Discover a city that blends culture, safety, affordability, and student-friendly living. Known as the City of Lakes, Bhopal offers a serene environment perfect for academic focus and cultural exploration.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                {bhopalFeatures.map((feature) => (
                  <div key={feature.id}>
                    <h3 className="text-lg font-bold text-[#21313c] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#666666]">{feature.description}</p>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 text-[#21313c] font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Explore life in Bhopal
                <span>→</span>
              </a>
            </div>

            {/* Right Side - Image */}
            <div
              className="relative shrink-0 overflow-hidden rounded-lg"
              style={{ width: '580px', height: '624px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80"
                alt="Life in Bhopal"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { InternationalOffice };
export default InternationalOffice;
