'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Event {
  id: number;
  date: string;
  title: string;
  description: string;
  venue: string;
  category: string;
  image?: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    date: '19 August 2025',
    title: 'Photo Exhibition',
    description: 'Showcase the art of photography on the occasion of World Photography Day',
    venue: 'Art Gallery, Shri Gurudev Gupta Media Studios',
    category: 'Arts & Culture',
    image: '/e1.jpg',
  },
  {
    id: 2,
    date: '17 September 2025',
    title: 'Pinning Ceremony',
    description: 'Pinning of the new student council members 2025',
    venue: 'A-Block Auditorium',
    category: 'Student Leadership',
    image: '/e2.jpg',
  },
  {
    id: 3,
    date: '12 September 2025',
    title: 'Inter School Debate Competition',
    description: 'MUN & Debating society presents a platform for young orators',
    venue: 'Main Campus',
    category: 'Academic Competition',
    image: '/e3.jpg',
  },
  {
    id: 4,
    date: '22 July 2025',
    title: 'Ignited Mind Awards 2025',
    description: 'Ceremony to recognize and celebrate outstanding achievements',
    venue: 'Football Ground',
    category: 'Awards & Recognition',
    image: '/e4.jpg',
  },
];

const pastEvents: Event[] = [
  {
    id: 5,
    date: '14 January 2025',
    title: 'Birth Anniversary Celebration',
    description: "Honoring Late Shri Gurudev Gupta Ji's 106th birth anniversary",
    venue: 'Shri Gurudev Gupta Media Studios',
    category: 'Commemoration',
    image: '/e5.jpg',
  },
  {
    id: 6,
    date: '13 January 2025',
    title: 'Official Launch of Alumni Portal',
    description: 'Gateway to reconnect with the JLU family',
    venue: 'Jagran Lakecity University SEH',
    category: 'Launch Event',
  },
  {
    id: 7,
    date: '1 May 2024',
    title: '11th Foundation Day & Annual Award Ceremony',
    description: 'JLU celebrates 11 years of establishment with awards and recognition',
    venue: 'Main Auditorium',
    category: 'Anniversary',
  },
  {
    id: 8,
    date: '15 April 2024',
    title: 'Lakecity Hack 2024',
    description: 'Annual hackathon bringing together tech enthusiasts and innovators',
    venue: 'Faculty of Engineering',
    category: 'Technology',
  },
  {
    id: 9,
    date: '10 April 2024',
    title: 'Data Design & Diversity Masterclass',
    description: 'Expert-led session on data science and inclusive design practices',
    venue: 'Conference Hall',
    category: 'Workshop',
  },
  {
    id: 10,
    date: '5 April 2024',
    title: 'Etiquette Edge Communication Workshop',
    description: 'Professional development workshop on communication skills',
    venue: 'Faculty of Management',
    category: 'Workshop',
  },
  {
    id: 11,
    date: '1 April 2024',
    title: 'VAISHLASIKI Faculty Development Program',
    description: 'Comprehensive faculty development initiative for academic excellence',
    venue: 'Academic Block',
    category: 'Faculty Development',
  },
];

const categories = ['All', 'Arts & Culture', 'Student Leadership', 'Academic Competition', 'Awards & Recognition', 'Workshop', 'Technology'];

