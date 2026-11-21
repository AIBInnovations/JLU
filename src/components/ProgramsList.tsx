'use client';

import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import { getProgramsByCategory } from '../data/programs';

const ProgramsList = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = (['UG', 'PG', 'PhD'] as const).includes(tabParam as 'UG' | 'PG' | 'PhD')
    ? (tabParam as 'UG' | 'PG' | 'PhD')
    : 'UG';
  const [activeTab, setActiveTab] = useState<'UG' | 'PG' | 'PhD'>(initialTab);

  useEffect(() => {
    if (tabParam && (['UG', 'PG', 'PhD'] as const).includes(tabParam as 'UG' | 'PG' | 'PhD')) {
      setActiveTab(tabParam as 'UG' | 'PG' | 'PhD');
    }
  }, [tabParam]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const ITEMS_PER_PAGE = 10;

  const tabs: { key: 'UG' | 'PG' | 'PhD'; label: string }[] = [
    { key: 'UG', label: 'UG Programs' },
    { key: 'PG', label: 'PG Programs' },
    { key: 'PhD', label: 'PhD' },
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

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const categoryCount = useMemo(() => ({
    UG: getProgramsByCategory('UG').length,
    PG: getProgramsByCategory('PG').length,
    PhD: getProgramsByCategory('PhD').length,
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

          {/* Table Header */}
          <div
            className="grid pb-2 md:pb-4 mb-1 md:mb-2"
            style={{
              gridTemplateColumns: isMobile ? '1fr 80px 80px 50px' : '1fr 180px 180px 120px',
              gap: isMobile ? '4px' : '32px',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <span className="text-[7px] md:text-xs font-medium uppercase tracking-wider text-[#999]">Programs</span>
            <span className="text-[7px] md:text-xs font-medium uppercase tracking-wider text-[#999]">School</span>
            <span className="text-[7px] md:text-xs font-medium uppercase tracking-wider text-[#999]">Duration</span>
            <span className="text-[7px] md:text-xs font-medium uppercase tracking-wider text-[#999]">Degree</span>
          </div>

          {/* Programs List */}
          <div className="flex flex-col">
            {filteredPrograms.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#666] text-sm">No programs found matching your search.</p>
              </div>
            ) : (
              paginatedPrograms.map((program, index) => (
                <Link href={`/programs/${program.slug}`} key={program.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer transition-colors grid hover:bg-[#fafafa]"
                    style={{
                      gridTemplateColumns: isMobile ? '1fr 80px 80px 50px' : '1fr 180px 180px 120px',
                      gap: isMobile ? '6px' : '32px',
                      borderBottom: '1px solid #f0f0f0',
                      marginLeft: isMobile ? '-4px' : '-16px',
                      marginRight: isMobile ? '-4px' : '-16px',
                      paddingLeft: isMobile ? '4px' : '16px',
                      paddingRight: isMobile ? '4px' : '16px',
                      paddingTop: isMobile ? '10px' : '24px',
                      paddingBottom: isMobile ? '10px' : '24px',
                    }}
                  >
                    <div className="flex items-center gap-1 md:gap-4">
                      <span className="text-[#21313c] font-medium group-hover:text-[#666] transition-colors" style={{ fontSize: isMobile ? '13px' : '17px' }}>
                        {program.name}
                      </span>
                      <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity text-[#21313c]" style={{ fontSize: isMobile ? '13px' : '14px' }}>→</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#666] truncate" style={{ fontSize: isMobile ? '12px' : '14px' }} title={program.school}>
                        {program.school.replace('School of ', '')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-3">
                      <span className="text-[#666]" style={{ fontSize: isMobile ? '12px' : '14px' }}>{program.duration}</span>
                      <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-[#ccc]" />
                      <span className="text-[#666]" style={{ fontSize: isMobile ? '12px' : '14px' }}>{program.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className="px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-xs font-medium text-[#21313c] bg-[#f6f7f0] rounded"
                      >
                        {program.degree}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-[#f6f7f0] text-[#21313c] hover:bg-[#e5e5e5]"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 md:w-9 md:h-9 rounded-full text-[10px] md:text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#21313c] text-white'
                      : 'bg-[#f6f7f0] text-[#21313c] hover:bg-[#e5e5e5]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-[#f6f7f0] text-[#21313c] hover:bg-[#e5e5e5]"
              >
                Next →
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-6 md:mt-16 pt-4 md:pt-8 flex items-center justify-between" style={{ borderTop: '1px solid #e5e5e5' }}>
            <span className="text-[12px] md:text-sm text-[#666]">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredPrograms.length)} of {filteredPrograms.length} programs
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[8px] md:text-xs text-[#999]">
                {categoryCount.UG} UG · {categoryCount.PG} PG · {categoryCount.PhD} PhD
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
