'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export const OurProgrammes = () => {
  const isMobile = useIsMobile();

  const programmes = [
    { image: '/p1.jpg', title: 'Undergraduate', subtitle: 'Programmes', width: 461, height: 520, href: '/programs?tab=UG' },
    { image: '/p2.jpg', title: 'Postgraduate', subtitle: 'Programmes', width: 461, height: 520, href: '/programs?tab=PG' },
    { image: '/p3.jpg', title: 'Ph.D.', subtitle: 'Programmes', width: 461, height: 520, href: '/programs?tab=PhD' },
    { image: '/p4.jpg', title: 'Diplomas &', subtitle: 'Certifications', width: 461, height: 520, href: '/programs?tab=Diploma' },
  ];



  return (
    <section className="bg-[#f6f7f0] py-8 md:py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12 md:mb-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-xs md:text-sm mb-4"
          style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          ACADEMIC PROGRAMMES
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
          style={{ fontWeight: 600, lineHeight: 1 }}
        >
          Learning,{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Unbounded</span>
        </h2>
        <p className="text-sm md:text-[15px] max-w-2xl mx-auto" style={{ color: '#666', lineHeight: 1.7 }}>
          Education here resists confinement. It takes shape in studios and libraries, in late conversations and early ideas, through collaboration as much as quiet contemplation.
        </p>
        <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </motion.div>

      {/* Programme Cards */}
      {isMobile ? (
        /* Mobile: 2x2 Grid Layout */
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            {programmes.map((programme, index) => (
              <a
                key={index}
                href={programme.href}
                className="relative overflow-hidden cursor-pointer rounded-2xl block"
                style={{
                  height: '240px',
                }}
              >
                <img
                  src={programme.image}
                  alt={programme.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className="absolute text-white"
                  style={{
                    top: '12px',
                    left: '12px'
                  }}
                >
                  <h3
                    className="font-bold leading-tight"
                    style={{ fontSize: '0.875rem' }}
                  >
                    {programme.title}
                  </h3>
                  <p
                    className="font-bold"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {programme.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: Horizontal Row Layout */
        <div
          className="flex justify-center"
          style={{
            paddingLeft: '10px',
            paddingRight: '10px',
            gap: '10px'
          }}
        >
          {programmes.map((programme, index) => (
            <a
              key={index}
              href={programme.href}
              className="relative overflow-hidden cursor-pointer group rounded-2xl block"
              style={{
                width: 'clamp(280px, 24vw, 520px)',
                height: 'clamp(360px, 32vw, 640px)',
              }}
            >
              <img
                src={programme.image}
                alt={programme.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div
                className="absolute text-white"
                style={{
                  top: '24px',
                  left: '24px'
                }}
              >
                <h3
                  className="font-bold leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 1.875rem)' }}
                >
                  {programme.title}
                </h3>
                <p
                  className="font-bold"
                  style={{ fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}
                >
                  {programme.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* View All Courses Button */}
      <div className="flex justify-center mt-4 md:mt-8">
        <a
          href="/programs"
          className="flex items-center bg-[#c3fd7a] text-[#21313c] rounded-full font-semibold hover:bg-[#b3ed6a] transition-colors"
          style={{
            gap: isMobile ? '4px' : '8px',
            padding: isMobile ? '4px 10px' : '12px 24px',
            fontSize: isMobile ? '0.5rem' : '0.875rem'
          }}
        >
          View All Courses
          <svg
            className="fill-none stroke-current"
            style={{ width: isMobile ? '10px' : '16px', height: isMobile ? '10px' : '16px' }}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Text Section - Hero style layout */}
      <motion.div
        className="mt-16 md:mt-24 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Big Text - Left aligned */}
        <div className="mb-6">
          <h3
            className="text-xl md:text-2xl lg:text-3xl text-[#21313c] leading-tight lg:w-1/2"
            style={{ fontWeight: 600 }}
          >
            Learning at JLU is not limited to schedules or spaces. It evolves through{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>experience</span>, interaction, and reflection.
          </h3>
        </div>

        {/* Small Text - Right aligned */}
        <div className="flex justify-end">
          <p className="text-xs md:text-sm lg:w-1/2" style={{ color: '#666', lineHeight: 1.7 }}>
            It remains relevant because it stays connected to the world beyond campus, and personal because it grows with each individual who experiences it.
          </p>
        </div>
      </motion.div>

      {/* Three Image Cards Section */}
      <motion.div
        className="mt-12 md:mt-24 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 md:mb-10">
          <div>
            <p
              className="text-xs md:text-sm mb-2"
              style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              CAMPUS LIFE
            </p>
            <h3
              className="text-2xl md:text-3xl lg:text-4xl text-[#21313c]"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              Beyond the{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Classroom</span>
            </h3>
          </div>
          <a
            href="/campus-life"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm text-[#21313c] font-medium hover:underline"
          >
            Explore Campus Life
            <span>→</span>
          </a>
        </div>
      </motion.div>
      <div className="mt-2 md:mt-0" style={{ paddingLeft: isMobile ? '4px' : '10px', paddingRight: isMobile ? '4px' : '10px' }}>
        <div className="flex" style={{ gap: isMobile ? '4px' : '10px' }}>
          {/* First card - l */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '180px' : 'clamp(500px, 40vw, 850px)',
              marginTop: isMobile ? '8px' : 'clamp(0px, 1.4vw, 30px)',
            }}
          >
            <img
              src="/l.jpg"
              alt="Image 1"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Second card - ll */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '160px' : 'clamp(450px, 36vw, 780px)',
              marginTop: isMobile ? '28px' : 'clamp(0px, 5.5vw, 120px)',
            }}
          >
            <img
              src="/ll.jpg"
              alt="Image 2"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Third card - lll */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '188px' : 'clamp(520px, 42vw, 900px)',
            }}
          >
            <img
              src="/lll.jpg"
              alt="Image 3"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
