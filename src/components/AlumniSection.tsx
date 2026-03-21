'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

interface Alumni {
  id: string;
  name: string;
  batch: string;
  image: string;
  designation: string;
  company: string;
  testimonial: string;
  linkedin?: string;
}

const alumniData: Alumni[] = [
  {
    id: '1',
    name: 'Mr. Sagar Agrawal',
    batch: '2025',
    image: '/jlu-placement1.jpeg',
    designation: 'JLU00505',
    company: 'BA.LLB Program',
    testimonial: 'Alumni Award Recipient 2025',
  },
  {
    id: '2',
    name: 'Mr. Sanchit Shrivastava',
    batch: '2025',
    image: '/jlu-placement2.jpeg',
    designation: 'JLU04696',
    company: 'BAJMC Program',
    testimonial: 'Alumni Award Recipient 2025',
  },
  {
    id: '3',
    name: 'Mr. Aman Verma',
    batch: '2024',
    image: '/jlu-placement3.jpeg',
    designation: 'JLU01216',
    company: 'BBA Program',
    testimonial: 'Alumni Award Recipient 2024',
  },
  {
    id: '4',
    name: 'Mr. Ugyen Rhuntsho Rabgay',
    batch: '2024',
    image: '/jlu-insta1.jpg',
    designation: 'JLU00927',
    company: 'BAJMC Program',
    testimonial: 'Alumni Award Recipient 2024',
  },
  {
    id: '5',
    name: 'Mr. Namgay Dorji',
    batch: '2024',
    image: '/jlu-insta2.jpg',
    designation: 'JLU00402',
    company: 'BBA.LLB Program',
    testimonial: 'Alumni Award Recipient 2024',
  },
  {
    id: '6',
    name: 'Mr. Sajal Jain',
    batch: '2023',
    image: '/jlu-insta3.jpg',
    designation: 'JLU02151',
    company: 'B.Com Program',
    testimonial: 'Alumni Award Recipient 2023',
  },
  {
    id: '7',
    name: 'Ms. Urvashi Mathur',
    batch: '2023',
    image: '/jlu-placement1.jpeg',
    designation: 'JLU02531',
    company: 'B.Sc. (Hospitality & Hotel Administration) Program',
    testimonial: 'Alumni Award Recipient 2023',
  },
  {
    id: '8',
    name: 'Ms. Sumaira Yasin',
    batch: '2023',
    image: '/jlu-placement2.jpeg',
    designation: 'JLU00922',
    company: 'BAJMC Program',
    testimonial: 'Alumni Award Recipient 2023',
  },
];

