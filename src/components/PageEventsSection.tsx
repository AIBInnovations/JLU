'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface PageEvent {
  date: string;
  title: string;
  venue: string;
  category: string;
  image?: string;
}

const events: PageEvent[] = [
  {
    date: '19 Aug 2025',
    title: 'Photo Exhibition',
    venue: 'Art Gallery, Shri Gurudev Gupta Media Studios',
    category: 'Arts & Culture',
    image: '/e1.jpg',
  },
  {
    date: '17 Sep 2025',
    title: 'Pinning Ceremony',
    venue: 'A-Block Auditorium',
    category: 'Student Leadership',
    image: '/e2.jpg',
  },
  {
    date: '12 Sep 2025',
    title: 'Inter School Debate Competition',
    venue: 'Main Campus',
    category: 'Academic Competition',
    image: '/e3.jpg',
  },
  {
    date: '22 Jul 2025',
    title: 'Ignited Mind Awards 2025',
    venue: 'Football Ground',
    category: 'Awards & Recognition',
    image: '/e4.jpg',
  },
];

export const PageEventsSection = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const isMobile = useIsMobile();

  const goNext = () => setActiveEvent((prev) => (prev + 1) % events.length);
  const goPrev = () => setActiveEvent((prev) => (prev - 1 + events.length) % events.length);

  const renderEventCard = (event: PageEvent, _i: number) => (
    <div className="group relative overflow-hidden rounded-2xl bg-[#f6f7f0] hover:shadow-xl transition-shadow duration-300">
      {event.image && (
        <div className="relative h-[180px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-[#21313c] text-xs font-bold block leading-tight">
              {event.date.split(' ')[0]}
            </span>
            <span className="text-[#999] text-xl md:text-2xl font-bold uppercase tracking-wider">
              {event.date.split(' ').slice(1).join(' ')}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-white/90 text-xl md:text-2xl font-bold uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-full">
              {event.category}
            </span>
          </div>
        </div>
      )}
      <div className="p-5">
        <h3
          className="text-[#21313c] font-semibold text-base mb-2 group-hover:text-[#f0c14b] transition-colors"
          style={{ lineHeight: 1.3 }}
        >
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[#999] text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">{event.venue}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex items-end justify-between mb-8 md:mb-16"
        >
          <div>
            <span className="text-[#999] text-xl md:text-2xl font-bold tracking-[0.3em] uppercase block mb-2 md:mb-4">
              What&apos;s Happening
            </span>
            <h2
              className="text-[#21313c] text-xl md:text-5xl lg:text-6xl font-semibold"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Upcoming{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Events
              </span>
            </h2>
          </div>
          {isMobile ? (
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-8 h-8 rounded-full border border-[#21313c] flex items-center justify-center text-[#21313c] active:bg-[#21313c] active:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-8 h-8 rounded-full border border-[#21313c] flex items-center justify-center text-[#21313c] active:bg-[#21313c] active:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-[#21313c] text-sm font-semibold hover:gap-3 transition-all group"
            >
              View All Events
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </motion.div>

        {/* Mobile: Carousel */}
        {isMobile ? (
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: customEase }}
              >
                {renderEventCard(events[activeEvent], activeEvent)}
              </motion.div>
            </AnimatePresence>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveEvent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeEvent ? 'bg-[#21313c] w-4' : 'bg-[#21313c]/25'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: customEase }}
              >
                {renderEventCard(event, i)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
