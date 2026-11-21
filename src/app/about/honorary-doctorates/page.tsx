'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { honoraryDoctorates, HonoraryDoctorate } from '@/data/honoraryDoctorates';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: customEase },
});

export default function HonoraryDoctoratesPage() {
  const [selectedPerson, setSelectedPerson] = useState<HonoraryDoctorate | null>(null);

  // Group by year
  const years = [...new Set(honoraryDoctorates.map(d => d.year))];

  return (
    <div className="min-h-screen" style={{ background: '#f6f7f0' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#21313c', minHeight: 360 }}>
        <div className="relative z-10 mx-auto px-6 md:px-[120px] pt-32 pb-16" style={{ maxWidth: 1440 }}>
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: '#027ea1', textDecoration: 'none', letterSpacing: '0.2em' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              About JLU
            </Link>

            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05 }}>
              Honorary{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                Doctorate
              </span>{' '}
              Recipients
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem,1.6vw,1.15rem)', lineHeight: 1.75, maxWidth: 600 }}>
              Jagran Lakecity University has conferred Honorary Doctorates (Honoris Causa) upon {honoraryDoctorates.length} distinguished individuals who have made exceptional contributions to their fields and to society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Recipients by Year */}
      <div className="mx-auto px-6 md:px-[120px] py-16 md:py-20" style={{ maxWidth: 1440 }}>
        {years.map((year) => {
          const people = honoraryDoctorates.filter(d => d.year === year);
          return (
            <div key={year} className="mb-12 md:mb-16">
              <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-6 md:mb-8">
                <span
                  className="text-[#027ea1] text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}
                >
                  {year}
                </span>
                <div className="flex-1 h-px bg-[#e0e0d8]" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {people.map((person, index) => (
                  <motion.div
                    key={person.name}
                    {...fadeUp(index * 0.06)}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPerson(person)}
                  >
                    {person.image ? (
                      <div className="relative overflow-hidden rounded-xl mb-4" style={{ aspectRatio: '3 / 4' }}>
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ objectPosition: person.objectPosition || 'center center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-white text-lg font-semibold leading-tight">{person.name}</h3>
                          <p className="text-white/60 text-xs mt-1 line-clamp-2">{person.bio}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-white border border-[#e5e5e5] p-6 hover:shadow-lg transition-shadow duration-300" style={{ minHeight: 160 }}>
                        <div className="w-10 h-10 rounded-full bg-[#027ea1]/10 flex items-center justify-center mb-4">
                          <svg className="w-5 h-5 text-[#027ea1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-[#21313c] text-base font-semibold mb-2 group-hover:text-[#027ea1] transition-colors">{person.name}</h3>
                        <p className="text-[#666] text-sm line-clamp-3" style={{ lineHeight: 1.6 }}>{person.bio}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPerson && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPerson(null)}
            />
            <motion.div
              className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
              style={{
                top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: '540px',
                borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative h-[280px] md:h-[340px] overflow-hidden shrink-0" style={{ borderTopLeftRadius: '24px' }}>
                {selectedPerson.image ? (
                  <Image
                    src={selectedPerson.image}
                    alt={selectedPerson.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: selectedPerson.objectPosition || 'center center' }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#21313c] flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#f4c950] rounded-full">
                  <span className="text-[#21313c] text-xs font-semibold">{selectedPerson.year}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-white text-xl md:text-2xl font-semibold leading-tight">{selectedPerson.name}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <p className="text-[#666] text-base md:text-lg" style={{ lineHeight: 1.8 }}>
                  {selectedPerson.bio}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
