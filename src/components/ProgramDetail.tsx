'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '../hooks/useIsMobile';
import { Program, getRelatedPrograms } from '../data/programs';
import { courseFees, ProgramFees } from '../data/courseFees';
import { getModulesByProgramId } from '../data/programModules';
import { programPlacements, allTopRecruiters } from '../data/placements';

interface ProgramDetailProps {
  program: Program;
}

export const ProgramDetail = ({ program }: ProgramDetailProps) => {
  const isMobile = useIsMobile();
  const [showAllModules, setShowAllModules] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const relatedPrograms = getRelatedPrograms(program, 3);

  // Look up fee data for this program
  const feeData: ProgramFees | undefined = program.feeId
    ? courseFees.find(f => f.id === program.feeId)
    : undefined;

  // Look up modules for this program
  const modulesData = getModulesByProgramId(program.id);

  // Get placement data based on category
  const placementData = programPlacements.find(
    p => p.programCategory === program.category ||
    (program.category === 'UG' && program.degree.includes('LLB') && p.programCategory === 'Law') ||
    (program.degree === 'MBA' && p.programCategory === 'MBA')
  );

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen min-h-[60svh] md:h-[80vh]"
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
          className="absolute top-0 left-0 px-4 pt-24 md:pl-10 md:pt-[120px]"
        >
          <div className="flex items-center gap-1.5 md:gap-2 text-white/70" style={{ fontSize: isMobile ? '12px' : '14px' }}>
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
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:px-10 md:pb-16">
          <div className="max-w-[1440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Category Badge */}
              <span
                className="inline-block font-medium bg-[#f0c14b] text-[#21313c] rounded-full mb-3 md:mb-4"
                style={{ fontSize: isMobile ? '11px' : '12px', padding: isMobile ? '4px 12px' : '4px 12px' }}
              >
                {program.category} Program
              </span>

              {/* Program Name */}
              <h1
                className="text-white font-semibold leading-tight mb-3 md:mb-4"
                style={{ fontSize: isMobile ? '1.6rem' : undefined, letterSpacing: '-0.02em' }}
              >
                <span className="hidden md:block text-5xl lg:text-6xl">{program.name}</span>
                <span className="md:hidden">{program.name}</span>
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-2 md:gap-6 text-white/80" style={{ fontSize: isMobile ? '13px' : '16px' }}>
                <span className="flex items-center gap-1.5 md:gap-2">
                  <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {program.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="flex items-center gap-1.5 md:gap-2">
                  <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="truncate max-w-[120px] md:max-w-none">{program.school}</span>
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
          className="mx-auto px-4 py-8 md:px-[120px] md:py-20"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-12"
              >
                <h2 className="text-[#21313c] font-semibold mb-3 md:mb-4" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                  About the Program
                </h2>
                <p className="text-[#666] leading-relaxed" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                  {program.description}
                </p>
              </motion.div>

              {/* Highlights Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-12"
              >
                <h2 className="text-[#21313c] font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                  Program <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Highlights</span>
                </h2>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {program.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-2 md:gap-3 bg-[#f6f7f0] rounded-lg group hover:bg-[#21313c] transition-colors duration-300"
                      style={{ padding: isMobile ? '10px' : '16px' }}
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#c3fd7a] flex items-center justify-center shrink-0 group-hover:bg-[#f0c14b] transition-colors">
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#21313c] group-hover:text-white transition-colors" style={{ fontSize: isMobile ? '12px' : '16px' }}>
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
                className="mb-8 md:mb-12"
              >
                <h2 className="text-[#21313c] font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                  Career Prospects
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {program.careerProspects.map((career, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-[#21313c] text-white rounded-full hover:bg-[#f0c14b] hover:text-[#21313c] transition-colors cursor-default"
                      style={{ fontSize: isMobile ? '12px' : '14px', padding: isMobile ? '7px 14px' : '8px 16px' }}
                    >
                      {career}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Curriculum Modules Section */}
              {modulesData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                    Curriculum <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Modules</span>
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    {(showAllModules ? modulesData.structure : modulesData.structure.slice(0, 2)).map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#f6f7f0] rounded-xl"
                        style={{ padding: isMobile ? '14px' : '24px' }}
                      >
                        <h3 className="text-[#21313c] font-semibold mb-3 md:mb-4 flex items-center gap-2" style={{ fontSize: isMobile ? '14px' : '18px' }}>
                          <span className="w-1 h-4 md:w-1.5 md:h-6 bg-[#f0c14b] rounded-full"></span>
                          {section.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          {section.modules.map((module, moduleIndex) => (
                            <div
                              key={moduleIndex}
                              className="flex items-start gap-1.5 md:gap-2 text-[#666]"
                              style={{ fontSize: isMobile ? '12px' : '14px' }}
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-[#027ea1] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{module.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {modulesData.structure.length > 2 && (
                    <button
                      onClick={() => setShowAllModules(!showAllModules)}
                      className="mt-4 flex items-center gap-2 text-[#21313c] font-medium hover:text-[#027ea1] transition-colors"
                      style={{ fontSize: isMobile ? '13px' : '14px' }}
                    >
                      {showAllModules ? 'Show Less' : `View More (${modulesData.structure.length - 2} more)`}
                      <svg
                        className="w-4 h-4 transition-transform"
                        style={{ transform: showAllModules ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  <p className="mt-3 md:mt-4 text-[#999]" style={{ fontSize: isMobile ? '10px' : '12px' }}>
                    * Curriculum structure may vary. Please contact admissions for detailed semester-wise breakdown.
                  </p>
                </motion.div>
              )}

              {/* Previous Placements Section */}
              {placementData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                    Previous <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Placements</span>
                  </h2>

                  {/* Placement Stats Cards */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    {placementData.stats[0] && (
                      <>
                        <div className="bg-gradient-to-br from-[#21313c] to-[#2d4050] rounded-xl" style={{ padding: isMobile ? '12px' : '24px' }}>
                          <p className="text-white/60 font-medium uppercase tracking-wider mb-1 md:mb-2" style={{ fontSize: isMobile ? '9px' : '12px' }}>Highest Package</p>
                          <p className="text-[#c3fd7a] font-bold" style={{ fontSize: isMobile ? '16px' : '30px' }}>{placementData.stats[0].highestPackage}</p>
                          <p className="text-white/40 mt-0.5 md:mt-1" style={{ fontSize: isMobile ? '8px' : '12px' }}>{placementData.stats[0].year}</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#027ea1] to-[#026986] rounded-xl" style={{ padding: isMobile ? '12px' : '24px' }}>
                          <p className="text-white/60 font-medium uppercase tracking-wider mb-1 md:mb-2" style={{ fontSize: isMobile ? '9px' : '12px' }}>Median Package</p>
                          <p className="text-[#f0c14b] font-bold" style={{ fontSize: isMobile ? '16px' : '30px' }}>{placementData.stats[0].medianPackage}</p>
                          <p className="text-white/40 mt-0.5 md:mt-1" style={{ fontSize: isMobile ? '8px' : '12px' }}>{placementData.stats[0].year}</p>
                        </div>
                        {placementData.stats[0].placementRate && (
                          <div className="bg-gradient-to-br from-[#f0c14b] to-[#f5d76e] rounded-xl" style={{ padding: isMobile ? '12px' : '24px' }}>
                            <p className="text-[#21313c]/60 font-medium uppercase tracking-wider mb-1 md:mb-2" style={{ fontSize: isMobile ? '9px' : '12px' }}>Placement Rate</p>
                            <p className="text-[#21313c] font-bold" style={{ fontSize: isMobile ? '16px' : '30px' }}>{placementData.stats[0].placementRate}</p>
                            <p className="text-[#21313c]/40 mt-0.5 md:mt-1" style={{ fontSize: isMobile ? '8px' : '12px' }}>{placementData.stats[0].year}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Top Recruiters */}
                  <div className="bg-white border border-[#e0e0d8] rounded-xl" style={{ padding: isMobile ? '14px' : '24px' }}>
                    <h3 className="text-[#21313c] font-semibold mb-3 md:mb-4" style={{ fontSize: isMobile ? '14px' : '16px' }}>Top Recruiters</h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {placementData.topRecruiters.map((company, index) => (
                        <span
                          key={index}
                          className="bg-[#f6f7f0] text-[#21313c] font-medium rounded-lg border border-[#e0e0d8] hover:border-[#21313c] transition-colors"
                          style={{ fontSize: isMobile ? '11px' : '12px', padding: isMobile ? '5px 10px' : '8px 16px' }}
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* All Recruiters Grid */}
                  <div className="mt-4 md:mt-6 bg-[#f6f7f0] rounded-xl" style={{ padding: isMobile ? '14px' : '24px' }}>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-[#21313c] font-semibold" style={{ fontSize: isMobile ? '12px' : '16px' }}>100+ Companies Recruit from JLU</h3>
                      <span className="text-[#666] bg-white px-2 md:px-3 py-0.5 md:py-1 rounded-full" style={{ fontSize: isMobile ? '9px' : '12px' }}>{allTopRecruiters.length}+ recruiters</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 text-[#666]" style={{ fontSize: isMobile ? '9px' : '12px' }}>
                      {allTopRecruiters.slice(0, isMobile ? 12 : 20).map((company, index) => (
                        <div key={index} className="flex items-center gap-1 md:gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[#027ea1]"></div>
                          <span>{company}</span>
                        </div>
                      ))}
                    </div>
                    {allTopRecruiters.length > 20 && (
                      <p className="text-[#999] mt-2 md:mt-3 text-center" style={{ fontSize: isMobile ? '9px' : '12px' }}>
                        + {allTopRecruiters.length - (isMobile ? 12 : 20)} more companies
                      </p>
                    )}
                  </div>

                  <p className="mt-3 md:mt-4 text-[#999]" style={{ fontSize: isMobile ? '9px' : '12px' }}>
                    * Placement data based on NIRF 2025 and official JLU records. Individual results may vary.
                  </p>
                </motion.div>
              )}

              {/* Fee Structure Section */}
              {feeData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                    Fee <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Structure</span>
                  </h2>

                  <div className="bg-[#f6f7f0] rounded-xl md:rounded-2xl overflow-hidden">
                    {/* Fee Header */}
                    <div className="bg-[#21313c] flex items-center justify-between" style={{ padding: isMobile ? '12px 14px' : '16px 24px' }}>
                      <div>
                        <h3 className="text-white font-semibold" style={{ fontSize: isMobile ? '13px' : '16px' }}>{feeData.name}</h3>
                        <p className="text-white/60" style={{ fontSize: isMobile ? '11px' : '14px' }}>{feeData.school}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#f0c14b] font-bold" style={{ fontSize: isMobile ? '14px' : '20px' }}>
                          ₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}
                        </p>
                        <p className="text-white/60" style={{ fontSize: isMobile ? '9px' : '12px' }}>per year</p>
                      </div>
                    </div>

                    {/* Fee Breakdown */}
                    <div style={{ padding: isMobile ? '14px' : '24px' }}>
                      <div className="space-y-1 md:space-y-3">
                        {[
                          { label: 'Tuition Fees', value: feeData.tuitionFees },
                          { label: 'Resource Fee', value: feeData.resourceFee },
                          { label: 'Examination Fees', value: feeData.examFees },
                          { label: 'Admission Charges', value: feeData.admissionCharges },
                          { label: 'Caution Money', value: feeData.cautionMoney },
                          { label: 'Alumni Fund', value: feeData.alumniFund },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center border-b border-[#e0e0d8]" style={{ padding: isMobile ? '8px 0' : '12px 0' }}>
                            <span className="text-[#666]" style={{ fontSize: isMobile ? '12px' : '14px' }}>{item.label}</span>
                            <span className="text-[#21313c] font-semibold" style={{ fontSize: isMobile ? '12px' : '14px' }}>₹{item.value.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t-2 border-[#21313c]/20">
                        <span className="text-[#21313c] font-bold" style={{ fontSize: isMobile ? '12px' : '16px' }}>Total Fee Per Year</span>
                        <span className="text-[#21313c] font-bold" style={{ fontSize: isMobile ? '14px' : '20px' }}>₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}</span>
                      </div>

                      {/* One-time charges note */}
                      <p className="mt-3 md:mt-4 text-[#999] leading-relaxed" style={{ fontSize: isMobile ? '9px' : '12px' }}>
                        * Admission charges, caution money, and alumni fund are one-time charges payable at the time of admission.
                        Caution money is refundable at the end of the program.
                      </p>

                      {/* Download Full Fee PDF */}
                      <a
                        href="/broucher/Fee-Structure-2026-27.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 md:mt-4 inline-flex items-center gap-1.5 md:gap-2 text-[#027ea1] font-medium hover:underline"
                        style={{ fontSize: isMobile ? '11px' : '14px' }}
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Complete Fee Structure PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4 md:space-y-6">
                {/* Quick Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#21313c] rounded-xl md:rounded-2xl"
                  style={{ padding: isMobile ? '16px' : '32px' }}
                >
                  <h3 className="text-white font-semibold mb-4 md:mb-6" style={{ fontSize: isMobile ? '16px' : '18px' }}>Quick Information</h3>

                  <div className="space-y-2 md:space-y-4">
                    {[
                      { label: 'Degree', value: program.degree, color: 'text-white' },
                      { label: 'Duration', value: program.duration, color: 'text-white' },
                      { label: 'Type', value: program.type, color: 'text-white' },
                      { label: 'Category', value: program.category, color: 'text-[#f0c14b]' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 md:pb-4 border-b border-white/10">
                        <span className="text-white/60" style={{ fontSize: isMobile ? '13px' : '14px' }}>{item.label}</span>
                        <span className={`${item.color} font-medium`} style={{ fontSize: isMobile ? '13px' : '14px' }}>{item.value}</span>
                      </div>
                    ))}
                    {feeData && (
                      <div className="flex justify-between items-center pb-2 md:pb-4 border-b border-white/10">
                        <span className="text-white/60" style={{ fontSize: isMobile ? '13px' : '14px' }}>Annual Fee</span>
                        <span className="text-[#c3fd7a] font-semibold" style={{ fontSize: isMobile ? '13px' : '14px' }}>₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  {/* Eligibility */}
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                    <h4 className="text-white/60 mb-1.5 md:mb-2" style={{ fontSize: isMobile ? '13px' : '14px' }}>Eligibility</h4>
                    <p className="text-white leading-relaxed" style={{ fontSize: isMobile ? '13px' : '14px' }}>{program.eligibility}</p>
                  </div>

                  {/* Apply Button */}
                  <Link
                    href="/apply"
                    className="mt-5 md:mt-8 w-full flex items-center justify-center gap-2 bg-[#c3fd7a] text-[#21313c] font-semibold rounded-full hover:bg-[#f0c14b] transition-colors"
                    style={{ padding: isMobile ? '10px 16px' : '16px 24px', fontSize: isMobile ? '12px' : '16px' }}
                  >
                    Apply Now
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  {/* Download Brochure */}
                  <a
                    href="/broucher/JLU-Brochure-2026.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 md:mt-3 w-full flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                    style={{ padding: isMobile ? '10px 16px' : '16px 24px', fontSize: isMobile ? '12px' : '16px' }}
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Brochure
                  </a>
                </motion.div>

                {/* Why This Program Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#027ea1] to-[#026986] rounded-xl md:rounded-2xl"
                  style={{ padding: isMobile ? '16px' : '32px' }}
                >
                  <h3 className="text-white font-semibold mb-3 md:mb-4" style={{ fontSize: isMobile ? '16px' : '18px' }}>Why Choose JLU?</h3>
                  <div className="space-y-2.5 md:space-y-3">
                    {[
                      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'QS Diamond Rated', desc: 'Top-tier academic standards' },
                      { icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Industry Partnerships', desc: '100+ corporate tie-ups' },
                      { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Global Exposure', desc: 'International partnerships' },
                      { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Research Excellence', desc: '2400+ publications' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="rounded-lg bg-[#c3fd7a] flex items-center justify-center shrink-0" style={{ width: isMobile ? '28px' : '32px', height: isMobile ? '28px' : '32px' }}>
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium" style={{ fontSize: isMobile ? '13px' : '14px' }}>{item.title}</p>
                          <p className="text-white/60 mt-0.5" style={{ fontSize: isMobile ? '11px' : '12px' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Download Resources Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.14 }}
                  viewport={{ once: true }}
                  className="bg-white border border-[#e0e0d8] rounded-xl md:rounded-2xl"
                  style={{ padding: isMobile ? '16px' : '32px' }}
                >
                  <h3 className="text-[#21313c] font-semibold mb-3 md:mb-4" style={{ fontSize: isMobile ? '14px' : '18px' }}>Download Resources</h3>
                  <div className="space-y-2 md:space-y-3">
                    {[
                      { href: '/broucher/JLU-Brochure-2026.pdf', label: 'Program Brochure', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', arrow: 'M12 10v6m0 0l-3-3m3 3l3-3', external: true },
                      { href: '/broucher/Fee-Structure-2026-27.pdf', label: 'Fee Structure', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', arrow: 'M12 10v6m0 0l-3-3m3 3l3-3', external: true },
                      { href: '/admissions', label: 'Admission Process', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', arrow: 'M9 5l7 7-7 7', external: false },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between bg-[#f6f7f0] rounded-lg hover:bg-[#eef0e4] transition-colors group"
                        style={{ padding: isMobile ? '8px' : '12px' }}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="rounded-lg bg-[#21313c] flex items-center justify-center" style={{ width: isMobile ? '26px' : '32px', height: isMobile ? '26px' : '32px' }}>
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <span className="text-[#21313c] font-medium" style={{ fontSize: isMobile ? '11px' : '14px' }}>{item.label}</span>
                        </div>
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#666] group-hover:text-[#21313c] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.arrow} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Department Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  viewport={{ once: true }}
                  className="bg-[#f6f7f0] rounded-xl md:rounded-2xl border border-[#e0e0d8]"
                  style={{ padding: isMobile ? '16px' : '32px' }}
                >
                  <h3 className="text-[#21313c] font-semibold mb-4 md:mb-5" style={{ fontSize: isMobile ? '14px' : '18px' }}>Department Contact</h3>

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Helpline', value: '+91 7471110103', href: 'tel:+917471110103', isLink: true },
                      { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', label: 'Address', value: 'JLU Student Enrichment Hub, Near Kaliasoth Barrage, Chandanpura, Bhopal – 462007', isLink: false },
                      { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'admission@jlu.edu.in', href: 'mailto:admission@jlu.edu.in', isLink: true },
                      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Working Hours', value: 'Mon – Sat : 09:00 – 17:00', isLink: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="rounded-lg bg-[#21313c] flex items-center justify-center shrink-0" style={{ width: isMobile ? '28px' : '36px', height: isMobile ? '28px' : '36px' }}>
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[#999] font-medium uppercase tracking-wider" style={{ fontSize: isMobile ? '8px' : '12px' }}>{item.label}</p>
                          {item.isLink ? (
                            <a href={item.href} className="text-[#21313c] font-semibold hover:text-[#027ea1] transition-colors" style={{ fontSize: isMobile ? '11px' : '14px' }}>
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-[#21313c] leading-relaxed" style={{ fontSize: isMobile ? '11px' : '14px', fontWeight: item.label === 'Working Hours' ? 600 : 400 }}>
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-4 md:my-5 h-px bg-[#d0d0c8]" />

                  {/* Social Media */}
                  <div>
                    <p className="text-[#999] font-medium uppercase tracking-wider mb-2 md:mb-3" style={{ fontSize: isMobile ? '8px' : '12px' }}>Follow Us</p>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      {[
                        { href: 'https://www.facebook.com/jaborejlubhopal', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                        { href: 'https://x.com/jlubhopal', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                        { href: 'https://in.linkedin.com/school/jlubhopal/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                        { href: 'https://www.youtube.com/@jlubhopal', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                        { href: 'https://www.instagram.com/jlubhopal/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#027ea1] transition-colors"
                          style={{ width: isMobile ? '30px' : '36px', height: isMobile ? '30px' : '36px' }}
                        >
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Programs Section */}
      {relatedPrograms.length > 0 && (
        <div className="w-full bg-[#f6f7f0]">
          <div
            className="mx-auto px-4 py-8 md:px-[120px] md:py-20"
            style={{ maxWidth: '1440px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-5 md:mb-8">
                <h2 className="text-[#21313c] font-semibold" style={{ fontSize: isMobile ? '18px' : '24px' }}>
                  Related <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Programs</span>
                </h2>
                <Link
                  href="/programs"
                  className="text-[#21313c] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ fontSize: isMobile ? '11px' : '14px' }}
                >
                  View All
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {relatedPrograms.map((relatedProgram, index) => (
                  <Link href={`/programs/${relatedProgram.slug}`} key={relatedProgram.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-xl md:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ height: isMobile ? '100px' : '192px' }}>
                        <Image
                          src={relatedProgram.image}
                          alt={relatedProgram.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span
                          className="absolute bottom-2 md:bottom-4 left-2 md:left-4 font-medium bg-[#f0c14b] text-[#21313c] rounded"
                          style={{ fontSize: isMobile ? '8px' : '12px', padding: isMobile ? '2px 6px' : '4px 8px' }}
                        >
                          {relatedProgram.degree}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: isMobile ? '10px' : '20px' }}>
                        <h3 className="text-[#21313c] font-semibold mb-1 md:mb-2 group-hover:text-[#666] transition-colors line-clamp-2" style={{ fontSize: isMobile ? '11px' : '16px' }}>
                          {relatedProgram.name}
                        </h3>
                        <div className="flex items-center gap-1 md:gap-2 text-[#666]" style={{ fontSize: isMobile ? '9px' : '12px' }}>
                          <span>{relatedProgram.duration}</span>
                          <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-[#ccc]" />
                          <span>{relatedProgram.type}</span>
                        </div>
                        <div className="mt-2 md:mt-4 flex items-center justify-between">
                          <span className="text-[#999] truncate" style={{ fontSize: isMobile ? '7px' : '10px' }}>
                            {relatedProgram.school.replace('School of ', '')}
                          </span>
                          <span className="text-[#21313c] group-hover:translate-x-1 transition-transform" style={{ fontSize: isMobile ? '10px' : '14px' }}>→</span>
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
          className="mx-auto px-4 py-10 md:px-[120px] md:py-24"
          style={{ maxWidth: '1440px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-white font-semibold mb-3 md:mb-4" style={{ fontSize: isMobile ? '18px' : '36px' }}>
              Ready to Begin Your <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Journey?</span>
            </h2>
            <p className="text-white/70 mb-5 md:mb-8 max-w-xl mx-auto" style={{ fontSize: isMobile ? '11px' : '16px' }}>
              Take the first step towards your future. Apply now and join thousands of students shaping their tomorrow at JLU.
            </p>
            <div className="flex flex-row items-center justify-center gap-3 md:gap-4">
              <Link
                href="/apply"
                className="bg-[#c3fd7a] text-[#21313c] font-semibold rounded-full hover:bg-[#f0c14b] transition-colors flex items-center gap-1.5 md:gap-2"
                style={{ padding: isMobile ? '8px 16px' : '16px 32px', fontSize: isMobile ? '11px' : '16px' }}
              >
                Apply Now
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/programs"
                className="bg-transparent border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                style={{ padding: isMobile ? '8px 16px' : '16px 32px', fontSize: isMobile ? '11px' : '16px' }}
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
