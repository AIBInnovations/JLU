'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const researchAreas = [
  { id: 1, name: 'Centres of Excellence', active: true },
  { id: 2, name: 'Faculty Research Areas', active: false },
  { id: 3, name: 'Interdisciplinary Labs', active: false },
  { id: 4, name: 'Graduate Research', active: false },
];

const statsData = [
  { id: 1, value: '2.4k+', label: 'PUBLICATIONS', description: 'Peer-reviewed journals & global indexing' },
  { id: 2, value: '142', label: 'PATENTS', description: 'Innovation-driven intellectual property' },
  { id: 3, value: '$85M', label: 'FUNDED PROJECTS', description: 'Government & industry-backed research' },
  { id: 4, value: 'Global', label: 'OUTCOMES', description: 'Policy, industry & social impact' },
];

const publicationsData = [
  {
    id: 1,
    title: 'Formulation and Evaluation of Sustained Release Matrix Tablets Using Natural Polymers',
    authors: 'Dr. Vandana Rathore, Dr. Meera Gupta',
    journal: 'International Journal of Pharmaceutical Sciences',
    year: '2024',
    citations: 38,
    category: 'Pharmacy',
    doi: '10.1016/j.ijps.2024.0142',
  },
  {
    id: 2,
    title: 'Deep Learning Approaches for Real-Time Object Detection in Autonomous Systems',
    authors: 'Dr. Priyanka Nema, Dr. Vikram Joshi',
    journal: 'IEEE Transactions on Neural Networks',
    year: '2024',
    citations: 24,
    category: 'Computer Science',
    doi: '10.1109/TNN.2024.3287654',
  },
  {
    id: 3,
    title: 'Blockchain-Enabled Supply Chain Management: A Systematic Review',
    authors: 'Dr. Sachin Rastogi, Sweta Gupta',
    journal: 'Journal of Business Research',
    year: '2023',
    citations: 52,
    category: 'Management',
    doi: '10.1016/j.jbusres.2023.1087',
  },
  {
    id: 4,
    title: 'CRISPR-Based Gene Editing for Crop Improvement in Central Indian Soils',
    authors: 'Dr. Deepak Saxena, Dr. Ramesh Chandra',
    journal: 'Nature Biotechnology Letters',
    year: '2024',
    citations: 19,
    category: 'Biotechnology',
    doi: '10.1038/nbt.2024.0056',
  },
  {
    id: 5,
    title: 'Impact of Industrial Effluents on Groundwater Quality in Madhya Pradesh',
    authors: 'Dr. Ankita Sharma, Dr. Anil Kumar Sharma',
    journal: 'Environmental Science & Technology',
    year: '2023',
    citations: 31,
    category: 'Environmental Science',
    doi: '10.1021/es.2023.5431',
  },
  {
    id: 6,
    title: 'Media Framing of Climate Change in Indian Print Journalism: A Discourse Analysis',
    authors: 'Dr. Ritu Sharma, Prof. Anand Mishra',
    journal: 'Asian Journal of Communication',
    year: '2024',
    citations: 15,
    category: 'Journalism',
    doi: '10.1080/ajc.2024.2298',
  },
];

const publicationFilters = ['All', 'Computer Science', 'Pharmacy', 'Management', 'Biotechnology', 'Environmental Science', 'Journalism'];

const journalCategories = [
  'Centres of Excellence',
  'Faculty Research Areas',
  'Interdisciplinary Labs',
];

