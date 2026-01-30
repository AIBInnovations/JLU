'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 375);
  const [animationKey] = useState(0);

  const cards = [
    {
      width: 540,
      height: 500,
      mobileWidth: 280,
      mobileHeight: 260,
      bg: 'bg-[#f6f7f0]',
      hasText: true,
      isTextCard: true,
      title: "JLU's Impact",
      content: "Lorem ipsum dolor sit amet consectetur. Lectus vivamus congue massa tortor non. Pretium lobortis ultrices urna faucibus leo. Adipiscing a eu accumsan ornare. Sodales in tempor pretium nibh vulputate tincidunt aliquam.\n\nLorem ipsum dolor sit amet consectetur. Lectus vivamus congue massa tortor non."
    },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#c3fd7a]', hasText: true, isTextCard: false },
    { width: 770, height: 500, mobileWidth: 280, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/2nd.jpg' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#1D4ED8]', hasText: true, isTextCard: false, textColor: 'text-white' },
    { width: 300, height: 170, mobileWidth: 150, mobileHeight: 100, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/9th.jpg' },
    { width: 670, height: 500, mobileWidth: 250, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false , image: '/6th.jpg' },
    { width: 540, height: 500, mobileWidth: 200, mobileHeight: 260, bg: 'bg-[#E9D502]', hasText: true, isTextCard: false },
    { width: 1320, height: 500, mobileWidth: 320, mobileHeight: 260, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/8th.jpg' },
  ];

  // Get viewport width for calculation
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ScrollTrigger horizontal scroll effect
  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current || isMobile) return;

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
        end: () => `+=${scrollDistance + window.innerHeight * 1.5}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTrigger.scrollTrigger?.kill();
    };
  }, [isMobile, animationKey]);

  // Calculate total content width and animation distance dynamically
  const gap = isMobile ? 12 : 24;
  const padding = isMobile ? 16 : 24; // pl-4 = 16px, md:pl-6 = 24px
  const totalCardsWidth = cards.reduce((sum, card) => sum + (isMobile ? card.mobileWidth : card.width), 0);
  const totalGapsWidth = (cards.length - 1) * gap;
  const totalContentWidth = totalCardsWidth + totalGapsWidth + padding;

  // Animation stops when last card is fully visible (right edge of last card aligns with right edge of viewport)
  // Add extra padding (16px) to ensure the last card has some margin from the edge
  const animationDistance = isMobile
    ? -(totalContentWidth - viewportWidth + 16)
    : -4000;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f6f7f0] overflow-hidden"
      style={{ height: isMobile ? '50vh' : '100vh' }}
    >
      <div className="h-full flex items-center">
        <motion.div
          ref={scrollContainerRef}
          key={animationKey}
          initial={{ x: 0 }}
          animate={isMobile && (isInView || animationKey > 0) ? { x: animationDistance } : { x: 0 }}
          transition={{ duration: isMobile ? 6 : 8, ease: "easeInOut" }}
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
                  <div className={`text-4xl md:text-8xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-2 md:mb-4 drop-shadow-sm`}>600+</div>
                  <p className={`${card.textColor ?? 'text-[#21313c]'} text-xs md:text-lg drop-shadow-sm`}>
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
