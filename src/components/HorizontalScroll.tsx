'use client';

import { useRef, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const cards = [
    {
      width: 540,
      height: 500,
      mobileWidth: 280,
      mobileHeight: 260,
      bg: 'bg-[#f6f7f0]',
      hasText: true,
      isTextCard: true,
      title: "Excellence in Education",
      content: "Jagran Lakecity University stands as the first university in MP & CG to receive the prestigious QS I-Gauge DIAMOND rating. Recognized as 'University of the Year' for five consecutive years (2015-2019) and ranked #1 multidisciplinary private university in Madhya Pradesh.\n\nSpread across a sprawling 232-acre campus, JLU offers 50+ degree programs to over 2,500 students, fostering innovation and academic excellence."
    },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#c3fd7a]', hasText: true, isTextCard: false, stat: '232', statLabel: 'Acres of Campus' },
    { width: 770, height: 500, mobileWidth: 280, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/2nd.jpg' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#1D4ED8]', hasText: true, isTextCard: false, textColor: 'text-white', stat: '2,500+', statLabel: 'Students Enrolled' },
    { width: 540, height: 500, mobileWidth: 250, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/9th.jpg' },
    { width: 670, height: 500, mobileWidth: 250, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false , image: '/6th.jpg' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#E9D502]', hasText: true, isTextCard: false, stat: '50+', statLabel: 'Degree Programs' },
    { width: 1320, height: 500, mobileWidth: 320, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/8th.jpg' },
  ];

  // ScrollTrigger horizontal scroll effect - works on both mobile and desktop
  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const section = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    // Calculate scroll distance with extra padding to ensure last card is fully visible
    const scrollDistance = scrollContainer.scrollWidth - window.innerWidth + 50;

    // Create horizontal scroll animation
    const scrollTrigger = gsap.to(scrollContainer, {
      x: -scrollDistance,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance + (isMobile ? window.innerHeight * 0.8 : window.innerHeight * 1.5)}`,
        scrub: isMobile ? 0.5 : true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTrigger.scrollTrigger?.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="h-full flex items-center">
        <div
          ref={scrollContainerRef}
          className="flex pl-4 md:pl-6"
          style={{ gap: isMobile ? '12px' : '24px' }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} relative rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden`}
              style={{
                width: isMobile ? `${card.mobileWidth}px` : `${card.width}px`,
                height: isMobile ? `${card.mobileHeight}px` : `${card.height}px`,
                padding: card.isTextCard || card.hasText ? (isMobile ? '16px' : '32px') : '0',
              }}
            >
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title ?? 'JLU highlight'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              {card.isTextCard ? (
                <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-4 md:p-6' : ''} text-left`}>
                  <h2 className={`text-xl md:text-4xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-3 md:mb-6 drop-shadow-sm`}>{card.title}</h2>
                  <div className={`${card.textColor ?? 'text-[#21313c]'} text-xs md:text-lg leading-relaxed whitespace-pre-line drop-shadow-sm`}>
                    {isMobile ? card.content?.substring(0, 120) + '...' : card.content}
                  </div>
                </div>
              ) : card.hasText ? (
                <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-4 md:p-6' : ''} text-center`}>
                  <div className={`text-4xl md:text-8xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-2 md:mb-4 drop-shadow-sm`}>{card.stat ?? '600+'}</div>
                  <p className={`${card.textColor ?? 'text-[#21313c]'} text-xs md:text-lg drop-shadow-sm`}>
                    {card.statLabel ?? 'Lorem ipsum dolor sit amet consectetur.'}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
