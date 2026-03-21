'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const overviewData = [
  {
    title: 'PROMOTING BODY',
    image: '/jlu-mgt-award.jpg',
    description:
      'JLU is promoted by a group with deep roots in media, communication and public engagement. Their vision has always been to build institutions that are meaningful, dynamic and connected to society\'s evolving needs. This ethos continues to guide the university\'s purpose, priorities and partnerships.',
  },
  {
    title: 'JLU AT A GLANCE',
    image: '/interdisciplinary/campus-drone.jpg',
    description:
      'Jagran Lakecity University is a multidisciplinary private university offering undergraduate, postgraduate, doctoral and skill based programs across diverse fields. With students from across India and abroad, JLU brings together academic rigour, global exposure and a vibrant campus life to create a learning experience that is engaging, relevant and forward looking.',
  },
];

const ParallaxCard = ({ item, index, onReadMore }: { item: typeof overviewData[0]; index: number; onReadMore: (item: typeof overviewData[0]) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: customEase }}
      viewport={{ once: true }}
      className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[650px] rounded-xl md:rounded-none"
    >
      {/* Background Image with Parallax */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full object-cover object-top"
        style={{
          y: isMobile ? 0 : y,
          height: '120%',
          top: '-10%',
        }}
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${index === 0 ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent' : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'}`} />

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col ${index === 0 ? 'justify-start pt-10 sm:pt-14 md:pt-16' : 'justify-end'} p-5 sm:p-8 md:p-10`}>
        <span
          className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-xl md:text-2xl font-bold"
          style={{ letterSpacing: '0.2em' }}
        >
          {String(index + 1).padStart(2, '0')} — {item.title}
        </span>
        <p
          className="text-white/80 text-base sm:text-lg md:text-xl max-w-[95%] md:max-w-[90%]"
          style={{ lineHeight: 1.8 }}
        >
          {isMobile ? item.description.substring(0, 120) : item.description.substring(0, 180)}...
        </p>
        <button
          onClick={() => onReadMore(item)}
          className="self-start mt-3 text-[#f0c14b] text-sm md:text-base font-semibold hover:text-white transition-colors cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          Read More →
        </button>
      </div>
    </motion.div>
  );
};

const InstitutionalOverview = () => {
  const [selectedItem, setSelectedItem] = useState<typeof overviewData[0] | null>(null);

  return (
    <section className="w-full bg-[#f6f7f0]">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Overview
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Institutional{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Overview
              </span>
            </h2>
          </div>
          <p
            className="text-[#666] text-lg sm:text-xl md:text-[clamp(1.25rem,2vw,1.75rem)] max-w-full md:max-w-[500px]"
            style={{ lineHeight: 1.8 }}
          >
            Understanding the foundation and scope of Jagran Lakecity University.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {overviewData.map((item, index) => (
            <ParallaxCard key={item.title} item={item} index={index} onReadMore={setSelectedItem} />
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '540px',
                borderTopLeftRadius: '24px',
                borderBottomLeftRadius: '24px',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Modal Image */}
              <div className="relative h-[220px] md:h-[280px] overflow-hidden shrink-0">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-white/60 uppercase tracking-widest text-xs font-bold mb-2 block" style={{ letterSpacing: '0.2em' }}>
                    {selectedItem.title}
                  </span>
                </div>
              </div>
              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <h3 className="text-[#21313c] text-xl md:text-2xl font-semibold mb-4">{selectedItem.title}</h3>
                <p className="text-[#666] text-base md:text-lg" style={{ lineHeight: 1.8 }}>
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export { InstitutionalOverview };
export default InstitutionalOverview;
