'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';
import { PageEventsSection } from './PageEventsSection';

gsap.registerPlugin(ScrollTrigger);

interface Program {
  name: string;
  duration: string;
  type: 'undergraduate' | 'postgraduate' | 'research';
}

interface Stat {
  value: string;
  label: string;
}

interface Highlight {
  title: string;
  description: string;
}

interface FacultyMember {
  name: string;
  designation: string;
  qualification: string;
  image: string;
  specialization?: string;
}

interface FacultyPageProps {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  programs: Program[];
  stats: Stat[];
  highlights: Highlight[];
  features: string[];
  partnerships?: string[];
  facultyMembers?: FacultyMember[];
}

// Default faculty members if none provided (6 members: 3 left, 3 right)
const defaultFacultyMembers: FacultyMember[] = [
  {
    name: 'Dr. Rajesh Kumar',
    designation: 'Professor & Head',
    qualification: 'Ph.D., M.Tech',
    image: '/posthero1.jpg',
    specialization: 'Research & Innovation',
  },
  {
    name: 'Dr. Priya Sharma',
    designation: 'Associate Professor',
    qualification: 'Ph.D., MBA',
    image: '/posthero2.jpg',
    specialization: 'Strategy & Leadership',
  },
  {
    name: 'Prof. Amit Verma',
    designation: 'Assistant Professor',
    qualification: 'M.Tech, B.Tech',
    image: '/posthero3.jpg',
    specialization: 'Technology & Systems',
  },
  {
    name: 'Dr. Sneha Patel',
    designation: 'Associate Professor',
    qualification: 'Ph.D., M.Sc',
    image: '/posthero1.jpg',
    specialization: 'Analytics & Data Science',
  },
  {
    name: 'Prof. Vikram Singh',
    designation: 'Assistant Professor',
    qualification: 'MBA, B.Com',
    image: '/posthero2.jpg',
    specialization: 'Finance & Economics',
  },
  {
    name: 'Dr. Ananya Gupta',
    designation: 'Associate Professor',
    qualification: 'Ph.D., M.A.',
    image: '/posthero3.jpg',
    specialization: 'Communication & Media',
  },
];

