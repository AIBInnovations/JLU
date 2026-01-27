import { motion } from 'framer-motion';
import { useState } from 'react';

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
  },
  {
    id: 2,
    name: 'Mr. Pankaj Das',
    title: 'Registrar',
  },
  {
    id: 3,
    name: 'Dr. Nilanjan Chattopadhyay',
    title: 'Vice Chancellor',
  },
];

const Research = () => {
  const [activeArea, setActiveArea] = useState(1);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative w-screen bg-[#d9d9d9] overflow-hidden m-0 p-0"
        style={{ minHeight: '100vh' }}
      >
        {/* Content */}
        <div
          className="absolute"
          style={{
            top: '200px',
            left: '120px',
            maxWidth: '600px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#21313c] mb-6 leading-tight">
              Research that<br />matters
            </h1>
            <p className="text-base text-[#21313c] leading-relaxed mb-8" style={{ maxWidth: '500px' }}>
              Advancing knowledge through interdisciplinary inquiry, innovation, and real-world impact.
            </p>
            <a href="#" className="inline-flex items-center gap-3 text-[#21313c] font-medium underline hover:no-underline">
              Explore our research ecosystem
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Research Ecosystem Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-16">
            Research Ecosystem
          </h2>

          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '500px' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                An environment built for<br />discovery
              </h3>
              <p className="text-base text-[#21313c] leading-relaxed">
                Our research ecosystem brings together centres of excellence, faculty expertise, and cross-disciplinary collaboration to solve the world's most pressing challenges.
              </p>
            </div>

            {/* Right Side - Research Areas */}
            <div style={{ width: '580px' }}>
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
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            height: '262px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between h-full">
            {statsData.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col justify-center"
                style={{
                  borderRight: index < 3 ? '1px solid #c4c4c4' : 'none',
                  paddingRight: index < 3 ? '40px' : '0',
                  marginRight: index < 3 ? '40px' : '0',
                }}
              >
                <p className="text-4xl md:text-5xl font-bold text-[#21313c] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-[#21313c] tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-[#21313c]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Publication Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Latest Publication
          </h2>

          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Journal Info */}
            <div style={{ maxWidth: '500px', marginTop: '100px' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                JLU Research Journal
              </h3>
              <p className="text-base text-[#21313c] leading-relaxed mb-8">
                A peer-reviewed platform showcasing original research across disciplines, fostering dialogue between academia and industry.
              </p>

              {/* Categories */}
              <div className="flex flex-col gap-4 mb-8">
                {journalCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-[#21313c]">——</span>
                    <span className={`text-base text-[#21313c] ${index === 0 ? 'font-medium' : ''}`}>
                      {category}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#" className="inline-flex items-center gap-3 text-[#21313c] font-medium underline hover:no-underline">
                Access the journal
                <span>→</span>
              </a>
            </div>

            {/* Right Side - Journal Card */}
            <div
              className="bg-[#d9d9d9] shrink-0"
              style={{ width: '580px', height: '500px' }}
            >
              {/* Inner Card */}
              <div
                className="bg-[#e8e8e8]"
                style={{
                  width: '580px',
                  height: '270px',
                }}
              >
                {/* Publication Badge */}
                <div
                  className="bg-[#a0a0a0] flex flex-col items-center justify-center"
                  style={{
                    width: '403px',
                    height: '116px',
                    marginLeft: '89px',
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
      </div>

      {/* Faculty Spotlight Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#21313c] mb-4">
                Faculty Spotlight
              </h2>
              <p className="text-xl text-[#21313c]">
                Meet the minds shaping the future through rigorous inquiry.
              </p>
            </div>
            <a href="#" className="text-base text-[#21313c] font-medium underline hover:no-underline">
              View all Faculty
            </a>
          </div>

          <div className="flex justify-between">
            {facultySpotlight.map((faculty) => (
              <div
                key={faculty.id}
                className="flex flex-col"
                style={{ width: '380px' }}
              >
                {/* Image Placeholder */}
                <div
                  className="bg-[#c4c4c4]"
                  style={{ width: '380px', height: '420px' }}
                />
                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-[#21313c] mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-base text-[#666666]">
                    {faculty.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export { Research };
export default Research;
