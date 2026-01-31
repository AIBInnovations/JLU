'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const infrastructureItems = [
  { id: 1, label: 'Academic Blocks' },
  { id: 2, label: 'Studios & Labs' },
  { id: 3, label: 'Library & Learning Spaces' },
  { id: 4, label: 'Indoor Multipurpose Hall' },
];

const Campus = () => {
  const [activeInfrastructure, setActiveInfrastructure] = useState(1);
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
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
              alt="Campus"
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
            WHERE <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>learning</span> LIVES
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Life at our campus goes beyond classrooms and lectures. It is a vibrant ecosystem where academic excellence, creativity, collaboration, and community life come together.
          </p>
        </motion.div>

        {/* Large "Campus" Text - Bottom Left */}
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
              fontSize: 'clamp(8rem, 16vw, 16rem)',
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

      {/* Campus Infrastructure Section - Awwwards Style */}
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
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Facilities
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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
            <p
              className="text-[#666]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
              }}
            >
              Our campus is a masterwork of modern design, featuring state-of-the-art facilities that foster innovation and collaboration.
            </p>
          </motion.div>

          <div className="flex justify-between" style={{ gap: '80px' }}>
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ maxWidth: '480px', paddingTop: '40px' }}
            >
              <h3
                className="text-[#21313c] mb-6"
                style={{
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Architectural Excellence<br />for Future Leaders
              </h3>
              <p
                className="text-[#666] mb-12"
                style={{ fontSize: '16px', lineHeight: 1.8 }}
              >
                Every space is designed with intention — to inspire learning, encourage collaboration, and support growth.
              </p>

              {/* Infrastructure Items */}
              <div className="flex flex-col">
                {infrastructureItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveInfrastructure(item.id)}
                    className={`group flex items-center justify-between py-6 border-b border-[#e5e5e5] text-left transition-colors ${
                      activeInfrastructure === item.id ? 'bg-[#f6f7f0] -mx-6 px-6' : ''
                    }`}
                  >
                    <span className="flex items-center gap-6">
                      <span
                        className={`font-medium transition-colors ${
                          activeInfrastructure === item.id ? 'text-[#f0c14b]' : 'text-[#ccc]'
                        }`}
                        style={{ fontSize: '14px', minWidth: '30px' }}
                      >
                        {String(item.id).padStart(2, '0')}
                      </span>
                      <span
                        className={`transition-colors ${
                          activeInfrastructure === item.id ? 'text-[#21313c]' : 'text-[#666] group-hover:text-[#21313c]'
                        }`}
                        style={{ fontSize: '18px', fontWeight: activeInfrastructure === item.id ? 600 : 400 }}
                      >
                        {item.label}
                      </span>
                    </span>
                    <motion.span
                      animate={{ x: activeInfrastructure === item.id ? 0 : -10, opacity: activeInfrastructure === item.id ? 1 : 0 }}
                      className="text-[#21313c]"
                      style={{ fontSize: '20px' }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden"
              style={{ width: '580px', height: '650px' }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                  alt="Campus Infrastructure"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Overlay Badge */}
              <div
                className="absolute bottom-8 left-8 bg-white px-6 py-4"
                style={{ maxWidth: '280px' }}
              >
                <span className="text-[#999] uppercase tracking-wider block mb-2" style={{ fontSize: '11px' }}>
                  Featured
                </span>
                <span className="text-[#21313c] font-semibold" style={{ fontSize: '16px' }}>
                  {infrastructureItems.find(i => i.id === activeInfrastructure)?.label}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Residences & Dining Section - Awwwards Style */}
      <div className="w-full bg-[#21313c]">
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
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Living & Dining
            </span>
            <div className="flex justify-between items-end">
              <h2
                className="text-white"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                More than a room,<br />
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  a place to belong
                </span>
              </h2>
              <p
                className="text-[#999]"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  maxWidth: '350px',
                }}
              >
                Experience vibrant campus life where comfort meets community.
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Student Accommodation Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-8" style={{ height: '480px' }}>
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80"
                    alt="Student Accommodation"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <div
                  className="absolute top-6 left-6 w-12 h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                >
                  <span className="text-[#21313c] font-semibold" style={{ fontSize: '14px' }}>01</span>
                </div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-white font-semibold mb-2" style={{ fontSize: '24px' }}>
                    Student Accommodation
                  </h4>
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span style={{ fontSize: '14px' }}>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
              <p
                className="text-[#ccc] mb-6"
                style={{ fontSize: '16px', lineHeight: 1.7 }}
              >
                Modern living spaces tailored for academic success and personal growth. From private studios to shared apartments.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Safety & Security', 'Comfortable Living', 'Community Spaces'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 border border-[#3a4a55] text-[#999] text-xs uppercase tracking-wider"
                    style={{ borderRadius: '100px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Dining & Nutrition Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              style={{ marginTop: '80px' }}
            >
              <div className="relative overflow-hidden mb-8" style={{ height: '480px' }}>
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80"
                    alt="Dining & Nutrition"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <div
                  className="absolute top-6 left-6 w-12 h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                >
                  <span className="text-[#21313c] font-semibold" style={{ fontSize: '14px' }}>02</span>
                </div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-white font-semibold mb-2" style={{ fontSize: '24px' }}>
                    Dining & Nutrition
                  </h4>
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span style={{ fontSize: '14px' }}>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
              <p
                className="text-[#ccc] mb-6"
                style={{ fontSize: '16px', lineHeight: 1.7 }}
              >
                Global flavors and healthy choices served daily. Our dining halls are social hubs where ideas are shared.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Diverse Cuisine', 'Hygienic Kitchens', 'Social Spaces'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 border border-[#3a4a55] text-[#999] text-xs uppercase tracking-wider"
                    style={{ borderRadius: '100px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sports & Wellness Section - Awwwards Style */}
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
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-start mb-20"
          >
            <div style={{ maxWidth: '600px' }}>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Health & Fitness
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Cultivating{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  balance
                </span>
              </h2>
            </div>
            <div
              className="text-[#666] pt-8"
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                maxWidth: '380px',
              }}
            >
              Physical wellbeing is integral to academic success. Our sports programs foster teamwork and promote a lifelong commitment to health.
            </div>
          </motion.div>

          {/* Sports Cards - Bento Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Card - Outdoor Sports (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden" style={{ height: '580px' }}>
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80"
                    alt="Outdoor Sports Facilities"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-10">
                  <span
                    className="text-white/60 uppercase tracking-widest"
                    style={{ fontSize: '11px', letterSpacing: '0.2em' }}
                  >
                    Key Facility
                  </span>
                  <div>
                    <h4
                      className="text-white mb-4"
                      style={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.2 }}
                    >
                      Outdoor Sports<br />Facilities
                    </h4>
                    <p className="text-white/80 mb-6" style={{ fontSize: '15px', lineHeight: 1.7, maxWidth: '400px' }}>
                      International-standard grounds for football, cricket, athletics, and more. Train where champions are made.
                    </p>
                    <div className="flex items-center gap-3 text-white">
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>Explore Facilities</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="col-span-5 flex flex-col gap-6">
              {/* Fitness Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden" style={{ height: '280px' }}>
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
                      alt="Fitness & Wellness Areas"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-white font-semibold mb-2" style={{ fontSize: '22px' }}>
                      Fitness & Wellness Areas
                    </h4>
                    <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span style={{ fontSize: '14px' }}>View Details</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Indoor Sports Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden" style={{ height: '280px' }}>
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1200&q=80"
                      alt="Indoor Sports Complex"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h4 className="text-white font-semibold mb-2" style={{ fontSize: '22px' }}>
                      Indoor Sports Complex
                    </h4>
                    <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span style={{ fontSize: '14px' }}>View Details</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Stats & Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-[#d1d1d1] flex justify-between items-center"
          >
            <div className="flex gap-16">
              {[
                { value: '15+', label: 'Sports Facilities' },
                { value: '20+', label: 'Sports Programs' },
                { value: '5', label: 'Playing Fields' },
              ].map((stat, index) => (
                <div key={index}>
                  <span
                    className="text-[#21313c] block mb-1"
                    style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[#666] uppercase tracking-wider"
                    style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="px-8 py-3 border border-[#21313c] text-[#21313c] text-sm font-medium hover:bg-[#21313c] hover:text-white transition-colors flex items-center gap-3"
              style={{ borderRadius: '100px' }}
            >
              View All Facilities
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Campus Gallery Section */}
      <div className="w-full bg-white" style={{ paddingBottom: '100px' }}>
        <div
          className="relative mx-auto"
          style={{ maxWidth: '1440px', height: '900px', marginTop: '60px' }}
        >
          {/* Card 1 - Top Left - Aerial View */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '380px', height: '220px', top: '40px', left: '120px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2025/01/arialview.webp"
              alt="JLU Campus Aerial View"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 2 - Top Center Right - Smart Classroom */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '280px', height: '300px', top: '20px', left: '700px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2024/01/smart-class-new.jpg"
              alt="JLU Smart Classroom"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 3 - Top Right - Hostel */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '180px', height: '180px', top: '60px', left: '1100px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2024/01/hostelinfra.jpg"
              alt="JLU Hostel"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 4 - Middle Right - Gymnasium */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '200px', height: '200px', top: '320px', left: '1080px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2024/01/gym.jpg"
              alt="JLU Gymnasium"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 5 - Middle Left - Student Clubs */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '250px', height: '300px', top: '300px', left: '60px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2025/01/sclubs.webp"
              alt="JLU Student Clubs"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 6 - Bottom Left - Sports Infrastructure */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '200px', height: '160px', top: '680px', left: '100px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2024/01/sports-infra.jpg"
              alt="JLU Sports Infrastructure"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 7 - Bottom Center Left - Faculties */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '200px', height: '280px', top: '580px', left: '380px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2025/02/faculties-at-jlu.webp"
              alt="JLU Faculties"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 8 - Bottom Center Right - Main Campus */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '360px', height: '180px', top: '700px', left: '680px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2023/10/slider-1-29.jpg"
              alt="JLU Main Campus"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Card 9 - Bottom Right - Campus Gallery */}
          <div
            className="absolute overflow-hidden rounded-lg"
            style={{ width: '260px', height: '300px', top: '560px', left: '1080px' }}
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2023/06/gallery-16-free-img.jpg"
              alt="JLU Campus Gallery"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <h2
              className="text-[#21313c] mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Campus Gallery: A Living<br />Learning Environment
            </h2>
            <a
              href="#"
              className="pointer-events-auto px-8 py-3 border border-[#21313c] text-[#21313c] text-sm font-medium hover:bg-[#21313c] hover:text-white transition-colors flex items-center gap-3"
              style={{ borderRadius: '100px' }}
            >
              Explore Gallery
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Campus };
export default Campus;
