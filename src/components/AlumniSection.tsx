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
    name: 'Mr. Namgay Dorji',
    batch: '2024',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/alumniawardee/namgay.jpg',
    designation: 'JLU00402',
    company: 'BBA.LLB Program',
    testimonial: 'Alumni Award Recipient 2024',
  },
  {
    id: '2',
    name: 'Mr. Sanchit Shrivastava',
    batch: '2025',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/alumniawardee/sanchit-clean.jpg',
    designation: 'JLU04696',
    company: 'BAJMC Program',
    testimonial: 'Alumni Award Recipient 2025',
  },
];

export const AlumniSection = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);

  const topAlumni = alumniData[0];
  const bottomAlumni = alumniData[1];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // On mobile we skip ALL scrubs in this section — 8 simultaneously
      // scrub-evaluating triggers on a Lenis-driven scroll budget was the
      // single biggest source of jitter. Mobile gets a one-shot fade-in
      // instead. Desktop keeps the original scroll-tied animations.
      if (isMobile) {
        if (textRef.current) {
          const lines = textRef.current.querySelectorAll('.alumni-text-line > span');
          gsap.fromTo(
            lines,
            { y: '100%' },
            {
              y: '0%',
              duration: 0.7,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
        if (topCardRef.current) {
          gsap.fromTo(
            topCardRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: topCardRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
        if (bottomCardRef.current) {
          gsap.fromTo(
            bottomCardRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bottomCardRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
        return;
      }

      // Desktop only — original scroll-tied animations.
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

      const parallaxItems = [
        { selector: '.alumni-parallax-1', yMove: -60 },
        { selector: '.alumni-parallax-2', yMove: -40 },
        { selector: '.alumni-parallax-3', yMove: -50 },
        { selector: '.alumni-parallax-4', yMove: -35 },
        { selector: '.alumni-parallax-5', yMove: -55 },
        { selector: '.alumni-parallax-6', yMove: -45 },
      ];
      parallaxItems.forEach(({ selector, yMove }) => {
        const el = sectionRef.current?.querySelector(selector);
        if (el) {
          gsap.fromTo(el,
            { y: -yMove },
            {
              y: yMove,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });

      if (topCardRef.current) {
        gsap.fromTo(topCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 2,
            },
          }
        );
      }
      if (bottomCardRef.current) {
        gsap.fromTo(bottomCardRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'top 10%',
              scrub: 2,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      ScrollTrigger.refresh();
    };
  }, [mounted, isMobile]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{
        height: 'auto',
      }}
    >
      {/* Blurred parallax background images — kept within section bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left */}
        <div
          className="alumni-parallax-1 absolute rounded-3xl overflow-hidden opacity-[0.15]"
          style={{ width: '300px', height: '200px', top: '40px', left: '3%', filter: 'blur(6px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni1.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Top right */}
        <div
          className="alumni-parallax-2 absolute rounded-3xl overflow-hidden opacity-[0.12]"
          style={{ width: '250px', height: '170px', top: '50px', right: '5%', filter: 'blur(8px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-mentorship.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Middle left */}
        <div
          className="alumni-parallax-3 absolute rounded-3xl overflow-hidden opacity-[0.13]"
          style={{ width: '270px', height: '190px', top: '42%', left: '1%', filter: 'blur(7px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-career-connect.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Middle right */}
        <div
          className="alumni-parallax-4 absolute rounded-3xl overflow-hidden opacity-[0.1]"
          style={{ width: '240px', height: '160px', top: '38%', right: '3%', filter: 'blur(10px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni3.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Bottom left */}
        <div
          className="alumni-parallax-5 absolute rounded-3xl overflow-hidden opacity-[0.14]"
          style={{ width: '280px', height: '190px', bottom: '40px', left: '10%', filter: 'blur(7px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-events-reunions.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        {/* Bottom right */}
        <div
          className="alumni-parallax-6 absolute rounded-3xl overflow-hidden opacity-[0.11]"
          style={{ width: '260px', height: '180px', bottom: '50px', right: '8%', filter: 'blur(8px)' }}
        >
          <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/alumni2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className={`relative max-w-[1440px] 2xl:max-w-[1700px] mx-auto px-4 md:px-[120px] 2xl:px-[160px] ${isMobile ? 'py-12' : 'py-[120px]'}`}>
        {/* Main Layout Container */}
        <div className={`w-full ${isMobile ? 'flex flex-col gap-8' : 'flex items-center justify-between gap-12'}`}>
          {/* Left Side - Text Content */}
          <div
            ref={textRef}
            className={`${isMobile ? 'w-full text-left' : 'w-[45%]'}`}
          >
            {/* Recognition Label */}
            <span
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
              style={{ letterSpacing: '0.2em' }}
            >
              Recognition
            </span>

            {/* Section Title */}
            <div className="mb-6 md:mb-8">
              <h1
                className="text-[#21313c] md:text-[56px]"
                style={{ fontWeight: 700, lineHeight: 1.1, fontSize: isMobile ? '32px' : undefined }}
              >
                Alumni{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                  Award
                </span>
              </h1>
            </div>

            <h3
              className="text-[#21313c]"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 900,
                fontSize: isMobile ? '18px' : '36px',
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
                className="text-[#999] text-right ml-auto mt-4"
                style={{
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '1.5',
                  width: '80%',
                }}
              >
                Honoring excellence across programs and years — JLU Alumni Award.
              </p>
            )}

            {/* Stats strip */}
            {!isMobile && (
              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="text-[#21313c] text-3xl font-bold">8+</p>
                  <p className="text-[#999] text-xs uppercase tracking-wider mt-1">Recipients</p>
                </div>
                <div className="w-px h-10 bg-[#e5e5e5]" />
                <div>
                  <p className="text-[#21313c] text-3xl font-bold">3</p>
                  <p className="text-[#999] text-xs uppercase tracking-wider mt-1">Years</p>
                </div>
                <div className="w-px h-10 bg-[#e5e5e5]" />
                <div>
                  <p className="text-[#21313c] text-3xl font-bold">6+</p>
                  <p className="text-[#999] text-xs uppercase tracking-wider mt-1">Programs</p>
                </div>
              </div>
            )}

            {/* CTA Link */}
            <div className="mt-8 md:mt-12">
              <a
                href="/alumni"
                className="inline-flex items-center gap-3 group bg-[#027ea1] rounded-full"
                style={{
                  fontSize: isMobile ? '14px' : '15px',
                  fontWeight: 600,
                  color: '#fff',
                  padding: isMobile ? '12px 24px' : '14px 32px',
                }}
              >
                <span>View All Alumni</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Cards side by side with stagger */}
          {!isMobile && (
            <div className="w-[90%] flex gap-6">
              <div
                ref={topCardRef}
                className="flex-1 bg-white rounded-2xl overflow-hidden relative"
                style={{
                  height: '480px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={topAlumni.image}
                  alt={topAlumni.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/30 to-transparent" />
                <span
                  className="absolute top-4 right-4 px-3 py-1.5 bg-[#f0c14b] text-[#21313c] font-bold rounded-full"
                  style={{ fontSize: '12px' }}
                >
                  Batch {topAlumni.batch}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#f0c14b] text-xs font-medium uppercase tracking-wider mb-1">{topAlumni.testimonial}</p>
                  <h4 className="text-white font-bold text-xl mb-0.5">{topAlumni.name}</h4>
                  <p className="text-white/70 text-sm">{topAlumni.designation} &middot; {topAlumni.company}</p>
                </div>
              </div>

              <div
                ref={bottomCardRef}
                className="flex-1 bg-white rounded-2xl overflow-hidden relative mt-12"
                style={{
                  height: '480px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={bottomAlumni.image}
                  alt={bottomAlumni.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '20% center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/30 to-transparent" />
                <span
                  className="absolute top-4 right-4 px-3 py-1.5 bg-[#f0c14b] text-[#21313c] font-bold rounded-full"
                  style={{ fontSize: '12px' }}
                >
                  Batch {bottomAlumni.batch}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#f0c14b] text-xs font-medium uppercase tracking-wider mb-1">{bottomAlumni.testimonial}</p>
                  <h4 className="text-white font-bold text-xl mb-0.5">{bottomAlumni.name}</h4>
                  <p className="text-white/70 text-sm">{bottomAlumni.designation} &middot; {bottomAlumni.company}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Cards */}
          {isMobile && (
            <div className="w-full overflow-hidden">
              <div className="flex gap-3 justify-center">
                <div
                  ref={topCardRef}
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    width: 'calc(50% - 6px)',
                    height: '260px',
                    willChange: 'transform, opacity',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={topAlumni.image}
                    alt={topAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/20 to-transparent" />
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 bg-[#f0c14b] text-[#21313c] font-bold rounded-full"
                    style={{ fontSize: '10px' }}
                  >
                    {topAlumni.batch}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[#f0c14b] text-[10px] font-medium uppercase tracking-wider mb-0.5">{topAlumni.testimonial}</p>
                    <h4 className="text-white font-bold text-sm">{topAlumni.name}</h4>
                    <p className="text-white/70 text-xs">{topAlumni.company}</p>
                  </div>
                </div>
                <div
                  ref={bottomCardRef}
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    width: 'calc(50% - 6px)',
                    height: '260px',
                    willChange: 'transform, opacity',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={bottomAlumni.image}
                    alt={bottomAlumni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/20 to-transparent" />
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 bg-[#f0c14b] text-[#21313c] font-bold rounded-full"
                    style={{ fontSize: '10px' }}
                  >
                    {bottomAlumni.batch}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[#f0c14b] text-[10px] font-medium uppercase tracking-wider mb-0.5">{bottomAlumni.testimonial}</p>
                    <h4 className="text-white font-bold text-sm">{bottomAlumni.name}</h4>
                    <p className="text-white/70 text-xs">{bottomAlumni.company}</p>
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
