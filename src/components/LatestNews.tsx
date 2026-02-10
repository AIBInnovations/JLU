'use client';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'JLU Achieves QS I-GAUGE Diamond Rating - First in Madhya Pradesh',
    excerpt: 'Jagran Lakecity University becomes the first and only university in MP & Chhattisgarh to receive the prestigious QS Diamond rating, ranking among top 25 universities in India.',
    image: '/posthero1.jpg',
    date: 'Dec 15, 2024',
    category: 'Achievement',
    link: '#',
  },
  {
    id: '2',
    title: '7th International Festival of Media Concludes Successfully',
    excerpt: 'The Faculty of Journalism and Creative Studies hosted the 7th edition of JLU International Festival of Media on March 9-10, 2024, bringing together media professionals from across the globe.',
    image: '/posthero2.jpg',
    date: 'Mar 10, 2024',
    category: 'Event',
    link: '#',
  },
  {
    id: '3',
    title: 'Placement Season 2024: Highest Package of ₹24 LPA',
    excerpt: 'JLU students receive offers from top recruiters including Amazon, Infosys, TCS, Deloitte, and HDFC Bank with 80%+ placement rate and average package of ₹5 LPA.',
    image: '/posthero3.jpg',
    date: 'Feb 20, 2024',
    category: 'Placements',
    link: '#',
  },
  {
    id: '4',
    title: 'JLU Celebrates 11th Foundation Day with Grand Ceremony',
    excerpt: 'The university marked its Eleventh Foundation Day on May 1, 2024 with a vibrant cultural extravaganza and annual awards ceremony at the Chandanpura campus.',
    image: '/posthero1.jpg',
    date: 'May 1, 2024',
    category: 'Event',
    link: '#',
  },
];

const categoryColors: Record<string, string> = {
  Achievement: '#c3fd7a',
  Event: '#4a90a4',
  Placements: '#f4c950',
  Workshop: '#e85a71',
};

export const LatestNews = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[#f6f7f0]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-medium text-[#03463B] tracking-wider uppercase mb-2 block">
              Stay Updated
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#21313c]"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Latest News &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Updates
              </span>
            </h2>
          </div>
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-[#03463B] font-medium hover:gap-3 transition-all group"
          >
            View All News
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
              <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* News Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              style={{ marginTop: index % 2 === 1 ? '48px' : '0' }}
            >
              <a href={item.link} className="block">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <span
                    className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-lg backdrop-blur-sm"
                    style={{
                      backgroundColor: `${categoryColors[item.category]}e6` || '#c3fd7ae6',
                      color: item.category === 'Event' || item.category === 'Infrastructure' ? '#fff' : '#21313c',
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Read More Arrow - Shows on hover */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2">
                      <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7h10v10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3
                    className="text-base font-semibold text-[#21313c] mb-2 group-hover:text-[#03463B] transition-colors line-clamp-2 leading-snug"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                </div>
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
