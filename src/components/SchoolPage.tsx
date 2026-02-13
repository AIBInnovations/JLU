'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import type { School, Faculty } from '@/data/faculties';
import { PageEventsSection } from './PageEventsSection';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SchoolPageProps {
  school: School;
  faculty: Faculty;
}

// Curated secondary images per school for visual variety
const secondaryImages: Record<string, string[]> = {
  jlbs: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
  ],
  'sports-mgmt': [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&q=80',
  ],
  hospitality: [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  ],
  journalism: [
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&q=80',
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80',
  ],
  'advertising-pr': [
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  ],
  'events-entertainment': [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  ],
  'languages-social': [
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
  ],
  design: [
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80',
  ],
  architecture: [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  ],
  ai: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  ],
  engineering: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
  ],
  'computer-application': [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
    'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
  ],
  law: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
  ],
  'iica-creative': [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
  ],
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
];

export const SchoolPage = ({ school, faculty }: SchoolPageProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(parallaxProgress, [0, 1], ['0%', '20%']);

  const images = secondaryImages[school.id] || fallbackImages;

  return (
    <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden">
      {/* ============================================ */}
      {/* HERO — Full screen cinematic */}
      {/* ============================================ */}
      <section className="w-screen m-0 p-0 overflow-x-hidden">
        <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
          <motion.div
            className="relative w-screen min-h-[100svh] md:min-h-screen"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 2, ease: customEase }}
          >
            <motion.div className="absolute inset-0" style={{ y: heroY, willChange: 'transform' }}>
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div className="absolute inset-0 bg-black/40" style={{ opacity: heroOpacity, willChange: 'opacity' }} />
          </motion.div>

          {/* Faculty badge + tagline */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px]"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block text-[#f0c14b] text-[10px] md:text-xs uppercase tracking-[0.25em] bg-black/30 px-4 py-2 rounded-full mb-4 border border-white/10"
            >
              {faculty.shortName}
            </motion.span>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
            >
              {school.tagline}
            </motion.p>
          </motion.div>

          {/* Large gradient text */}
          <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
              className="font-normal select-none text-[2.5rem] sm:text-[4rem] md:text-[clamp(5rem,10vw,10rem)]"
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
              {school.shortName}
            </motion.h1>
          </div>

          {/* Bottom-right stat pill */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: customEase }}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden sm:flex items-center gap-3 bg-black/40 border border-white/15 rounded-full px-5 py-3"
          >
            <span className="text-[#f0c14b] text-xl md:text-2xl font-bold">{school.programs.length}</span>
            <span className="text-white/80 text-xs uppercase tracking-wider">Programs</span>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT — Overlapping image + text (editorial) */}
      {/* ============================================ */}
      <section ref={aboutRef} className="relative py-20 md:py-0 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:min-h-[80vh] items-center">
            {/* Image — reveals left to right */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={aboutInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1.2, ease: customEase }}
              className="md:col-span-6 relative"
            >
              <div className="relative md:-ml-12 overflow-hidden rounded-2xl md:rounded-none md:rounded-r-3xl">
                <div className="aspect-[4/5] md:aspect-auto md:h-[80vh]">
                  <img
                    src={images[0]}
                    alt={`${school.name} campus`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating number */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10">
                  <span
                    className="text-white/20 font-bold select-none"
                    style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 1, fontFamily: 'system-ui' }}
                  >
                    01
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text content — slides in from off-screen right */}
            <div className="md:col-span-6 relative z-10 md:-ml-16 py-10 md:py-20 px-6 md:px-0 overflow-hidden">
              <motion.div
                initial={{ x: '100%' }}
                animate={aboutInView ? { x: 0 } : { x: '100%' }}
                transition={{ duration: 1.2, delay: 0.3, ease: customEase }}
              >
              <div className="md:bg-white md:rounded-3xl md:p-12 md:shadow-2xl md:shadow-black/5">
                <span className="text-[#f0c14b] text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-4 font-medium">
                  About the School
                </span>
                <h2
                  className="text-[#21313c] text-3xl md:text-4xl lg:text-[3.2rem] font-semibold mb-6"
                  style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
                >
                  {school.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    {school.name.split(' ').slice(-1)[0]}
                  </span>
                </h2>
                <p className="text-[#666] text-sm md:text-[15px] mb-8" style={{ lineHeight: 1.9 }}>
                  {school.description}
                </p>

                {/* Inline stats row */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {faculty.stats.slice(0, 3).map((stat, i) => (
                    <div key={i} className="text-center">
                      <span className="text-[#21313c] text-2xl md:text-3xl font-bold block" style={{ letterSpacing: '-0.02em' }}>
                        {stat.value}
                      </span>
                      <span className="text-[#999] text-[10px] uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {school.head && (
                  <div className="flex items-center gap-4 pt-6 border-t border-[#eee]">
                    <div className="w-11 h-11 rounded-full bg-[#21313c] flex items-center justify-center shrink-0">
                      <span className="text-[#f0c14b] text-sm font-bold">
                        {school.head.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#21313c] font-semibold text-sm block">{school.head}</span>
                      <span className="text-[#999] text-xs">Head of School</span>
                    </div>
                  </div>
                )}
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROGRAMS — Stacked cards with visual hierarchy */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-[#21313c] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(240,193,75,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(195,253,122,0.05) 0%, transparent 70%)' }} />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20"
          >
            <div>
              <span className="text-[#f0c14b] text-xs tracking-[0.3em] uppercase block mb-4">
                What We Offer
              </span>
              <h2
                className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold"
                style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Programs{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  Offered
                </span>
              </h2>
            </div>
            <p className="text-white/40 text-sm mt-4 md:mt-0 max-w-[350px]" style={{ lineHeight: 1.7 }}>
              Choose from {school.programs.length} carefully designed programs that blend theory with real-world practice.
            </p>
          </motion.div>

          {/* Programs as elegant list items */}
          <div className="space-y-3">
            {school.programs.map((program, i) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: customEase }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 py-5 sm:py-6 border-b border-white/10 hover:border-[#f0c14b]/40 transition-colors cursor-default"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-white/20 font-mono text-sm w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-[#f0c14b] transition-colors" style={{ letterSpacing: '-0.01em' }}>
                    {program.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 ml-12 sm:ml-0">
                  <span className="text-white/30 text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    {program.duration}
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    program.degree === 'UG'
                      ? 'text-[#c3fd7a] bg-[#c3fd7a]/10 border border-[#c3fd7a]/20'
                      : program.degree === 'PG' || program.degree === 'PhD'
                      ? 'text-[#f0c14b] bg-[#f0c14b]/10 border border-[#f0c14b]/20'
                      : 'text-[#8bc34a] bg-[#8bc34a]/10 border border-[#8bc34a]/20'
                  }`}>
                    {program.degree}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FULL-WIDTH PARALLAX IMAGE BREAK */}
      {/* ============================================ */}
      <section ref={parallaxRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: parallaxY, willChange: 'transform' }}>
          <img
            src={images[1]}
            alt={`${school.name} experience`}
            className="w-full h-[120%] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Floating quote / tagline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="text-center max-w-[700px]">
            <p
              className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold"
              style={{ lineHeight: 1.15, letterSpacing: '-0.02em', textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
            >
              &ldquo;{school.tagline.replace(/\.$/, '')}&rdquo;
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* HIGHLIGHTS — Bento grid with visual variety */}
      {/* ============================================ */}
      <section className="py-20 md:py-32 bg-[#f6f7f0]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-12 md:mb-20"
          >
            <span className="text-[#999] text-xs tracking-[0.3em] uppercase block mb-4">
              Why Choose Us
            </span>
            <h2
              className="text-[#21313c] text-3xl md:text-5xl lg:text-6xl font-semibold"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              What Makes Us{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Different
              </span>
            </h2>
          </motion.div>

          {/* Bento-style highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {school.highlights.map((highlight, i) => {
              // First highlight is featured (large)
              if (i === 0) {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: customEase }}
                    className="md:col-span-2 relative overflow-hidden rounded-2xl min-h-[250px] md:min-h-[320px] group"
                  >
                    <img
                      src={school.image}
                      alt="Featured highlight"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#21313c]/95 via-[#21313c]/70 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-14 max-w-[600px]">
                      <div className="w-12 h-12 rounded-xl bg-[#f0c14b] flex items-center justify-center mb-6">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <p className="text-white text-lg md:text-2xl font-semibold mb-3" style={{ lineHeight: 1.3 }}>
                        {highlight}
                      </p>
                      <span className="text-white/40 text-xs uppercase tracking-wider">Top Highlight</span>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: customEase }}
                  className="bg-white rounded-2xl p-7 md:p-8 hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-[#f0c14b]/20"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#f6f7f0] group-hover:bg-[#f0c14b]/10 flex items-center justify-center shrink-0 transition-colors">
                      <span className="text-[#21313c] text-sm font-bold font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#21313c] text-sm md:text-base font-medium" style={{ lineHeight: 1.7 }}>
                        {highlight}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* EVENTS SECTION */}
      {/* ============================================ */}
      <PageEventsSection />

      {/* ============================================ */}
      {/* EXPLORE FACULTY — Other schools */}
      {/* ============================================ */}
      {faculty.schools.length > 1 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
            >
              <div>
                <span className="text-[#999] text-xs tracking-[0.3em] uppercase block mb-4">
                  {faculty.name}
                </span>
                <h2
                  className="text-[#21313c] text-3xl md:text-5xl font-semibold"
                  style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
                >
                  Other Schools in{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    this Faculty
                  </span>
                </h2>
              </div>
              <p className="text-[#666] text-sm max-w-[350px] mt-4 md:mt-0" style={{ lineHeight: 1.7 }}>
                {faculty.description.slice(0, 120)}...
              </p>
            </motion.div>

            <div className={`grid gap-4 md:gap-5 ${
              faculty.schools.length - 1 <= 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {faculty.schools
                .filter(s => s.id !== school.id)
                .map((otherSchool, i) => (
                  <motion.div
                    key={otherSchool.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: customEase }}
                  >
                    <Link
                      href={`/schools/${otherSchool.id}`}
                      className="group block relative overflow-hidden rounded-2xl"
                      style={{ aspectRatio: '16/10' }}
                    >
                      <img
                        src={otherSchool.image}
                        alt={otherSchool.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[#f0c14b] text-[10px] bg-[#f0c14b]/15 px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
                            {otherSchool.shortName}
                          </span>
                          <span className="text-white/40 text-[10px] bg-white/10 px-2.5 py-1 rounded-full">
                            {otherSchool.programs.length} Programs
                          </span>
                        </div>
                        <h4 className="text-white font-semibold text-base md:text-lg mb-1.5 group-hover:text-[#f0c14b] transition-colors" style={{ lineHeight: 1.2 }}>
                          {otherSchool.name}
                        </h4>
                        <p className="text-white/50 text-xs">{otherSchool.tagline}</p>

                        {/* Arrow */}
                        <div className="mt-4 flex items-center gap-2 text-[#c3fd7a] text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Explore School</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* CTA — Full-width with split layout */}
      {/* ============================================ */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh]">
          {/* Left — Image */}
          <div className="relative min-h-[300px] md:min-h-0">
            <img
              src={school.image}
              alt={school.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#21313c]/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: customEase }}
                className="text-white/10 font-bold select-none text-[6rem] sm:text-[8rem] md:text-[10rem]"
                style={{ fontFamily: 'system-ui', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                JLU
              </motion.span>
            </div>
          </div>

          {/* Right — CTA content */}
          <div className="bg-[#f0c14b] flex items-center justify-center p-10 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="max-w-[450px]"
            >
              <span className="text-[#21313c]/50 text-xs tracking-[0.2em] uppercase block mb-4">
                Start Your Journey
              </span>
              <h2
                className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl font-semibold mb-5"
                style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Ready to{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  begin?
                </span>
              </h2>
              <p className="text-[#21313c]/60 text-sm mb-8" style={{ lineHeight: 1.8 }}>
                Join {school.name} and be part of a transformative educational experience that prepares you for the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/apply"
                  className="px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform text-sm text-center"
                  style={{ backgroundColor: '#21313c', color: '#ffffff' }}
                >
                  Apply Now
                </Link>
                <Link
                  href="/admissions"
                  className="px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform text-sm text-center border-2 border-[#21313c]/30 hover:border-[#21313c]"
                  style={{ color: '#21313c' }}
                >
                  Admissions Info
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolPage;
