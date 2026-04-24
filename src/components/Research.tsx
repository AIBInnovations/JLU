'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { patentsData, publicationsData, researchProjectsData } from '../data/researchData';

const statsData = [
  { id: 1, value: '121+', label: 'PUBLICATIONS', description: 'Papers, conferences, books & chapters' },
  { id: 2, value: '44', label: 'PATENTS', description: 'Published & granted IPR' },
  { id: 3, value: '9', label: 'FUNDED PROJECTS', description: 'Government, industry & international' },
];

// Helper to format amount as Indian currency
const formatIndianCurrency = (amount: number): string => {
  if (amount === 0) return '—';
  const str = amount.toString();
  let result = '';
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      result = ',' + result;
    }
    result = str[i] + result;
    count++;
  }
  return '\u20B9' + result;
};

// Get unique departments from publications data for filter tabs
const publicationDepts = ['All', ...Array.from(new Set(publicationsData.map(p => p.dept))).sort()];

// Get unique faculties from patents data for filter tabs
const patentFaculties = ['All', ...Array.from(new Set(patentsData.map(p => p.faculty))).sort()];

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Patent detail type
type PatentDetail = typeof patentsData[number] | null;

const Research = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [patentFilter, setPatentFilter] = useState('All');
  const [showAllPatents, setShowAllPatents] = useState(false);
  const [showAllPubs, setShowAllPubs] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState<PatentDetail>(null);
  const [selectedPub, setSelectedPub] = useState<typeof publicationsData[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

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

  // Lock body scroll when patent detail panel is open
  useEffect(() => {
    if (selectedPatent) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedPatent]);

  return (
    <section className="w-full m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-full m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-full min-h-svh"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/pro1.jpg"
              alt="Research at JLU"
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
          className="absolute top-0 left-0 max-w-[90%] sm:max-w-200"
          style={{
            paddingLeft: 'clamp(16px, 5vw, 40px)',
            paddingTop: 'clamp(90px, 15vw, 120px)',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            RESEARCH THAT <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>matters</span>
          </h2>
          <p
            className="text-white"
            style={{
              fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            Advancing knowledge through interdisciplinary inquiry, innovation, and real-world impact.
          </p>
        </motion.div>

        {/* Large "Research" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: 'clamp(8px, 2vw, 40px)',
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
              fontSize: 'clamp(6rem, 22vw, 24rem)',
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

      {/* Publications Section */}
      <div id="publications" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-[#21313c] mb-2 md:mb-4">
                Publications
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Peer-reviewed research advancing knowledge across disciplines.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#027ea1] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">538+</span>
              <span className="text-xs sm:text-sm">Published Papers</span>
            </div>
          </div>

          {/* Filters by department */}
          <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {publicationDepts.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setShowAllPubs(false); }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 sm:shrink ${
                  activeFilter === filter
                    ? 'bg-[#21313c] text-white'
                    : 'bg-white text-[#21313c] border border-gray-200 hover:border-[#21313c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Publications Grid */}
          {(() => {
            const filtered = publicationsData.filter(pub => activeFilter === 'All' || pub.dept === activeFilter);
            const visible = showAllPubs ? filtered : filtered.slice(0, 9);
            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {visible.map((pub) => (
                    <div
                      key={pub.id}
                      onClick={() => setSelectedPub(pub)}
                      className="bg-white p-5 md:p-7 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer"
                    >
                      {/* Department Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-[#e0f2f7] text-[#027ea1] text-xs font-medium rounded-full">
                          {pub.dept}
                        </span>
                        {pub.indexing && (
                          <span className="text-xs text-gray-400">{typeof pub.indexing === 'string' && pub.indexing.length > 10 ? pub.indexing.slice(0, 4) : pub.indexing}</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-[#21313c] font-semibold text-sm md:text-base leading-snug mb-3 group-hover:text-[#027ea1] transition-colors line-clamp-3">
                        {pub.title}
                      </h3>

                      {/* Faculty */}
                      <p className="text-xs md:text-sm text-gray-500 mb-3">
                        {pub.faculty}
                      </p>

                      {/* Journal */}
                      <p className="text-xs text-gray-400 italic mb-4 line-clamp-2">
                        {pub.journal}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{pub.school}</span>
                        {pub.year && (
                          <span className="text-xs text-[#027ea1] font-medium">
                            pp. {pub.year}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {filtered.length > 9 && (
                  <div className="mt-8 md:mt-12 text-center">
                    <button
                      onClick={() => setShowAllPubs(!showAllPubs)}
                      className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline cursor-pointer"
                    >
                      {showAllPubs ? 'Show Less' : `View All ${filtered.length} Publications`}
                      <span>{showAllPubs ? '\u2191' : '\u2193'}</span>
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {/* Patents Section */}
      <div id="patents" />
      <div id="collaborations" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-[#21313c] mb-2 md:mb-4">
                Patents
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Innovation-driven intellectual property protecting groundbreaking research.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#21313c] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">44</span>
              <span className="text-xs sm:text-sm">Patents Filed</span>
            </div>
          </div>

          {/* Patent Filters */}
          <div className="flex gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {patentFaculties.map((filter) => (
              <button
                key={filter}
                onClick={() => { setPatentFilter(filter); setShowAllPatents(false); }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 sm:shrink ${
                  patentFilter === filter
                    ? 'bg-[#21313c] text-white'
                    : 'bg-white text-[#21313c] border border-gray-200 hover:border-[#21313c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Patents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {(() => {
              const filtered = patentsData.filter(p => patentFilter === 'All' || p.faculty === patentFilter);
              const visible = showAllPatents ? filtered : filtered.slice(0, 8);
              return visible.map((patent) => (
              <div
                key={patent.id}
                onClick={() => setSelectedPatent(patent)}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patent.status === 'Granted'
                      ? 'bg-[#e0f2f7] text-[#027ea1]'
                      : patent.status === 'Copy Right'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patent.status}
                  </span>
                  <span className="text-sm text-gray-500">{patent.year}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#21313c] mb-3">
                  {patent.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Faculty:</span> {patent.facultyMember}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Application No:</span> {patent.applicationNo}
                </p>
                <p className="text-sm text-gray-500">
                  {patent.school}
                </p>
              </div>
              ));
            })()}
          </div>

          {(() => {
            const filtered = patentsData.filter(p => patentFilter === 'All' || p.faculty === patentFilter);
            if (filtered.length > 8) {
              return (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAllPatents(!showAllPatents)}
                    className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline cursor-pointer"
                  >
                    {showAllPatents ? 'Show Less' : `View All ${filtered.length} Patents`}
                    <span>{showAllPatents ? '\u2191' : '\u2193'}</span>
                  </button>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>

      {/* Funded Projects Section */}
      <div id="funded-projects" />
      <div id="research-funding" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-[#21313c] mb-2 md:mb-4">
                Funded Projects
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Government and industry-backed research driving innovation and impact.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#027ea1] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">9</span>
              <span className="text-xs sm:text-sm">Funded Projects</span>
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#21313c]">
                  <th className="text-left py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-xl md:text-2xl font-bold text-[#21313c]">Project Title</th>
                  <th className="text-left py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-xl md:text-2xl font-bold text-[#21313c] hidden md:table-cell">Funding Agency</th>
                  <th className="text-left py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-xl md:text-2xl font-bold text-[#21313c]">Amount</th>
                  <th className="text-left py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-xl md:text-2xl font-bold text-[#21313c] hidden lg:table-cell">Duration</th>
                  <th className="text-left py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-xl md:text-2xl font-bold text-[#21313c]">Status</th>
                </tr>
              </thead>
              <tbody>
                {researchProjectsData.map((project) => (
                  <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 sm:py-4 px-1 sm:px-2">
                      <p className="text-xs sm:text-sm md:text-base font-medium text-[#21313c]">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1">PI: {project.pi}</p>
                      <p className="text-xs text-gray-500 md:hidden mt-1">{project.agency}</p>
                    </td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-sm text-gray-600 hidden md:table-cell">{project.agency}</td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2 text-xs sm:text-sm font-bold text-[#027ea1] whitespace-nowrap">{formatIndianCurrency(project.amount)}</td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2 text-sm text-gray-600 hidden lg:table-cell">{project.duration}</td>
                    <td className="py-3 sm:py-4 px-1 sm:px-2">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium inline-block w-fit ${
                          project.status === 'Funded'
                            ? 'bg-[#e0f2f7] text-[#027ea1]'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium inline-block w-fit ${
                          project.type.includes('Government') ? 'bg-blue-50 text-blue-700'
                            : project.type.includes('International') ? 'bg-purple-50 text-purple-700'
                            : 'bg-orange-50 text-orange-700'
                        }`}>
                          {project.type}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a href="/research#research-funding" className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline">
              View all Funded Projects
              <span>{'\u2192'}</span>
            </a>
          </div>
        </div>
      </div>

      <div id="jlu-research-journal" />
      <div id="research-centers" />

      {/* Stats Section */}
      <div id="research-areas" className="w-full bg-[#e8e8e8]">
        <div
          className="mx-auto px-5 py-10 md:px-10 md:py-12 lg:px-30 lg:py-16"
          style={{
            maxWidth: '1440px',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 lg:gap-0">
            {statsData.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col justify-center lg:border-r lg:last:border-r-0 border-[#c4c4c4] lg:pr-10 lg:mr-10 lg:last:pr-0 lg:last:mr-0"
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">
                  {stat.value}
                </p>
                <p className="text-xl md:text-2xl font-bold md:text-sm font-medium text-[#21313c] tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-bold md:text-sm text-[#21313c] hidden sm:block">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patent Detail Slide-in Panel */}
      <AnimatePresence>
        {selectedPatent && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setSelectedPatent(null)}
              onWheel={(e) => e.stopPropagation()}
            />
            <motion.div
              className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
              style={{
                ...(isMobile
                  ? { inset: 0, borderRadius: 0 }
                  : {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: '540px',
                      borderTopLeftRadius: '24px',
                      borderBottomLeftRadius: '24px',
                    }),
              }}
              onWheel={(e) => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Header */}
              <div className="bg-[#21313c] px-6 py-8 md:px-8 md:py-10 relative shrink-0">
                <button
                  onClick={() => setSelectedPatent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedPatent.status === 'Granted'
                      ? 'bg-[#e0f2f7] text-[#027ea1]'
                      : selectedPatent.status === 'Copy Right'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedPatent.status}
                  </span>
                  <span className="text-white/60 text-sm">{selectedPatent.year}</span>
                </div>
                <h3 className="text-white font-semibold text-lg md:text-xl leading-snug">
                  {selectedPatent.title}
                </h3>
              </div>

              {/* Content */}
              <motion.div
                className="p-6 overflow-y-auto flex-1 min-h-0"
                style={{ overscrollBehavior: 'contain' }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Faculty Member</p>
                    <p className="text-sm font-medium text-[#21313c]">{selectedPatent.facultyMember}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Faculty / School</p>
                    <p className="text-sm text-[#21313c]">{selectedPatent.faculty} &mdash; {selectedPatent.school}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Application No.</p>
                    <p className="text-sm font-mono text-[#21313c]">{selectedPatent.applicationNo}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Filing Date</p>
                      <p className="text-sm text-[#21313c]">{selectedPatent.filingDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Publication Date</p>
                      <p className="text-sm text-[#21313c]">{selectedPatent.pubDate}</p>
                    </div>
                  </div>
                  {selectedPatent.journalNo && selectedPatent.journalNo !== '--' && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Journal No.</p>
                      <p className="text-sm text-[#21313c]">{selectedPatent.journalNo}</p>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Inventors</p>
                    <p className="text-sm text-[#21313c] leading-relaxed">{selectedPatent.inventors}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Applicants</p>
                    <p className="text-sm text-[#21313c] leading-relaxed">{selectedPatent.applicants}</p>
                  </div>
                  {selectedPatent.assignee && selectedPatent.assignee !== '--' && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Assignee</p>
                      <p className="text-sm text-[#21313c]">{selectedPatent.assignee}</p>
                    </div>
                  )}
                  {selectedPatent.proofUrl && selectedPatent.proofUrl.startsWith('http') && (
                    <div className="border-t border-gray-100 pt-5">
                      <a
                        href={selectedPatent.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#027ea1] font-medium hover:underline"
                      >
                        View Patent Proof
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round"/>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Publication Detail Slide-in Panel */}
      <AnimatePresence>
        {selectedPub && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPub(null)}
            />
            <motion.div
              className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
              style={{
                top: 0, right: 0, bottom: 0,
                width: isMobile ? '100%' : '540px',
                borderTopLeftRadius: isMobile ? 0 : '24px',
                borderBottomLeftRadius: isMobile ? 0 : '24px',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Header */}
              <div className="bg-[#21313c] p-6 md:p-8 shrink-0" style={{ borderTopLeftRadius: isMobile ? 0 : '24px' }}>
                <button
                  onClick={() => setSelectedPub(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#027ea1] text-white text-xs font-medium rounded-full">
                    {selectedPub.dept}
                  </span>
                  {selectedPub.indexing && (
                    <span className="px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full">
                      {selectedPub.indexing}
                    </span>
                  )}
                </div>
                <h2 className="text-white text-lg md:text-xl font-semibold leading-snug">
                  {selectedPub.title}
                </h2>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1" style={{ overscrollBehavior: 'contain' }}>
                {/* Faculty */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Faculty Member</p>
                  <p className="text-sm font-medium text-[#21313c]">{selectedPub.faculty}</p>
                </div>

                {/* Department & School */}
                <div className="mb-5 pb-5 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Department & School</p>
                  <p className="text-sm text-[#21313c]">{selectedPub.dept} — {selectedPub.school}</p>
                </div>

                {/* Journal */}
                {selectedPub.journal && (
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Published In</p>
                    <p className="text-sm text-[#21313c] italic leading-relaxed">{selectedPub.journal}</p>
                  </div>
                )}

                {/* Year / Pages */}
                {selectedPub.year && (
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Year / Pages</p>
                    <p className="text-sm text-[#21313c]">{selectedPub.year}</p>
                  </div>
                )}

                {/* Indexing */}
                {selectedPub.indexing && (
                  <div className="mb-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Indexing</p>
                    <p className="text-sm text-[#21313c]">{selectedPub.indexing}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export { Research };
export default Research;
