'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ProgramsList = () => {
  const [activeTab, setActiveTab] = useState('UG Programs');

  const tabs = ['UG Programs', 'PG Programs', 'PHD', 'Diploma Programs'];

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

  return (
    <section className="w-full">
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
        {/* Tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#d1d1d1] text-[#21313c]'
                  : 'bg-[#f6f7f0] text-[#21313c] hover:bg-[#e5e5e5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-300">
            <h3 className="text-lg font-bold text-[#21313c]">Programs</h3>
            <h3 className="text-lg font-bold text-[#21313c]">Certification</h3>
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-200"
            >
              {/* Program Name and Details */}
              <div>
                <h4 className="text-lg font-bold text-[#21313c] mb-2">
                  {program.name}
                </h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#f6f7f0] text-[#21313c] text-sm rounded">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 bg-[#f6f7f0] text-[#21313c] text-sm rounded">
                    {program.type}
                  </span>
                </div>
              </div>

              {/* Certification */}
              <div className="flex items-start">
                <p className="text-lg text-[#21313c]">{program.certification}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-full bg-[#21313c] text-white font-medium">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-[#f6f7f0] text-[#21313c] font-medium hover:bg-[#e5e5e5]">
            2
          </button>
          <button className="w-10 h-10 rounded-full bg-[#f6f7f0] text-[#21313c] font-medium hover:bg-[#e5e5e5]">
            3
          </button>
          <button className="w-10 h-10 rounded-full bg-[#f6f7f0] text-[#21313c] font-medium hover:bg-[#e5e5e5]">
            4
          </button>
          <button className="w-10 h-10 rounded-full bg-[#f6f7f0] text-[#21313c] font-medium hover:bg-[#e5e5e5]">
            5
          </button>
          <span className="text-[#21313c]">...</span>
          <button className="w-10 h-10 rounded-full bg-[#f6f7f0] text-[#21313c] font-medium hover:bg-[#e5e5e5]">
            9
          </button>
          <button className="px-4 py-2 bg-[#f6f7f0] text-[#21313c] font-medium rounded-lg hover:bg-[#e5e5e5]">
            Next Page
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export { ProgramsList };
export default ProgramsList;
