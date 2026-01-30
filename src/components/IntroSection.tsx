'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#f6f7f0] py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[#21313c] text-2xl sm:text-3xl lg:text-4xl leading-relaxed font-light max-w-5xl"
        >
          Lorem ipsum dolor sit amet consectetur. Purus sit pharetra quis elementum.
          Sit pharetra sed cras pharetra quis donec ac. Turpis donec libero
          pellentesque phasellus mauris ipsum venenatis malesuada.
        </motion.p>
      </div>
    </section>
  );
};
