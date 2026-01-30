'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: '600+', label: 'Courses Offered' },
  { number: '50+', label: 'Partner Universities' },
  { number: '95%', label: 'Placement Rate' },
  { number: '10K+', label: 'Alumni Network' },
];

export const ImpactStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section ref={ref} className="bg-[#f6f7f0] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-between items-center gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center flex-1 min-w-[150px]"
            >
              <div
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px #21313c',
                  textShadow: '0 0 0 #c3fd7a',
                }}
              >
                {stat.number}
              </div>
              <p className="text-[#21313c] text-sm mt-2 font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
