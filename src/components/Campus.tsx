'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const infrastructureItems = [
  { id: 1, label: 'University Campus', description: 'A thoughtfully planned campus that supports academic focus and student life.' },
  { id: 2, label: 'Student Accommodation', description: 'Comfortable residential spaces designed for safety, community, and everyday living.' },
  { id: 3, label: 'Dining Facilities', description: 'Multiple dining options that cater to diverse tastes and daily needs.' },
];

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

const Campus = () => {
  const [activeInfrastructure, setActiveInfrastructure] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
              alt="Campus"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            WHERE <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>learning</span> LIVES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            Life at our campus goes beyond classrooms and lectures. It is a vibrant ecosystem where academic excellence, creativity, collaboration, and community life come together.
          </motion.p>
        </motion.div>

        {/* Large "Campus" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-0 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
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
            Campus
          </motion.h1>
        </div>
      </div>

      {/* Campus Infrastructure Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-20 gap-4 md:gap-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Facilities
              </motion.span>
              <h2
                className="text-[#21313c] text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Built for{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  excellence
                </span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#666] text-sm md:text-base md:max-w-[400px]"
              style={{
                lineHeight: 1.7,
              }}
            >
              Our campus is a masterwork of modern design, featuring state-of-the-art facilities that foster innovation and collaboration.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-20">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="w-full md:max-w-[480px] pt-0 md:pt-10"
            >

              {/* Infrastructure Items */}
              <motion.div
                className="flex flex-col"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {infrastructureItems.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={staggerItem}
                    onClick={() => setActiveInfrastructure(item.id)}
                    className={`group flex items-center justify-between py-6 border-b border-[#e5e5e5] text-left transition-all duration-500 ${
                      activeInfrastructure === item.id ? 'bg-[#f6f7f0] -mx-6 px-6' : ''
                    }`}
                    whileHover={{ x: activeInfrastructure === item.id ? 0 : 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="flex items-center gap-3 md:gap-6">
                      <span
                        className={`font-medium transition-colors duration-300 text-xs md:text-sm ${
                          activeInfrastructure === item.id ? 'text-[#f0c14b]' : 'text-[#ccc]'
                        }`}
                        style={{ minWidth: '24px' }}
                      >
                        {String(item.id).padStart(2, '0')}
                      </span>
                      <span
                        className={`transition-all duration-300 text-sm md:text-lg ${
                          activeInfrastructure === item.id ? 'text-[#21313c]' : 'text-[#666] group-hover:text-[#21313c]'
                        }`}
                        style={{ fontWeight: activeInfrastructure === item.id ? 600 : 400 }}
                      >
                        {item.label}
                      </span>
                    </span>
                    <motion.span
                      animate={{ x: activeInfrastructure === item.id ? 0 : -10, opacity: activeInfrastructure === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#21313c]"
                      style={{ fontSize: '20px' }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden w-full h-[300px] sm:h-[400px] md:w-[580px] md:h-[650px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInfrastructure}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="absolute inset-0"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                    alt="Campus Infrastructure"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white px-4 py-3 md:px-6 md:py-4 max-w-[200px] md:max-w-[280px]"
              >
                <span className="text-[#999] uppercase tracking-wider block mb-1 md:mb-2 text-[9px] md:text-[11px]">
                  Featured
                </span>
                <span className="text-[#21313c] font-semibold text-sm md:text-base">
                  {infrastructureItems.find(i => i.id === activeInfrastructure)?.label}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Academic Infrastructure Section */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true }}
            className="mb-8 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
              style={{ letterSpacing: '0.2em' }}
            >
              Academic Infrastructure
            </motion.span>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            {/* Gurudev Gupta Media Studio Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80"
                    alt="Gurudev Gupta Media Studio"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">01</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Gurudev Gupta Media Studio
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                A professional studio environment for media production and hands on learning.
              </motion.p>
            </motion.div>

            {/* M S Gill Culinary Studios Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
              viewport={{ once: true }}
              className="group cursor-pointer mt-8 sm:mt-12 md:mt-20"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
                    alt="M S Gill Culinary Studios"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">02</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    M S Gill Culinary Studios
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                Industry standard kitchens designed for hospitality and culinary training.
              </motion.p>
            </motion.div>

            {/* Technology Labs Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80"
                    alt="Technology Labs"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">03</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Technology Labs
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                Well equipped labs supporting engineering, computing, and applied sciences.
              </motion.p>
            </motion.div>

            {/* Shri Cyril Shroff Moot Court Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
              viewport={{ once: true }}
              className="group cursor-pointer mt-8 sm:mt-12 md:mt-20"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
                    alt="Shri Cyril Shroff Moot Court"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">04</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Shri Cyril Shroff Moot Court
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                A dedicated space for legal practice, debates, and mock trials.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sports & Wellness Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <h2
              className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                lineHeight: '100%',
              }}
            >
              Sports & Wellness
            </h2>
            <p
              className="text-[#21313c] text-xl sm:text-2xl md:text-[40px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '120%',
              }}
            >
              Cultivating balance, Fueling excellence
            </p>
          </motion.div>

          {/* Sports Cards - Bento Grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            {/* Left Card - Sports Facilities (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden h-[250px] sm:h-[400px] md:h-[580px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80"
                    alt="Sports Facilities"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 md:p-10">
                  <div />
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-white mb-1 sm:mb-2 md:mb-4 text-sm sm:text-xl md:text-[32px]"
                      style={{ fontWeight: 600, lineHeight: 1.2 }}
                    >
                      Sports Facilities
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-white/80 mb-2 sm:mb-4 md:mb-6 text-[10px] sm:text-sm md:text-[15px] max-w-[400px] hidden sm:block"
                      style={{ lineHeight: 1.7 }}
                    >
                      Facilities that encourage physical fitness, teamwork, and competitive spirit.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="col-span-5 flex flex-col gap-3 md:gap-6">
              {/* The Pyramid, University Library Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80"
                      alt="The Pyramid, University Library"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-base md:text-[22px]">
                      The Pyramid, University Library
                    </h4>
                    <p className="text-white/80 text-[8px] sm:text-xs md:text-sm hidden sm:block" style={{ lineHeight: 1.6 }}>
                      A central space for study, research, and reflection.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Indoor Multipurpose Hall Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1200&q=80"
                      alt="Indoor Multipurpose Hall"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-base md:text-[22px]">
                      Indoor Multipurpose Hall
                    </h4>
                    <p className="text-white/80 text-[8px] sm:text-xs md:text-sm hidden sm:block" style={{ lineHeight: 1.6 }}>
                      A flexible venue for sports, events, and campus activities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Gallery Section */}
      <div className="w-full bg-white pb-12 md:pb-[120px]">
        {/* Scattered Layout - Works on both mobile and desktop */}
        <div
          className="relative mx-auto overflow-hidden h-[500px] sm:h-[700px] md:h-[1000px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Card 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '24%', top: '0%', left: '13%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
              alt="Students in library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 2 - Top Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '21%', height: '32%', top: '0%', left: '52%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
              alt="Event hall"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 3 - Top Right (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '13%', height: '19%', top: '-5%', left: '89%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
              alt="Campus building"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 4 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '22%', top: '30%', left: '80%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80"
              alt="Lab equipment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 5 - Middle Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '19%', height: '32%', top: '31%', left: '0%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80"
              alt="Campus event"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 6 - Bottom Right Upper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '20%', height: '34%', top: '60%', left: '80%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
              alt="Students together"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 7 - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '21%', top: '79%', left: '44%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
              alt="Graduation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 8 - Bottom Center Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '32%', top: '68%', left: '22%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
              alt="Library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 9 - Bottom Left (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '18%', top: '75%', left: '-4%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
              alt="Sports"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#21313c] mb-2 md:mb-4 text-lg sm:text-2xl md:text-[clamp(2rem,4vw,3rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Campus Gallery:{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#8b4513' }}>
                A Living
              </span>
              <br />
              Learning Environment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#666] mb-4 md:mb-8 text-xs sm:text-sm md:text-lg max-w-[250px] sm:max-w-[300px] md:max-w-[400px]"
              style={{ lineHeight: 1.7 }}
            >
              Experience the vibrant life, learning, and celebrations at JLU campus.
            </motion.p>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
              viewport={{ once: true }}
              className="pointer-events-auto px-5 py-2.5 md:px-8 md:py-4 bg-[#21313c] text-white font-medium flex items-center gap-2 md:gap-3 text-xs md:text-base"
              style={{ borderRadius: '100px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Gallery
              <span>→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Campus };
export default Campus;
