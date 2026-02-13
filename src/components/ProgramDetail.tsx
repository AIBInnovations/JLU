'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Program, getRelatedPrograms } from '../data/programs';
import { courseFees, ProgramFees } from '../data/courseFees';
import { getModulesByProgramId } from '../data/programModules';
import { programPlacements, allTopRecruiters } from '../data/placements';

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

              {/* Curriculum Modules Section */}
              {modulesData && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-6">
                    Curriculum <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Modules</span>
                  </h2>
                  <div className="space-y-6">
                    {modulesData.structure.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#f6f7f0] rounded-xl p-6"
                      >
                        <h3 className="text-[#21313c] font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-[#f0c14b] rounded-full"></span>
                          {section.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {section.modules.map((module, moduleIndex) => (
                            <div
                              key={moduleIndex}
                              className="flex items-start gap-2 text-sm text-[#666]"
                            >
                              <svg className="w-4 h-4 text-[#03463B] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{module.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-[#999]">
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
                  className="mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-6">
                    Previous <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Placements</span>
                  </h2>

                  {/* Placement Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {placementData.stats[0] && (
                      <>
                        <div className="bg-gradient-to-br from-[#21313c] to-[#2d4050] p-6 rounded-xl">
                          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Highest Package</p>
                          <p className="text-[#c3fd7a] text-2xl md:text-3xl font-bold">{placementData.stats[0].highestPackage}</p>
                          <p className="text-white/40 text-xs mt-1">{placementData.stats[0].year}</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#03463B] to-[#045a4a] p-6 rounded-xl">
                          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Median Package</p>
                          <p className="text-[#f0c14b] text-2xl md:text-3xl font-bold">{placementData.stats[0].medianPackage}</p>
                          <p className="text-white/40 text-xs mt-1">{placementData.stats[0].year}</p>
                        </div>
                        {placementData.stats[0].placementRate && (
                          <div className="bg-gradient-to-br from-[#f0c14b] to-[#f5d76e] p-6 rounded-xl">
                            <p className="text-[#21313c]/60 text-xs font-medium uppercase tracking-wider mb-2">Placement Rate</p>
                            <p className="text-[#21313c] text-2xl md:text-3xl font-bold">{placementData.stats[0].placementRate}</p>
                            <p className="text-[#21313c]/40 text-xs mt-1">{placementData.stats[0].year}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Top Recruiters */}
                  <div className="bg-white border border-[#e0e0d8] rounded-xl p-6">
                    <h3 className="text-[#21313c] font-semibold text-base mb-4">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {placementData.topRecruiters.map((company, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#f6f7f0] text-[#21313c] text-xs font-medium rounded-lg border border-[#e0e0d8] hover:border-[#21313c] transition-colors"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* All Recruiters Grid */}
                  <div className="mt-6 bg-[#f6f7f0] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#21313c] font-semibold text-base">100+ Companies Recruit from JLU</h3>
                      <span className="text-xs text-[#666] bg-white px-3 py-1 rounded-full">{allTopRecruiters.length}+ recruiters</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-[#666]">
                      {allTopRecruiters.slice(0, 20).map((company, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[#03463B]"></div>
                          <span>{company}</span>
                        </div>
                      ))}
                    </div>
                    {allTopRecruiters.length > 20 && (
                      <p className="text-xs text-[#999] mt-3 text-center">
                        + {allTopRecruiters.length - 20} more companies
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-[#999]">
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
                  className="mb-12"
                >
                  <h2 className="text-[#21313c] font-semibold text-xl md:text-2xl mb-6">
                    Fee <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b' }}>Structure</span>
                  </h2>

                  <div className="bg-[#f6f7f0] rounded-2xl overflow-hidden">
                    {/* Fee Header */}
                    <div className="bg-[#21313c] px-6 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-base">{feeData.name}</h3>
                        <p className="text-white/60 text-sm">{feeData.school}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#f0c14b] font-bold text-xl">
                          ₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}
                        </p>
                        <p className="text-white/60 text-xs">per year</p>
                      </div>
                    </div>

                    {/* Fee Breakdown */}
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Tuition Fees</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.tuitionFees.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Resource Fee</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.resourceFee.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Examination Fees</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.examFees.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Admission Charges</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.admissionCharges.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Caution Money</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.cautionMoney.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-[#e0e0d8]">
                          <span className="text-[#666] text-sm">Alumni Fund</span>
                          <span className="text-[#21313c] font-semibold">₹{feeData.alumniFund.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-[#21313c]/20">
                        <span className="text-[#21313c] font-bold text-base">Total Fee Per Year</span>
                        <span className="text-[#21313c] font-bold text-xl">₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}</span>
                      </div>

                      {/* One-time charges note */}
                      <p className="mt-4 text-xs text-[#999] leading-relaxed">
                        * Admission charges, caution money, and alumni fund are one-time charges payable at the time of admission.
                        Caution money is refundable at the end of the program.
                      </p>

                      {/* Download Full Fee PDF */}
                      <a
                        href="/broucher/Fee-Structure2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-[#03463B] font-medium hover:underline"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-[#21313c] p-6 md:p-8 rounded-2xl"
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
                    {feeData && (
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-white/60 text-sm">Annual Fee</span>
                        <span className="text-[#c3fd7a] font-semibold">₹{feeData.totalFeesPerYear.toLocaleString('en-IN')}</span>
                      </div>
                    )}
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

                {/* Why This Program Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#03463B] to-[#045a4a] p-6 md:p-8 rounded-2xl"
                >
                  <h3 className="text-white font-semibold text-lg mb-4">Why Choose JLU?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#c3fd7a] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">NAAC A+ Accredited</p>
                        <p className="text-white/60 text-xs mt-0.5">Top-tier academic standards</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#c3fd7a] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Industry Partnerships</p>
                        <p className="text-white/60 text-xs mt-0.5">100+ corporate tie-ups</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#c3fd7a] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Global Exposure</p>
                        <p className="text-white/60 text-xs mt-0.5">International partnerships</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#c3fd7a] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Research Excellence</p>
                        <p className="text-white/60 text-xs mt-0.5">2400+ publications</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Scholarships Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                  viewport={{ once: true }}
                  className="bg-[#f0c14b] p-6 md:p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#21313c] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#f0c14b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-[#21313c] font-bold text-lg">Scholarships Available</h3>
                  </div>
                  <p className="text-[#21313c]/80 text-sm leading-relaxed mb-4">
                    Merit-based scholarships up to 100% tuition fee waiver for deserving students.
                  </p>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 text-[#21313c] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Download Resources Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.14 }}
                  viewport={{ once: true }}
                  className="bg-white border border-[#e0e0d8] p-6 md:p-8 rounded-2xl"
                >
                  <h3 className="text-[#21313c] font-semibold text-lg mb-4">Download Resources</h3>
                  <div className="space-y-3">
                    <a
                      href="/broucher/Fee-Structure2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[#f6f7f0] rounded-lg hover:bg-[#eef0e4] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#21313c] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-[#21313c] font-medium text-sm">Program Brochure</span>
                      </div>
                      <svg className="w-4 h-4 text-[#666] group-hover:text-[#21313c] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                      </svg>
                    </a>
                    <a
                      href="/broucher/Fee-Structure2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-[#f6f7f0] rounded-lg hover:bg-[#eef0e4] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#21313c] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-[#21313c] font-medium text-sm">Fee Structure</span>
                      </div>
                      <svg className="w-4 h-4 text-[#666] group-hover:text-[#21313c] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                      </svg>
                    </a>
                    <a
                      href="/admissions"
                      className="flex items-center justify-between p-3 bg-[#f6f7f0] rounded-lg hover:bg-[#eef0e4] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#21313c] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="text-[#21313c] font-medium text-sm">Admission Process</span>
                      </div>
                      <svg className="w-4 h-4 text-[#666] group-hover:text-[#21313c] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>

                {/* Department Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  viewport={{ once: true }}
                  className="bg-[#f6f7f0] p-6 md:p-8 rounded-2xl border border-[#e0e0d8]"
                >
                  <h3 className="text-[#21313c] font-semibold text-lg mb-5">Department Contact</h3>

                  <div className="space-y-4">
                    {/* Helpline */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#999] text-xs font-medium uppercase tracking-wider">Helpline</p>
                        <a href="tel:+917471110103" className="text-[#21313c] font-semibold text-sm hover:text-[#03463B] transition-colors">
                          +91 7471110103
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#999] text-xs font-medium uppercase tracking-wider">Address</p>
                        <p className="text-[#21313c] text-sm leading-relaxed">
                          JLU Student Enrichment Hub, Near Kaliasoth Barrage, Chandanpura, Bhopal – 462007
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#999] text-xs font-medium uppercase tracking-wider">Email</p>
                        <a href="mailto:admission@jlu.edu.in" className="text-[#21313c] font-semibold text-sm hover:text-[#03463B] transition-colors">
                          admission@jlu.edu.in
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#999] text-xs font-medium uppercase tracking-wider">Working Hours</p>
                        <p className="text-[#21313c] font-semibold text-sm">Mon – Sat : 09:00 – 17:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-[#d0d0c8]" />

                  {/* Social Media */}
                  <div>
                    <p className="text-[#999] text-xs font-medium uppercase tracking-wider mb-3">Follow Us</p>
                    <div className="flex items-center gap-2">
                      {/* Facebook */}
                      <a
                        href="https://www.facebook.com/jaborejlubhopal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#03463B] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      {/* X (Twitter) */}
                      <a
                        href="https://x.com/jlubhopal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#03463B] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      {/* LinkedIn */}
                      <a
                        href="https://in.linkedin.com/school/jlubhopal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#03463B] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      {/* YouTube */}
                      <a
                        href="https://www.youtube.com/@jlubhopal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#03463B] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/jlubhopal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#21313c] flex items-center justify-center hover:bg-[#03463B] transition-colors group"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </a>
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
