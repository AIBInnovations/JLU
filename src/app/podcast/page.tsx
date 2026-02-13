'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ============================================
// DATA
// ============================================

const podcasts = [
  {
    id: '1',
    title: 'The Future of Education',
    guest: 'Dr. Nilanjan Chattopadhyay',
    role: 'Vice Chancellor, JLU',
    duration: '45 min',
    episode: 'EP 01',
    date: 'Jan 15, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2024/01/vice_chancellor_card-1.webp',
    description: 'Exploring how technology and innovation are reshaping higher education in India and JLU\'s vision for the future.',
    topics: ['Higher Education', 'Innovation', 'Vision 2030'],
  },
  {
    id: '2',
    title: 'From Campus to Corporate',
    guest: 'Placement Cell Panel',
    role: 'Career Development, JLU',
    duration: '38 min',
    episode: 'EP 02',
    date: 'Jan 29, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2024/01/smart-class-new.jpg',
    description: 'Industry leaders share what they look for in fresh graduates and how JLU prepares students for the corporate world.',
    topics: ['Placements', 'Career Growth', 'Industry Ready'],
  },
  {
    id: '3',
    title: 'Entrepreneurship at JLU',
    guest: 'Shri. Abhishek Mohan Gupta',
    role: 'Pro-Chancellor, JLU',
    duration: '52 min',
    episode: 'EP 03',
    date: 'Feb 12, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2024/01/abhishek-sir.jpg',
    description: 'The Pro-Chancellor shares his vision for fostering entrepreneurship and the incubation ecosystem at JLU.',
    topics: ['Startups', 'Incubation', 'Leadership'],
  },
  {
    id: '4',
    title: 'Research & Innovation',
    guest: 'Dr. Vivek Khare',
    role: 'Pro Vice Chancellor, JLU',
    duration: '41 min',
    episode: 'EP 04',
    date: 'Feb 26, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2024/04/de-vivek-khare.jpg',
    description: 'Discussing groundbreaking research initiatives, funded projects, and their real-world impact on society.',
    topics: ['Research', 'Patents', 'Impact'],
  },
  {
    id: '5',
    title: 'Global Partnerships',
    guest: 'International Office Team',
    role: 'International Relations, JLU',
    duration: '35 min',
    episode: 'EP 05',
    date: 'Mar 12, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2023/07/JLU-Partnership.jpg',
    description: 'How JLU\'s 150+ global partnerships open doors for students through exchange programs and joint research.',
    topics: ['Global Network', 'Exchange', 'Collaboration'],
  },
  {
    id: '6',
    title: 'Life Beyond Academics',
    guest: 'Student Club Leaders',
    role: 'Student Council, JLU',
    duration: '48 min',
    episode: 'EP 06',
    date: 'Mar 26, 2026',
    image: 'https://jlu.edu.in/wp-content/uploads/2025/01/sclubs.webp',
    description: 'Student leaders discuss campus culture, clubs, festivals, and the holistic development experience at JLU.',
    topics: ['Campus Life', 'Clubs', 'Culture'],
  },
];

const topics = [
  { name: 'Education & Vision', count: 12 },
  { name: 'Placements & Careers', count: 8 },
  { name: 'Research & Innovation', count: 10 },
  { name: 'Student Stories', count: 15 },
  { name: 'Campus Life', count: 7 },
  { name: 'Global Opportunities', count: 6 },
  { name: 'Leadership', count: 9 },
  { name: 'Alumni Success', count: 11 },
];


