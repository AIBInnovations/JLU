'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

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

      {/* JLU in the news Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          {/* Title with line */}
          <div className="flex items-end gap-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] whitespace-nowrap">
              JLU in the news
            </h2>
            <div
              className="bg-gray-300 mb-2"
              style={{ width: '798px', height: '1px' }}
            />
          </div>

          {/* News Grid */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left - Large Card */}
            <div className="lg:w-2/3">
              {/* Image */}
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ height: '560px', maxWidth: '580px' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
                  alt="JLU Award Ceremony"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Content */}
              <div className="mt-6">
                <p className="text-xs text-[#21313c] tracking-wider mb-2">AWARD</p>
                <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
                  JLU Receives National Excellence Award for Innovation in Research
                </h3>
                <p className="text-base text-[#21313c] mb-4">
                  The university has been recognized for its groundbreaking work in sustainable technology and urban planning initiatives.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#21313c] font-medium hover:underline">
                  Read Story
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right - Two Small Cards */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              {/* Card 1 */}
              <div className="flex gap-4">
                <div
                  className="relative shrink-0 overflow-hidden rounded-lg"
                  style={{ width: '270px', height: '241px' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
                    alt="AI Ethics Symposium"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-[#21313c] tracking-wider mb-2">PRESS</p>
                  <h4 className="text-lg font-bold text-[#21313c] mb-3">
                    International Symposium on AI Ethics Hosted at JLU Campus
                  </h4>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#21313c] font-medium hover:underline">
                    Read Story
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex gap-4">
                <div
                  className="relative shrink-0 overflow-hidden rounded-lg"
                  style={{ width: '270px', height: '241px' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                    alt="Research Center"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-[#21313c] tracking-wider mb-2">ANNOUNCEMENT</p>
                  <h4 className="text-lg font-bold text-[#21313c] mb-3">
                    New Interdisciplinary Research Center to Open in Fall 2026
                  </h4>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-[#21313c] font-medium hover:underline">
                    Read Story
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's happening on campus Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            What's happening on campus
          </h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1">
              <label className="block text-sm text-[#21313c] mb-1">Keyword</label>
              <input
                type="text"
                placeholder="Enter keyword"
                className="w-full border-b border-gray-300 bg-transparent py-2 text-[#21313c] placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-[#21313c] mb-1">Year</label>
              <select className="w-full border-b border-gray-300 bg-transparent py-2 text-[#21313c] focus:outline-none appearance-none">
                <option value="-Any-">-Any-</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <button className="text-[#21313c] underline font-medium hover:no-underline">
                Apply
              </button>
            </div>
          </div>

          {/* Events and Calendar */}
          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between mx-auto mt-20"
            style={{ width: '1200px', height: '600px', gap: '40px' }}
          >
            {/* Left - Events List */}
            <div className="lg:w-auto">
              <div className="flex flex-col" style={{ width: '621px', gap: '32px' }}>
                {/* Event 1 */}
                <div>
                  <div className="flex items-start" style={{ height: '119px', gap: '32px' }}>
                    <div className="text-center" style={{ minWidth: '60px' }}>
                      <p className="text-[#21313c] leading-none" style={{ fontSize: '44px', fontWeight: 700 }}>15</p>
                      <p className="text-[#21313c]" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '34px' }}>JAN</p>
                    </div>
                    <div>
                      <p className="text-[#21313c] mb-2" style={{ fontSize: '16px', lineHeight: '24px' }}>
                        <span style={{ fontWeight: 600 }}>Jagran Lakecity University</span>{' '}
                        <span style={{ fontWeight: 400 }}>Jagran Lakecity University SEH, Bhopal</span>
                      </p>
                      <h4 className="text-[#21313c]" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '100%' }}>
                        Global Alumni Networking Summit
                      </h4>
                    </div>
                  </div>
                  <div className="border-b border-gray-300" style={{ width: '621px' }} />
                </div>

                {/* Event 2 */}
                <div>
                  <div className="flex items-start" style={{ height: '119px', gap: '32px' }}>
                    <div className="text-center" style={{ minWidth: '60px' }}>
                      <p className="text-[#21313c] leading-none" style={{ fontSize: '44px', fontWeight: 700 }}>22</p>
                      <p className="text-[#21313c]" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '34px' }}>JAN</p>
                    </div>
                    <div>
                      <p className="text-[#21313c] mb-2" style={{ fontSize: '16px', lineHeight: '24px' }}>
                        <span style={{ fontWeight: 600 }}>Jagran Lakecity University</span>{' '}
                        <span style={{ fontWeight: 400 }}>Jagran Lakecity University SEH, Bhopal</span>
                      </p>
                      <h4 className="text-[#21313c]" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '100%' }}>
                        Annual Winter Cultural Fest 'Aura'
                      </h4>
                    </div>
                  </div>
                  <div className="border-b border-gray-300" style={{ width: '621px' }} />
                </div>

                {/* Event 3 */}
                <div>
                  <div className="flex items-start" style={{ height: '119px', gap: '32px' }}>
                    <div className="text-center" style={{ minWidth: '60px' }}>
                      <p className="text-[#21313c] leading-none" style={{ fontSize: '44px', fontWeight: 700 }}>05</p>
                      <p className="text-[#21313c]" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '34px' }}>FEB</p>
                    </div>
                    <div>
                      <p className="text-[#21313c] mb-2" style={{ fontSize: '16px', lineHeight: '24px' }}>
                        <span style={{ fontWeight: 600 }}>Jagran Lakecity University</span>{' '}
                        <span style={{ fontWeight: 400 }}>Jagran Lakecity University SEH, Bhopal</span>
                      </p>
                      <h4 className="text-[#21313c]" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '100%' }}>
                        Workshop on Quantum Computing
                      </h4>
                    </div>
                  </div>
                  <div className="border-b border-gray-300" style={{ width: '621px' }} />
                </div>
              </div>

              {/* View all link */}
              <a href="#" className="inline-block text-[#21313c] underline font-medium hover:no-underline mt-10">
                View all upcoming events
              </a>
            </div>

            {/* Right - Calendar */}
            <div>
              <div
                className="bg-[#d9d9d9] flex flex-col"
                style={{ width: '539px', height: '600px' }}
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="text-sm font-medium text-[#21313c]">January 2026</p>
                  <div className="flex gap-3">
                    <button className="text-[#21313c] text-sm">←</button>
                    <button className="text-[#21313c] text-sm">→</button>
                  </div>
                </div>
                {/* Calendar Placeholder */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-3xl font-medium text-[#21313c]">Calendar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights from past events Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '64px',
            paddingRight: '120px',
            paddingBottom: '64px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c]">
              Highlights from past events
            </h2>
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="w-12 h-12 border border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                disabled={currentSlide >= maxSlide}
                className="w-12 h-12 border border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>

          {/* Cards Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (477 + 24)}px)`,
                gap: '24px',
              }}
            >
              {pastEventsData.map((event, index) => (
                <div key={event.id} className="shrink-0" style={{ width: '477px' }}>
                  {/* Card Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ width: '477px', height: '600px' }}
                  >
                    <Image
                      src={pastEventsImages[index]}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-white px-3 py-1 text-sm font-medium text-[#21313c] z-10">
                      {event.year}
                    </span>
                  </div>
                  {/* Card Content */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-[#21313c] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-base text-[#21313c] mb-4">
                      {event.description}
                    </p>
                    <a href="#" className="inline-block text-[#21313c] underline font-medium hover:no-underline">
                      View Archive
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campus in moments Section */}
      <div className="w-full bg-[#d9d9d9]">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ maxWidth: '1440px', height: '1000px' }}
        >
        {/* Card 1 - Top Left - Students Studying */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '403px', height: '238px', top: '0px', left: '188px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
            alt="Students collaborating"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 2 - Top Center - Graduation */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '308px', height: '325px', top: '0px', left: '753px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
            alt="Graduation ceremony"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 3 - Top Right (partially cut) - Campus Architecture */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '193px', height: '193px', top: '-50px', left: '1284px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
            alt="Campus building"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 4 - Middle Right - Lab Work */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '215px', height: '215px', top: '302px', left: '1154px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80"
            alt="Students in lab"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 5 - Middle Left - Cultural Event */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '267px', height: '325px', top: '308px', left: '0px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"
            alt="Cultural performance"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 6 - Bottom Left (partially cut) - Sports */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '212px', height: '175px', top: '750px', left: '-56px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
            alt="Sports activity"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 7 - Bottom Center Left - Library */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '214px', height: '325px', top: '675px', left: '319px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
            alt="Library"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 8 - Bottom Center - Campus Garden */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '399px', height: '210px', top: '790px', left: '627px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
            alt="Campus grounds"
            fill
            className="object-cover"
          />
        </div>
        {/* Card 9 - Bottom Right - Student Life */}
        <div
          className="absolute overflow-hidden"
          style={{ width: '286px', height: '343px', top: '601px', left: '1154px' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
            alt="Students socializing"
            fill
            className="object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold text-[#21313c] mb-4">
            Campus in moments
          </h2>
          <p className="text-xl text-[#21313c] mb-4">
            A glimpse into life, learning, and celebrations at JLU.
          </p>
          <a href="#" className="text-lg font-bold text-[#21313c] underline hover:no-underline">
            Explore Gallery
          </a>
        </div>
        </div>
      </div>

      {/* Media resources Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto flex justify-between"
          style={{
            maxWidth: '1440px',
            height: '629px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
        {/* Left Side - Media Resources */}
        <div style={{ maxWidth: '500px' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#21313c] mb-4">
            Media resources
          </h2>
          <p className="text-base text-[#21313c] mb-10">
            Official resources and assets for journalists, institutional partners, and media outlets covering university activities.
          </p>

          {/* Download Items */}
          <div className="flex flex-col gap-6">
            {/* Item 1 - University Logo Pack */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border border-[#21313c] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#21313c]">University Logo Pack</h3>
                <p className="text-sm text-[#21313c]">PNG, SVG, EPS (45MB)</p>
              </div>
            </div>

            {/* Item 2 - Brand Guidelines */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border border-[#21313c] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#21313c]">Brand Guidelines</h3>
                <p className="text-sm text-[#21313c]">PDF (12MB)</p>
              </div>
            </div>

            {/* Item 3 - Leadership Photos */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border border-[#21313c] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#21313c]">Leadership Photos</h3>
                <p className="text-sm text-[#21313c]">High-Res Gallery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Press Inquiries Card */}
        <div
          className="bg-[#d9d9d9] flex flex-col justify-center"
          style={{ width: '450px', padding: '40px' }}
        >
          <p className="text-xs font-medium text-[#21313c] tracking-wider mb-4">
            PRESS INQUIRIES
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-[#21313c] mb-4">
            Get in touch with our communications team
          </h3>
          <p className="text-sm text-[#21313c] mb-8">
            For urgent media requests, interview coordination, or campus filming permissions, please contact our office directly.
          </p>
          <div className="flex flex-col gap-4">
            <button className="w-full py-4 bg-[#c4c4c4] text-[#21313c] font-medium hover:bg-[#b0b0b0] transition-colors">
              Download Media Kit
            </button>
            <button className="w-full py-4 bg-white border border-[#21313c] text-[#21313c] font-medium hover:bg-gray-50 transition-colors">
              Contact Communications
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export { NewsAndEvents };
export default NewsAndEvents;
