'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <span className="text-[#999] text-xs tracking-[0.3em] uppercase block mb-4">
              What&apos;s Happening
            </span>
            <h2
              className="text-[#21313c] text-3xl md:text-5xl lg:text-6xl font-semibold"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Upcoming{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Events
              </span>
            </h2>
          </div>
          <Link
            href="/events"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#21313c] text-sm font-semibold hover:gap-3 transition-all group"
          >
            View All Events
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: customEase }}
              className="group relative overflow-hidden rounded-2xl bg-[#f6f7f0] hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              {event.image && (
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-sm">
                    <span className="text-[#21313c] text-xs font-bold block leading-tight">
                      {event.date.split(' ')[0]}
                    </span>
                    <span className="text-[#999] text-[10px] uppercase tracking-wider">
                      {event.date.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white/90 text-[10px] uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
