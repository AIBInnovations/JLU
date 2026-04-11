'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease },
  };
}

export default function JluAtAGlancePage() {
  return (
    <div className="min-h-screen" style={{ background: '#f6f7f0' }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#21313c', minHeight: 420 }}>
        {/* Campus image bg */}
        <div className="absolute inset-0">
          <img
            src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg"
            alt="JLU Campus"
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #21313c 50%, rgba(33,49,60,0.7) 100%)' }} />
        </div>

        <div className="relative mx-auto px-6 md:px-[120px] pt-28 pb-16" style={{ maxWidth: 1440 }}>
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <Link
              href="/about#jlu-at-a-glance"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: '#027ea1', textDecoration: 'none', letterSpacing: '0.2em' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              About JLU
            </Link>

            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.0 }}>
              JLU{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                at a Glance
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem,1.8vw,1.25rem)', lineHeight: 1.75, maxWidth: 600 }}>
              A complete picture of Jagran Lakecity University — students, research,
              programmes, global reach, and recognition across India and the world.
            </p>
          </motion.div>

          {/* Stat row */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-12 max-w-4xl">
            {[
              { v: '2,500+', l: 'Students' },
              { v: '54', l: 'Programmes' },
              { v: '42', l: 'Global Tie-ups' },
              { v: '3,286', l: 'Alumni' },
              { v: '613', l: 'Publications' },
              { v: '20', l: 'Research Centres' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl px-4 py-3 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <p className="font-bold text-white" style={{ fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', lineHeight: 1 }}>{s.v}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto px-6 md:px-[120px] py-16 md:py-20" style={{ maxWidth: 1440 }}>

        {/* ── SECTION: BY THE NUMBERS ───────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
            Jagran Lakecity University at A Glance
          </span>
        </motion.div>

        {/* ── ROW 1: 3 cards — Alumni | Students donut | Scholarship ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">

          {/* Alumni */}
          <motion.div {...fadeUp(0)} className="rounded-2xl p-6 flex flex-col justify-between" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minHeight: 180 }}>
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#555', letterSpacing: '0.18em' }}>Alumni</p>
              {/* Graduation cap icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                <path d="M22 10v6M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ fontSize: 64, fontWeight: 800, color: '#21313c', lineHeight: 1, marginTop: 12 }}>3286</p>
          </motion.div>

          {/* Students donut */}
          <motion.div {...fadeUp(0.08)} className="rounded-2xl p-6 flex flex-col items-center justify-center" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minHeight: 180 }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4 self-start" style={{ color: '#555', letterSpacing: '0.18em' }}>Students</p>
            <div className="flex items-center gap-5 w-full">
              {/* Donut */}
              <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0">
                <circle cx="50" cy="50" r="34" fill="none" stroke="#eee" strokeWidth="13"/>
                {/* UG 88% orange */}
                <circle cx="50" cy="50" r="34" fill="none" stroke="#555" strokeWidth="13"
                  strokeDasharray="188.4 25.1" transform="rotate(-90 50 50)" strokeLinecap="butt"/>
                {/* PG 8.27% teal */}
                <circle cx="50" cy="50" r="34" fill="none" stroke="#4ec9e1" strokeWidth="13"
                  strokeDasharray="17.6 195.9" transform="rotate(226.8 50 50)" strokeLinecap="butt"/>
                {/* Doctoral 4.09% dark */}
                <circle cx="50" cy="50" r="34" fill="none" stroke="#2d6a85" strokeWidth="13"
                  strokeDasharray="8.7 204.8" transform="rotate(255.6 50 50)" strokeLinecap="butt"/>
                {/* Person icon in centre */}
                <circle cx="50" cy="44" r="7" fill="none" stroke="#999" strokeWidth="1.5"/>
                <path d="M36 64c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="none" stroke="#999" strokeWidth="1.5"/>
              </svg>
              {/* Labels */}
              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#4ec9e1' }}/>
                  <span className="font-bold" style={{ color: '#555' }}>8.27%</span>
                  <span style={{ color: '#666' }}>POSTGRADUATE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#2d6a85' }}/>
                  <span className="font-bold" style={{ color: '#555' }}>4.09%</span>
                  <span style={{ color: '#666' }}>DOCTORAL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#555' }}/>
                  <span className="font-bold" style={{ color: '#555' }}>88%</span>
                  <span style={{ color: '#666' }}>UNDERGRADUATES</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Students on Scholarship */}
          <motion.div {...fadeUp(0.16)} className="rounded-2xl p-6 flex flex-col justify-between" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minHeight: 180 }}>
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#555', letterSpacing: '0.18em' }}>Students on Scholarship</p>
              {/* Hand scholarship icon */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 11h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V11z" stroke="#333" strokeWidth="1.5"/>
              </svg>
            </div>
            <p style={{ fontSize: 64, fontWeight: 800, color: '#21313c', lineHeight: 1, marginTop: 12 }}>12.86%</p>
          </motion.div>
        </div>

        {/* ── ROW 2: 4 cards — Research | Total Students | International | Programs ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 md:mb-20">

          {/* Research */}
          <motion.div {...fadeUp(0)} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#555', letterSpacing: '0.18em' }}>Research</p>
            <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: '#999' }}>(No. of Publications)</p>
            <div className="flex items-end justify-between mb-4">
              <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1 }}>613</p>
              {/* Monitor/research icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, marginBottom: 4 }}>
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="#333" strokeWidth="1.5"/>
                <path d="M8 21h8M12 17v4" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7 9l3 3 2-2 3 3" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#555', letterSpacing: '0.18em' }}>Research Centers</p>
            <div className="flex items-end justify-between">
              <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1 }}>20</p>
              {/* Building icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, marginBottom: 4 }}>
                <path d="M3 21h18M5 21V7l7-4 7 4v14" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          {/* Total Students */}
          <motion.div {...fadeUp(0.08)} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#555', letterSpacing: '0.18em' }}>Total Students</p>
            <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1, marginBottom: 16 }}>2500</p>
            {/* Male/Female with stick figures */}
            <div className="space-y-3">
              {[
                { label: 'Male', pct: 58, color: '#4ec9e1' },
                { label: 'Female', pct: 42, color: '#555' },
              ].map((g) => (
                <div key={g.label} className="flex items-center gap-2">
                  {/* Stick figure */}
                  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="7" cy="3" r="2.5" fill={g.color}/>
                    <path d="M7 6v8M4 9l3-1 3 1M4 19l3-5 3 5" stroke={g.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] mb-1" style={{ color: '#555' }}>
                      <span>{g.pct}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 5, background: '#f0f0f0' }}>
                      <div className="h-full rounded-full" style={{ width: `${g.pct}%`, background: g.color }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* International */}
          <motion.div {...fadeUp(0.16)} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#555', letterSpacing: '0.18em' }}>International Collaborations</p>
            <div className="flex items-end justify-between mb-4">
              <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1, marginTop: 6 }}>42</p>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, marginBottom: 4 }}>
                <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="1.5"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#333" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#555', letterSpacing: '0.18em' }}>Student Exchange Collaborations</p>
            <div className="flex items-end justify-between">
              <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1, marginTop: 6 }}>20+</p>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, marginBottom: 4 }}>
                <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="1.5"/>
                <path d="M8 12l2 2 4-4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div {...fadeUp(0.24)} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
            <div className="flex items-start justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#555', letterSpacing: '0.18em' }}>No. of Programs</p>
              <p style={{ fontSize: 52, fontWeight: 800, color: '#21313c', lineHeight: 1 }}>54</p>
            </div>
            <div className="space-y-2 mt-4">
              {[
                { label: 'UG', value: 29 },
                { label: 'PG', value: 17 },
                { label: 'Doctoral', value: 8 },
              ].map((p) => (
                <div key={p.label} className="flex items-baseline justify-between" style={{ borderBottom: '1px solid #f5f5f5', paddingBottom: 6 }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#555' }}>{p.label}</p>
                  <p style={{ fontSize: 32, fontWeight: 800, color: '#21313c', lineHeight: 1 }}>{p.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── SECTION: RANKINGS & CERTIFICATE ──────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-6">
          <span className="text-[#999] uppercase tracking-widest block mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
            Rankings And Certificate
          </span>
          {/* Actual badge image extracted directly from the official PDF */}
          <img
            src="/badges/rankings-card-web.png"
            alt="JLU Rankings — QS I-Gauge Diamond, E-LEAD, EducationWorld, India Today"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </motion.div>

        {/* ── SECTION: HIGHLIGHTS ──────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-16 md:mb-20">
          <span className="text-[#999] uppercase tracking-widest block mb-8 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>Institutional Highlights</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Academic Quality', bg: '#ffffff', dark: false,
                items: ['UGC recognised & AIU affiliated', 'NAAC accredited institution', 'NBA accredited programmes', 'Curriculum revised every year'],
              },
              {
                title: 'Global Reach', bg: '#21313c', dark: true,
                items: ['45+ university partnerships', '14 countries represented', 'EU Erasmus+ exchange programmes', 'Google News Lab member'],
              },
              {
                title: 'Industry Connect', bg: '#027ea1', dark: true,
                items: ['42+ industry tie-ups', 'EY, KPMG, Amazon, Deloitte', '80%+ placement rate', 'Packages up to ₹24 LPA'],
              },
            ].map((col, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="rounded-3xl p-8" style={{ background: col.bg }}>
                <h3 className="text-xl font-bold mb-5" style={{ color: col.dark ? '#ffffff' : '#21313c' }}>{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.dark ? '#ffffff' : '#21313c' }}/>
                      <span className="text-sm" style={{ color: col.dark ? 'rgba(255,255,255,0.85)' : '#444', lineHeight: 1.55 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="rounded-3xl p-10 md:p-16 text-center" style={{ background: '#21313c' }}>
          <span className="uppercase tracking-widest block mb-4 text-xl md:text-2xl font-bold" style={{ color: '#8899a6', letterSpacing: '0.2em' }}>Join Us</span>
          <h2 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight: 1.1 }}>
            Be Part of{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
              JLU&apos;s Story
            </span>
          </h2>
          <p className="text-base mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.7 }}>
            2,500+ students from 25+ states. 45+ global partners.<br/>One university built for the world of tomorrow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admissions" className="px-8 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: '#027ea1', color: '#ffffff', textDecoration: 'none' }}>
              Apply Now
            </Link>
            <Link href="/programs" className="px-8 py-3.5 rounded-full text-sm font-bold border hover:opacity-90 transition-opacity" style={{ color: 'white', textDecoration: 'none', borderColor: 'rgba(255,255,255,0.2)' }}>
              Explore Programmes
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
