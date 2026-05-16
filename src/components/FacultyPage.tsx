'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useIsMobile';
import { faculties, type DeanContact, type SchoolProgram } from '../data/faculties';

gsap.registerPlugin(ScrollTrigger);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FacultyPageProps {
  facultyId: string;
  heroImage?: string;
  bigText?: string;
}

const splitName = (name: string) => {
  const upper = name.trim();
  const facultyOf = upper.match(/^Faculty of\s+(.+)$/i);
  if (facultyOf) return { prefix: 'FACULTY OF', accent: facultyOf[1] };
  const dash = upper.match(/^([^-]+?)\s*-\s*(.+)$/);
  if (dash) return { prefix: dash[1].toUpperCase(), accent: dash[2] };
  return { prefix: upper.toUpperCase(), accent: '' };
};

const DeanCard = ({ contact, compact = false }: { contact: DeanContact; compact?: boolean }) => (
  <div className={`flex items-center gap-4 bg-[#f6f7f0] rounded-2xl ${compact ? 'p-3 md:p-4' : 'p-4 md:p-5'}`}>
    <div className={`relative shrink-0 rounded-full overflow-hidden bg-[#e0e0d8] border-2 border-white shadow-md ${compact ? 'w-14 h-14 md:w-16 md:h-16' : 'w-16 h-16 md:w-20 md:h-20'}`}>
      {contact.image ? (
        <Image src={contact.image} alt={contact.name} fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-[#027ea1] flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[#21313c] text-sm md:text-base font-semibold leading-tight">{contact.name}</p>
      <p className="text-[#027ea1] text-[11px] md:text-xs font-medium mt-0.5 leading-tight">{contact.title}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
        {contact.phone && (
          <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-[#666] text-[11px] hover:text-[#027ea1] transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {contact.phone}
          </a>
        )}
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-[#666] text-[11px] hover:text-[#027ea1] transition-colors truncate">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {contact.email}
          </a>
        )}
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0077b5] text-[11px] font-medium hover:underline">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  </div>
);

const ProgramRow = ({ program }: { program: SchoolProgram }) => {
  const cleanName = program.name.replace('*', '');
  const inner = (
    <div className="group flex items-center justify-between gap-3 bg-white border border-[#e9e9e2] rounded-xl px-4 py-3 hover:border-[#027ea1] hover:bg-[#f6f7f0] transition-all">
      <div className="min-w-0 flex-1">
        <p className="text-[#21313c] text-sm md:text-[15px] font-medium leading-snug">{cleanName}</p>
        <p className="text-[#999] text-xs mt-0.5">{program.degree === 'UG' ? 'Undergraduate' : program.degree === 'PG' ? 'Postgraduate' : program.degree}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[#027ea1] text-[11px] md:text-xs font-medium bg-[#027ea1]/10 px-3 py-1 rounded-full">{program.duration}</span>
        {program.slug && (
          <svg className="w-4 h-4 text-[#21313c] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  );
  return program.slug ? <Link href={`/programs/${program.slug}`}>{inner}</Link> : inner;
};

export const FacultyPage = ({ facultyId, heroImage, bigText }: FacultyPageProps) => {
  const faculty = faculties.find((f) => f.id === facultyId);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeDegree, setActiveDegree] = useState<'UG' | 'PG'>('UG');

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    document.querySelectorAll('.fp-fade-up').forEach((el, i) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [facultyId]);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7f0]">
        <p className="text-[#21313c]">Faculty not found.</p>
      </div>
    );
  }

  const { prefix: topPrefix, accent: topAccent } = splitName(faculty.name);
  const heroBigText = bigText ?? faculty.shortName;

  // Use the first school's image as hero fallback
  const resolvedHeroImage = heroImage ?? faculty.schools[0]?.image ?? 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/acedemics/acedemics%20landing%20page.webp';

  // Pick a faculty-level dean from any school (deans repeat across schools in the same faculty)
  const facultyDeanContact = faculty.schools.find((s) => s.deanContact)?.deanContact;

  // Aggregate all programs across schools, dedupe by slug or name
  const allPrograms = faculty.schools.flatMap((s) => s.programs);
  const ugPrograms = allPrograms.filter((p) => p.degree === 'UG');
  const pgPrograms = allPrograms.filter((p) => p.degree === 'PG');
  const visiblePrograms = activeDegree === 'UG' ? ugPrograms : pgPrograms;

  return (
    <div className="bg-[#f6f7f0]">
      {/* HERO — matches About hero */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src={resolvedHeroImage}
              alt={faculty.name}
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity: heroOpacity }} />
        </motion.div>

        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2 className="text-white font-bold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]">
            {topPrefix}
            {topAccent && (
              <>
                {' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  {topAccent}
                </span>
              </>
            )}
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white"
            style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            {faculty.description}
          </motion.h1>
        </motion.div>

        {/* Bottom giant gradient text */}
        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[3.5rem] sm:text-[5rem] md:text-[clamp(6rem,12vw,14rem)]"
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
            {heroBigText}
          </motion.h1>
        </div>
      </div>

      {/* OVERVIEW — description + dean + stats */}
      <section className="bg-white">
        <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[100px]" style={{ maxWidth: '1440px' }}>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="fp-fade-up">
              <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-sm md:text-base font-bold" style={{ letterSpacing: '0.2em' }}>
                Overview
              </span>
              <h2 className="text-[#21313c] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-8" style={{ fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                {faculty.shortName}{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  at JLU
                </span>
              </h2>
              <p className="text-[#444] text-base md:text-lg" style={{ lineHeight: 1.75 }}>
                {faculty.description}
              </p>

              {(faculty.dean || faculty.head) && (
                <div className="mt-6 inline-flex items-center gap-2 bg-[#f0c14b]/10 border border-[#f0c14b]/30 rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-[#b88800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-[#21313c] text-xs md:text-sm font-medium">
                    Led by {faculty.dean || faculty.head}
                  </span>
                </div>
              )}

              {facultyDeanContact && (
                <div className="mt-6 max-w-[520px]">
                  <DeanCard contact={facultyDeanContact} />
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 fp-fade-up">
              {faculty.stats.map((stat, i) => (
                <div key={i} className="bg-[#21313c] rounded-2xl p-5 md:p-6">
                  <div className="text-[#027ea1] text-xl md:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/70 text-[11px] md:text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOLS — each school as featured section */}
      <section className="bg-[#f6f7f0]">
        <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[120px]" style={{ maxWidth: '1440px' }}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8 mb-10 md:mb-16 fp-fade-up">
            <div>
              <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-sm md:text-base font-bold" style={{ letterSpacing: '0.2em' }}>
                Academic Structure
              </span>
              <h2 className="text-[#21313c] text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Schools &{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Programs
                </span>
              </h2>
            </div>
            <p className="text-[#666] text-sm md:text-[17px] max-w-full md:max-w-[420px]" style={{ lineHeight: 1.7 }}>
              {faculty.schools.length === 1
                ? `One specialized school within ${faculty.shortName}, offering focused learning and industry readiness.`
                : `${faculty.schools.length} specialized schools within ${faculty.shortName}, each shaping focused paths of learning and industry readiness.`}
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {faculty.schools.map((school, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={school.id}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center fp-fade-up ${isReversed ? 'lg:[&>div:first-child]:order-2' : ''}`}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl md:rounded-3xl overflow-hidden">
                    <Image src={school.image} alt={school.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#f0c14b] text-[#21313c] text-[11px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {school.shortName}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm md:text-base font-medium leading-snug">{school.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[#21313c] text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4" style={{ lineHeight: 1.2 }}>
                      {school.name}
                    </h3>
                    <p className="text-[#555] text-sm md:text-base mb-5 md:mb-6" style={{ lineHeight: 1.7 }}>
                      {school.description}
                    </p>

                    {school.deanContact && <DeanCard contact={school.deanContact} compact />}

                    {school.head && !school.deanContact && (
                      <div className="flex items-center gap-3 mt-4 bg-[#f6f7f0] rounded-xl px-4 py-3">
                        <div className="w-9 h-9 rounded-full bg-[#027ea1] flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[#999] text-[10px] uppercase tracking-wider">Head of School</p>
                          <p className="text-[#21313c] text-sm font-semibold">{school.head}</p>
                        </div>
                      </div>
                    )}

                    {/* Programs */}
                    <div className="mt-5 md:mt-6">
                      <h4 className="text-[#21313c] text-sm font-semibold mb-3 uppercase tracking-wider">
                        Programs ({school.programs.length})
                      </h4>
                      <div className="grid gap-2">
                        {school.programs.map((p, pi) => (
                          <ProgramRow key={pi} program={p} />
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    {school.highlights.length > 0 && (
                      <div className="mt-5 md:mt-6">
                        <h4 className="text-[#21313c] text-sm font-semibold mb-3 uppercase tracking-wider">Key Highlights</h4>
                        <ul className="space-y-2">
                          {school.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-3 text-[#555] text-sm md:text-[15px]" style={{ lineHeight: 1.6 }}>
                              <span className="w-1.5 h-1.5 bg-[#f0c14b] rounded-full mt-2 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALL PROGRAMS — combined table with UG/PG tabs */}
      {(ugPrograms.length > 0 || pgPrograms.length > 0) && (
        <section className="bg-[#21313c]">
          <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[120px]" style={{ maxWidth: '1440px' }}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8 mb-8 md:mb-12 fp-fade-up">
              <div>
                <span className="text-[#f0c14b] uppercase tracking-widest block mb-4 md:mb-6 text-sm md:text-base font-bold" style={{ letterSpacing: '0.2em' }}>
                  Course Catalogue
                </span>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  All{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                    Programs
                  </span>
                </h2>
              </div>
              <div className="flex gap-2">
                {ugPrograms.length > 0 && (
                  <button
                    onClick={() => setActiveDegree('UG')}
                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                      activeDegree === 'UG'
                        ? 'bg-[#f0c14b] text-[#21313c]'
                        : 'bg-[#2d3f4a] text-white/70 hover:text-white hover:bg-[#3a4f5c]'
                    }`}
                  >
                    UG · {ugPrograms.length}
                  </button>
                )}
                {pgPrograms.length > 0 && (
                  <button
                    onClick={() => setActiveDegree('PG')}
                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                      activeDegree === 'PG'
                        ? 'bg-[#f0c14b] text-[#21313c]'
                        : 'bg-[#2d3f4a] text-white/70 hover:text-white hover:bg-[#3a4f5c]'
                    }`}
                  >
                    PG · {pgPrograms.length}
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 fp-fade-up">
              {visiblePrograms.map((p, i) => {
                const cleanName = p.name.replace('*', '');
                const card = (
                  <div className="group flex items-center justify-between gap-3 bg-[#2d3f4a] hover:bg-[#354b58] rounded-xl px-4 md:px-5 py-4 transition-all">
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm md:text-base font-medium leading-snug">{cleanName}</p>
                      <p className="text-white/50 text-xs mt-0.5">{p.degree === 'UG' ? 'Undergraduate' : 'Postgraduate'}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[#7dd3f0] text-xs font-medium bg-white/10 px-3 py-1 rounded-full">{p.duration}</span>
                      {p.slug && (
                        <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
                return p.slug ? (
                  <Link key={i} href={`/programs/${p.slug}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={i}>{card}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="w-full px-3 py-10 md:px-6 md:py-16 lg:px-10 lg:py-20 bg-[#f6f7f0]">
        <div className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-8 md:px-10 md:py-12 lg:px-20 lg:py-16 rounded-2xl md:rounded-3xl lg:rounded-4xl" style={{ maxWidth: '1400px' }}>
          <div className="text-center mb-6 md:mb-10">
            <span className="text-[#999] uppercase tracking-widest block mb-3 md:mb-5 text-base md:text-xl font-bold" style={{ letterSpacing: '0.2em' }}>
              Start Your Journey
            </span>
            <h2 className="text-white" style={{ fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Ready to Join{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                {faculty.shortName}?
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-3 md:mt-4 max-w-2xl mx-auto">
              Take the first step towards an extraordinary education at JLU.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <a href="https://apply.jlu.edu.in/" className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] hover:bg-[#025f7a] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full transition-colors">
              Apply Now <span>→</span>
            </a>
            <a href="/contact" className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 hover:bg-white/10 text-white font-medium w-full sm:w-auto rounded-full text-center transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
