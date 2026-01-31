'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative flex flex-col overflow-hidden"
      style={{
        width: '580px',
        maxWidth: '100%',
        height: '932px',
      }}
    >
      {/* Background Image with Parallax */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full object-cover object-top"
        style={{
          y,
          height: '120%',
          top: '-10%',
        }}
      />
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/15" />
      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{
          paddingTop: '32px',
          paddingRight: '32px',
          paddingBottom: '160px',
          paddingLeft: '32px',
        }}
      >
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed text-white">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const InstitutionalOverview = () => {
  return (
    <section className="bg-[#f6f7f0] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#21313c] mb-16"
        >
          Institutional Overview
        </motion.h2>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
