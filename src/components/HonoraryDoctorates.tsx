'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { honoraryDoctorates, HonoraryDoctorate } from '../data/honoraryDoctorates';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HonoraryDoctorates = () => {
  const [selectedPerson, setSelectedPerson] = useState<HonoraryDoctorate | null>(null);
  const displayDoctorates = honoraryDoctorates.slice(0, 3);

  return (
    <section className="w-full bg-[#f6f7f0]">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <span
            className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            Recognition
          </span>
          <h1
            className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Honorary{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              Doctorate
            </span>
          </h1>
          <p
            className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
            style={{ lineHeight: 1.7, fontWeight: 400 }}
          >
            Jagran Lakecity University has conferred Honorary Doctorates (Honoris Causa) upon distinguished individuals who have made exceptional contributions to their fields and to society.
          </p>
        </motion.div>

        {/* Doctorates Grid — show only 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayDoctorates.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: customEase }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: '3 / 4' }}
              onClick={() => setSelectedPerson(person)}
            >
              {person.image ? (
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: person.objectPosition || 'center center' }}
                />
              ) : (
                <div className="absolute inset-0 bg-[#21313c]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <span
                  className="text-[#f4c950] text-[11px] sm:text-[12px] uppercase tracking-widest block mb-2"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {person.year}
                </span>
                <h3
                  className="text-white text-base sm:text-lg md:text-xl mb-1"
                  style={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {person.name}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm line-clamp-2">
                  {person.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <Link
            href="/about/honorary-doctorates"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
            style={{ background: '#027ea1', color: '#ffffff', textDecoration: 'none' }}
          >
            View All {honoraryDoctorates.length} Recipients
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
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
              {/* Modal Image */}
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
                  <div className="absolute inset-0 bg-[#21313c]" />
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
              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <p className="text-[#666] text-base md:text-lg" style={{ lineHeight: 1.8 }}>
                  {selectedPerson.bio}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export { HonoraryDoctorates };
export default HonoraryDoctorates;