export const AlumniSection = () => {
  const isMobile = useIsMobile();
  const [currentPair, setCurrentPair] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);

  // Calculate pairs (2 alumni per view)
  const totalPairs = Math.ceil(alumniData.length / 2);
  const topAlumni = alumniData[currentPair * 2];
  const bottomAlumni = alumniData[currentPair * 2 + 1] || alumniData[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Text reveal animation - line by line on scroll (slower)
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll('.alumni-text-line > span');
        gsap.set(lines, { y: '100%' });

        lines.forEach((line, index) => {
          const startPercent = 100 - (index * 3);
          const endPercent = 40 - (index * 3);

          gsap.to(line, {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${startPercent}%`,
              end: `top ${Math.max(endPercent, 10)}%`,
              scrub: 3,
            },
          });
        });
      }

      // Set cards to visible position initially (no entrance animation)
      if (topCardRef.current) {
        gsap.set(topCardRef.current, { yPercent: 0 });
      }
      if (bottomCardRef.current) {
        gsap.set(bottomCardRef.current, { yPercent: 0 });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      ScrollTrigger.refresh();
    };
  }, [mounted]);

  const navigateCards = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newPair = direction === 'next'
      ? (currentPair + 1) % totalPairs
      : (currentPair - 1 + totalPairs) % totalPairs;

    // Animate cards out smoothly
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPair(newPair);
        setIsAnimating(false);
      },
    });

    if (topCardRef.current && bottomCardRef.current) {
      // Top card exits up, bottom card exits down
      tl.to(topCardRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power2.inOut',
        force3D: true,
      }, 0);
      tl.to(bottomCardRef.current, {
        yPercent: 100,
        duration: 0.4,
        ease: 'power2.inOut',
        force3D: true,
      }, 0);
    }
  };

  // Animate cards in when pair changes (skip initial mount)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!mounted || !topCardRef.current || !bottomCardRef.current) return;

    // Skip animation on first render - cards are already visible
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    gsap.killTweensOf([topCardRef.current, bottomCardRef.current]);

    // Cards enter with smooth animation - no fade
    gsap.fromTo(
      topCardRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: 'power2.out', force3D: true }
    );
    gsap.fromTo(
      bottomCardRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.5, ease: 'power2.out', force3D: true, delay: 0.05 }
    );
  }, [currentPair, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{ height: isMobile ? 'auto' : '100vh', minHeight: isMobile ? 'auto' : '700px' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #21313c 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className={`relative max-w-[1440px] mx-auto px-4 md:px-16 xl:px-24 ${isMobile ? 'py-12' : 'h-full flex items-center'}`}>
        {/* Main Layout Container */}
        <div className={`w-full ${isMobile ? 'flex flex-col gap-8' : 'flex items-center justify-between gap-8'}`}>
          {/* Left Side - Text Content */}
          <div
            ref={textRef}
            className={`${isMobile ? 'w-full text-left' : 'w-[45%]'}`}
          >
            {/* Section Title */}
            <div className="mb-6 md:mb-8">
              <h2
                className="text-[#21313c]"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}
              >
                Alumni{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Award
                </span>
              </h2>
              <p className="text-[#999] text-base sm:text-lg md:text-xl mt-3" style={{ letterSpacing: '0.05em' }}>
                Recipients — Last 3 Years
              </p>
            </div>

            <h3
              className="text-[#21313c]"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 900,
                fontSize: isMobile ? '18px' : '38px',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">Celebrating alumni who</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">have excelled in their</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">respective fields and</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">brought pride to the</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">JLU community.</span>
              </span>
            </h3>

            {isMobile && (
              <p
                className="text-[#21313c] text-right ml-auto mt-4"
                style={{
                  fontFamily: 'Inter, Arial Black, sans-serif',
                  fontWeight: 900,
                  fontSize: '18px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  width: '70%',
                }}
              >
                <span className="alumni-text-line block overflow-hidden">
                  <span className="inline-block">Honoring excellence</span>
                </span>
                <span className="alumni-text-line block overflow-hidden">
                  <span className="inline-block">across programs and</span>
                </span>
                <span className="alumni-text-line block overflow-hidden">
                  <span className="inline-block">years — JLU Alumni</span>
                </span>
                <span className="alumni-text-line block overflow-hidden">
                  <span className="inline-block">Award.</span>
                </span>
              </p>
            )}

            {/* Mobile Navigation Arrows - centered */}
            {isMobile && (
              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={() => navigateCards('prev')}
                  disabled={isAnimating}
                  className="w-9 h-9 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateCards('next')}
                  disabled={isAnimating}
                  className="w-9 h-9 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            {/* Navigation & CTA */}
            {isMobile ? null : (
              /* Desktop: arrows + dots + CTA */
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateCards('prev')}
                    disabled={isAnimating}
                    className="w-14 h-14 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-xl hover:bg-[#2a3f4c] transition-all duration-300 hover:scale-110 disabled:opacity-50"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPairs }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isAnimating && index !== currentPair) {
                            setIsAnimating(true);
                            gsap.killTweensOf([topCardRef.current, bottomCardRef.current]);
                            const tl = gsap.timeline({
                              onComplete: () => {
                                setCurrentPair(index);
                                setIsAnimating(false);
                              },
                            });
                            tl.to(topCardRef.current, {
                              yPercent: -100,
                              duration: 0.4,
                              ease: 'power2.inOut',
                              force3D: true,
                            }, 0);
                            tl.to(bottomCardRef.current, {
                              yPercent: 100,
                              duration: 0.4,
                              ease: 'power2.inOut',
                              force3D: true,
                            }, 0);
                          }
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentPair === index ? 'w-8 bg-[#21313c]' : 'w-2 bg-[#21313c]/20 hover:bg-[#21313c]/40'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigateCards('next')}
                    disabled={isAnimating}
                    className="w-14 h-14 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-xl hover:bg-[#2a3f4c] transition-all duration-300 hover:scale-110 disabled:opacity-50"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* CTA Link */}
                <a
                  href="/alumni"
                  className="inline-flex items-center gap-3 group"
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#21313c',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>View All Alumni</span>
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
            )}
          </div>

          {/* Right Side - Cards in diagonal arrangement */}
          {!isMobile && (
            <div className="w-[50%] relative overflow-hidden" style={{ height: '500px' }}>
              {/* Top Right Card */}
              <div
                ref={topCardRef}
                className="absolute top-0 right-0 bg-white rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                style={{
                  width: '280px',
                  height: '340px',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={topAlumni.image}
                  alt={topAlumni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/30 to-transparent" />

                {/* Batch Badge */}
                <span
                  className="absolute top-4 right-4 px-3 py-1 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full"
                  style={{ fontSize: '12px' }}
                >
                  {topAlumni.batch}
                </span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-semibold text-lg mb-0.5">{topAlumni.name}</h4>
                  <p className="text-white/80 text-base">{topAlumni.designation}</p>
                  <p className="text-[#f0c14b] text-base font-medium">{topAlumni.company}</p>
                </div>
              </div>

              {/* Bottom Left Card */}
              <div
                ref={bottomCardRef}
                className="absolute bottom-0 left-0 bg-white rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                style={{
                  width: '280px',
                  height: '340px',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={bottomAlumni.image}
                  alt={bottomAlumni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/30 to-transparent" />

                {/* Batch Badge */}
                <span
                  className="absolute top-4 right-4 px-3 py-1 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full"
                  style={{ fontSize: '12px' }}
                >
                  {bottomAlumni.batch}
                </span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-semibold text-lg mb-0.5">{bottomAlumni.name}</h4>
                  <p className="text-white/80 text-base">{bottomAlumni.designation}</p>
                  <p className="text-[#f0c14b] text-base font-medium">{bottomAlumni.company}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Cards - Flow layout */}
          {isMobile && (
            <div className="w-full overflow-hidden">
              <div className="flex gap-3 justify-center">
                <div
                  ref={topCardRef}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl relative"
                  style={{ width: 'calc(50% - 6px)', height: '240px', willChange: 'transform, opacity' }}
                >
                  <img
                    src={topAlumni.image}
                    alt={topAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/20 to-transparent" />
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full"
                    style={{ fontSize: '12px' }}
                  >
                    {topAlumni.batch}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm">{topAlumni.name}</h4>
                    <p className="text-white/80 text-sm">{topAlumni.designation}</p>
                    <p className="text-[#f0c14b] text-sm font-medium">{topAlumni.company}</p>
                  </div>
                </div>
                <div
                  ref={bottomCardRef}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl relative"
                  style={{ width: 'calc(50% - 6px)', height: '240px', willChange: 'transform, opacity' }}
                >
                  <img
                    src={bottomAlumni.image}
                    alt={bottomAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/20 to-transparent" />
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full"
                    style={{ fontSize: '12px' }}
                  >
                    {bottomAlumni.batch}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm">{bottomAlumni.name}</h4>
                    <p className="text-white/80 text-sm">{bottomAlumni.designation}</p>
                    <p className="text-[#f0c14b] text-sm font-medium">{bottomAlumni.company}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
