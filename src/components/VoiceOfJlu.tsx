'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export const VoiceOfJlu = () => {
  const isMobile = useIsMobile();
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [mutedVideo, setMutedVideo] = useState<Record<number, boolean>>({});
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const facultyRef = useRef(null);
  const voicesRef = useRef(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const isInView = useInView(facultyRef, { once: true, amount: 0.3 });
  const voicesInView = useInView(voicesRef, { once: true, amount: 0.3 });

  // Pause all videos except the given index
  const pauseAllExcept = (exceptIndex: number) => {
    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (vid && Number(key) !== exceptIndex && Number(key) !== 100 + exceptIndex) {
        vid.pause();
        vid.currentTime = 0.5;
      }
    });
  };

  // Set default active card to first (index 0)
  useEffect(() => {
    setActiveCard(isMobile ? null : 0);
  }, []);

  // Open first card (expanded) when section scrolls into view, but don't play
  useEffect(() => {
    if (voicesInView && !hasAutoPlayed && !isMobile) {
      setActiveCard(0);
      setHasAutoPlayed(true);
    }
  }, [voicesInView, hasAutoPlayed, isMobile]);

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
    { name: 'Faiz Siddiqui', title: 'B.Tech', video: '/voices%20of%20jlu/Faiz%20siddiui%20reel.mp4', thumbnail: '' },
    { name: 'Faiza Khan', title: 'BCA (Data Science) 4th Sem', video: '/voices%20of%20jlu/faiza%20reel%20final.mp4', thumbnail: '/thumbnails/voice-1.jpg' },
    { name: 'Khwahish Ramani', title: 'Bachelor of Management 2022-2025', video: '/voices%20of%20jlu/cdc%20reel.mp4', thumbnail: '/thumbnails/voice-2.jpg' },
    { name: 'Jamila Johaer & Aaminah Azhar', title: 'Diploma in Food Production', video: '/voices%20of%20jlu/hospitality%20w%20bgm.mp4', thumbnail: '/thumbnails/voice-4.jpg' },
    { name: 'Tanya Sharma', title: 'B.Des (User Experience) 2021-2025', video: '/voices%20of%20jlu/tanya%20sharma%20cdc%20reel.mp4', thumbnail: '/thumbnails/voice-5.jpg' },
    { name: 'Shubham Rawat', title: 'FALW-JSLW (LLM) 2024-2025', video: '/voices%20of%20jlu/shubham%20rawat%20cdc%20reel.mp4', thumbnail: '/thumbnails/voice-6.jpg' },
  ];

  const faculty = [
    { image: '/leadership/chancellor.jpg', name: 'Mr. Hari Mohan Gupta', title: 'Chancellor', linkedin: 'https://in.linkedin.com/in/hari-mohan-gupta-318960153' },
    { image: '/leadership/pro-chancellor.jpg', name: 'Mr. Abhishek Mohan Gupta', title: 'Pro Chancellor', linkedin: 'https://in.linkedin.com/in/abhishekmgupta' },
    { image: '/leadership/vice-chancellor.webp', name: 'Prof. Dr. Nilanjan Chattopadhyay', title: 'Vice Chancellor', linkedin: 'https://www.linkedin.com/in/nchattopadhyay/' },
    { image: '/leadership/registrar.jpg', name: 'Mr. Pankaj Das', title: 'Registrar', linkedin: '' },
    { image: '/leadership/cfo.jpg', name: 'CA Archana Jain', title: 'Chief Finance and Accounts Officer', linkedin: 'https://www.linkedin.com/in/archana-jain-33189397/' },
    { image: '/leadership/pvc-student-welfare.jpg', name: 'Dr. Vivek Khare', title: 'Pro Vice Chancellor (Student Welfare)', linkedin: 'https://in.linkedin.com/in/dr-vivek-khare-8666a61a' },
    { image: '/leadership/pvc-science-tech.png', name: 'Dr. Prasheel Suryawanshi', title: 'Pro Vice Chancellor (Science and Technology)', linkedin: 'https://www.linkedin.com/in/prasheel-suryawanshi-8b368b21/' },
  ];

  return (
    <section className="bg-[#f6f7f0] pt-16 md:pt-48 pb-12 md:pb-24">
      {/* Header */}
      <motion.div
        className="text-center mb-12 md:mb-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-base md:text-lg mb-4"
          style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          STUDENT TESTIMONIALS
        </p>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-[#21313c] mb-6 md:mb-8"
          style={{ fontWeight: 600, lineHeight: 1 }}
        >
          Voices of{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>JLU</span>
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: '#666', lineHeight: 1.8 }}>
          Distinct individuals. Diverse journeys. One shared ecosystem.
        </p>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-5" style={{ color: '#666', lineHeight: 1.8 }}>
          Every person at JLU contributes to its character. Together, these voices create an environment that feels open, textured, and continually in motion.
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mt-4" style={{ color: '#999', fontStyle: 'italic', lineHeight: 1.7 }}>
          This is the university as it is lived, not just described.
        </p>
      </motion.div>

      {/* Cards Container */}
      <div ref={voicesRef} />
      {isMobile ? (
        /* Mobile: Arrow navigation cards */
        <div style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          {/* Cards with navigation */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-2 transition-transform duration-300"
              style={{
                transform: `translateX(-${mobileIndex * 72}px)`,
              }}
            >
              {voices.map((voice, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer transition-all duration-300 overflow-hidden flex-shrink-0"
                  style={{
                    width: index === activeCard ? '260px' : '75px',
                    height: '380px',
                    borderRadius: index === activeCard ? '32px' : '40px',
                  }}
                  onClick={() => {
                    if (index === activeCard) {
                      setActiveCard(null);
                      setPlayingVideo(null);
                      const vid = videoRefs.current[index];
                      if (vid) { vid.pause(); vid.currentTime = 0.5; vid.muted = true; }
                      setMutedVideo((prev) => ({ ...prev, [index]: true }));
                    } else {
                      pauseAllExcept(index);
                      setActiveCard(index);
                      setPlayingVideo(index);
                      setMutedVideo((prev) => ({ ...prev, [index]: false }));
                      const vid = videoRefs.current[index];
                      if (vid) { vid.muted = false; vid.currentTime = 0; vid.play(); }
                    }
                  }}
                >
                  {/* Thumbnail overlay when not playing */}
                  {voice.thumbnail && playingVideo !== index && (
                    <img
                      src={voice.thumbnail}
                      alt={voice.name}
                      className="absolute inset-0 w-full h-full object-cover z-[1]"
                    />
                  )}
                  {/* Video - always present, plays when active */}
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={`${voice.video}#t=0.5`}
                    autoPlay={playingVideo === index}
                    muted={mutedVideo[index] !== false}
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius: 'inherit' }}
                    onEnded={() => { setPlayingVideo(null); setActiveCard(null); }}
                  />

                  {/* Custom controls - only when playing */}
                  {playingVideo === index && (
                    <div className="absolute bottom-3 right-3 flex gap-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const vid = videoRefs.current[index];
                          if (vid) { vid.paused ? vid.play() : vid.pause(); }
                          setPlayingVideo(vid?.paused ? null : index);
                        }}
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          {videoRefs.current[index]?.paused
                            ? <path d="M8 5v14l11-7z" />
                            : <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
                          }
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMutedVideo((prev) => ({ ...prev, [index]: prev[index] === false ? true : false }));
                        }}
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          {mutedVideo[index] !== false
                            ? <><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>
                            : <><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></>
                          }
                        </svg>
                      </button>
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
                width: index === activeCard ? 'clamp(240px, 32vw, 750px)' : 'clamp(70px, 8vw, 180px)',
                height: 'clamp(320px, 38vw, 850px)',
                borderRadius: index === activeCard ? '60px' : '80px',
              }}
              onClick={() => {
                if (index === activeCard) {
                  setActiveCard(null);
                  setPlayingVideo(null);
                  const vid = videoRefs.current[100 + index];
                  if (vid) { vid.pause(); vid.currentTime = 0.5; vid.muted = true; }
                  setMutedVideo((prev) => ({ ...prev, [index]: true }));
                } else {
                  pauseAllExcept(index);
                  setActiveCard(index);
                  setPlayingVideo(index);
                  setMutedVideo((prev) => ({ ...prev, [index]: false }));
                  const vid = videoRefs.current[100 + index];
                  if (vid) { vid.muted = false; vid.currentTime = 0; vid.play(); }
                }
              }}
            >
              {/* Thumbnail overlay when not playing */}
              {voice.thumbnail && playingVideo !== index && (
                <img
                  src={voice.thumbnail}
                  alt={voice.name}
                  className="absolute inset-0 w-full h-full object-cover z-[1]"
                  style={{ borderRadius: 'inherit' }}
                />
              )}
              {/* Video - always present, plays when active */}
              <video
                ref={(el) => { videoRefs.current[100 + index] = el; }}
                src={`${voice.video}#t=0.5`}
                autoPlay={playingVideo === index}
                muted={mutedVideo[index] !== false}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: 'inherit' }}
                onEnded={() => { setPlayingVideo(null); setActiveCard(null); }}
              />

              {/* Custom controls - only when playing */}
              {playingVideo === index && (
                <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const vid = videoRefs.current[100 + index];
                      if (vid) { vid.paused ? vid.play() : vid.pause(); }
                      setPlayingVideo(vid?.paused ? null : index);
                    }}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {videoRefs.current[100 + index]?.paused
                        ? <path d="M8 5v14l11-7z" />
                        : <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
                      }
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMutedVideo((prev) => ({ ...prev, [index]: prev[index] === false ? true : false }));
                    }}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      {mutedVideo[index] !== false
                        ? <><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>
                        : <><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></>
                      }
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Our Faculty Section */}
      <div ref={facultyRef} className="mt-12 md:mt-24 lg:mt-32 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-32">
        {/* Faculty Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-start mb-8 md:mb-12 lg:mb-16"
        >
          <div>
            <p
              className="text-base md:text-lg mb-2"
              style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              MEET OUR TEAM
            </p>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl text-[#21313c]"
              style={{ fontWeight: 600, lineHeight: 1 }}
            >
              Leadership{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Structure</span>
            </h2>
          </div>
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
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8eae2] flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#21313c] font-semibold text-xs">
                      {member.name}
                    </h3>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
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
                {faculty.slice(0, 4).map((member, index) => (
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
                      <div className="flex items-center justify-between">
                        <h3 className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg">
                          {member.name}
                        </h3>
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors ml-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {member.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Second Row - slides from left to right */}
              <div className="flex justify-start gap-4 lg:gap-6">
                {faculty.slice(4, 7).map((member, index) => (
                  <motion.div
                    key={index + 4}
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
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors ml-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
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
