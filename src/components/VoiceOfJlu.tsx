'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export const VoiceOfJlu = () => {
  const isMobile = useIsMobile();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const facultyRef = useRef(null);
  const isInView = useInView(facultyRef, { once: true, amount: 0.3 });

  // Set default active card based on device - closed on mobile, 7th card open on desktop
  useEffect(() => {
    setActiveCard(isMobile ? null : 7);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Top row: slides from right to left (fast to slow)
  const topRowVariants = {
    hidden: { x: '150%' },
    visible: {
      x: 0,
      transition: { duration: 1.2, ease: [0.6, 0, 0.2, 1] as const },
    },
  };

  // Bottom row: slides from left to right (fast to slow)
  const bottomRowVariants = {
    hidden: { x: '-150%' },
    visible: {
      x: 0,
      transition: { duration: 1.2, ease: [0.6, 0, 0.2, 1] as const },
    },
  };

  const handlePrevCard = () => {
    setMobileIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCard = (maxIndex: number) => {
    setMobileIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const voices = [
    { image: '/a.jpg', name: 'John Doe', title: 'B.Tech I Year' },
    { image: '/b.jpg', name: 'Jane Smith', title: 'MBA II Year' },
    { image: '/c.jpg', name: 'Alex Johnson', title: 'B.Sc III Year' },
    { image: '/d.jpg', name: 'Emily Davis', title: 'B.Com I Year' },
    { image: '/e.jpg', name: 'Michael Brown', title: 'M.Tech II Year' },
    { image: '/f.jpg', name: 'Sarah Wilson', title: 'BBA I Year' },
    { image: '/g.jpg', name: 'David Lee', title: 'B.Tech II Year' },
    { image: '/h.jpg', name: 'Emma Taylor', title: 'MBA I Year' },
    { image: '/i.jpg', name: 'Chris Martin', title: 'B.Sc II Year' },
  ];

  const faculty = [
    { image: '/aa.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
    { image: '/bb.png', name: 'Mr. Pankaj Das', title: 'Registrar' },
    { image: '/cc.png', name: 'Dr. Nilanjan Chattopadhyay', title: 'Vice Chancellor' },
    { image: '/dd.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
    { image: '/ee.png', name: 'Mr. Pankaj Das', title: 'Registrar' },
    { image: '/ff.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
  ];

  return (
    <section className="bg-[#f6f7f0] pt-32 md:pt-48 pb-16 md:pb-24">
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
          STUDENT TESTIMONIALS
        </p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
          style={{ fontWeight: 600, lineHeight: 1 }}
        >
          Voices of{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>JLU</span>
        </h2>
        <p className="text-sm md:text-[15px] max-w-md mx-auto" style={{ color: '#666', lineHeight: 1.7 }}>
          Distinct individuals. Diverse journeys. One shared ecosystem.
        </p>
        <p className="text-sm md:text-[15px] max-w-xl mx-auto mt-4" style={{ color: '#666', lineHeight: 1.7 }}>
          Every person at JLU contributes to its character. Together, these voices create an environment that feels open, textured, and continually in motion.
        </p>
        <p className="text-xs md:text-sm max-w-lg mx-auto mt-3" style={{ color: '#999', fontStyle: 'italic' }}>
          This is the university as it is lived, not just described.
        </p>
      </motion.div>

      {/* Cards Container */}
      {isMobile ? (
        /* Mobile: Arrow navigation cards */
        <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          {/* Cards with navigation */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-3 transition-transform duration-300"
              style={{
                transform: `translateX(-${mobileIndex * 83}px)`,
              }}
            >
              {voices.map((voice, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0"
                  style={{
                    width: index === activeCard ? '200px' : '80px',
                    height: '320px',
                    borderRadius: index === activeCard ? '40px' : '50px',
                  }}
                  onClick={() => setActiveCard(index === activeCard ? null : index)}
                >
                  <img
                    src={voice.image}
                    alt={voice.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 20%' }}
                  />

                  {/* Overlay with text - only show on active card */}
                  {index === activeCard && (
                    <div className="absolute inset-0">
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 pt-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          borderBottomLeftRadius: '40px',
                          borderBottomRightRadius: '40px',
                        }}
                      >
                        <h3 className="text-white font-bold text-xs">
                          {voice.name} ({voice.title})
                        </h3>
                        <p className="text-white/90 text-xs mt-1 leading-relaxed">
                          "Lorem ipsum dolor sit amet..."
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrevCard}
              disabled={mobileIndex === 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleNextCard(voices.length - 4)}
              disabled={mobileIndex >= voices.length - 4}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* Desktop: Original layout */
        <div className="flex justify-center items-center gap-[clamp(6px,0.8vw,10px)]" style={{ paddingLeft: 'clamp(6px, 0.8vw, 10px)', paddingRight: 'clamp(6px, 0.8vw, 10px)' }}>
          {voices.map((voice, index) => (
            <div
              key={index}
              className="relative cursor-pointer transition-all duration-300 overflow-hidden"
              style={{
                width: index === activeCard ? 'clamp(200px, 28vw, 680px)' : 'clamp(60px, 7vw, 160px)',
                height: 'clamp(280px, 34vw, 780px)',
                borderRadius: index === activeCard ? '60px' : '80px',
              }}
              onClick={() => setActiveCard(index === activeCard ? null : index)}
            >
              <img
                src={voice.image}
                alt={voice.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ objectPosition: index === 2 ? '70% 20%' : index === 8 ? '30% 20%' : 'center 20%' }}
              />

              {/* Overlay with text - only show on active card */}
              {index === activeCard && (
                <div className="absolute inset-0">
                  {/* Frosted glass card at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 pt-10 lg:pt-12"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                      borderBottomLeftRadius: '60px',
                      borderBottomRightRadius: '60px',
                    }}
                  >
                    <h3 className="text-white font-bold text-sm lg:text-base">
                      {voice.name} ({voice.title})
                    </h3>
                    <p className="text-white/90 text-xs lg:text-sm mt-1.5 leading-relaxed">
                      "Lorem ipsum dolor sit amet consectetur. Rhoncus erat sagittis sed nisl."
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Our Faculty Section */}
      <div ref={facultyRef} className="mt-16 md:mt-24 lg:mt-32 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-32">
        {/* Faculty Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-start mb-8 md:mb-12 lg:mb-16"
        >
          <div>
            <p
              className="text-xs md:text-sm mb-2"
              style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              MEET OUR TEAM
            </p>
            <h2
              className="text-2xl md:text-5xl lg:text-6xl text-[#21313c]"
              style={{ fontWeight: 600, lineHeight: 1 }}
            >
              Our{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Faculty</span>
            </h2>
          </div>
          <span
            className="text-2xl md:text-5xl lg:text-6xl text-[#21313c]"
            style={{ fontWeight: 600 }}
          >
            2025
          </span>
        </motion.div>

        {/* Faculty Grid */}
        {isMobile ? (
          /* Mobile: 2-column grid */
          <div className="grid grid-cols-2 gap-4">
            {faculty.map((member, index) => (
              <div key={index}>
                <div
                  className="overflow-hidden"
                  style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '12px',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-[#21313c] font-semibold text-xs">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: Images slide out from behind fixed wrappers */
          <div className="relative overflow-hidden">
            {/* Faculty Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-8 lg:gap-12 relative z-20"
            >
              {/* First Row - slides from right to left */}
              <div className="flex justify-end gap-4 lg:gap-6">
                {faculty.slice(0, 3).map((member, index) => (
                  <motion.div
                    key={index}
                    variants={topRowVariants}
                    whileHover={{ y: -8 }}
                    style={{
                      width: 'clamp(150px, 18vw, 400px)',
                    }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{
                        width: '100%',
                        height: 'clamp(200px, 21vw, 480px)',
                        borderRadius: '16px',
                      }}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {member.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Second Row - slides from left to right */}
              <div className="flex justify-start gap-4 lg:gap-6">
                {faculty.slice(3, 6).map((member, index) => (
                  <motion.div
                    key={index + 3}
                    variants={bottomRowVariants}
                    whileHover={{ y: -8 }}
                    style={{
                      width: 'clamp(150px, 18vw, 400px)',
                    }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{
                        width: '100%',
                        height: 'clamp(200px, 21vw, 480px)',
                        borderRadius: '16px',
                      }}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {member.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fixed Left Wrapper - stays in place */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full bg-[#f6f7f0] z-10"
              style={{ pointerEvents: 'none' }}
            />

            {/* Fixed Right Wrapper - stays in place */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full bg-[#f6f7f0] z-10"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
