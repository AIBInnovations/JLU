'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const researchAreas = [
  { id: 1, name: 'Centres of Excellence', active: true },
  { id: 2, name: 'Faculty Research Areas', active: false },
  { id: 3, name: 'Interdisciplinary Labs', active: false },
  { id: 4, name: 'Graduate Research', active: false },
];

const statsData = [
  { id: 1, value: '2.4k+', label: 'PUBLICATIONS', description: 'Peer-reviewed journals & global indexing' },
  { id: 2, value: '142', label: 'PATENTS', description: 'Innovation-driven intellectual property' },
  { id: 3, value: '$85M', label: 'FUNDED PROJECTS', description: 'Government & industry-backed research' },
  { id: 4, value: 'Global', label: 'OUTCOMES', description: 'Policy, industry & social impact' },
];

const journalCategories = [
  'Centres of Excellence',
  'Faculty Research Areas',
  'Interdisciplinary Labs',
];

const facultySpotlight = [
  {
    id: 1,
    name: 'Shri. Abhishek Mohan Gupta',
    title: 'Pro - Chancellor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Mr. Pankaj Das',
    title: 'Registrar',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  },
  {
    id: 3,
    name: 'Dr. Nilanjan Chattopadhyay',
    title: 'Vice Chancellor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
];

const Research = () => {
  const [activeArea, setActiveArea] = useState(1);
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
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&q=80"
              alt="Research"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/30" />
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
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            RESEARCH THAT <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>matters</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Advancing knowledge through interdisciplinary inquiry, innovation, and real-world impact.
          </p>
        </motion.div>

        {/* Large "Research" Text - Bottom Left */}
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
            Research
          </motion.h1>
        </div>
      </div>

      {/* Research Ecosystem Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-16">
            Research Ecosystem
          </h2>

          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '580px' }}>
              <p className="text-[#21313c] leading-relaxed" style={{ fontSize: '20px', lineHeight: '28px' }}>
                Research at JLU is shaped by exploration rather than expectation.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-4" style={{ fontSize: '20px', lineHeight: '28px' }}>
                It grows from thoughtful questions, careful observation, and a willingness to look beyond the obvious.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-4" style={{ fontSize: '20px', lineHeight: '28px' }}>
                Across disciplines, faculty and students engage in work that seeks relevance, depth, and long-term value.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-4" style={{ fontSize: '20px', lineHeight: '28px' }}>
                Knowledge here is not only generated, it is examined, refined, and shared.
              </p>
            </div>

            {/* Right Side - Research Areas */}
            <div style={{ width: '580px' }}>
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className="w-full flex items-center justify-between py-4 border-b border-gray-300 text-left"
                >
                  <span className={`text-lg text-[#21313c] ${activeArea === area.id ? 'font-medium' : ''}`}>
                    {area.name}
                  </span>
                  {activeArea === area.id && (
                    <span className="text-[#21313c]">→</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-[#e8e8e8]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            height: '262px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between h-full">
            {statsData.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col justify-center"
                style={{
                  borderRight: index < 3 ? '1px solid #c4c4c4' : 'none',
                  paddingRight: index < 3 ? '40px' : '0',
                  marginRight: index < 3 ? '40px' : '0',
                }}
              >
                <p className="text-4xl md:text-5xl font-bold text-[#21313c] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-[#21313c] tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-[#21313c]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Publication Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Latest Publication
          </h2>

          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Journal Info */}
            <div style={{ maxWidth: '500px', marginTop: '100px' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                JLU Research Journal
              </h3>
              <p className="text-base text-[#21313c] leading-relaxed mb-8">
                A peer-reviewed platform showcasing original research across disciplines, fostering dialogue between academia and industry.
              </p>

              {/* Categories */}
              <div className="flex flex-col gap-4 mb-8">
                {journalCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-[#21313c]">——</span>
                    <span className={`text-base text-[#21313c] ${index === 0 ? 'font-medium' : ''}`}>
                      {category}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#" className="inline-flex items-center gap-3 text-[#21313c] font-medium underline hover:no-underline">
                Access the journal
                <span>→</span>
              </a>
            </div>

            {/* Right Side - Journal Card */}
            <div
              className="relative shrink-0 overflow-hidden rounded-lg"
              style={{ width: '580px', height: '500px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80"
                alt="Research Journal"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              {/* Publication Badge */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-white/90 flex flex-col items-center justify-center"
                style={{
                  height: '116px',
                  gap: '8px',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <p className="text-xl font-bold text-[#21313c]">Academic Insights</p>
                <p className="text-sm text-[#21313c]">Vol. 12, No. 2, Spring 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Spotlight Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#21313c] mb-4">
                Faculty Spotlight
              </h2>
              <p className="text-xl text-[#21313c]">
                Meet the minds shaping the future through rigorous inquiry.
              </p>
            </div>
            <a href="#" className="text-base text-[#21313c] font-medium underline hover:no-underline">
              View all Faculty
            </a>
          </div>

          <div className="flex justify-between">
            {facultySpotlight.map((faculty) => (
              <div
                key={faculty.id}
                className="flex flex-col"
                style={{ width: '380px' }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: '380px', height: '420px' }}
                >
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-[#21313c] mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-base text-[#666666]">
                    {faculty.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export { Research };
export default Research;
