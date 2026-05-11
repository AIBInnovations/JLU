'use client';

import { useIsMobile } from '../hooks/useIsMobile';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Admissions Open 2026-27 — Apply Across 50+ Programs',
    excerpt: 'Applications are now open for the 2026-27 academic year across undergraduate, postgraduate and doctoral programs in Management, Law, Engineering, Liberal Arts, Hospitality, Journalism, Design and more.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/admissions.jpg',
    date: 'Apr 28, 2026',
    category: 'Admissions',
  },
  {
    id: '2',
    title: 'JLU Ranked Among India Today\'s Top Private Universities 2025',
    excerpt: 'Jagran Lakecity University has been recognized in the India Today Top University Rankings 2025, reaffirming its position as one of Central India\'s leading multidisciplinary universities.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/aw1.jpg',
    date: 'Mar 15, 2026',
    category: 'Achievement',
  },
  {
    id: '3',
    title: 'Foundation Day 2026 — JLU Marks 13 Years of Academic Excellence',
    excerpt: 'The university celebrated its 13th Foundation Day on May 1, 2026 with a vibrant cultural extravaganza, alumni reunion and annual awards ceremony at the Chandanpura campus.',
    image: '/events/foundation-day-2026.jpg',
    date: 'May 1, 2026',
    category: 'Event',
  },
  {
    id: '4',
    title: 'Placement Season 2025-26: 80%+ Rate with Top Recruiters',
    excerpt: 'Students secured offers from Amazon, EY, KPMG, Deloitte, Infosys, TCS and HDFC Bank — sustaining JLU\'s 80%+ placement rate with packages up to ₹24 LPA across schools.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ev2.jpg',
    date: 'Feb 18, 2026',
    category: 'Placements',
  },
];

const categoryColors: Record<string, string> = {
  Achievement: '#027ea1',
  Admissions: '#c3fd7a',
  Event: '#027ea1',
  Placements: '#f4c950',
  Workshop: '#e85a71',
};

export const LatestNews = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-12 md:py-24 2xl:py-32 bg-[#f6f7f0]">
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <div>
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
              Stay Updated
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              Latest News &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Updates
              </span>
            </h1>
          </div>
          <a
            href="/news-events"
            className="inline-flex items-center gap-2 text-[#027ea1] font-medium"
          >
            View All News
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
              <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* News Grid - Staggered Layout */}
        <div className={`grid gap-3 md:gap-6 items-start ${isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className={`bg-white overflow-hidden shadow-sm border border-gray-100 ${isMobile ? 'rounded-xl' : 'rounded-2xl'}`}
              style={{ marginTop: isMobile ? '0' : (index % 2 === 1 ? '48px' : '0') }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: isMobile ? '3/2' : '4/3' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Category Badge */}
                <span
                  className={`absolute font-bold rounded-md ${isMobile ? 'top-2 left-2 px-1.5 py-0.5 text-[12px]' : 'top-4 left-4 px-3 py-1.5 text-sm rounded-lg'}`}
                  style={{
                    backgroundColor: `${categoryColors[item.category]}e6` || '#c3fd7ae6',
                    color: item.category === 'Event' || item.category === 'Infrastructure' ? '#fff' : '#21313c',
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className={isMobile ? 'p-2.5' : 'p-5'}>
                {!isMobile && (
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                )}
                <h3
                  className={`font-bold text-[#21313c] line-clamp-2 leading-snug ${isMobile ? 'text-sm mb-1' : 'text-lg mb-2'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.title}
                </h3>
                {isMobile ? (
                  <span className="text-[12px] text-gray-400">{item.date}</span>
                ) : (
                  <p className="text-base text-gray-500 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
