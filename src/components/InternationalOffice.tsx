'use client';

import { motion } from 'framer-motion';

const partners = [
  { id: 1, name: 'Harvard University', column: 1 },
  { id: 2, name: 'University of Melbourne', column: 2 },
  { id: 3, name: 'NUS Singapore', column: 1 },
  { id: 4, name: 'LSE London', column: 2 },
  { id: 5, name: 'University of Toronto', column: 1 },
  { id: 6, name: 'ETH Zurich', column: 2 },
];

const pathwayFeatures = [
  'Centres of Excellence',
  'Faculty Research Areas',
  'Interdisciplinary Labs',
];

const journeySteps = [
  {
    id: 1,
    number: '01',
    title: 'Choose program',
    description: 'Explore our wide range of undergraduate and postgraduate courses.',
  },
  {
    id: 2,
    number: '02',
    title: 'Submit application',
    description: 'Complete the online form and upload required documents.',
  },
  {
    id: 3,
    number: '03',
    title: 'Receive offer letter',
    description: 'Successful applicants will receive an offer via email.',
  },
  {
    id: 4,
    number: '04',
    title: 'Apply for visa',
    description: 'Use your offer letter to start your student visa application.',
  },
  {
    id: 5,
    number: '05',
    title: 'Arrive on campus',
    description: 'Book your travel and join us for orientation week.',
  },
];

const visaSupport = [
  {
    id: 1,
    title: 'Student Visa Guidance',
    description: 'Comprehensive guides on applying for and maintaining your student visa status throughout your studies.',
  },
  {
    id: 2,
    title: 'Documentation Support',
    description: 'We verify your documents and issue the necessary acceptance letters for a smooth application process.',
  },
  {
    id: 3,
    title: 'Pre-departure Assistance',
    description: 'Webinars and checklists to help you pack, prepare, and plan your travel to India confidently.',
  },
  {
    id: 4,
    title: 'On-arrival Help',
    description: 'Airport pickup coordination and welcome teams to ensure you settle in comfortably from day one.',
  },
];

const bhopalFeatures = [
  {
    id: 1,
    title: 'Safe',
    description: "Consistently ranked as one of India's safest and cleanest cities.",
  },
  {
    id: 2,
    title: 'Affordable',
    description: 'Low cost of living compared to major metros.',
  },
  {
    id: 3,
    title: 'Green',
    description: 'Lush greenery and beautiful lakes create a refreshing atmosphere.',
  },
  {
    id: 4,
    title: 'Cultural',
    description: 'A rich heritage of art, history, and diverse festivals.',
  },
];