const Events = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const [activeModal, setActiveModal] = useState<'signature' | 'leadership' | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeModal]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredUpcoming = upcomingEvents.filter(event => {
    const matchesKeyword = event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                          event.description.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesKeyword && matchesCategory;
  });

  const filteredPast = pastEvents.filter(event => {
    const matchesKeyword = event.title.toLowerCase().includes(keyword.toLowerCase()) ||
                          event.description.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || event.date.includes(selectedYear);
    return matchesKeyword && matchesCategory && matchesYear;
  });

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
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
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            ALWAYS IN <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Motion</span>
          </h2>
          <p
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            Something is always unfolding. Conversations, gatherings, ideas, celebrations. Small moments and larger milestones. All part of the everyday rhythm.
          </p>
        </motion.div>

        {/* Large "Events" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
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
            Events
          </motion.h1>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[80px]" style={{ maxWidth: '1440px' }}>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12 pb-6 md:pb-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
            <div className="mb-6 md:mb-0">
              <span className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4" style={{ letterSpacing: '0.2em' }}>
                What's Coming Up
              </span>
              <h2 className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)]" style={{ fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Upcoming{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Events</span>
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#21313c] text-white'
                      : 'bg-white text-[#21313c] hover:bg-[#e5e5e5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredUpcoming.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || '/e1.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#c3fd7a] text-[#21313c] text-xs font-semibold rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#999] text-xs mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <h3 className="text-[#21313c] font-semibold text-lg mb-2 group-hover:text-[#03463B] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-[#666] text-sm mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-2 text-[#999] text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.venue}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Events Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-16 pb-6 md:pb-10" style={{ borderBottom: '1px solid #e5e5e5' }}>
            <div className="mb-6 md:mb-0">
              <span
                className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
                style={{ letterSpacing: '0.2em' }}
              >
                Archive
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Past{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Events</span>
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-6 md:gap-8">
              <div className="flex-1 sm:flex-initial" style={{ minWidth: 'auto' }}>
                <label
                  className="block text-[#999] uppercase tracking-wider text-[9px] sm:text-[10px] mb-2"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full sm:w-[180px] md:w-[200px] bg-transparent text-[#21313c] placeholder-[#999] focus:outline-none text-sm md:text-[15px]"
                  style={{
                    borderBottom: '1px solid #21313c',
                    paddingBottom: '8px',
                  }}
                />
              </div>
              <div className="w-1/2 sm:w-auto" style={{ minWidth: 'auto' }}>
                <label
                  className="block text-[#999] uppercase tracking-wider text-[9px] sm:text-[10px] mb-2"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full sm:w-[100px] md:w-[120px] bg-transparent text-[#21313c] focus:outline-none appearance-none cursor-pointer text-sm md:text-[15px]"
                  style={{
                    borderBottom: '1px solid #21313c',
                    paddingBottom: '8px',
                  }}
                >
                  <option value="All">All Years</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
              <button
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#21313c] text-white text-xs sm:text-sm font-medium hover:bg-[#333] transition-colors"
                style={{ borderRadius: '100px' }}
              >
                Apply Filter
              </button>
            </div>
          </div>

          {/* Events List — first 3 always visible */}
          <div className="flex flex-col gap-4 md:gap-0">
            {filteredPast.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer bg-[#f9f9f9] md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0"
              >
                {/* Mobile: Card Layout */}
                <div className="md:hidden">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-[#21313c] font-semibold text-base leading-tight">{event.title}</h3>
                    {event.venue && (
                      <span className="px-2 py-1 bg-white text-[#666] rounded text-[10px] shrink-0">{event.category}</span>
                    )}
                  </div>
                  <p className="text-[#666] text-xs mb-3 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-2 text-[11px] text-[#999]">
                    <span className="font-medium text-[#21313c]">{event.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
                {/* Desktop: Grid Layout */}
                <div
                  className="hidden md:grid items-start py-10 group-hover:bg-[#fafafa] transition-colors"
                  style={{ gridTemplateColumns: '140px 1fr 1fr 40px', gap: '40px', marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #e5e5e5' }}
                >
                  <div>
                    <span className="text-[#21313c] font-semibold block" style={{ fontSize: '13px', lineHeight: 1.4 }}>{event.date.split(' ')[0]}</span>
                    <span className="text-[#21313c] block" style={{ fontSize: '13px' }}>{event.date.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div>
                    <h3 className="text-[#21313c] group-hover:text-[#666] transition-colors" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2, marginBottom: '12px' }}>{event.title}</h3>
                    <span className="inline-block px-3 py-1 bg-[#e8f0fe] text-[#3b82f6] rounded text-xs font-medium">{event.category}</span>
                  </div>
                  <div>
                    <p className="text-[#666] mb-3" style={{ fontSize: '15px', lineHeight: 1.6 }}>{event.description}</p>
                    <p className="text-[#999]" style={{ fontSize: '13px' }}>{event.venue}</p>
                  </div>
                  <div className="flex items-center justify-end h-full">
                    <span className="text-[#21313c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ fontSize: '20px' }}>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Remaining events — expandable */}
          {filteredPast.length > 3 && (
            <>
              <motion.div
                initial={false}
                animate={{
                  height: showAllPastEvents ? 'auto' : 0,
                  opacity: showAllPastEvents ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div className="flex flex-col gap-4 md:gap-0">
                  {filteredPast.slice(3).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer bg-[#f9f9f9] md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0"
                    >
                      {/* Mobile: Card Layout */}
                      <div className="md:hidden">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-[#21313c] font-semibold text-base leading-tight">{event.title}</h3>
                          {event.venue && (
                            <span className="px-2 py-1 bg-white text-[#666] rounded text-[10px] shrink-0">{event.category}</span>
                          )}
                        </div>
                        <p className="text-[#666] text-xs mb-3 leading-relaxed">{event.description}</p>
                        <div className="flex items-center gap-2 text-[11px] text-[#999]">
                          <span className="font-medium text-[#21313c]">{event.date}</span>
                          <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                      {/* Desktop: Grid Layout */}
                      <div
                        className="hidden md:grid items-start py-10 group-hover:bg-[#fafafa] transition-colors"
                        style={{ gridTemplateColumns: '140px 1fr 1fr 40px', gap: '40px', marginLeft: '-24px', marginRight: '-24px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #e5e5e5' }}
                      >
                        <div>
                          <span className="text-[#21313c] font-semibold block" style={{ fontSize: '13px', lineHeight: 1.4 }}>{event.date.split(' ')[0]}</span>
                          <span className="text-[#21313c] block" style={{ fontSize: '13px' }}>{event.date.split(' ').slice(1).join(' ')}</span>
                        </div>
                        <div>
                          <h3 className="text-[#21313c] group-hover:text-[#666] transition-colors" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2, marginBottom: '12px' }}>{event.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#e8f0fe] text-[#3b82f6] rounded text-xs font-medium">{event.category}</span>
                        </div>
                        <div>
                          <p className="text-[#666] mb-3" style={{ fontSize: '15px', lineHeight: 1.6 }}>{event.description}</p>
                          <p className="text-[#999]" style={{ fontSize: '13px' }}>{event.venue}</p>
                        </div>
                        <div className="flex items-center justify-end h-full">
                          <span className="text-[#21313c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ fontSize: '20px' }}>→</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* View More / View Less button */}
              <div className="flex justify-center mt-8 md:mt-12">
                <button
                  onClick={() => setShowAllPastEvents(!showAllPastEvents)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#21313c] text-white text-sm font-medium hover:bg-[#333] transition-colors cursor-pointer"
                  style={{ borderRadius: '100px' }}
                >
                  {showAllPastEvents ? 'View Less' : `View More (${filteredPast.length - 3})`}
                  <motion.span
                    animate={{ rotate: showAllPastEvents ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Events That Shape Campus Life Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-16">
            <div className="max-w-full md:max-w-[500px] mb-4 md:mb-0">
              <span
                className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
                style={{ letterSpacing: '0.2em' }}
              >
                Experience
              </span>
              <h2
                className="text-[#21313c] text-xl sm:text-2xl md:text-[clamp(2rem,4vw,3rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Events That Shape Campus Life
              </h2>
            </div>
            <p
              className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
              style={{ lineHeight: 1.7 }}
            >
              Where learning meets experience. Each event is designed to inspire, connect, and transform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Card 1 - Signature Events */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => setActiveModal('signature')}
              className="group relative overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[400px] md:min-h-[520px] rounded-xl md:rounded-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
                alt="Signature Events"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10">
                <span
                  className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-[9px] sm:text-[10px] md:text-[11px]"
                  style={{ letterSpacing: '0.2em' }}
                >
                  01 — Signature
                </span>
                <h3
                  className="text-white mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-[28px]"
                  style={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  Signature Events & Campus Experiences
                </h3>
                <p
                  className="text-white/80 mb-4 md:mb-6 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
                  style={{ lineHeight: 1.7 }}
                >
                  From academic conclaves and award ceremonies to cultural showcases and student-led festivals — experiences that define our vibrant atmosphere.
                </p>
                <div className="flex items-center gap-2 md:gap-3 text-white">
                  <span className="text-xs sm:text-sm md:text-[14px] font-medium">Explore Events</span>
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
              onClick={() => setActiveModal('leadership')}
              className="group relative overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[400px] md:min-h-[520px] rounded-xl md:rounded-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80"
                alt="Learning & Leadership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10">
                <span
                  className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-[9px] sm:text-[10px] md:text-[11px]"
                  style={{ letterSpacing: '0.2em' }}
                >
                  02 — Leadership
                </span>
                <h3
                  className="text-white mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-[28px]"
                  style={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  Learning, Leadership & Community Impact
                </h3>
                <p
                  className="text-white/80 mb-4 md:mb-6 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
                  style={{ lineHeight: 1.7 }}
                >
                  Platforms for learning and leadership development. Students gain exposure to real-world conversations and collaborative problem-solving.
                </p>
                <div className="flex items-center gap-2 md:gap-3 text-white">
                  <span className="text-xs sm:text-sm md:text-[14px] font-medium">Explore Events</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Don't Miss Our Updates Section */}
      <div className="w-full bg-[#f6f7f0] px-4 sm:px-6 md:px-10 pb-10 md:pb-20">
        <div
          className="mx-auto flex flex-col items-center justify-center bg-[#f0c14b] px-4 py-5 sm:px-10 sm:py-10 md:px-20 md:py-20 rounded-xl md:rounded-[32px]"
          style={{
            maxWidth: '1400px',
          }}
        >
          <motion.div
            className="text-center mb-3 sm:mb-8 md:mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#21313c]/60 uppercase tracking-widest block mb-2 sm:mb-4 md:mb-6 text-[9px] sm:text-[11px] md:text-xs"
              style={{ letterSpacing: '0.2em' }}
            >
              Stay Connected
            </span>
            <h2
              className="text-[#21313c] text-xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Don't Miss Our{' '}
              <span
                className="text-[#21313c]"
                style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}
              >
                Updates
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-[#21313c]/80 text-center mb-4 sm:mb-8 md:mb-10 text-xs md:text-base max-w-[95%] md:max-w-[500px]"
            style={{ lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the JLU community and stay informed about upcoming events, achievements, and campus life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-[#21313c] placeholder-[#999] focus:outline-none transition-colors w-full sm:w-auto sm:min-w-[250px] md:min-w-[300px] px-4 py-2.5 sm:px-5 sm:py-3.5 md:px-6 md:py-4 text-xs md:text-[15px]"
              style={{
                border: 'none',
                borderRadius: '100px',
              }}
            />
            <motion.button
              className="bg-[#21313c] text-white font-semibold flex items-center justify-center gap-2 md:gap-3 px-5 py-2.5 sm:px-7 sm:py-3.5 md:px-8 md:py-4 text-xs sm:text-sm md:text-[14px]"
              style={{
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
      {/* Event Category Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveModal(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Panel */}
            <motion.div
              className="relative w-[95vw] max-w-[900px] max-h-[90vh] bg-white rounded-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-[200px] sm:h-[260px] md:h-[300px] shrink-0 rounded-t-2xl overflow-hidden">
                <Image
                  src={activeModal === 'signature'
                    ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80'
                    : 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&q=80'
                  }
                  alt={activeModal === 'signature' ? 'Signature Events' : 'Learning & Leadership'}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10">
                  <span
                    className="text-white/60 uppercase tracking-widest block mb-2 sm:mb-3 text-[9px] sm:text-[10px] md:text-[11px]"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    {activeModal === 'signature' ? '01 — Signature' : '02 — Leadership'}
                  </span>
                  <h2 className="text-white text-xl sm:text-2xl md:text-[32px] font-semibold" style={{ lineHeight: 1.2 }}>
                    {activeModal === 'signature' ? 'Signature Events & Campus Experiences' : 'Learning, Leadership & Community Impact'}
                  </h2>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 md:p-10">
                {activeModal === 'signature' ? (
                  <>
                    <p className="text-[#666] text-sm md:text-base mb-8" style={{ lineHeight: 1.8 }}>
                      From academic conclaves and award ceremonies to cultural showcases and student-led festivals — these signature events define the vibrant atmosphere at JLU. They bring together students, faculty, and guests from across the country to celebrate achievements, creativity, and community.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Ignited Mind Awards</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Annual ceremony recognizing outstanding student and faculty achievements across academics, sports, and leadership.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Cultural Festivals</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Multi-day celebrations featuring music, dance, art exhibitions, theatre performances, and inter-college competitions.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Foundation Day</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Annual celebration marking JLU's establishment, featuring keynote addresses, alumni reunions, and awards.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Convocation Ceremony</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Grand graduation ceremony with honorary doctorates, gold medals, and distinguished guest speakers.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[#666] text-sm md:text-base mb-8" style={{ lineHeight: 1.8 }}>
                      Platforms for learning and leadership development. Students gain exposure to real-world conversations, collaborative problem-solving, and community engagement initiatives that build tomorrow's leaders.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Student Council & Leadership</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Pinning ceremonies, council elections, and leadership programs that develop governance and organizational skills.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Academic Conclaves</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Conferences, seminars, and panel discussions featuring industry experts, researchers, and thought leaders.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Community Outreach</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Social impact initiatives, NSS camps, environmental drives, and community service programs led by students.</p>
                      </div>
                      <div className="bg-[#f6f7f0] rounded-xl p-5 md:p-6">
                        <div className="w-10 h-10 bg-[#f0c14b] rounded-lg flex items-center justify-center mb-4">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                        </div>
                        <h4 className="text-[#21313c] font-semibold text-base mb-2">Workshops & Hackathons</h4>
                        <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>Hands-on workshops, hackathons like Lakecity Hack, debate competitions, and skill-building bootcamps.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { Events };
export default Events;
