'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const eventsData = [
  {
    id: 1,
    date: '17 September 2025',
    title: 'Pinning Ceremony',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'Pinning Ceremony Pinning of the new student council members 2025',
    venue: 'A-block Auditorium',
  },
  {
    id: 2,
    date: '12 September 2025',
    title: 'Inter School Debate Competition',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'Inter School Debate Competition MUN & Debating society presents a platform for young orators.',
    venue: '',
  },
  {
    id: 3,
    date: '22 July 2025',
    title: 'Ignited Mind Awards 2025',
    organization: 'Jagran Lakecity University',
    location: 'Jagran Lakecity University SEH, Bhopal',
    description: 'A ceremony to recognize and celebrate outstanding achievements',
    venue: 'Football Ground',
  },
];

const Events = () => {
  const [keyword, setKeyword] = useState('');
  const [year, setYear] = useState('-Any-');
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
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
              alt="Events at JLU"
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
            ALWAYS IN <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Motion</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Something is always unfolding. Conversations, gatherings, ideas, celebrations. Small moments and larger milestones. All part of the everyday rhythm.
          </p>
        </motion.div>

        {/* Large "Events" Text - Bottom Left */}
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
            Events
          </motion.h1>
        </div>
      </div>

      {/* Latest Past Events Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '100px',
            paddingRight: '120px',
            paddingBottom: '100px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <div className="flex justify-between items-end mb-16" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '40px' }}>
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block"
                style={{ fontSize: '12px', marginBottom: '16px', letterSpacing: '0.2em' }}
              >
                Archive
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Latest Past Events
              </h2>
            </div>

            {/* Filters - Inline Design */}
            <div className="flex items-end gap-8">
              <div style={{ minWidth: '200px' }}>
                <label
                  className="block text-[#999] uppercase tracking-wider"
                  style={{ fontSize: '10px', marginBottom: '8px', letterSpacing: '0.15em' }}
                >
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-transparent text-[#21313c] placeholder-[#999] focus:outline-none"
                  style={{
                    borderBottom: '1px solid #21313c',
                    paddingBottom: '8px',
                    fontSize: '15px',
                  }}
                />
              </div>
              <div style={{ minWidth: '120px' }}>
                <label
                  className="block text-[#999] uppercase tracking-wider"
                  style={{ fontSize: '10px', marginBottom: '8px', letterSpacing: '0.15em' }}
                >
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-transparent text-[#21313c] focus:outline-none appearance-none cursor-pointer"
                  style={{
                    borderBottom: '1px solid #21313c',
                    paddingBottom: '8px',
                    fontSize: '15px',
                  }}
                >
                  <option value="-Any-">All Years</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <button
                className="px-6 py-2.5 bg-[#21313c] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                style={{ borderRadius: '100px' }}
              >
                Apply Filter
              </button>
            </div>
          </div>

          {/* Events List */}
          <div>
            {eventsData.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                style={{
                  borderBottom: '1px solid #e5e5e5',
                  marginLeft: '-24px',
                  marginRight: '-24px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                }}
              >
                <div
                  className="grid items-start py-10 group-hover:bg-[#fafafa] transition-colors"
                  style={{
                    gridTemplateColumns: '140px 1fr 1fr 40px',
                    gap: '40px',
                    marginLeft: '-24px',
                    marginRight: '-24px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                  }}
                >
                  {/* Date Column */}
                  <div>
                    <span
                      className="text-[#21313c] font-semibold block"
                      style={{ fontSize: '13px', lineHeight: 1.4 }}
                    >
                      {event.date.split(' ')[0]}
                    </span>
                    <span
                      className="text-[#21313c] block"
                      style={{ fontSize: '13px' }}
                    >
                      {event.date.split(' ').slice(1).join(' ')}
                    </span>
                  </div>

                  {/* Title & Venue Column */}
                  <div>
                    <h3
                      className="text-[#21313c] group-hover:text-[#666] transition-colors"
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        marginBottom: '12px',
                      }}
                    >
                      {event.title}
                    </h3>
                    {event.venue && (
                      <span
                        className="inline-block px-3 py-1 bg-[#f6f7f0] text-[#666] rounded"
                        style={{ fontSize: '12px' }}
                      >
                        {event.venue}
                      </span>
                    )}
                  </div>

                  {/* Description & Location Column */}
                  <div>
                    <p
                      className="text-[#666] mb-3"
                      style={{ fontSize: '15px', lineHeight: 1.6 }}
                    >
                      {event.description}
                    </p>
                    <p
                      className="text-[#999]"
                      style={{ fontSize: '13px' }}
                    >
                      {event.location}
                    </p>
                  </div>

                  {/* Arrow Column */}
                  <div className="flex items-center justify-end h-full">
                    <span
                      className="text-[#21313c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      style={{ fontSize: '20px' }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Events Link */}
          <div className="flex justify-center mt-16">
            <button
              className="px-8 py-3 border border-[#21313c] text-[#21313c] text-sm font-medium hover:bg-[#21313c] hover:text-white transition-colors flex items-center gap-3"
              style={{ borderRadius: '100px' }}
            >
              View All Past Events
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events That Shape Campus Life Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '100px',
            paddingRight: '120px',
            paddingBottom: '100px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <div className="flex justify-between items-end mb-16">
            <div style={{ maxWidth: '500px' }}>
              <span
                className="text-[#999] uppercase tracking-widest block"
                style={{ fontSize: '12px', marginBottom: '16px', letterSpacing: '0.2em' }}
              >
                Experience
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Events That Shape Campus Life
              </h2>
            </div>
            <p
              className="text-[#666]"
              style={{ maxWidth: '400px', fontSize: '16px', lineHeight: 1.7 }}
            >
              Where learning meets experience. Each event is designed to inspire, connect, and transform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Signature Events */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ minHeight: '520px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
                alt="Signature Events"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <span
                  className="text-white/60 uppercase tracking-widest mb-4"
                  style={{ fontSize: '11px', letterSpacing: '0.2em' }}
                >
                  01 — Signature
                </span>
                <h3
                  className="text-white mb-4"
                  style={{ fontSize: '28px', fontWeight: 600, lineHeight: 1.2 }}
                >
                  Signature Events & Campus Experiences
                </h3>
                <p
                  className="text-white/80 mb-6"
                  style={{ fontSize: '15px', lineHeight: 1.7, maxWidth: '90%' }}
                >
                  From academic conclaves and award ceremonies to cultural showcases and student-led festivals — experiences that define our vibrant atmosphere.
                </p>
                <div className="flex items-center gap-3 text-white">
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>Explore Events</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Learning, Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ minHeight: '520px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80"
                alt="Learning & Leadership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <span
                  className="text-white/60 uppercase tracking-widest mb-4"
                  style={{ fontSize: '11px', letterSpacing: '0.2em' }}
                >
                  02 — Leadership
                </span>
                <h3
                  className="text-white mb-4"
                  style={{ fontSize: '28px', fontWeight: 600, lineHeight: 1.2 }}
                >
                  Learning, Leadership & Community Impact
                </h3>
                <p
                  className="text-white/80 mb-6"
                  style={{ fontSize: '15px', lineHeight: 1.7, maxWidth: '90%' }}
                >
                  Platforms for learning and leadership development. Students gain exposure to real-world conversations and collaborative problem-solving.
                </p>
                <div className="flex items-center gap-3 text-white">
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>Explore Events</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Don't Miss Our Updates Section */}
      <div className="w-full bg-[#f6f7f0]" style={{ paddingLeft: '40px', paddingRight: '40px', paddingBottom: '80px' }}>
        <div
          className="mx-auto flex flex-col items-center justify-center bg-[#f0c14b]"
          style={{
            maxWidth: '1400px',
            paddingTop: '80px',
            paddingRight: '80px',
            paddingBottom: '80px',
            paddingLeft: '80px',
            borderRadius: '32px',
          }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#21313c]/60 uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Stay Connected
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
              Don't Miss Our<br />
              <span
                className="text-[#21313c]"
                style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}
              >
                Updates
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-[#21313c]/80 text-center mb-10"
            style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '500px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the JLU community and stay informed about upcoming events, achievements, and campus life.
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-[#21313c] placeholder-[#999] focus:outline-none transition-colors"
              style={{
                padding: '16px 24px',
                fontSize: '15px',
                minWidth: '300px',
                border: 'none',
                borderRadius: '100px',
              }}
            />
            <motion.button
              className="bg-[#21313c] text-white font-semibold flex items-center gap-3"
              style={{
                padding: '16px 32px',
                fontSize: '14px',
                borderRadius: '100px',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
              <span>→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Events };
export default Events;
