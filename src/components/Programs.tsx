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
          className="relative w-screen h-screen"
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
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '600px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            PATHS SHAPED BY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>curiosity</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            At JLU, programs are not defined only by subjects. They are defined by intent, direction, and the kind of future a learner wants to shape.
          </p>
        </motion.div>

        {/* Paragraph at Middle Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
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
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingBottom: '0px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(8rem, 16vw, 16rem)',
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
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingBottom: '80px',
            paddingLeft: '120px',
            paddingRight: '120px',
          }}
        >
          <div className="flex justify-between items-center" style={{ gap: '80px' }}>
            {/* Left - Large Number */}
            <div className="shrink-0 text-center">
              <span
                className="font-bold text-[#21313c] block"
                style={{
                  fontSize: 'clamp(6rem, 12vw, 10rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                }}
              >
                52+
              </span>
              <span
                className="text-[#21313c] uppercase tracking-widest block"
                style={{
                  fontSize: '14px',
                  marginTop: '16px',
                  fontWeight: 500,
                }}
              >
                Programs offered
              </span>
            </div>

            {/* Right - Content */}
            <div style={{ maxWidth: '600px' }}>
              <div
                className="text-[#666] mb-8 flex items-center flex-wrap"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                <span>Perspective</span>
                <span className="mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Intent</span>
                <span className="mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Depth</span>
                <span className="mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Relevance</span>
                <span className="mx-3 w-1 h-1 rounded-full bg-[#666]" />
                <span>Continuum</span>
              </div>
              <h3
                className="text-[#21313c] mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Ways Forward
              </h3>
              <p
                className="text-[#4a4a4a]"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
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
