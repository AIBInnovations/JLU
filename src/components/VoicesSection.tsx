'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Voice {
  color: string;
  image: string;
}

const voices: Voice[] = [
  { color: 'bg-pink-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/a.webp' },
  { color: 'bg-cyan-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/b.webp' },
  { color: 'bg-yellow-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/c.webp' },
  { color: 'bg-lime-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/d.webp' },
  { color: 'bg-orange-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/e.webp' },
  { color: 'bg-purple-400', image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/f.webp' },
];

export const VoicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section ref={ref} className="bg-[#21313c] py-20 px-6 md:px-10 lg:px-12 2xl:px-20 2xl:py-28">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl md:text-[2.75rem] lg:text-5xl 2xl:text-6xl font-bold mb-3">
            VOICES OF JLU
          </h2>
          <div className="w-24 h-1 bg-[#c3fd7a] mx-auto" />
        </motion.div>

        {/* Testimonial Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex justify-center gap-4 overflow-x-auto pb-4 px-4"
        >
          {voices.map((voice, index) => (
            <motion.div
              key={index}
              variants={pillVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${voice.color} w-28 sm:w-32 md:w-36 2xl:w-44 h-72 sm:h-80 md:h-96 2xl:h-[28rem] rounded-full flex-shrink-0 relative overflow-hidden cursor-pointer`}
            >
              <img
                loading="lazy" decoding="async" src={voice.image}
                alt={`Voice ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === 0 ? 'bg-[#c3fd7a]' : 'bg-white/30'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
