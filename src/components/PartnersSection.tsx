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

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={sectionRef} className="bg-[#f6f7f0] py-8 md:py-16">
      {/* Section Title */}
      <div className="text-center mb-8 md:mb-14 px-4">
        <p
          className="text-xs md:text-sm mb-4"
          style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          COLLABORATIONS
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
          style={{ fontWeight: 600, lineHeight: 1 }}
        >
          Global{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Partnerships</span>
        </h2>
        <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </div>

      {isMobile ? (
        /* Mobile */
        <div className="px-1">
          {/* Animated Text - Mobile */}
          <div ref={textRef} className="px-4 mb-6">
            <h3
              className="text-[#21313c]"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '1.2',
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
            <p style={{ fontSize: '0.4rem' }} className="text-gray-500 mb-1">Academic Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 4px)', height: '70px' }}
              >
                <img src="/mid.png" alt="Middlesex University" style={{ maxHeight: '35px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 4px)', height: '70px' }}
              >
                <img src="/king.png" alt="King's College London" style={{ maxHeight: '35px' }} className="object-contain" />
              </div>
            </div>
          </div>

          {/* Second + Third Row - 3 boxes each */}
          <div className="mt-2">
            <p style={{ fontSize: '0.4rem' }} className="text-gray-500 mb-1">Industry & Institutional Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/nus.png" alt="NUS" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/c11.png" alt="CII" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/ficci.png" alt="FICCI" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
            </div>

            <div className="flex">
              <div
                className="border border-t-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/gt.png" alt="Grant Thornton" style={{ maxHeight: '22px' }} className="object-contain" />
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <button onClick={() => setOrbOpen(true)} className="text-[#03463B] font-semibold" style={{ fontSize: '0.5rem' }}>
                  See More →
                </button>
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/era.png" alt="ERA" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop */
        <div className="px-4 lg:px-16 xl:px-20 2xl:px-32">
          {/* First Row - 2 boxes + animated text on right */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Academic Partners</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(180px, 15vw, 300px)' }}
              >
                <img
                  src="/mid.png"
                  alt="Middlesex University"
                  className="max-h-28 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(180px, 15vw, 300px)' }}
              >
                <img
                  src="/king.png"
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
            <p className="text-xs text-gray-500 mb-2">Industry & Institutional Partners</p>

            {/* Second Row - 3 boxes */}
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="/nus.png"
                  alt="NUS"
                  className="max-h-24 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.333%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="/c11.png"
                  alt="CII"
                  className="max-h-24 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ flex: '0 0 33.334%', height: 'clamp(160px, 13vw, 260px)' }}
              >
                <img
                  src="/ficci.png"
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
                  src="/gt.png"
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
                  className="inline-flex items-center gap-2 text-[#03463B] font-semibold text-sm cursor-pointer"
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
                  src="/era.png"
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
