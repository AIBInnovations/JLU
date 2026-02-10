'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Header, Footer } from '@/components';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DATA
// ============================================

const podcasts = [
  {
    id: '1',
    title: 'The Future of Education',
    guest: 'Dr. Akhilesh Tiwari',
    role: 'Vice Chancellor, JLU',
    duration: '45 min',
    episode: 'EP 01',
    image: '/posthero1.jpg',
    description: 'Exploring how technology and innovation are reshaping higher education in India.',
  },
  {
    id: '2',
    title: 'From Campus to Corporate',
    guest: 'Rajesh Kumar',
    role: 'HR Director, Infosys',
    duration: '38 min',
    episode: 'EP 02',
    image: '/posthero2.jpg',
    description: 'Industry leaders share what they look for in fresh graduates and career success tips.',
  },
  {
    id: '3',
    title: 'Entrepreneurship Journey',
    guest: 'Priya Sharma',
    role: 'Founder, TechStartup Inc.',
    duration: '52 min',
    episode: 'EP 03',
    image: '/posthero3.jpg',
    description: 'A JLU alumna shares her inspiring journey from student to successful entrepreneur.',
  },
  {
    id: '4',
    title: 'Research & Innovation',
    guest: 'Dr. Meera Patel',
    role: 'Dean of Research, JLU',
    duration: '41 min',
    episode: 'EP 04',
    image: '/j1.jpg',
    description: 'Discussing groundbreaking research initiatives and their real-world impact.',
  },
  {
    id: '5',
    title: 'Global Opportunities',
    guest: 'Michael Chen',
    role: 'International Relations Head',
    duration: '35 min',
    episode: 'EP 05',
    image: '/j2.jpg',
    description: 'How JLU students can leverage international partnerships for global careers.',
  },
  {
    id: '6',
    title: 'Women in Leadership',
    guest: 'Dr. Anita Verma',
    role: 'Director, Women Cell',
    duration: '48 min',
    episode: 'EP 06',
    image: '/j3.jpg',
    description: 'Empowering women through education and breaking barriers in professional spaces.',
  },
];

const stats = [
  { value: '50+', label: 'Episodes' },
  { value: '100K+', label: 'Listeners' },
  { value: '25+', label: 'Industry Guests' },
  { value: '4.8', label: 'Rating' },
];

// ============================================
// MAIN PODCAST PAGE COMPONENT
// ============================================
export default function PodcastPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(0);
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
      {/* Fixed Header */}
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/posthero1.jpg"
            alt="Podcast Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#21313c]/70" />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Top Left Content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 px-4 pt-32 sm:pt-36 max-w-[95%] sm:px-6 sm:max-w-[90%] md:pl-10 md:pt-[180px] md:max-w-[1000px] md:pr-0 z-10"
        >
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
                <span className="inline-block">with industry leaders and visionaries.</span>
              </span>
            </h3>
          </div>
        </motion.div>

        {/* Large "Podcast" Text - Bottom Left */}
        <div className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Featured Episode Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-[#efc04b] tracking-wider uppercase mb-4 block">
              Now Playing
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Featured{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
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
              <div className="md:w-2/5 relative">
                <img
                  src={podcasts[activeEpisode].image}
                  alt={podcasts[activeEpisode].title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#efc04b] text-[#21313c] px-4 py-1.5 rounded-full text-sm font-bold">
                  {podcasts[activeEpisode].episode}
                </div>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                  {podcasts[activeEpisode].title}
                </h3>
                <p className="text-[#efc04b] font-medium mb-1">{podcasts[activeEpisode].guest}</p>
                <p className="text-white/60 text-sm mb-4">{podcasts[activeEpisode].role}</p>
                <p className="text-white/80 mb-6">{podcasts[activeEpisode].description}</p>
                <div className="flex items-center gap-4">
                  <button className="w-14 h-14 bg-[#efc04b] rounded-full flex items-center justify-center hover:bg-[#d4a93d] transition-colors">
                    <svg className="w-6 h-6 text-[#21313c] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="h-1 bg-white/20 rounded-full">
                      <div className="h-full w-1/3 bg-[#efc04b] rounded-full" />
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">{podcasts[activeEpisode].duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Episodes Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-sm font-medium text-[#efc04b] tracking-wider uppercase mb-4 block">
                Browse
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold text-[#21313c]"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                All{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                  Episodes
                </span>
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
                  activeEpisode === index ? 'ring-2 ring-[#efc04b]' : ''
                }`}
                onClick={() => setActiveEpisode(index)}
              >
                <div className="relative">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#efc04b] text-[#21313c] px-3 py-1 rounded-full text-sm font-bold">
                    {podcast.episode}
                  </div>
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-[#21313c]/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-[#21313c] font-semibold text-lg mb-1 group-hover:text-[#efc04b] transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-[#666] text-sm mb-2">{podcast.guest}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#999] text-sm">{podcast.duration}</span>
                    {activeEpisode === index && (
                      <span className="text-[#efc04b] text-sm font-medium">Now Playing</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-[#21313c]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#efc04b] block mb-2">
                  {stat.value}
                </span>
                <span className="text-white/70 text-sm md:text-base">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#f6f7f0]">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#21313c] mb-4"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Subscribe to{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#efc04b' }}>
                JLU Talks
              </span>
            </h2>
            <p className="text-[#666] mb-8">
              Get notified when new episodes drop. Available on all major podcast platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-[#21313c] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a3f4c] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple Podcasts
              </a>
              <a href="#" className="bg-[#1DB954] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1aa34a] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
              <a href="#" className="border-2 border-[#21313c] text-[#21313c] px-6 py-3 rounded-xl font-semibold hover:bg-[#21313c] hover:text-white transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