const facultySpotlight = [
  {
    id: 1,
    name: 'Shri. Abhishek Mohan Gupta',
    title: 'Pro - Chancellor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Mr. Pankaj Das',
    title: 'Registrar',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  },
  {
    id: 3,
    name: 'Dr. Nilanjan Chattopadhyay',
    title: 'Vice Chancellor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
];

const patentsData = [
  {
    id: 1,
    title: 'AI-Based Smart Irrigation System for Precision Agriculture',
    inventors: 'Dr. Rajesh Kumar, Dr. Priya Sharma',
    patentNo: 'IN202341045678',
    year: '2023',
    status: 'Granted',
    department: 'School of Engineering',
  },
  {
    id: 2,
    title: 'Biodegradable Polymer Composite from Agricultural Waste',
    inventors: 'Dr. Amit Verma, Dr. Sneha Patel',
    patentNo: 'IN202241032456',
    year: '2022',
    status: 'Granted',
    department: 'School of Sciences',
  },
  {
    id: 3,
    title: 'Novel Drug Delivery System Using Nanotechnology',
    inventors: 'Dr. Meera Gupta, Dr. Rahul Singh',
    patentNo: 'IN202441012345',
    year: '2024',
    status: 'Published',
    department: 'School of Pharmacy',
  },
  {
    id: 4,
    title: 'Blockchain-Based Secure Voting System',
    inventors: 'Dr. Vikram Joshi, Dr. Neha Agarwal',
    patentNo: 'IN202341078901',
    year: '2023',
    status: 'Granted',
    department: 'School of Computer Science',
  },
];

const fundedProjectsData = [
  {
    id: 1,
    title: 'Development of Sustainable Energy Solutions for Rural India',
    fundingAgency: 'Department of Science & Technology (DST)',
    amount: '₹2.5 Crore',
    duration: '2023-2026',
    pi: 'Dr. Anil Kumar Sharma',
    status: 'Ongoing',
  },
  {
    id: 2,
    title: 'Machine Learning Applications in Healthcare Diagnostics',
    fundingAgency: 'Indian Council of Medical Research (ICMR)',
    amount: '₹1.8 Crore',
    duration: '2022-2025',
    pi: 'Dr. Sunita Verma',
    status: 'Ongoing',
  },
  {
    id: 3,
    title: 'Indigenous Knowledge Systems and Biodiversity Conservation',
    fundingAgency: 'University Grants Commission (UGC)',
    amount: '₹85 Lakhs',
    duration: '2021-2024',
    pi: 'Dr. Ramesh Chandra',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Smart City Infrastructure Using IoT Technologies',
    fundingAgency: 'Ministry of Electronics & IT (MeitY)',
    amount: '₹3.2 Crore',
    duration: '2024-2027',
    pi: 'Dr. Priya Mehta',
    status: 'Ongoing',
  },
  {
    id: 5,
    title: 'Advanced Materials for Water Purification',
    fundingAgency: 'Council of Scientific & Industrial Research (CSIR)',
    amount: '₹1.2 Crore',
    duration: '2023-2026',
    pi: 'Dr. Manish Gupta',
    status: 'Ongoing',
  },
];

const Research = () => {
  const [activeArea, setActiveArea] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&q=80"
              alt="Research"
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
          className="absolute top-0 left-0"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 40px)',
            paddingTop: 'clamp(100px, 15vw, 120px)',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            RESEARCH THAT <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>matters</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
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
              fontSize: 'clamp(6.1rem, 16vw, 16rem)',
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

      {/* Research Ecosystem Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#21313c] mb-8 md:mb-12 lg:mb-16">
            Research Ecosystem
          </h2>

          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="w-full lg:max-w-145">
              <p className="text-[#21313c] leading-relaxed text-base md:text-lg lg:text-xl" style={{ lineHeight: '1.6' }}>
                Research at JLU is shaped by exploration rather than expectation.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-3 md:mt-4 text-base md:text-lg lg:text-xl" style={{ lineHeight: '1.6' }}>
                It grows from thoughtful questions, careful observation, and a willingness to look beyond the obvious.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-3 md:mt-4 text-base md:text-lg lg:text-xl" style={{ lineHeight: '1.6' }}>
                Across disciplines, faculty and students engage in work that seeks relevance, depth, and long-term value.
              </p>
              <p className="text-[#21313c] leading-relaxed mt-3 md:mt-4 text-base md:text-lg lg:text-xl" style={{ lineHeight: '1.6' }}>
                Knowledge here is not only generated, it is examined, refined, and shared.
              </p>
            </div>

            {/* Right Side - Research Areas */}
            <div className="w-full lg:w-145">
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className="w-full flex items-center justify-between py-4 border-b border-gray-300 text-left"
                >
                  <span className={`text-lg text-[#21313c] ${activeArea === area.id ? 'font-medium' : ''}`}>
                    {area.name}
                  </span>
                  {activeArea === area.id && (
                    <span className="text-[#21313c]">→</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-[#e8e8e8]">
        <div
          className="mx-auto px-5 py-10 md:px-10 md:py-12 lg:px-30 lg:py-16"
          style={{
            maxWidth: '1440px',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-0">
            {statsData.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col justify-center lg:border-r lg:last:border-r-0 border-[#c4c4c4] lg:pr-10 lg:mr-10 lg:last:pr-0 lg:last:mr-0"
              >
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-medium text-[#21313c] tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-xs md:text-sm text-[#21313c]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publications Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-2 md:mb-4">
                Publications
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Peer-reviewed research advancing knowledge across disciplines.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#03463B] text-white px-4 py-2 rounded-full">
              <span className="text-2xl md:text-3xl font-bold">2.4k+</span>
              <span className="text-sm">Published Papers</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
            {publicationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {publicationsData
              .filter(pub => activeFilter === 'All' || pub.category === activeFilter)
              .map((pub) => (
              <div
                key={pub.id}
                className="bg-white p-5 md:p-7 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group"
              >
                {/* Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#e8f5e9] text-[#03463B] text-[10px] md:text-xs font-medium rounded-full">
                    {pub.category}
                  </span>
                  <span className="text-xs text-gray-400">{pub.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-[#21313c] font-semibold text-sm md:text-base leading-snug mb-3 group-hover:text-[#03463B] transition-colors line-clamp-3">
                  {pub.title}
                </h3>

                {/* Authors */}
                <p className="text-xs md:text-sm text-gray-500 mb-3">
                  {pub.authors}
                </p>

                {/* Journal */}
                <p className="text-xs text-gray-400 italic mb-4">
                  {pub.journal}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs text-gray-500">{pub.citations} citations</span>
                  </div>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#03463B] font-medium hover:underline flex items-center gap-1"
                  >
                    DOI
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline">
              Browse all publications
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Latest Publication Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#21313c] mb-8 md:mb-12">
            Latest Publication
          </h2>

          <div className="flex flex-col-reverse lg:flex-row justify-between gap-8 lg:gap-16">
            {/* Left Side - Journal Info */}
            <div className="w-full lg:max-w-125 lg:mt-25">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#21313c] mb-3 md:mb-4">
                JLU Research Journal
              </h3>
              <p className="text-sm md:text-base text-[#21313c] leading-relaxed mb-6 md:mb-8">
                A peer-reviewed platform showcasing original research across disciplines, fostering dialogue between academia and industry.
              </p>

              {/* Categories */}
              <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
                {journalCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-3 md:gap-4">
                    <span className="text-[#21313c]">——</span>
                    <span className={`text-sm md:text-base text-[#21313c] ${index === 0 ? 'font-medium' : ''}`}>
                      {category}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#" className="inline-flex items-center gap-2 md:gap-3 text-sm md:text-base text-[#21313c] font-medium underline hover:no-underline">
                Access the journal
                <span>→</span>
              </a>
            </div>

            {/* Right Side - Journal Card */}
            <div
              className="relative shrink-0 overflow-hidden rounded-lg w-full lg:w-145 h-64 md:h-80 lg:h-125"
            >
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80"
                alt="Research Journal"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              {/* Publication Badge */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-white/90 flex flex-col items-center justify-center"
                style={{
                  height: '116px',
                  gap: '8px',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <p className="text-xl font-bold text-[#21313c]">Academic Insights</p>
                <p className="text-sm text-[#21313c]">Vol. 12, No. 2, Spring 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Spotlight Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12 lg:mb-16">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-2 md:mb-4">
                Faculty Spotlight
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Meet the minds shaping the future through rigorous inquiry.
              </p>
            </div>
            <a href="#" className="text-sm md:text-base text-[#21313c] font-medium underline hover:no-underline">
              View all Faculty
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facultySpotlight.map((faculty) => (
              <div
                key={faculty.id}
                className="flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden w-full h-72 md:h-80 lg:h-105"
                >
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="mt-4 md:mt-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#21313c] mb-1 md:mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-sm md:text-base text-[#666666]">
                    {faculty.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patents Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-2 md:mb-4">
                Patents
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Innovation-driven intellectual property protecting groundbreaking research.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#21313c] text-white px-4 py-2 rounded-full">
              <span className="text-2xl md:text-3xl font-bold">142+</span>
              <span className="text-sm">Patents Filed</span>
            </div>
          </div>

          {/* Patents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patentsData.map((patent) => (
              <div
                key={patent.id}
                className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patent.status === 'Granted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patent.status}
                  </span>
                  <span className="text-sm text-gray-500">{patent.year}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#21313c] mb-3">
                  {patent.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Inventors:</span> {patent.inventors}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Patent No:</span> {patent.patentNo}
                </p>
                <p className="text-sm text-gray-500">
                  {patent.department}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline">
              View all Patents
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Funded Projects Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 md:px-10 md:py-16 lg:px-30 lg:py-20"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-2 md:mb-4">
                Funded Projects
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[#21313c]">
                Government and industry-backed research driving innovation and impact.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#1a5f4a] text-white px-4 py-2 rounded-full">
              <span className="text-2xl md:text-3xl font-bold">₹85M+</span>
              <span className="text-sm">Total Funding</span>
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#21313c]">
                  <th className="text-left py-4 px-2 text-sm md:text-base font-bold text-[#21313c]">Project Title</th>
                  <th className="text-left py-4 px-2 text-sm md:text-base font-bold text-[#21313c] hidden md:table-cell">Funding Agency</th>
                  <th className="text-left py-4 px-2 text-sm md:text-base font-bold text-[#21313c]">Amount</th>
                  <th className="text-left py-4 px-2 text-sm md:text-base font-bold text-[#21313c] hidden lg:table-cell">Duration</th>
                  <th className="text-left py-4 px-2 text-sm md:text-base font-bold text-[#21313c]">Status</th>
                </tr>
              </thead>
              <tbody>
                {fundedProjectsData.map((project) => (
                  <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                      <p className="text-sm md:text-base font-medium text-[#21313c]">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1">PI: {project.pi}</p>
                      <p className="text-xs text-gray-500 md:hidden mt-1">{project.fundingAgency}</p>
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-600 hidden md:table-cell">{project.fundingAgency}</td>
                    <td className="py-4 px-2 text-sm md:text-base font-semibold text-[#1a5f4a]">{project.amount}</td>
                    <td className="py-4 px-2 text-sm text-gray-600 hidden lg:table-cell">{project.duration}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium underline hover:no-underline">
              View all Funded Projects
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export { Research };
export default Research;
