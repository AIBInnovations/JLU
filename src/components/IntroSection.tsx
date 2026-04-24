'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#f6f7f0] py-20 px-6 md:px-10 lg:px-12 2xl:px-20 2xl:py-28">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[#21313c] text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl 2xl:text-5xl leading-relaxed font-light max-w-5xl 2xl:max-w-6xl"
        >
          Lorem ipsum dolor sit amet consectetur. Purus sit pharetra quis elementum.
          Sit pharetra sed cras pharetra quis donec ac. Turpis donec libero
          pellentesque phasellus mauris ipsum venenatis malesuada.
        </motion.p>
      </div>
    </section>
  );
};
