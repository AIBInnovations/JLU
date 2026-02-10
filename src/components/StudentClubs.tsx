'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for performance
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

interface Club {
  id: number;
  name: string;
  shortName: string;
  description: string;
  image: string;
}

const clubs: Club[] = [
  {
    id: 1,
    name: 'Student Council',
    shortName: 'Student Council',
    description: 'The voice of every student, shaping campus policies and fostering community spirit through leadership and collaboration.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  },
  {
    id: 2,
    name: 'Sports & Adventure Club',
    shortName: 'Sports & Adventure',
    description: 'Sports and Adventure fills the void between academics, recreation and outdoors. This Club gives an opportunity to participate in competitive sports activities, learn new skills, improve skill levels, and enjoy the recreational and social fellowship derived from sports involvement.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
  },
  {
    id: 3,
    name: 'Photography Club',
    shortName: 'Photography',
    description: 'Explore the many different aspects of photography. You will not need a fancy camera; you can use your mobile or any other photo-taking device. Learn tips and tricks for making the most out of your cameras, techniques for taking different kinds of images, and editing methods for creating awesome final products.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
  },
  {
    id: 4,
    name: 'Music Club',
    shortName: 'Music',
    description: 'A student-run club dedicated to promoting and cultivating a love for music. Organize jam sessions, concerts, open mics, and other musical performances. Workshops and training sessions on various musical instruments, as well as opportunities for members to collaborate on music events.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    id: 5,
    name: 'Dance Club',
    shortName: 'Dance',
    description: 'A social club for students who are interested in dance. Learn and improve your dance skills in various styles - ballroom, salsa, hip hop, contemporary, or folk dance. Participate in dance performances, competitions, and festivals both on and off-campus.',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80',
  },
  {
    id: 6,
    name: 'Literary Club',
    shortName: 'Literary',
    description: 'Promotes creative writing skills and what it takes to be a writer and poet. Discuss books, share writings, critique each other\'s work. Activities include discussions, lectures, poetry writing and reading, short story writing, quiz competitions, and interactive sessions.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  },
  {
    id: 7,
    name: 'Dramatics Club',
    shortName: 'Dramatics',
    description: 'An initiative to promote theatrical arts on campus and encourage expressive performances. Plan, mount and perform various theatrical art forms including stage performances, road plays, mono acts, mime acts, and role plays. No experience required.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
  },
  {
    id: 8,
    name: 'MUN & Debating Society',
    shortName: 'MUN & Debate',
    description: 'Develop skills for parliamentary debate, public speaking and effective communication in a formal setting. Stay aware of current events, present research, learn model UN process, draft resolution assistance, and speech delivery techniques.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  },
  {
    id: 9,
    name: 'Community Service Club',
    shortName: 'Community Service',
    description: 'A hub for community outreach, volunteering and social impact that promotes social wellbeing and harmony. Committed to work in the community and spread awareness about promoting social change within the university and the city.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
  },
  {
    id: 10,
    name: 'Start-up & Entrepreneurship Club',
    shortName: 'Startup & Entrepreneurship',
    description: 'A learning-by-doing environment to cultivate entrepreneurship skills. Participate in business development through lectures, bootcamps with resources and mentoring from experienced entrepreneurs. Connect with JLU Foundation for Innovation and Entrepreneurship ecosystem.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  },
];

export const StudentClubs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackingWrapperRef = useRef<HTMLDivElement>(null);
  const stackingSectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeClub, setActiveClub] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Card stacking effect - panels slide up and overlap previous ones
  useEffect(() => {
    if (!mounted || isMobile || !stackingWrapperRef.current || !stackingSectionRef.current) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLElement[];
    if (panels.length === 0) return;

    let currentActiveIndex = 0;

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Set initial state with GPU acceleration
      panels.forEach((panel, index) => {
        gsap.set(panel, {
          zIndex: index + 1,
          yPercent: index === 0 ? 0 : 100,
          force3D: true, // Enable GPU acceleration
          willChange: 'transform',
        });
      });

      // Create quickSetters for better performance
      const yPercentSetters = panels.map(panel => gsap.quickSetter(panel, 'yPercent'));

      // Scroll distance is (panels - 1) because first panel is already visible
      const scrollDistance = window.innerHeight * (panels.length - 1);
      const totalPanels = panels.length;
      const animationSteps = totalPanels - 1;

      const stackingPin = ScrollTrigger.create({
        trigger: stackingWrapperRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: stackingSectionRef.current,
        pinSpacing: true,
        scrub: true, // Use true for smoother native scrubbing
        onUpdate: (self) => {
          const progress = self.progress;

          // Only update state when index actually changes
          const newIndex = Math.min(
            Math.floor(progress * totalPanels),
            totalPanels - 1
          );
          if (newIndex !== currentActiveIndex) {
            currentActiveIndex = newIndex;
            setActiveClub(newIndex);
          }

          // Animate each panel using quickSetters
          for (let index = 1; index < totalPanels; index++) {
            const panelStartProgress = (index - 1) / animationSteps;
            const panelEndProgress = index / animationSteps;

            let panelProgress = 0;
            if (progress >= panelEndProgress) {
              panelProgress = 1;
            } else if (progress > panelStartProgress) {
              panelProgress = (progress - panelStartProgress) / (panelEndProgress - panelStartProgress);
            }

            yPercentSetters[index]((1 - panelProgress) * 100);
          }
        },
      });

      ScrollTrigger.refresh();

      return () => {
        stackingPin.kill();
      };
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mounted, isMobile]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <div ref={containerRef} className="relative bg-[#f6f7f0]">
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="min-h-screen">
          {/* Mobile Hero */}
          <section className="min-h-[70vh] flex flex-col justify-center px-6 py-20 bg-[#f6f7f0]">
            <p
              className="text-xs mb-4"
              style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              CAMPUS LIFE
            </p>
            <h1
              className="text-[#21313c] mb-6"
              style={{
                fontSize: 'clamp(2rem, 10vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Student{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Clubs</span>
            </h1>
            <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '320px' }}>
              Discover your passions, build connections, and develop essential skills with our vibrant student clubs.
            </p>
            <div className="mt-6" style={{ width: '120px', height: '0px', border: '3px solid #8bc34a' }} />
          </section>

          {/* Mobile Club List */}
          <section className="px-6 py-12 bg-[#21313c]">
            <p
              className="text-xs mb-6"
              style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              ALL CLUBS
            </p>
            <div className="space-y-3">
              {clubs.map((club, index) => (
                <div
                  key={club.id}
                  className="flex items-center gap-4 py-2 border-b border-white/10"
                >
                  <span style={{ color: '#8bc34a', fontFamily: 'monospace', fontSize: '0.75rem', width: '24px' }}>
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {club.shortName}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile Club Details */}
          {clubs.map((club, index) => (
            <section key={club.id} className="border-b border-[#21313c]/10 bg-[#f6f7f0]">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span style={{ color: '#8bc34a', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 600, marginTop: '4px' }}>
                    {club.name}
                  </h3>
                </div>
              </div>
              <div className="px-6 py-8">
                <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '24px' }}>
                  {club.description}
                </p>
                <button
                  className="px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors"
                  style={{ backgroundColor: '#21313c', color: '#ffffff' }}
                >
                  Register Now
                </button>
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Desktop Layout */
        <div ref={containerRef}>
          {/* Hero Section - Full Width */}
          <section className="min-h-screen flex items-center justify-center bg-[#f6f7f0] relative">
            <div className="text-center px-8">
              <p
                className="text-xs mb-6"
                style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                CAMPUS LIFE
              </p>
              <h1
                className="text-[#21313c] mb-8"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Student{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Clubs</span>
              </h1>
              <p style={{ color: '#666', fontSize: '1.125rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
                Discover your passions, build connections, and develop essential skills with our vibrant student clubs.
              </p>
              <div className="mt-8 mx-auto" style={{ width: '120px', height: '4px', backgroundColor: '#8bc34a' }} />

              {/* Scroll indicator */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span style={{ color: '#999', fontSize: '0.75rem', letterSpacing: '0.1em' }}>SCROLL</span>
                <div className="w-[1px] h-12 bg-[#999] animate-pulse" />
              </div>
            </div>
          </section>

          {/* Stacking Panels Section - Wrapper for scroll distance */}
          <div ref={stackingWrapperRef}>
            {/* This container gets pinned (both panels + sidebar together) */}
            <div ref={stackingSectionRef} className="flex h-screen">
              {/* Left Content - Stacking Panels */}
              <div className="w-[65%] relative h-full overflow-hidden">
                {/* All club panels stacked */}
                {clubs.map((club, index) => (
                  <section
                    key={club.id}
                    ref={el => { panelsRef.current[index] = el; }}
                    className="absolute inset-0 h-full w-full flex flex-col"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f6f7f0' : '#ffffff',
                    }}
                  >
                    {/* Image - Top Half */}
                    <div className="h-[55%] relative overflow-hidden">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Number overlay on image */}
                      <div className="absolute bottom-8 left-16 xl:left-24">
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: 'clamp(4rem, 8vw, 8rem)',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1,
                            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content - Bottom Half */}
                    <div className="h-[45%] px-16 xl:px-24 py-10 flex flex-col justify-center">
                      <h2
                        className="text-[#21313c] mb-4"
                        style={{
                          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                          fontWeight: 600,
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {club.name}
                      </h2>
                      <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', marginBottom: '24px' }}>
                        {club.description}
                      </p>
                      <button
                        className="self-start group flex items-center gap-3 text-sm uppercase tracking-wider hover:gap-5 transition-all"
                        style={{ color: '#21313c', fontWeight: 600 }}
                      >
                        Register for this club
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </section>
                ))}
              </div>

              {/* Right Sidebar - Stays with pinned section */}
              <div className="w-[35%] h-full bg-[#21313c] flex flex-col justify-center p-12 xl:p-16">
                <p
                  className="mb-8"
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  ALL CLUBS
                </p>

                {/* Club List */}
                <div className="space-y-4">
                  {clubs.map((club, index) => (
                    <div
                      key={club.id}
                      className={`flex items-center gap-5 py-3 transition-all duration-300 cursor-pointer ${
                        activeClub === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                      }`}
                      onClick={() => {
                        // Scroll to the position for this club
                        if (stackingWrapperRef.current) {
                          const wrapperTop = stackingWrapperRef.current.getBoundingClientRect().top + window.scrollY;
                          const scrollTo = wrapperTop + (index * window.innerHeight);
                          window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                        }
                      }}
                    >
                      <span style={{ color: '#8bc34a', fontFamily: 'monospace', fontSize: '1rem', width: '40px', fontWeight: 600 }}>
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span style={{ color: '#ffffff', fontSize: '1.125rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
                        {club.shortName}
                      </span>
                      {activeClub === index && (
                        <span
                          className="ml-auto"
                          style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8bc34a' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA - After all stacking */}
          <section className="py-24 flex items-center justify-center px-16 xl:px-24 bg-[#21313c]">
            <div className="text-center">
              <p
                className="mb-4"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                READY TO JOIN?
              </p>
              <h2
                className="text-white mb-8"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                Find Your{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Tribe</span>
              </h2>
              <button
                className="px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
                style={{ backgroundColor: '#8bc34a', color: '#21313c' }}
              >
                Explore All Clubs
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default StudentClubs;
