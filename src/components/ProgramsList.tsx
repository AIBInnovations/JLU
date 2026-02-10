'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useIsMobile } from '../hooks/useIsMobile';
import { programs, getProgramsByCategory } from '../data/programs';

const ProgramsList = () => {
  const [activeTab, setActiveTab] = useState<'UG' | 'PG' | 'PhD' | 'Diploma'>('UG');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const tabs: { key: 'UG' | 'PG' | 'PhD' | 'Diploma'; label: string }[] = [
    { key: 'UG', label: 'UG Programs' },
    { key: 'PG', label: 'PG Programs' },
    { key: 'PhD', label: 'PhD' },
    { key: 'Diploma', label: 'Diploma Programs' },
  ];

  const filteredPrograms = useMemo(() => {
    let categoryPrograms = getProgramsByCategory(activeTab);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      categoryPrograms = categoryPrograms.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortName.toLowerCase().includes(query) ||
          p.school.toLowerCase().includes(query) ||
          p.degree.toLowerCase().includes(query)
      );
    }

    return categoryPrograms;
  }, [activeTab, searchQuery]);

  const categoryCount = useMemo(() => ({
    UG: getProgramsByCategory('UG').length,
    PG: getProgramsByCategory('PG').length,
    PhD: getProgramsByCategory('PhD').length,
    Diploma: getProgramsByCategory('Diploma').length,
  }), []);

  return (
    <section className="w-full">
      <div className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 md:px-[120px] md:pt-20 md:pb-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Search Bar */}
          <div className="mb-6 md:mb-10">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 text-sm border border-[#e5e5e5] rounded-full focus:outline-none focus:border-[#21313c] transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-8 md:mb-16 flex-wrap md:flex-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearchQuery('');
                }}
                className={`px-2.5 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.key
                    ? 'bg-[#21313c] text-white'
                    : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0]'
                }`}
                style={{ borderRadius: '100px' }}
              >
                {tab.label}
                <span
                  className={`text-[9px] md:text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f6f7f0] text-[#666]'
                  }`}
                >
                  {categoryCount[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop: Table Header */}
          {!isMobile && (
            <div
              className="grid gap-8 pb-4 mb-2"
              style={{
                gridTemplateColumns: '1fr 180px 180px 120px',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Programs</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">School</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Duration</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Degree</span>
            </div>
          )}

          {/* Programs List */}
          <div className="flex flex-col gap-3 md:gap-0">
            {filteredPrograms.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#666] text-sm">No programs found matching your search.</p>
              </div>
            ) : (
              filteredPrograms.map((program, index) => (
                <Link href={`/programs/${program.slug}`} key={program.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className={`group cursor-pointer transition-colors ${
                      isMobile
                        ? 'bg-[#f9f9f9] rounded-xl p-4 hover:bg-[#f0f0f0]'
                        : 'grid gap-8 py-6 hover:bg-[#fafafa]'
                    }`}
                    style={!isMobile ? {
                      gridTemplateColumns: '1fr 180px 180px 120px',
                      borderBottom: '1px solid #f0f0f0',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                    } : {}}
                  >
                    {isMobile ? (
                      /* Mobile: Card Layout */
                      <>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="text-[#21313c] font-medium text-sm leading-tight">
                            {program.name}
                          </span>
                          <span
                            className="px-2 py-1 text-[10px] font-medium text-[#21313c] bg-white rounded shrink-0"
                          >
                            {program.degree}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#666] mb-2">
                          <span>{program.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                          <span>{program.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#999]">{program.school}</span>
                          <span className="text-[#21313c] text-sm group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </>
                    ) : (
                      /* Desktop: Table Row */
                      <>
                        <div className="flex items-center gap-4">
                          <span className="text-[#21313c] font-medium group-hover:text-[#666] transition-colors" style={{ fontSize: '17px' }}>
                            {program.name}
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#21313c]">→</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#666] text-sm truncate" title={program.school}>
                            {program.school.replace('School of ', '')}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#666] text-sm">{program.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                          <span className="text-[#666] text-sm">{program.type}</span>
                        </div>
                        <div className="flex items-center">
                          <span
                            className="px-3 py-1 text-xs font-medium text-[#21313c] bg-[#f6f7f0] rounded"
                          >
                            {program.degree}
                          </span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </Link>
              ))
            )}
          </div>

          {/* Results Summary */}
          <div className="mt-8 md:mt-16 pt-6 md:pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #e5e5e5' }}>
            <span className="text-xs md:text-sm text-[#666]">
              Showing {filteredPrograms.length} of {programs.length} programs
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#999]">
                {categoryCount.UG} UG · {categoryCount.PG} PG · {categoryCount.PhD} PhD · {categoryCount.Diploma} Diploma
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProgramsList };
export default ProgramsList;
