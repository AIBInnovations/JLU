'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';

const PartnersOrb = dynamic(() => import('./PartnersOrb'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export const PartnersSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [orbOpen, setOrbOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !textRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines = textRef.current!.querySelectorAll('.partner-text-line > span');
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
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');
      ScrollTrigger.refresh();
    };
  }, [mounted]);

  return (
    <section ref={sectionRef} className="bg-[#f6f7f0] py-8 md:py-16">
      {/* Section Title */}
      <div className="text-center mb-8 md:mb-14 px-4">
        <p
          className="text-xl md:text-2xl font-bold mb-4"
          style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          COLLABORATIONS
        </p>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
          style={{ fontWeight: 600, lineHeight: 1.1 }}
        >
          Global{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Partnerships</span>
        </h1>
        <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #027ea1' }} />
      </div>

      {isMobile ? (
        /* Mobile */
        <div className="px-3">
          {/* Animated Text - Mobile */}
          <div ref={textRef} className="px-1 mb-6">
            <h3
              className="text-[#21313c]"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                lineHeight: '1.3',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="partner-text-line block overflow-hidden">
                <span className="inline-block">42+ global collaborations</span>
              </span>
              <span className="partner-text-line block overflow-hidden">
                <span className="inline-block">powering exchange programs,</span>
              </span>
              <span className="partner-text-line block overflow-hidden">
                <span className="inline-block">joint research & international</span>
              </span>
              <span className="partner-text-line block overflow-hidden">
                <span className="inline-block">exposure for every student.</span>
              </span>
            </h3>
          </div>

          {/* First Row - 2 boxes */}
          <div>
            <p className="text-base text-gray-500 mb-2 tracking-wide uppercase font-bold">Academic Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 6px)', height: '80px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/mid.png" alt="Middlesex University" style={{ maxHeight: '40px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 6px)', height: '80px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/king.png" alt="King's College London" style={{ maxHeight: '40px' }} className="object-contain" />
              </div>
            </div>
          </div>

          {/* Second + Third Row - 3 boxes each */}
          <div className="mt-3">
            <p className="text-base text-gray-500 mb-2 tracking-wide uppercase font-bold">Industry & Institutional Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/nus.png" alt="NUS" style={{ maxHeight: '50px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/c11.png" alt="CII" style={{ maxHeight: '32px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ficci.png" alt="FICCI" style={{ maxHeight: '32px' }} className="object-contain" />
              </div>
            </div>

            <div className="flex">
              <div
                className="border border-t-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/gt.png" alt="Grant Thornton" style={{ maxHeight: '26px' }} className="object-contain" />
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <button onClick={() => setOrbOpen(true)} className="text-[#027ea1] font-bold text-[10px] md:text-2xl">
                  See More →
                </button>
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 4px)', height: '70px' }}
              >
                <img src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/era.png" alt="ERA" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop */
        <div className="px-4 lg:px-16 xl:px-20 2xl:px-32">
          {/* First Row - 2 boxes + animated text on right */}
          <div>
            <p className="text-lg text-gray-500 mb-4 tracking-wide uppercase font-bold">Academic Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(180px, 15vw, 300px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/mid.png"
                  alt="Middlesex University"
                  className="max-h-28 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(180px, 15vw, 300px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/king.png"
                  alt="King's College London"
                  className="max-h-28 object-contain"
                />
              </div>

              {/* Animated Text - Right side */}
              <div
                ref={textRef}
                className="flex items-center pl-10 xl:pl-16"
                style={{ flex: '0 0 33.334%' }}
              >
                <h3
                  className="text-[#21313c]"
                  style={{
                    fontFamily: 'Inter, Arial Black, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(22px, 2vw, 34px)',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span className="partner-text-line block overflow-hidden">
                    <span className="inline-block">42+ global collaborations</span>
                  </span>
                  <span className="partner-text-line block overflow-hidden">
                    <span className="inline-block">powering exchange</span>
                  </span>
                  <span className="partner-text-line block overflow-hidden">
                    <span className="inline-block">programs, joint research</span>
                  </span>
                  <span className="partner-text-line block overflow-hidden">
                    <span className="inline-block">& international exposure</span>
                  </span>
                  <span className="partner-text-line block overflow-hidden">
                    <span className="inline-block">for every student.</span>
                  </span>
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom boxes - 6 boxes */}
          <div className="mt-6">
            <p className="text-lg text-gray-500 mb-4 tracking-wide uppercase font-bold">Industry & Institutional Partners</p>

            {/* Second Row - 3 boxes */}
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/nus.png"
                  alt="NUS"
                  className="max-h-36 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/c11.png"
                  alt="CII"
                  className="max-h-24 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.334%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ficci.png"
                  alt="FICCI"
                  className="max-h-24 object-contain"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex">
              <div
                className="border border-t-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/gt.png"
                  alt="Grant Thornton"
                  className="max-h-16 object-contain"
                />
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <button
                  onClick={() => setOrbOpen(true)}
                  className="inline-flex items-center gap-3 text-[#027ea1] font-bold text-sm md:text-3xl cursor-pointer"
                >
                  See More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" strokeLinecap="round" />
                    <path d="M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.334%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/era.png"
                  alt="ERA"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <PartnersOrb isOpen={orbOpen} onClose={() => setOrbOpen(false)} />
    </section>
  );
};