// ============================================
// MAIN PODCAST PAGE COMPONENT
// ============================================
export default function PodcastPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [hoveredEpisode, setHoveredEpisode] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP Scroll Animation for Hero Text
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const lines = textRef.current.querySelectorAll('.hero-text-line > span');
        gsap.set(lines, { y: '100%', willChange: 'transform' });

        lines.forEach((line, index) => {
          const startPercent = 95 - index * 5;
          const endPercent = 60 - index * 5;

          gsap.to(line, {
            y: '0%',
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: heroRef.current,
              start: `top ${startPercent}%`,
              end: `top ${Math.max(endPercent, 20)}%`,
              scrub: 0.5,
            },
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f7f0]" />;
  }

  return (
    <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image - JLU Event / Speaking Stage */}
        <div className="absolute inset-0">
          <Image
            src="https://jlu.edu.in/wp-content/uploads/2024/04/foundation-day-event-2024.webp"
            alt="JLU Foundation Day Event"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#21313c]/80" />
        </div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-8">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Waveform Decoration */}
        <div className="absolute bottom-32 md:bottom-40 right-0 w-full md:w-1/2 h-20 opacity-20 z-0">
          <svg viewBox="0 0 800 80" fill="none" className="w-full h-full">
            {Array.from({ length: 60 }).map((_, i) => (
              <rect
                key={i}
                x={i * 13 + 2}
                y={40 - Math.sin(i * 0.5) * 20 - Math.random() * 15}
                width="4"
                height={Math.sin(i * 0.5) * 40 + Math.random() * 30 + 5}
                rx="2"
                fill="#f0c14b"
              />
            ))}
          </svg>
        </div>

        {/* Top Left Content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-32 sm:pt-36 max-w-[95%] sm:px-6 sm:max-w-[90%] md:pl-10 md:pt-[180px] md:max-w-[1000px] md:pr-0 z-10"
        >
          {/* Podcast Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 bg-[#f0c14b] text-[#21313c] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#21313c] rounded-full animate-pulse" />
              JLU Talks
            </div>
            <span className="text-white/50 text-sm">Season 2 Now Live</span>
          </motion.div>

          <div ref={textRef}>
            <h3
              className="text-white/90"
              style={{
                fontFamily: 'Inter, Arial Black, sans-serif',
                fontWeight: 800,
                fontSize: isMobile ? '20px' : '32px',
                lineHeight: '1.3',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">Conversations that inspire, educate,</span>
              </span>
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">and connect minds across disciplines</span>
              </span>
              <span className="hero-text-line block overflow-hidden">
                <span className="inline-block">with JLU leaders and visionaries.</span>
              </span>
            </h3>
          </div>
        </motion.div>

        {/* Large "Podcast" Text - Bottom Left */}
        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[5rem] sm:text-[6rem] md:text-[clamp(7rem,14vw,14rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Podcast
          </motion.h1>
        </div>
      </section>

      {/* About the Show Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20">
            {/* Left - Host Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="relative w-full lg:w-[420px] shrink-0"
            >
              <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://jlu.edu.in/wp-content/uploads/2025/01/HMG-sir-AUAP-1.webp"
                  alt="JLU AUAP Conference Speaking"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f0c14b] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#21313c]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Hosted by JLU</p>
                      <p className="text-white/60 text-xs">Conversations that matter</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating stats pill - positioned below the image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-5 bg-[#21313c] text-white px-5 py-4 rounded-xl flex items-center justify-between shadow-xl"
              >
                <div className="text-center">
                  <p className="text-[#f0c14b] font-bold text-lg">50+</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">Episodes</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[#f0c14b] font-bold text-lg">100K+</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">Listeners</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[#f0c14b] font-bold text-lg">4.8</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">Rating</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - About Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              className="flex-1 flex flex-col justify-center pt-8 lg:pt-0"
            >
              <span className="text-[#999] uppercase tracking-widest block mb-4 text-[11px]" style={{ letterSpacing: '0.2em' }}>
                About the Show
              </span>
              <h2
                className="text-[#21313c] mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                JLU{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  Talks
                </span>
              </h2>
              <p className="text-[#666] text-base md:text-lg mb-8" style={{ lineHeight: 1.8 }}>
                JLU Talks is the official podcast of Jagran Lakecity University, bringing you candid conversations
                with university leaders, faculty experts, industry veterans, and inspiring alumni. Each episode
                explores the intersection of education, innovation, and real-world impact.
              </p>

              {/* Topics Tags */}
              <div className="mb-8">
                <p className="text-sm text-[#999] mb-3 font-medium">Popular Topics</p>
                <div className="flex flex-wrap gap-2">
                  {topics.slice(0, 6).map((topic) => (
                    <span
                      key={topic.name}
                      className="px-4 py-2 bg-[#f6f7f0] text-[#21313c] text-xs md:text-sm rounded-full border border-gray-100 hover:border-[#f0c14b] hover:bg-[#f0c14b]/10 transition-colors cursor-pointer"
                    >
                      {topic.name}
                      <span className="text-[#999] ml-1.5">({topic.count})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Listen Platforms */}
              <div className="flex flex-wrap gap-3">
                <a href="https://podcasts.apple.com/us/podcast/rj-ashna/id1506166037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#21313c] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2d4050] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Apple Podcasts
                </a>
                <a href="https://lakecityvoice.jlu.edu.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1DB954] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1aa34a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Lakecity Voice
                </a>
                <a href="https://jlu.edu.in/media-outlets/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-[#21313c] text-[#21313c] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#21313c] hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Media Outlets
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Episode Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-14"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 text-[11px]" style={{ letterSpacing: '0.2em' }}>
              Now Playing
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Featured{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                Episode
              </span>
            </h2>
          </motion.div>

          {/* Featured Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#21313c] rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-64 md:h-auto md:min-h-[400px]">
                <Image
                  src={podcasts[activeEpisode].image}
                  alt={podcasts[activeEpisode].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#21313c]/30 hidden md:block" />
                <div className="absolute top-4 left-4 bg-[#f0c14b] text-[#21313c] px-4 py-1.5 rounded-full text-sm font-bold">
                  {podcasts[activeEpisode].episode}
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                {/* Date */}
                <p className="text-white/40 text-sm mb-3">{podcasts[activeEpisode].date}</p>
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                  {podcasts[activeEpisode].title}
                </h3>
                <p className="text-[#f0c14b] font-medium mb-1">{podcasts[activeEpisode].guest}</p>
                <p className="text-white/50 text-sm mb-5">{podcasts[activeEpisode].role}</p>
                <p className="text-white/70 mb-6 md:mb-8 text-sm md:text-base" style={{ lineHeight: 1.7 }}>
                  {podcasts[activeEpisode].description}
                </p>

                {/* Topic Tags */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {podcasts[activeEpisode].topics.map((topic) => (
                    <span key={topic} className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Player Controls */}
                <div className="flex items-center gap-4">
                  <motion.button
                    className="w-14 h-14 bg-[#f0c14b] rounded-full flex items-center justify-center hover:bg-[#d4a93d] transition-colors shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-[#21313c] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                  <div className="flex-1">
                    {/* Waveform Progress */}
                    <div className="flex items-end gap-[2px] h-8 mb-1">
                      {Array.from({ length: 40 }).map((_, i) => {
                        const height = Math.sin(i * 0.4) * 60 + Math.random() * 30 + 15;
                        const isPlayed = i < 13;
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-full transition-colors"
                            style={{
                              height: `${height}%`,
                              backgroundColor: isPlayed ? '#f0c14b' : 'rgba(255,255,255,0.15)',
                              minWidth: '2px',
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40 text-xs">14:32</span>
                      <span className="text-white/40 text-xs">{podcasts[activeEpisode].duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Episodes Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14"
          >
            <div>
              <span className="text-[#999] uppercase tracking-widest block mb-4 text-[11px]" style={{ letterSpacing: '0.2em' }}>
                Browse
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                All{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  Episodes
                </span>
              </h2>
            </div>
            <p className="text-[#666] text-sm md:text-base max-w-md" style={{ lineHeight: 1.7 }}>
              From campus conversations to industry insights, explore our growing library of episodes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {podcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-[#f6f7f0] rounded-2xl overflow-hidden cursor-pointer group transition-all ${
                  activeEpisode === index ? 'ring-2 ring-[#f0c14b]' : 'hover:shadow-xl'
                }`}
                onClick={() => setActiveEpisode(index)}
                onMouseEnter={() => setHoveredEpisode(index)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                <div className="relative h-52 md:h-56 overflow-hidden">
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#f0c14b] text-[#21313c] px-3 py-1 rounded-full text-xs font-bold">
                    {podcast.episode}
                  </div>

                  {/* Play Button - appears on hover */}
                  <AnimatePresence>
                    {(hoveredEpisode === index || activeEpisode === index) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-[#21313c] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Now Playing indicator */}
                  {activeEpisode === index && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#21313c]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-[#f0c14b] rounded-full animate-pulse" />
                      Now Playing
                    </div>
                  )}
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#999] text-xs">{podcast.date}</span>
                    <span className="text-[#ddd]">|</span>
                    <span className="text-[#999] text-xs">{podcast.duration}</span>
                  </div>
                  <h3 className="text-[#21313c] font-semibold text-lg mb-2 group-hover:text-[#f0c14b] transition-colors" style={{ letterSpacing: '-0.01em' }}>
                    {podcast.title}
                  </h3>
                  <p className="text-[#666] text-sm mb-3">{podcast.guest} — {podcast.role}</p>

                  {/* Mini waveform */}
                  <div className="flex items-end gap-[1px] h-4">
                    {Array.from({ length: 25 }).map((_, i) => {
                      const h = Math.sin(i * 0.6 + index) * 50 + 30;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-full"
                          style={{
                            height: `${h}%`,
                            backgroundColor: activeEpisode === index ? '#f0c14b' : '#d1d5db',
                            minWidth: '2px',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery Strip */}
      <section className="py-0 overflow-hidden">
        <div className="flex gap-2 md:gap-3">
          {[
            'https://jlu.edu.in/wp-content/uploads/2024/01/smart-class-new.jpg',
            'https://jlu.edu.in/wp-content/uploads/2024/01/sports-infra.jpg',
            'https://jlu.edu.in/wp-content/uploads/2024/01/gym.jpg',
            'https://jlu.edu.in/wp-content/uploads/2023/06/gallery-16-free-img.jpg',
            'https://jlu.edu.in/wp-content/uploads/2024/01/hostelinfra.jpg',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative flex-1 h-32 md:h-48"
            >
              <Image
                src={src}
                alt={`JLU Campus ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#21313c]/20 hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#21313c]">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-16 bg-[#f0c14b] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#21313c]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
              </svg>
            </div>
            <h2
              className="text-white mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Never miss an{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                episode
              </span>
            </h2>
            <p className="text-white/60 mb-8 text-sm md:text-base" style={{ lineHeight: 1.7 }}>
              Subscribe to JLU Talks and get notified when new episodes drop. Available on all major podcast platforms.
            </p>

            {/* Email Subscribe */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#f0c14b] transition-colors text-sm"
              />
              <motion.button
                className="px-6 py-3.5 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full text-sm hover:bg-[#d4a93d] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>

            {/* Platform Links */}
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://podcasts.apple.com/us/podcast/rj-ashna/id1506166037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple Podcasts
              </a>
              <span className="text-white/20">|</span>
              <a href="https://lakecityvoice.jlu.edu.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Lakecity Voice
              </a>
              <span className="text-white/20">|</span>
              <a href="https://jlu.edu.in/media-outlets/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                </svg>
                Media Outlets
              </a>
              <span className="text-white/20">|</span>
              <a href="https://www.instagram.com/jlubhopal/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-text-line > span {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
