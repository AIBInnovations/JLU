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
    name: 'Aakansha Sharma',
    batch: '2019',
    image: '/jlu-placement1.jpeg',
    designation: 'Consultant',
    company: 'Deloitte',
    testimonial: 'The MBA program at JLU was transformative. The case study methodology and industry mentorship prepared me for consulting at a Big 4 firm.',
    linkedin: 'https://linkedin.com/in/aakansha-sharma-a07277129',
  },
  {
    id: '2',
    name: 'Mohd Sohail',
    batch: '2020',
    image: '/jlu-placement2.jpeg',
    designation: 'Process Associate',
    company: 'Genpact',
    testimonial: 'JLU provided me with incredible opportunities to learn and grow. The practical exposure and industry connections helped me land my dream role.',
    linkedin: 'https://linkedin.com/in/mohd-sohail-ms',
  },
  {
    id: '3',
    name: 'Prerna Jha',
    batch: '2021',
    image: '/jlu-placement3.jpeg',
    designation: 'Marketing Executive',
    company: 'SAGE Realty',
    testimonial: 'JLU\'s focus on holistic development and the excellent faculty helped me build both technical and soft skills essential for my career.',
    linkedin: 'https://linkedin.com/in/prerna-jha-907b2a1b6',
  },
  {
    id: '4',
    name: 'Rahul Verma',
    batch: '2022',
    image: '/jlu-insta1.jpg',
    designation: 'Systems Engineer',
    company: 'Infosys',
    testimonial: 'From campus placements to career growth, JLU has been instrumental in shaping my journey. The alumni network is incredibly supportive.',
    linkedin: '#',
  },
  {
    id: '5',
    name: 'Sneha Patel',
    batch: '2021',
    image: '/jlu-insta2.jpg',
    designation: 'Relationship Manager',
    company: 'HDFC Bank',
    testimonial: 'The Faculty of Commerce at JLU gave me hands-on experience with real banking scenarios. It opened doors to the financial sector.',
    linkedin: '#',
  },
  {
    id: '6',
    name: 'Aditya Singh',
    batch: '2023',
    image: '/jlu-insta3.jpg',
    designation: 'Associate Editor',
    company: 'Times of India',
    testimonial: 'The Faculty of Journalism at JLU and the International Festival of Media gave me the exposure I needed to join mainstream media.',
    linkedin: '#',
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

    return () => ctx.revert();
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
    return <div className="h-screen bg-[#f6f7f0]" />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{ height: '100vh', minHeight: isMobile ? '800px' : '700px' }}
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

      <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-16 xl:px-24 flex items-center">
        {/* Main Layout Container */}
        <div className="w-full flex items-center justify-between gap-8">
          {/* Left Side - Text Content */}
          <div
            ref={textRef}
            className={`${isMobile ? 'w-full text-center' : 'w-[45%]'}`}
          >
            {/* Section Title */}
            <div className={`mb-8 ${isMobile ? 'text-center' : ''}`}>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                Our{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Alumni
                </span>
              </h2>
            </div>

            <h3
              className="text-[#21313c]"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 900,
                fontSize: isMobile ? '24px' : '38px',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">Our distinguished alumni</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">are making waves across</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">industries worldwide,</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">leading innovation and</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">inspiring the next</span>
              </span>
              <span className="alumni-text-line block overflow-hidden">
                <span className="inline-block">generation of leaders.</span>
              </span>
            </h3>

            {/* Navigation & CTA */}
            <div className={`mt-10 flex items-center gap-6 ${isMobile ? 'justify-center' : ''}`}>
              {/* Navigation Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigateCards('prev')}
                  disabled={isAnimating}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-xl hover:bg-[#2a3f4c] transition-all duration-300 hover:scale-110 disabled:opacity-50"
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
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#21313c] text-white flex items-center justify-center shadow-xl hover:bg-[#2a3f4c] transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* CTA Link */}
              {!isMobile && (
                <a
                  href="/alumni"
                  className="inline-flex items-center gap-3 group"
                  style={{
                    fontSize: '14px',
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
              )}
            </div>
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
                  Batch {topAlumni.batch}
                </span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-semibold text-lg mb-0.5">{topAlumni.name}</h4>
                  <p className="text-white/80 text-sm">{topAlumni.designation}</p>
                  <p className="text-[#f0c14b] text-sm font-medium">{topAlumni.company}</p>
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
                  Batch {bottomAlumni.batch}
                </span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white font-semibold text-lg mb-0.5">{bottomAlumni.name}</h4>
                  <p className="text-white/80 text-sm">{bottomAlumni.designation}</p>
                  <p className="text-[#f0c14b] text-sm font-medium">{bottomAlumni.company}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Cards - Stacked */}
          {isMobile && (
            <div className="absolute bottom-20 left-0 right-0 px-6">
              <div className="flex gap-4 justify-center">
                <div
                  ref={topCardRef}
                  className="bg-white rounded-xl overflow-hidden shadow-xl relative"
                  style={{ width: '160px', height: '200px', willChange: 'transform, opacity' }}
                >
                  <img
                    src={topAlumni.image}
                    alt={topAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm">{topAlumni.name}</h4>
                    <p className="text-[#f0c14b] text-xs">{topAlumni.company}</p>
                  </div>
                </div>
                <div
                  ref={bottomCardRef}
                  className="bg-white rounded-xl overflow-hidden shadow-xl relative"
                  style={{ width: '160px', height: '200px', willChange: 'transform, opacity' }}
                >
                  <img
                    src={bottomAlumni.image}
                    alt={bottomAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm">{bottomAlumni.name}</h4>
                    <p className="text-[#f0c14b] text-xs">{bottomAlumni.company}</p>
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