export const FacultyPage = ({
  name,
  tagline,
  description: _description,
  heroImage,
  accentColor,
  programs,
  stats: _stats,
  highlights: _highlights,
  features: _features,
  partnerships,
  facultyMembers = defaultFacultyMembers,
}: FacultyPageProps) => {
  // Reserved for future use
  void _description;
  void _stats;
  void _highlights;
  void _features;
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const facultySectionRef = useRef<HTMLDivElement>(null);
  const facultyTextRef = useRef<HTMLDivElement>(null);
  const facultyCardsRef = useRef<HTMLDivElement>(null);
  const partnershipsSectionRef = useRef<HTMLDivElement>(null);
  const partnershipsTextRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeProgramTab, setActiveProgramTab] = useState<'undergraduate' | 'postgraduate' | 'research'>('undergraduate');
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const triggers: ScrollTrigger[] = [];

    // Hero parallax effect
    if (heroImageRef.current) {
      const parallax = gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      if (parallax.scrollTrigger) triggers.push(parallax.scrollTrigger);
    }

    // Stats animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-item');
      statElements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    // Programs stagger animation
    if (programsRef.current) {
      const programCards = programsRef.current.querySelectorAll('.program-card');
      programCards.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    // About section text animation
    if (aboutTextRef.current) {
      const aboutLines = aboutTextRef.current.querySelectorAll('.about-text-line > span');
      gsap.set(aboutLines, { y: '100%' });

      aboutLines.forEach((line, index) => {
        const startPercent = 100 - (index * 5);
        const endPercent = 50 - (index * 5);

        gsap.to(line, {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: aboutTextRef.current,
            start: `top ${startPercent}%`,
            end: `top ${Math.max(endPercent, 10)}%`,
            scrub: 2,
          },
        });
      });
    }

    // Faculty section - Pinned with smooth animations
    if (facultySectionRef.current && facultyCardsRef.current && facultyTextRef.current) {
      // Get elements
      const textLines = facultyTextRef.current.querySelectorAll('.faculty-text-line > span');
      const cards = facultyCardsRef.current.querySelectorAll('.faculty-card');

      // Set initial states immediately
      gsap.set(textLines, { y: '100%' });
      gsap.set(cards, { yPercent: 100 }); // Cards start 100% below (hidden by overflow)

      // Text lines - reveal very slowly, each line staggered (7 lines)
      textLines.forEach((line, index) => {
        const startPercent = 120 - (index * 4);  // 120%, 116%, 112%, 108%, 104%, 100%, 96%...
        const endPercent = 40 - (index * 4);     // 40%, 36%, 32%, 28%, 24%, 20%, 16%...

        gsap.to(line, {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: facultySectionRef.current,
            start: `top ${startPercent}%`,
            end: `top ${Math.max(endPercent, 5)}%`,
            scrub: 2,
          },
        });
      });

      // Pin the section - starts after text is revealed
      const pinTrigger = ScrollTrigger.create({
        trigger: facultySectionRef.current,
        start: 'top top',
        end: '+=80%',
        pin: true,
        pinSpacing: true,
      });
      triggers.push(pinTrigger);

      // Cards - all slide up together while pinned
      gsap.to(cards, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: facultySectionRef.current,
          start: 'top top',
          end: '+=60%',
          scrub: 0.5,
        },
      });
    }

    // Partnerships section - text reveals line by line from behind cards
    if (partnershipsSectionRef.current && partnershipsTextRef.current) {
      const partnershipLines = partnershipsTextRef.current.querySelectorAll('.partnership-text-line > span');
      gsap.set(partnershipLines, { y: '100%' });

      partnershipLines.forEach((line, index) => {
        const startPercent = 100 - (index * 4);
        const endPercent = 50 - (index * 4);

        gsap.to(line, {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: partnershipsSectionRef.current,
            start: `top ${startPercent}%`,
            end: `top ${Math.max(endPercent, 10)}%`,
            scrub: 2,
          },
        });
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [mounted]);

  const undergraduatePrograms = programs.filter((p) => p.type === 'undergraduate');
  const postgraduatePrograms = programs.filter((p) => p.type === 'postgraduate');
  const researchPrograms = programs.filter((p) => p.type === 'research');

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <div className="bg-[#f6f7f0]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 w-full h-[130%]"
          style={{ top: '-15%' }}
        >
          <img
            src={heroImage}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-24">
          <p
            className="text-xs md:text-sm mb-4"
            style={{ color: accentColor, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            FACULTY
          </p>
          <h1
            className="text-white mb-6"
            style={{
              fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '800px',
            }}
          >
            {name}
          </h1>
          <p
            className="text-white/80 mb-8"
            style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
          >
            {tagline}
          </p>
          <div
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: accentColor,
            }}
          />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              EXPLORE
            </span>
            <div className="w-px h-10 bg-white/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div ref={aboutTextRef} className="flex flex-col justify-center text-center">
              <h2
                className="text-[#21313c] mb-6"
                style={{
                  fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                Shaping{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                  Future Leaders
                </span>
              </h2>
              <div
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 900,
                  fontSize: isMobile ? '22px' : '32px',
                  lineHeight: '1.3',
                  letterSpacing: '-0.02em',
                  color: '#21313c',
                }}
              >
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">The Faculty of Law is committed</span>
                </span>
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">to exposing students to various</span>
                </span>
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">perspectives of legal knowledge</span>
                </span>
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">and equipping them for</span>
                </span>
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">contemporary challenges</span>
                </span>
                <span className="about-text-line block overflow-hidden">
                  <span className="inline-block">in the legal field.</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4" style={{ marginLeft: isMobile ? '0' : '100px' }}>
              {/* Card 1 - Moot Court Excellence */}
              <div
                className="p-6 rounded-xl bg-[#21313c]"
                style={{
                  width: isMobile ? '100%' : '320px',
                }}
              >
                <h3 className="font-bold text-white text-lg mb-2">Moot Court Excellence</h3>
                <p className="text-white/70 text-base leading-relaxed">Well-appointed Moot Court for practice-based education with regular national and international moot court competitions.</p>
              </div>

              {/* Card 2 - International Standards (shifted right) */}
              <div
                className="p-6 rounded-xl bg-white shadow-lg"
                style={{
                  width: isMobile ? '100%' : '320px',
                  marginLeft: isMobile ? '0' : '150px',
                }}
              >
                <h3 className="font-bold text-[#21313c] text-lg mb-2">International Standards</h3>
                <p className="text-[#21313c]/70 text-base leading-relaxed">Programs mapped to European Teaching and Learning standards via EU&apos;s Erasmus+ funded Tuning India project.</p>
              </div>

              {/* Card 3 - Global Network */}
              <div
                className="p-6 rounded-xl bg-[#21313c]"
                style={{
                  width: isMobile ? '100%' : '320px',
                }}
              >
                <h3 className="font-bold text-white text-lg mb-2">Global Network</h3>
                <p className="text-white/70 text-base leading-relaxed">Partnerships with IALS, European Law Institute, and World Bank&apos;s Global Forum on Law, Justice and Development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Faculty Section */}
      <section
        ref={facultySectionRef}
        className="px-6 md:px-16 xl:px-24 bg-[#f0f0ec] overflow-hidden relative"
        style={{ height: '100vh' }}
      >
        <div className="max-w-[1440px] mx-auto w-full h-full flex items-center">
          <div ref={facultyCardsRef} className="flex items-center justify-between w-full gap-8 lg:gap-12" style={{ willChange: 'transform' }}>
            {/* Left Side - 3 Faculty Cards */}
            <div className="flex flex-col gap-4">
              {facultyMembers.slice(0, 3).map((member, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl"
                  style={{
                    width: isMobile ? '120px' : '200px',
                    height: isMobile ? '150px' : '260px',
                    marginLeft: index === 1 ? (isMobile ? '30px' : '50px') : '0',
                  }}
                >
                  <div
                    className="faculty-card group cursor-pointer bg-white w-full h-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#21313c]/20 group-hover:bg-[#21313c]/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <p className="text-xs text-white/80">{member.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center - Text Content */}
            <div className="relative flex-1 max-w-[520px]">
              <div
                ref={facultyTextRef}
                className="text-center px-4"
              >
                <h2
                  className="text-[#21313c]"
                  style={{
                    fontFamily: 'Inter, Arial Black, sans-serif',
                    fontWeight: 900,
                    fontSize: isMobile ? '24px' : '38px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">Distinguished educators</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">bringing</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">years of industry</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">experience</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">and academic excellence,</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">committed to shaping</span>
                  </span>
                  <span className="faculty-text-line block overflow-hidden">
                    <span className="inline-block">tomorrow&apos;s leaders.</span>
                  </span>
                </h2>
                <a
                  href="/faculty-members"
                  className="faculty-text-line inline-flex items-center gap-3 mt-10 group overflow-hidden"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#21313c',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span className="inline-block">View All Faculty</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover:translate-x-2 transition-transform"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="#21313c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - 3 Faculty Cards */}
            <div className="flex flex-col gap-4 items-end">
              {facultyMembers.slice(3, 6).map((member, index) => (
                <div
                  key={index + 3}
                  className="overflow-hidden rounded-xl"
                  style={{
                    width: isMobile ? '120px' : '200px',
                    height: isMobile ? '150px' : '260px',
                    marginRight: index === 1 ? (isMobile ? '30px' : '50px') : '0',
                  }}
                >
                  <div
                    className="faculty-card group cursor-pointer bg-white w-full h-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#21313c]/20 group-hover:bg-[#21313c]/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-semibold text-sm">{member.name}</h3>
                        <p className="text-xs text-white/80">{member.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section - Table Style */}
      <section ref={programsRef} className="py-20 md:py-32 px-6 md:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-[#21313c] mb-8 md:mb-12"
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Academic{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              Excellence
            </span>
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-12 flex-wrap">
            {[
              { key: 'undergraduate' as const, label: 'UG Programs', count: undergraduatePrograms.length },
              { key: 'postgraduate' as const, label: 'PG Programs', count: postgraduatePrograms.length },
              { key: 'research' as const, label: 'Research', count: researchPrograms.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveProgramTab(tab.key)}
                className={`px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all flex items-center gap-2 rounded-full ${
                  activeProgramTab === tab.key
                    ? 'bg-[#21313c] text-white'
                    : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0] border border-[#e5e5e5]'
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeProgramTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f6f7f0] text-[#666]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table Header - Desktop */}
          {!isMobile && (
            <div
              className="grid gap-8 pb-4 mb-2"
              style={{
                gridTemplateColumns: '1fr 150px 120px',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Program</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Duration</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Type</span>
            </div>
          )}

          {/* Programs List */}
          <div className="flex flex-col gap-3 md:gap-0">
            {(activeProgramTab === 'undergraduate' ? undergraduatePrograms :
              activeProgramTab === 'postgraduate' ? postgraduatePrograms : researchPrograms
            ).map((program, index) => (
              <div
                key={index}
                className={`program-card group cursor-pointer transition-colors ${
                  isMobile
                    ? 'bg-[#f9f9f9] rounded-xl p-4 hover:bg-[#f0f0f0]'
                    : 'grid gap-8 py-5 hover:bg-[#fafafa]'
                }`}
                style={!isMobile ? {
                  gridTemplateColumns: '1fr 150px 120px',
                  borderBottom: '1px solid #f0f0f0',
                } : {}}
              >
                {isMobile ? (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-[#21313c] font-medium text-sm leading-tight">
                        {program.name}
                      </span>
                      <span className="text-[#21313c] text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#666]">
                      <span>{program.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                      <span className="capitalize">{program.type}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-[#21313c] font-medium group-hover:text-[#666] transition-colors" style={{ fontSize: '17px' }}>
                        {program.name}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#21313c]">→</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#666] text-sm">{program.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-3 py-1 text-xs font-medium text-[#21313c] bg-[#f6f7f0] rounded capitalize">
                        {program.type}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Results Summary */}
          <div className="mt-8 md:mt-12 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid #e5e5e5' }}>
            <span className="text-xs md:text-sm text-[#666]">
              Showing {(activeProgramTab === 'undergraduate' ? undergraduatePrograms :
                activeProgramTab === 'postgraduate' ? postgraduatePrograms : researchPrograms).length} programs
            </span>
            <span className="text-xs text-[#999]">
              {undergraduatePrograms.length} UG · {postgraduatePrograms.length} PG · {researchPrograms.length} Research
            </span>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      {partnerships && partnerships.length > 0 && (
        <section
          ref={partnershipsSectionRef}
          className="pt-20 md:pt-32 px-0 bg-[#21313c] pb-0 relative overflow-hidden"
        >
          {/* Text positioned above cards with reveal animation */}
          <div className="max-w-7xl mx-auto px-6 md:px-16 xl:px-24 mb-12">
            <div
              ref={partnershipsTextRef}
              className="text-center"
              style={{ zIndex: 1 }}
            >
              <h2
                className="text-white"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 900,
                  fontSize: isMobile ? '24px' : '38px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">Global Collaborations</span>
                </span>
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">with international universities</span>
                </span>
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">offering exchange programs,</span>
                </span>
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">semester abroad, and</span>
                </span>
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">summer schools enriching</span>
                </span>
                <span className="partnership-text-line block overflow-hidden">
                  <span className="inline-block">students with global exposure.</span>
                </span>
              </h2>
            </div>
          </div>

          {/* Partnership Cards with Images - positioned at bottom */}
          <div
            className="flex items-end justify-between w-full relative"
            style={{
              gap: isMobile ? '8px' : '16px',
              padding: isMobile ? '0 8px' : '0 16px',
              marginTop: isMobile ? '80px' : '120px',
              zIndex: 2,
            }}
          >
            {/* Card 1 - Harvard/Education themed */}
            <div
              className="relative overflow-hidden group cursor-pointer flex-1"
              style={{
                height: isMobile ? '140px' : '280px',
                borderRadius: isMobile ? '12px 12px 0 0' : '20px 20px 0 0',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=400&q=80"
                alt={partnerships[0] || 'Partner'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-medium leading-tight">
                  {partnerships[0] || 'Partner 1'}
                </p>
              </div>
            </div>

            {/* Card 2 - Business/Corporate themed */}
            <div
              className="relative overflow-hidden group cursor-pointer flex-1"
              style={{
                height: isMobile ? '180px' : '380px',
                borderRadius: isMobile ? '12px 12px 0 0' : '20px 20px 0 0',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80"
                alt={partnerships[1] || 'Partner'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-medium leading-tight">
                  {partnerships[1] || 'Partner 2'}
                </p>
              </div>
            </div>

            {/* Card 3 - Finance/Trading themed */}
            <div
              className="relative overflow-hidden group cursor-pointer flex-1"
              style={{
                height: isMobile ? '120px' : '240px',
                borderRadius: isMobile ? '12px 12px 0 0' : '20px 20px 0 0',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80"
                alt={partnerships[2] || 'Partner'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-medium leading-tight">
                  {partnerships[2] || 'Partner 3'}
                </p>
              </div>
            </div>

            {/* Card 4 - Global Network themed */}
            <div
              className="relative overflow-hidden group cursor-pointer flex-1"
              style={{
                height: isMobile ? '160px' : '320px',
                borderRadius: isMobile ? '12px 12px 0 0' : '20px 20px 0 0',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=80"
                alt={partnerships[3] || 'Partner'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-medium leading-tight">
                  {partnerships[3] || 'Partner 4'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      <PageEventsSection />

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-16 xl:px-24 bg-[#f6f7f0]">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs mb-4"
            style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            START YOUR JOURNEY
          </p>
          <h2
            className="text-[#21313c] mb-8"
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Ready to Shape Your{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Future?</span>
          </h2>
          <p style={{ color: '#666', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Take the first step towards an extraordinary education. Apply now and become part of our
            vibrant academic community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/apply"
              className="px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform bg-[#21313c] text-white"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-full font-semibold border-2 hover:bg-[#21313c] hover:text-white transition-colors"
              style={{ borderColor: '#21313c', color: '#21313c' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;
