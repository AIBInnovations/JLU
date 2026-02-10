'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Program, getRelatedPrograms } from '../data/programs';

interface ProgramDetailProps {
  program: Program;
}

export const ProgramDetail = ({ program }: ProgramDetailProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const relatedPrograms = getRelatedPrograms(program, 3);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen min-h-[70svh] md:h-[80vh]"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 md:pl-10 md:pt-[120px]"
        >
          <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm">
            <Link href="/programs" className="hover:text-white transition-colors">
              Programs
            </Link>
            <span>/</span>
            <span className="text-white">{program.category}</span>
            <span>/</span>
            <span className="text-[#f0c14b]">{program.shortName}</span>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6 md:px-10 md:pb-16">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-[#f0c14b] text-[#21313c] rounded-full mb-4">
                {program.category} Program
              </span>

              {/* Program Name */}
              <h1
                className="text-white font-semibold leading-tight mb-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                {program.name}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/80 text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {program.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {program.school}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{program.type}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-4 py-12 sm:px-6 md:px-[120px] md:py-20"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-4">
                  About the Program
                </h2>
                <p className="text-[#666] leading-relaxed text-base md:text-lg">
                  {program.description}
                </p>
              </motion.div>

              {/* Highlights Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-6">
                  Program <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Highlights</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-[#f6f7f0] rounded-lg group hover:bg-[#21313c] transition-colors duration-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#c3fd7a] flex items-center justify-center shrink-0 group-hover:bg-[#f0c14b] transition-colors">
                        <svg className="w-3 h-3 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#21313c] text-sm md:text-base group-hover:text-white transition-colors">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Career Prospects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-6">
                  Career Prospects
                </h2>
                <div className="flex flex-wrap gap-3">
                  {program.careerProspects.map((career, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 bg-[#21313c] text-white text-sm rounded-full hover:bg-[#f0c14b] hover:text-[#21313c] transition-colors cursor-default"
                    >
                      {career}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#21313c] p-6 md:p-8 rounded-2xl mb-6 sticky top-24"
              >
                <h3 className="text-white font-semibold text-lg mb-6">Quick Information</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">Degree</span>
                    <span className="text-white font-medium">{program.degree}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">Duration</span>
                    <span className="text-white font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">Type</span>
                    <span className="text-white font-medium">{program.type}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">Category</span>
                    <span className="text-[#f0c14b] font-medium">{program.category}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-white/60 text-sm mb-2">Eligibility</h4>
                  <p className="text-white text-sm leading-relaxed">{program.eligibility}</p>
                </div>

                {/* Apply Button */}
                <Link
                  href="/apply"
                  className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#c3fd7a] text-[#21313c] font-semibold rounded-full hover:bg-[#f0c14b] transition-colors"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {/* Download Brochure */}
                <a
                  href="/broucher/Fee-Structure2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Programs Section */}
      {relatedPrograms.length > 0 && (
        <div className="w-full bg-[#f6f7f0]">
          <div
            className="mx-auto px-4 py-12 sm:px-6 md:px-[120px] md:py-20"
            style={{ maxWidth: '1440px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl">
                  Related <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Programs</span>
                </h2>
                <Link
                  href="/programs"
                  className="text-[#21313c] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View All
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPrograms.map((relatedProgram, index) => (
                  <Link href={`/programs/${relatedProgram.slug}`} key={relatedProgram.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedProgram.image}
                          alt={relatedProgram.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-4 left-4 px-2 py-1 text-xs font-medium bg-[#f0c14b] text-[#21313c] rounded">
                          {relatedProgram.degree}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-[#21313c] font-semibold text-base mb-2 group-hover:text-[#666] transition-colors line-clamp-2">
                          {relatedProgram.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#666]">
                          <span>{relatedProgram.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                          <span>{relatedProgram.type}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[10px] text-[#999]">
                            {relatedProgram.school.replace('School of ', '')}
                          </span>
                          <span className="text-[#21313c] group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-4 py-16 sm:px-6 md:px-[120px] md:py-24"
          style={{ maxWidth: '1440px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-white font-semibold text-2xl md:text-4xl mb-4">
              Ready to Begin Your <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Journey?</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Take the first step towards your future. Apply now and join thousands of students shaping their tomorrow at JLU.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-4 bg-[#c3fd7a] text-[#21313c] font-semibold rounded-full hover:bg-[#f0c14b] transition-colors flex items-center gap-2"
              >
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/programs"
                className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Explore More Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetail;
