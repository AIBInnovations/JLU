'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const ProgramsList = () => {
  const [activeTab, setActiveTab] = useState('UG Programs');
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const tabs = ['UG Programs', 'PG Programs', 'PhD', 'Diploma Programs'];

  const programs = [
    {
      name: 'Business and Management',
      certification: 'BBA / MBA',
      duration: '3-4 Years',
      type: 'Full Time',
    },
    {
      name: 'Media, Journalism and Communication',
      certification: 'BA / MA',
      duration: '3-4 Years',
      type: 'Full Time',
    },
    {
      name: 'Design, Fashion and Architecture',
      certification: 'B.Des / B.Arch',
      duration: '4-5 Years',
      type: 'Full Time',
    },
    {
      name: 'BSC Sound Design & Music Video Production',
      certification: 'BSC',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'B.Sc Content Creation & Media Production',
      certification: 'B. Sc',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'B.Sc Animation & Game Production',
      certification: 'B. Sc',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'B.Tech Artificial Intelligence',
      certification: 'B.Tech',
      duration: '4 Years',
      type: 'Full Time',
    },
    {
      name: 'B.Tech Data Science',
      certification: 'B.Tech',
      duration: '4 Years',
      type: 'Full Time',
    },
    {
      name: 'BCA Artificial Intelligence',
      certification: 'BCA',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'BCA Data Science',
      certification: 'BCA',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'B. Pharma',
      certification: 'B. Pharma',
      duration: '4 Years',
      type: 'Full Time',
    },
    {
      name: 'Bachelor of Computer Application',
      certification: 'BCA',
      duration: '3 Years',
      type: 'Full Time',
    },
    {
      name: 'B. Des (UI / UX)',
      certification: 'B.Des',
      duration: '4 Years',
      type: 'Full Time',
    },
  ];

  const totalPages = 9;

  return (
    <section className="w-full">
      <div className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 md:px-[120px] md:pt-20 md:pb-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Tabs - Fit all on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-8 md:mb-16 flex-wrap md:flex-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 sm:px-3 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#21313c] text-white'
                    : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0]'
                }`}
                style={{ borderRadius: '100px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Desktop: Table Header */}
          {!isMobile && (
            <div
              className="grid gap-8 pb-4 mb-2"
              style={{
                gridTemplateColumns: '1fr 200px 120px',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Programs</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Duration</span>
              <span className="text-xs font-medium uppercase tracking-wider text-[#999]">Degree</span>
            </div>
          )}

          {/* Programs List */}
          <div className="flex flex-col gap-3 md:gap-0">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className={`group cursor-pointer transition-colors ${
                  isMobile
                    ? 'bg-[#f9f9f9] rounded-xl p-4'
                    : 'grid gap-8 py-6 hover:bg-[#fafafa]'
                }`}
                style={!isMobile ? {
                  gridTemplateColumns: '1fr 200px 120px',
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
                        {program.certification}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#666]">
                      <span>{program.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                      <span>{program.type}</span>
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
                    <div className="flex items-center gap-3">
                      <span className="text-[#666] text-sm">{program.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                      <span className="text-[#666] text-sm">{program.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className="px-3 py-1 text-xs font-medium text-[#21313c] bg-[#f6f7f0] rounded"
                      >
                        {program.certification}
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 md:mt-16 pt-6 md:pt-8" style={{ borderTop: '1px solid #e5e5e5' }}>
            <span className="text-xs md:text-sm text-[#666]">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile: Show fewer page numbers */}
              {(isMobile ? [1, 2, 3] : [1, 2, 3, 4, 5]).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#21313c] text-white'
                      : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0]'
                  }`}
                  style={{ borderRadius: '50%' }}
                >
                  {page}
                </button>
              ))}
              <span className="text-[#999] px-1 md:px-2 text-xs md:text-base">...</span>
              <button
                onClick={() => setCurrentPage(9)}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm font-medium transition-colors ${
                  currentPage === 9
                    ? 'bg-[#21313c] text-white'
                    : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0]'
                }`}
                style={{ borderRadius: '50%' }}
              >
                9
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                className="ml-2 md:ml-4 px-4 md:px-6 py-2 md:py-2.5 bg-[#21313c] text-white text-xs md:text-sm font-medium hover:bg-[#333] transition-colors flex items-center gap-1 md:gap-2"
                style={{ borderRadius: '100px' }}
              >
                Next
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProgramsList };
export default ProgramsList;
