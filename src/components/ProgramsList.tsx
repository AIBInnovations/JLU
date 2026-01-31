'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ProgramsList = () => {
  const [activeTab, setActiveTab] = useState('UG Programs');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ['UG Programs', 'PG Programs', 'PhD', 'Diploma Programs'];

  const programs = [
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
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '100px',
            paddingLeft: '120px',
          }}
        >
          {/* Tabs */}
          <div className="flex items-center gap-3 mb-16">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium transition-all ${
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

          {/* Table Header */}
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

          {/* Programs List */}
          <div>
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="group grid gap-8 py-6 cursor-pointer hover:bg-[#fafafa] transition-colors"
                style={{
                  gridTemplateColumns: '1fr 200px 120px',
                  borderBottom: '1px solid #f0f0f0',
                  marginLeft: '-16px',
                  marginRight: '-16px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
              >
                {/* Program Name */}
                <div className="flex items-center gap-4">
                  <span className="text-[#21313c] font-medium group-hover:text-[#666] transition-colors" style={{ fontSize: '17px' }}>
                    {program.name}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#21313c]">→</span>
                </div>

                {/* Duration & Type */}
                <div className="flex items-center gap-3">
                  <span className="text-[#666] text-sm">{program.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                  <span className="text-[#666] text-sm">{program.type}</span>
                </div>

                {/* Certification */}
                <div className="flex items-center">
                  <span
                    className="px-3 py-1 text-xs font-medium text-[#21313c] bg-[#f6f7f0] rounded"
                  >
                    {program.certification}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-16 pt-8" style={{ borderTop: '1px solid #e5e5e5' }}>
            <span className="text-sm text-[#666]">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#21313c] text-white'
                      : 'bg-transparent text-[#21313c] hover:bg-[#f6f7f0]'
                  }`}
                  style={{ borderRadius: '50%' }}
                >
                  {page}
                </button>
              ))}
              <span className="text-[#999] px-2">...</span>
              <button
                onClick={() => setCurrentPage(9)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${
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
                className="ml-4 px-6 py-2.5 bg-[#21313c] text-white text-sm font-medium hover:bg-[#333] transition-colors flex items-center gap-2"
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
