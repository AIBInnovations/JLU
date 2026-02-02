'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ProgramsList } from './ProgramsList';

const Programs = () => {
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
          className="relative w-screen min-h-[100svh] md:h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
              alt="Programs at JLU"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Darker Black Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[600px] md:pr-0"
        >
          <h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            PATHS SHAPED BY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>curiosity</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            At JLU, programs are not defined only by subjects. They are defined by intent, direction, and the kind of future a learner wants to shape.
          </p>
        </motion.div>

        {/* Paragraph at Middle Right - Hidden on mobile, visible on md+ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
          style={{
            paddingRight: '40px',
            textAlign: 'right',
          }}
        >
          <p
            className="text-white font-semibold leading-relaxed whitespace-nowrap"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            }}
          >
            Each program blends academic depth<br />
            with lived experience, allowing students<br />
            to explore, experiment, and grow.
          </p>
        </motion.div>

        {/* Large "Programs" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Programs
          </motion.h1>
        </div>
      </div>

      {/* 52+ Programs Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-[120px] md:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          <div className="flex flex-row justify-between items-center gap-4 sm:gap-6 md:gap-20">
            {/* Left - Large Number */}
            <div className="shrink-0 flex flex-col justify-center">
              <span
                className="font-bold text-[#21313c] block text-[3rem] sm:text-[4rem] md:text-[clamp(6rem,12vw,10rem)]"
                style={{
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                }}
              >
                52+
              </span>
              <span
                className="text-[#21313c] uppercase tracking-widest block text-[9px] sm:text-xs md:text-sm mt-2 md:mt-4"
                style={{
                  fontWeight: 500,
                }}
              >
                Programs offered
              </span>
            </div>

            {/* Right - Content */}
            <div className="max-w-full md:max-w-[600px] flex-1">
              <div
                className="text-[#666] mb-3 md:mb-8 flex items-center flex-wrap gap-y-1 text-[9px] sm:text-[11px] md:text-[13px]"
                style={{
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                <span>Perspective</span>
                <span className="mx-1.5 sm:mx-2 md:mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Intent</span>
                <span className="mx-1.5 sm:mx-2 md:mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Depth</span>
                <span className="hidden sm:inline mx-1.5 sm:mx-2 md:mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span className="hidden sm:inline">Relevance</span>
                <span className="hidden md:inline mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span className="hidden md:inline">Continuum</span>
              </div>
              <h3
                className="text-[#21313c] mb-2 sm:mb-4 md:mb-6 text-lg sm:text-2xl md:text-[clamp(2rem,4vw,3rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Ways Forward
              </h3>
              <p
                className="text-[#4a4a4a] text-xs sm:text-sm md:text-lg"
                style={{
                  lineHeight: 1.6,
                }}
              >
                Different starting points, distinct journeys. Each program offering space to explore, adapt, and evolve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <ProgramsList />
    </section>
  );
};

export { Programs };
export default Programs;
