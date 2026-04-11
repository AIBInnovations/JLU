'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const InstitutionalOverview = () => {
  const isMobile = useIsMobile();
  const promotingRef = useRef<HTMLDivElement>(null);
  const glanceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: promotingScroll } = useScroll({
    target: promotingRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: glanceScroll } = useScroll({
    target: glanceRef,
    offset: ['start end', 'end start'],
  });

  const promotingY = useTransform(promotingScroll, [0, 1], ['-8%', '8%']);
  const glanceY = useTransform(glanceScroll, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const slug = (e as CustomEvent).detail?.slug;
      if (!slug) return;
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };
    window.addEventListener('navigate-section', handleNavigate);
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        handleNavigate(new CustomEvent('navigate-section', { detail: { slug: hash } }));
      }, 500);
    }
    return () => window.removeEventListener('navigate-section', handleNavigate);
  }, []);

  return (
    <>
      {/* ===== PROMOTING BODY SECTION ===== */}
      <section id="promoting-body" className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              ref={promotingRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl"
            >
              <motion.img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-mgt-award.jpg"
                alt="Promoting Body"
                className="absolute inset-0 w-full object-cover"
                style={{
                  y: isMobile ? 0 : promotingY,
                  height: '120%',
                  top: '-10%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Promoting Body
              </span>
              <h2
                className="text-[#21313c] mb-4 md:mb-6"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Jagran Social{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Welfare Society
                </span>
              </h2>
              <p
                className="text-[#666] text-sm md:text-base mb-5"
                style={{ lineHeight: 1.8 }}
              >
                Jagran Lakecity University is promoted by the <strong className="text-[#21313c]">Jagran Social Welfare Society (JSWS), Bhopal</strong> — a non-proprietary, not-for-profit, charitable welfare organisation registered with the Registrar of Societies, Madhya Pradesh.
              </p>
              <p
                className="text-[#666] text-sm md:text-base mb-5"
                style={{ lineHeight: 1.8 }}
              >
                Founded in 1997 by <strong className="text-[#21313c]">Shri Hari Mohan Gupta</strong>, guided by the vision of Late Shri Guru Dev Gupta, JSWS has been committed to making world-class education accessible and affordable. Over 25+ years, it has established Delhi Public Schools across Madhya Pradesh, Jagran Lakecity University (2013), and Shrewsbury International School India — one of the most prestigious international schools in the country.
              </p>
              <p
                className="text-[#666] text-sm md:text-base"
                style={{ lineHeight: 1.8 }}
              >
                The Society&apos;s core mission: <em>&ldquo;To nurture minds, uplift communities, and empower every individual to realise their full potential — building a society where knowledge empowers, compassion uplifts, and opportunity is accessible to all.&rdquo;</em>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JLU AT A GLANCE SECTION ===== */}
      <section id="jlu-at-a-glance" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-14 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* ── Row 1: label + headline / intro text ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-10 md:mb-14">
            {/* Left — label + headline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                JLU at a Glance
              </span>
              <h2
                className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
                style={{ fontWeight: 700, lineHeight: 1.1 }}
              >
                A University Built{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  for the World
                </span>
                {' '}of Tomorrow
              </h2>
            </motion.div>

            {/* Right — short intro */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: customEase }}
              viewport={{ once: true }}
            >
              <p className="text-[#555] text-base md:text-lg" style={{ lineHeight: 1.8 }}>
                Jagran Lakecity University is a UGC-recognised, multidisciplinary private university in Bhopal —
                promoted by the Jagran Prakashan Group and built to deliver academic rigour, global exposure
                and real-world readiness across every programme it offers.
              </p>
            </motion.div>
          </div>

          {/* ── Row 2: image (left) + content stack (right) ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-6 md:gap-8 items-stretch mb-6 md:mb-8">

            {/* Left — full-height campus image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: customEase }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl min-h-[280px] md:min-h-0"
            >
              <div ref={glanceRef} className="absolute inset-0">
              <motion.img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg"
                alt="JLU Campus"
                className="absolute inset-0 w-full object-cover"
                style={{
                  y: isMobile ? 0 : glanceY,
                  height: '120%',
                  top: '-10%',
                }}
              />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-6 left-6">
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Bhopal, Madhya Pradesh</p>
                <p className="text-white text-xl font-semibold">JLU Main Campus</p>
              </div>
              {/* Stats overlay — bottom right */}
              <div className="absolute bottom-6 right-6 flex gap-3">
                {[
                  { value: '50+', label: 'Programmes' },
                  { value: '10K+', label: 'Alumni' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl px-4 py-3 text-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)' }}>
                    <p className="text-white text-xl font-bold">{s.value}</p>
                    <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — text + bullets + 2 stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              {/* Text block */}
              <div className="rounded-2xl p-6 md:p-7 flex-1" style={{ background: '#ffffff' }}>
                <p className="text-[#444] text-sm md:text-base mb-4" style={{ lineHeight: 1.8 }}>
                  JLU offers 50+ undergraduate, postgraduate, doctoral and skill-based programmes spanning
                  Management, Law, Engineering &amp; Technology, Journalism, Fashion, Design &amp; Arts, and Pharmacy —
                  each designed for experiential learning and industry readiness.
                </p>
                <p className="text-[#444] text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                  With 45+ global university partnerships across 14 countries — including Cambridge, UCL and RMIT —
                  and students from 25+ states, JLU brings world-class perspectives directly into the classroom.
                </p>
              </div>

              {/* Highlights — 2-col grid */}
              <div className="grid grid-cols-1 gap-2">
                {[
                  'UGC recognised & AIU affiliated private university',
                  'NAAC accredited institution',
                  '45+ global university partnerships in 14 countries',
                  'Google News Lab University Network member',
                  'EU Erasmus+ international exchange programmes',
                  'Students from 25+ states & international learners',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: '#f6f7f0', border: '1px solid #e8e8e0' }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: '#027ea1' }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[#444] text-xs md:text-sm" style={{ lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* 2 stat pills */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '14', label: 'Countries — Global Partners', dark: true },
                  { value: '25+', label: 'States Represented', dark: false },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-5 py-4"
                    style={{ background: stat.dark ? '#027ea1' : '#e6f4f8' }}
                  >
                    <p className="text-3xl font-bold mb-0.5" style={{ color: stat.dark ? '#ffffff' : '#027ea1' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium" style={{ color: stat.dark ? '#ffffff99' : '#027ea1cc' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── View Full Profile CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14"
          >
            <a
              href="/about/jlu-at-a-glance"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 group"
              style={{ background: '#027ea1', color: '#ffffff', textDecoration: 'none' }}
            >
              View Full University Profile — Stats, Rankings & Awards
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* ── 4 Pillars ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
          >
            <p
              className="text-[#999] uppercase tracking-widest text-xs font-bold mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Pillars of JLU
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  bg: '#c3fd7a', textColor: '#21313c',
                  title: 'Global Network',
                  description: '45+ international collaborations across 14 countries with Cambridge, UCL, RMIT & more.',
                  icon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/4.png',
                  href: '/why-jlu/global-network',
                },
                {
                  bg: '#027ea1', textColor: '#ffffff',
                  title: 'Industry Intervention',
                  description: '42+ industry tie-ups with EY, KPMG, Deloitte, Amazon & TCS powering real-world placements.',
                  icon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/5.png',
                  href: '/why-jlu/industry-intervention',
                },
                {
                  bg: '#e85a71', textColor: '#ffffff',
                  title: 'Interdisciplinary Degrees',
                  description: '50+ programs across 6 faculties blending law, tech, design, media & management.',
                  icon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/1.png',
                  href: '/why-jlu/interdisciplinary-degrees',
                },
                {
                  bg: '#f4c950', textColor: '#21313c',
                  title: 'Student Approach',
                  description: 'Experiential learning with 1-on-1 mentoring, 45+ labs & hands-on projects from day one.',
                  icon: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/morenew/pillars/3.png',
                  href: '/why-jlu/student-approach',
                },
              ].map((pillar, i) => (
                <a
                  key={i}
                  href={pillar.href}
                  className="relative overflow-hidden rounded-xl p-5 md:p-6 flex flex-col justify-between min-h-[190px] md:min-h-[210px] group"
                  style={{ background: pillar.bg, color: pillar.textColor, textDecoration: 'none' }}
                >
                  <div className="absolute bottom-0 right-0 w-20 h-20 md:w-28 md:h-28 opacity-20 -translate-x-4 translate-y-3 group-hover:opacity-30 transition-opacity duration-300">
                    <img src={pillar.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-60" style={{ letterSpacing: '0.15em' }}>
                      0{i + 1}
                    </p>
                    <h3 className="text-base md:text-lg font-bold mb-2" style={{ lineHeight: 1.2 }}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs opacity-80" style={{ lineHeight: 1.6 }}>
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity">
                    Explore
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export { InstitutionalOverview };
export default InstitutionalOverview;