const InternationalOffice = () => {
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
            top: '250px',
            left: '120px',
            maxWidth: '600px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#21313c] mb-6 leading-tight">
              Your global journey<br />starts here.
            </h1>
            <p className="text-base text-[#21313c] leading-relaxed mb-8" style={{ maxWidth: '500px' }}>
              The International Office supports students from across the world — from admissions and visas to campus life and global opportunities.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#21313c] font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Apply as International Student
                <span>→</span>
              </a>
              <a href="#" className="text-[#21313c] font-medium hover:underline">
                Explore Partnerships
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Partnerships Section */}
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
          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '400px' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
                Global partnerships<br />that open doors
              </h2>
              <p className="text-base text-[#666666] leading-relaxed">
                Our university collaborates with institutions worldwide to enable exchange programs, joint research, and global learning pathways. We believe in borderless education.
              </p>
            </div>

            {/* Right Side - Partners Grid */}
            <div className="flex-1">
              <div className="flex" style={{ gap: '80px' }}>
                {/* Column 1 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 1).map((partner) => (
                    <div
                      key={partner.id}
                      className="py-4 border-b border-gray-200"
                    >
                      <span className="text-lg text-[#888888]">{partner.name}</span>
                    </div>
                  ))}
                </div>
                {/* Column 2 */}
                <div className="flex-1">
                  {partners.filter(p => p.column === 2).map((partner) => (
                    <div
                      key={partner.id}
                      className="py-4 border-b border-gray-200"
                    >
                      <span className="text-lg text-[#888888]">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium hover:underline">
                  View all 150+ Partners
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Foundation & Prep Section */}
      <div className="w-full bg-[#f6f7f0]">
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
            Foundation & Prep
          </h2>

          <div className="flex" style={{ gap: '64px' }}>
            {/* Image Placeholder */}
            <div
              className="bg-[#d9d9d9] flex-shrink-0"
              style={{ width: '580px', height: '580px' }}
            />

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                Pathway programs for a<br />smooth transition
              </h3>
              <p className="text-base text-[#666666] leading-relaxed mb-8">
                Designed for international students to build academic readiness and cultural confidence before entering full-time degree programs.
              </p>

              {/* Features List */}
              <div className="flex flex-col gap-4 mb-8">
                {pathwayFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-[#666666]">✓</span>
                    <span className="text-base text-[#21313c]">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 text-[#21313c] font-medium rounded-full hover:bg-gray-50 transition-colors w-fit"
              >
                Explore pathway programs
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Summer Schools Section */}
      <div className="w-full bg-[#d9d9d9]">
        <div
          className="mx-auto flex flex-col items-center justify-center"
          style={{
            maxWidth: '1440px',
            height: '480px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
            gap: '44px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] text-center">
            Summer schools that<br />connect cultures
          </h2>
          <p className="text-base text-[#666666] text-center max-w-2xl">
            Short-term international programs that combine academic learning, cultural exposure, and global networking in a vibrant environment.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#21313c] font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            View summer schools
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Your Journey Section */}
      <div className="w-full bg-[#a6a6a6]">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Your Journey
          </h2>
          <h3 className="text-2xl md:text-3xl text-white/80 mb-16">
            International Admissions Process
          </h3>

          {/* Timeline */}
          <div className="flex justify-between mb-16">
            {journeySteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-start" style={{ width: '200px' }}>
                <div className="flex items-center mb-6 w-full">
                  <div className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center">
                    <span className="text-white/80 text-sm">{step.number}</span>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="flex-1 h-px bg-white/30 ml-4" />
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/60 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Start your application
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Visa & Immigration Support Section */}
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-4">
              Visa & immigration support you<br />can rely on
            </h2>
            <p className="text-base text-[#666666] max-w-2xl mx-auto">
              Navigating immigration can be complex. Our dedicated team is here to guide you every step of the way, ensuring legal compliance and peace of mind.
            </p>
          </div>

          {/* Support Cards */}
          <div className="flex justify-between">
            {visaSupport.map((item) => (
              <div
                key={item.id}
                className="bg-[#f8f8f8] p-6"
                style={{ width: '270px' }}
              >
                {/* Icon Placeholder */}
                <div
                  className="bg-[#d9d9d9] mb-6"
                  style={{ width: '48px', height: '48px', borderRadius: '8px' }}
                />
                <h3 className="text-lg font-bold text-[#21313c] mb-3">{item.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Life in Bhopal Section */}
      <div className="w-full bg-[#f6f7f0]">
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
          <div className="flex justify-between" style={{ gap: '64px' }}>
            {/* Left Side - Content */}
            <div style={{ maxWidth: '500px' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
                Life in Bhopal
              </h2>
              <p className="text-base text-[#666666] leading-relaxed mb-10">
                Discover a city that blends culture, safety, affordability, and student-friendly living. Known as the City of Lakes, Bhopal offers a serene environment perfect for academic focus and cultural exploration.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                {bhopalFeatures.map((feature) => (
                  <div key={feature.id}>
                    <h3 className="text-lg font-bold text-[#21313c] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#666666]">{feature.description}</p>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 text-[#21313c] font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Explore life in Bhopal
                <span>→</span>
              </a>
            </div>

            {/* Right Side - Image Placeholder */}
            <div
              className="bg-[#d9d9d9] flex-shrink-0"
              style={{ width: '580px', height: '624px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { InternationalOffice };
export default InternationalOffice;
