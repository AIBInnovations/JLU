'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const overviewData = [
  {
    title: 'PROMOTING BODY',
    image: '/pro.jpg',
    description:
      'JLU is promoted by a group with deep roots in media, communication and public engagement. Their vision has always been to build institutions that are meaningful, dynamic and connected to society\'s evolving needs. This ethos continues to guide the university\'s purpose, priorities and partnerships.',
  },
  {
    title: 'JLU AT A GLANCE',
    image: '/o.jpg',
    description:
      'Jagran Lakecity University is a multidisciplinary private university offering undergraduate, postgraduate, doctoral and skill based programs across diverse fields. With students from across India and abroad, JLU brings together academic rigour, global exposure and a vibrant campus life to create a learning experience that is engaging, relevant and forward looking.',
  },
];

const ParallaxCard = ({ item, index }: { item: typeof overviewData[0]; index: number }) => {
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
      className="group relative overflow-hidden cursor-pointer min-h-[400px] sm:min-h-[500px] md:min-h-[650px] rounded-xl md:rounded-none"
    >
      {/* Background Image with Parallax */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        style={{
          y: isMobile ? 0 : y,
          height: '120%',
          top: '-10%',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10">
        <span
          className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-[9px] sm:text-[10px] md:text-[11px]"
          style={{ letterSpacing: '0.2em' }}
        >
          {String(index + 1).padStart(2, '0')} — {item.title}
        </span>
        <p
          className="text-white/80 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
          style={{ lineHeight: 1.7 }}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const InstitutionalOverview = () => {
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
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
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
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            Understanding the foundation and scope of Jagran Lakecity University.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {overviewData.map((item, index) => (
            <ParallaxCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { InstitutionalOverview };
export default InstitutionalOverview;
