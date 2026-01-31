'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

const pastEventsImages = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', // Convocation
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', // Science Expo
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', // Sports Meet
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', // Cultural Fest
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', // Tech Summit
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', // Alumni Meet
];

const pastEventsData = [
  {
    id: 1,
    year: '2025',
    title: 'Convocation 2025',
    description: 'Celebrating 2,500 graduates across 40 disciplines.',
  },
  {
    id: 2,
    year: '2024',
    title: 'Science Expo',
    description: 'Over 200 student projects showcased to industry leaders.',
  },
  {
    id: 3,
    year: '2024',
    title: 'Sports Meet',
    description: 'A display of true athleticism and competitive spirit.',
  },
  {
    id: 4,
    year: '2024',
    title: 'Cultural Fest',
    description: 'Three days of music, dance, and artistic expression.',
  },
  {
    id: 5,
    year: '2023',
    title: 'Tech Summit',
    description: 'Industry experts shared insights on emerging technologies.',
  },
  {
    id: 6,
    year: '2023',
    title: 'Alumni Meet',
    description: 'Reconnecting generations of JLU graduates.',
  },
];

const NewsAndEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3;
  const maxSlide = Math.max(0, pastEventsData.length - cardsPerView);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
  };
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
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80"
              alt="News & Events"
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
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            STAY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>connected</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Stay updated with the latest news, announcements, and events happening at Jagran Lakecity University.
          </p>
        </motion.div>

        {/* Large "News & Events" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
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
              fontSize: 'clamp(6rem, 12vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            News & Events
          </motion.h1>
        </div>
      </div>

      {/* What's happening on campus Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Events Calendar
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              What&apos;s happening{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                on campus
              </span>
            </h2>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <label className="block text-sm text-[#999] mb-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>Keyword</label>
              <input
                type="text"
                placeholder="Enter keyword"
                className="w-full border-b-2 border-[#21313c]/20 bg-transparent py-3 text-[#21313c] placeholder-[#999] focus:outline-none focus:border-[#21313c] transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#999] mb-2 uppercase tracking-wider" style={{ fontSize: '11px' }}>Year</label>
              <select className="w-full border-b-2 border-[#21313c]/20 bg-transparent py-3 text-[#21313c] focus:outline-none focus:border-[#21313c] appearance-none cursor-pointer transition-colors">
                <option value="-Any-">-Any-</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <motion.button
              className="px-8 py-3 bg-[#21313c] text-white font-medium rounded-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>

          {/* Events and Calendar */}
          <div className="flex flex-col lg:flex-row justify-between" style={{ gap: '60px' }}>
            {/* Left - Events List */}
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Event 1 */}
              <motion.div
                variants={staggerItem}
                className="group cursor-pointer py-8 border-b border-[#21313c]/10 hover:border-[#21313c]/30 transition-colors"
              >
                <div className="flex items-start gap-8">
                  <div className="text-center" style={{ minWidth: '80px' }}>
                    <p className="text-[#f0c14b] leading-none" style={{ fontSize: '48px', fontWeight: 700 }}>15</p>
                    <p className="text-[#21313c] uppercase tracking-wider" style={{ fontSize: '14px', fontWeight: 500 }}>JAN</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#999] mb-2" style={{ fontSize: '14px' }}>
                      Jagran Lakecity University SEH, Bhopal
                    </p>
                    <h4
                      className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors"
                      style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3 }}
                    >
                      Global Alumni Networking Summit
                    </h4>
                  </div>
                  <motion.span
                    className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>

              {/* Event 2 */}
              <motion.div
                variants={staggerItem}
                className="group cursor-pointer py-8 border-b border-[#21313c]/10 hover:border-[#21313c]/30 transition-colors"
              >
                <div className="flex items-start gap-8">
                  <div className="text-center" style={{ minWidth: '80px' }}>
                    <p className="text-[#f0c14b] leading-none" style={{ fontSize: '48px', fontWeight: 700 }}>22</p>
                    <p className="text-[#21313c] uppercase tracking-wider" style={{ fontSize: '14px', fontWeight: 500 }}>JAN</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#999] mb-2" style={{ fontSize: '14px' }}>
                      Jagran Lakecity University SEH, Bhopal
                    </p>
                    <h4
                      className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors"
                      style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3 }}
                    >
                      Annual Winter Cultural Fest &apos;Aura&apos;
                    </h4>
                  </div>
                  <motion.span
                    className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>

              {/* Event 3 */}
              <motion.div
                variants={staggerItem}
                className="group cursor-pointer py-8 border-b border-[#21313c]/10 hover:border-[#21313c]/30 transition-colors"
              >
                <div className="flex items-start gap-8">
                  <div className="text-center" style={{ minWidth: '80px' }}>
                    <p className="text-[#f0c14b] leading-none" style={{ fontSize: '48px', fontWeight: 700 }}>05</p>
                    <p className="text-[#21313c] uppercase tracking-wider" style={{ fontSize: '14px', fontWeight: 500 }}>FEB</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#999] mb-2" style={{ fontSize: '14px' }}>
                      Jagran Lakecity University SEH, Bhopal
                    </p>
                    <h4
                      className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors"
                      style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3 }}
                    >
                      Workshop on Quantum Computing
                    </h4>
                  </div>
                  <motion.span
                    className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>

              {/* View all link */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-3 mt-10 text-[#21313c] font-medium group"
                whileHover={{ x: 5 }}
              >
                View all upcoming events
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </motion.a>
            </motion.div>

            {/* Right - Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <div
                className="bg-[#21313c] flex flex-col"
                style={{ width: '480px', height: '520px', borderRadius: '16px' }}
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                  <p className="text-lg font-semibold text-white">January 2026</p>
                  <div className="flex gap-2">
                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ←
                    </motion.button>
                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      →
                    </motion.button>
                  </div>
                </div>
                {/* Calendar Placeholder */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-3xl font-medium text-white/50">Calendar</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Highlights from past events Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <motion.div
            className="flex items-end justify-between mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Archive
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Highlights from{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  past events
                </span>
              </h2>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="w-14 h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={currentSlide >= maxSlide}
                className="w-14 h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </motion.button>
            </div>
          </motion.div>

          {/* Cards Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              style={{
                transform: `translateX(-${currentSlide * (400 + 32)}px)`,
                gap: '32px',
              }}
              animate={{ x: -currentSlide * (400 + 32) }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              {pastEventsData.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="shrink-0 group cursor-pointer"
                  style={{ width: '400px' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: customEase }}
                  viewport={{ once: true }}
                >
                  {/* Card Image */}
                  <motion.div
                    className="relative overflow-hidden"
                    style={{ width: '400px', height: '500px', borderRadius: '16px' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: customEase }}
                    >
                      <Image
                        src={pastEventsImages[index]}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-6 left-6 bg-[#f0c14b] px-4 py-2 text-sm font-semibold text-[#21313c] z-10">
                      {event.year}
                    </span>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                    </div>
                  </motion.div>
                  {/* Card Content */}
                  <div className="mt-6">
                    <p className="text-[#666] mb-4" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                      {event.description}
                    </p>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] font-medium group-hover:text-[#f0c14b] transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      View Archive <span>→</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Campus in moments Section */}
      <div className="w-full bg-white">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ maxWidth: '1440px', height: '1000px' }}
        >
        {/* Card 1 - Top Left - Students Studying */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '403px', height: '238px', top: '0px', left: '188px', borderRadius: '16px' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
              alt="Students collaborating"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 2 - Top Center - Graduation */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '308px', height: '325px', top: '0px', left: '753px', borderRadius: '16px' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
              alt="Graduation ceremony"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 3 - Top Right (partially cut) - Campus Architecture */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '193px', height: '193px', top: '-50px', left: '1284px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
              alt="Campus building"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 4 - Middle Right - Lab Work */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '215px', height: '215px', top: '302px', left: '1154px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80"
              alt="Students in lab"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 5 - Middle Left - Cultural Event */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '267px', height: '325px', top: '308px', left: '0px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"
              alt="Cultural performance"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 6 - Bottom Left (partially cut) - Sports */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '212px', height: '175px', top: '750px', left: '-56px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
              alt="Sports activity"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 7 - Bottom Center Left - Library */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '214px', height: '325px', top: '675px', left: '319px', borderRadius: '16px' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
              alt="Library"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 8 - Bottom Center - Campus Garden */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '399px', height: '210px', top: '790px', left: '627px', borderRadius: '16px' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
              alt="Campus grounds"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
        {/* Card 9 - Bottom Right - Student Life */}
        <motion.div
          className="absolute overflow-hidden cursor-pointer group"
          style={{ width: '286px', height: '343px', top: '601px', left: '1154px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
              alt="Students socializing"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#21313c] mb-4"
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Campus Gallery:{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              A Living
            </span>
            <br />
            Learning Environment
          </motion.h2>
          <motion.p
            className="text-xl text-[#666] mb-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Experience the vibrant life, learning, and celebrations at JLU campus.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#21313c] text-white font-semibold rounded-full hover:bg-[#1a3a3a] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Gallery
            <span>→</span>
          </motion.a>
        </div>
        </div>
      </div>

      {/* Media resources Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto flex flex-col lg:flex-row justify-between gap-12"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
        {/* Left Side - Media Resources */}
        <motion.div
          className="flex-1"
          style={{ maxWidth: '500px' }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <span
            className="text-[#999] uppercase tracking-widest block mb-6"
            style={{ fontSize: '12px', letterSpacing: '0.2em' }}
          >
            Downloads
          </span>
          <h2
            className="text-[#21313c] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Media{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              resources
            </span>
          </h2>
          <p className="text-[#666] mb-12" style={{ fontSize: '16px', lineHeight: 1.8 }}>
            Official resources and assets for journalists, institutional partners, and media outlets covering university activities.
          </p>

          {/* Download Items */}
          <motion.div
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Item 1 - University Logo Pack */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-6 py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">University Logo Pack</h3>
                <p className="text-sm text-[#999]">PNG, SVG, EPS (45MB)</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>

            {/* Item 2 - Brand Guidelines */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-6 py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">Brand Guidelines</h3>
                <p className="text-sm text-[#999]">PDF (12MB)</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>

            {/* Item 3 - Leadership Photos */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-6 py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">Leadership Photos</h3>
                <p className="text-sm text-[#999]">High-Res Gallery</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side - Press Inquiries Card */}
        <motion.div
          className="bg-[#21313c] flex flex-col justify-center"
          style={{ width: '480px', padding: '48px', borderRadius: '16px' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <span
            className="text-[#f0c14b] uppercase tracking-widest block mb-6"
            style={{ fontSize: '12px', letterSpacing: '0.2em' }}
          >
            Press Inquiries
          </span>
          <h3
            className="text-white mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Get in touch with our{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              communications
            </span>{' '}
            team
          </h3>
          <p className="text-white/70 mb-10" style={{ fontSize: '15px', lineHeight: 1.8 }}>
            For urgent media requests, interview coordination, or campus filming permissions, please contact our office directly.
          </p>
          <div className="flex flex-col gap-4">
            <motion.button
              className="w-full py-4 bg-[#f0c14b] text-[#21313c] font-semibold rounded-full hover:bg-[#e5b63e] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Media Kit
            </motion.button>
            <motion.button
              className="w-full py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#21313c] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Communications
            </motion.button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export { NewsAndEvents };
export default NewsAndEvents;
